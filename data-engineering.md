# Construindo um Modern Banking Data Lakehouse End-to-End: Da Ingestão com PySpark e Apache Iceberg à Orquestração com Airflow e dbt

> **Um guia prático sobre como desenhar, implementar e orquestrar uma plataforma de dados bancária resiliente, aplicando Arquitetura Medalhão, Data Quality com Quarentena e Table Formats modernos.**

---

## 📌 Sumário
1. [Introdução & O Desafio do Domínio Bancário](#1-introdução--o-desafio-do-domínio-bancário)
2. [Visão Geral da Arquitetura](#2-visão-geral-da-arquitetura)
3. [Modelagem do Domínio & Geração de Dados Sintéticos](#3-modelagem-do-domínio--geração-de-dados-sintéticos)
4. [A Camada Bronze: Ingestão Inteligente e Particionamento](#4-a-camada-bronze-ingestão-inteligente-e-particionamento)
5. [A Camada Silver: Limpeza, Regras de Negócio e Quarentena](#5-a-camada-silver-limpeza-regras-de-negócio-e-quarentena)
6. [A Camada Gold: Métricas Analíticas e Visão 360°](#6-a-camada-gold-métricas-analíticas-e-visão-360)
7. [Modern Lakehouse com Apache Iceberg & MinIO](#7-modern-lakehouse-com-apache-iceberg--minio)
8. [Transformações Semânticas com dbt & DuckDB](#8-transformações-semânticas-com-dbt--duckdb)
9. [Orquestração com Apache Airflow em Docker](#9-orquestração-com-apache-airflow-em-docker)
10. [Principais Desafios de Engenharia & Lições Aprendidas](#10-principais-desafios-de-engenharia--lições-aprendidas)
11. [Conclusão e Próximos Passos](#11-conclusão-e-próximos-passos)

---

## 1. Introdução & O Desafio do Domínio Bancário

No setor financeiro, dados não são apenas relatórios: são a base para **detecção de fraudes em tempo real**, **concessão de crédito**, **auditoria regulatória (compliance)** e **personalização da experiência do cliente**.

Porém, construir uma plataforma de dados bancária impõe desafios complexos:
* **Volume massivo e granularidade temporal:** milhões de transações diárias (PIX, TED, cartões).
* **Integridade referencial estrita:** uma transação de cartão não pode apontar para um estabelecimento ou conta inexistente.
* **Garantia de Qualidade sem interrupção do pipeline:** registros corrompidos ou inconsistentes não devem derrubar o pipeline inteiro nem poluir a camada de consumo.
* **Necessidade de ACID e Time Travel:** capacidade de auditar o histórico de dados e garantir consistência transacional.

Para simular e resolver esses desafios no mundo real, desenvolvi o **Banking Data Lakehouse (Banking Pipeline)** — uma plataforma de engenharia de dados ponta a ponta pronta para produção.

---

## 2. Visão Geral da Arquitetura

O projeto foi construído sob o padrão da **Arquitetura Medalhão (Medallion Architecture)** combinada com um **Lakehouse Moderno**, dividida em camadas bem definidas:

```
                         DATA SOURCES
                    Synthetic Banking Data
                               │
                               ▼
                           INGESTION
                     PyArrow Batch Writer
                               │
                               ▼
                         🥉 BRONZE
                     Raw Parquet (Ano/Mês)
                               │
                               ▼
                          Apache Spark
                               │
                     ┌─────────┴─────────┐
                     │                   │
                     ▼                   ▼
                  SILVER            QUARANTINE
               Clean / Valid       Invalid Records
                     │
                     ▼
                  🥇 GOLD
             Agregações & Modelos
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
   Apache Iceberg            dbt Core
   (MinIO / S3)          (Stg/Int/Marts)
         │                       │
         └───────────┬───────────┘
                     ▼
             APACHE AIRFLOW
             (Orquestração)
```

### 🛠️ Stack Tecnológica

| Componente | Tecnologia | Papel no Projeto |
| :--- | :--- | :--- |
| **Data Generation** | Python, Faker, NumPy, Pandas | Geração determinística e relacional de dados bancários |
| **Ingestão** | PyArrow / Parquet | Processamento em batches com baixo consumo de memória |
| **Processamento** | Apache Spark / PySpark | Limpeza distribuída, validação de regras e agregações Gold |
| **Storage & Lakehouse** | Apache Iceberg + MinIO (S3) | Tabelas ACID, Time-Travel, Metadata Management e Snapshot isolation |
| **Transformações** | dbt Core + DuckDB | Modelagem dimensional e testes semânticos |
| **Orquestração** | Apache Airflow (CeleryExecutor) | Agendamento, controle de dependências e monitoramento de DAGs |
| **Infraestrutura** | Docker & Docker Compose | Ambientes isolados e reprodutíveis para Spark, Airflow, Postgres, Redis e MinIO |

---

## 3. Modelagem do Domínio & Geração de Dados Sintéticos

Para espelhar a complexidade de um banco digital, foi modelado um ecossistema com **7 entidades inter-relacionadas**:

```
                       ┌──────────────┐
                       │   CUSTOMER   │
                       └──────┬───────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
             ┌─────────────┐     ┌─────────────┐
             │   ACCOUNT   │     │    LOAN     │
             └──────┬──────┘     └──────┬──────┘
                    │                   │
          ┌─────────┴─────────┐         ▼
          ▼                   ▼   ┌──────────────┐
   ┌─────────────┐     ┌──────────┴──┐│ LOAN_PAYMENT │
   │    CARD     │     │ TRANSACTION │└──────────────┘
   └─────────────┘     └──────┬──────┘
                              │
                              ▼
                       ┌──────────────┐
                       │   MERCHANT   │
                       └──────────────┘
```

### Volumetria Gerada

* **Clientes (Customers):** 100.000 registros (segmentados em `BASIC`, `STANDARD`, `PREMIUM`)
* **Contas (Accounts):** ~150.000 contas (`CHECKING`, `SAVINGS`)
* **Cartões (Cards):** 120.000 cartões de crédito e débito vinculados
* **Comércios (Merchants):** 10.000 estabelecimentos em diversas categorias
* **Transações (Transactions):** **5.000.000 de eventos** (PIX, TED, DOC, Débito, Crédito, Depósitos, Saques)
* **Empréstimos (Loans):** 30.000 contratos de crédito
* **Parcelas (Loan Payments):** ~740.000 registros de pagamento com controle de atraso e status

---

## 4. A Camada Bronze: Ingestão Inteligente e Particionamento

O primeiro grande desafio em engenharia de dados é: **como carregar 5 milhões de linhas sem estourar a memória RAM da máquina?**

Em vez de carregar dataframes inteiros em memória, a ingestão foi construída utilizando **PyArrow em streaming de batches**.

* **Particionamento Temporal:** Os dados brutos são salvos em formato **Parquet colunar**, particionados automaticamente por `year=YYYY/month=MM`.
* **Benefício:** Redução drástica de I/O em consultas posteriores através do *partition pruning*.

---

## 5. A Camada Silver: Limpeza, Regras de Negócio e Quarentena

A camada Silver é onde a mágica da qualidade dos dados acontece com **Apache Spark**. 

### 🛡️ O Conceito de Quarentena (Dead Letter Queue de Dados)
Em pipelines tradicionais, um registro com chave estrangeira inválida costuma gerar duas abordagens ruins:
1. *Ignorar silenciosamente (Drop):* Perde-se rastreabilidade e histórico de erro.
2. *Quebrar o pipeline (Fail):* Para toda a operação da empresa por causa de 0.01% de dados defeituosos.

No Banking Pipeline, implementamos uma **Camada de Quarentena (`data/quarantine/`)**:

```python
# Exemplo conceitual da validação Silver
df_valid = df_transactions.join(df_accounts, "account_id", "inner")
df_invalid = df_transactions.join(df_accounts, "account_id", "left_anti")

# Dados válidos seguem para a Silver
df_valid.write.mode("overwrite").parquet("data/silver/transactions")

# Dados inconsistentes são isolados para auditoria
df_invalid.write.mode("overwrite").parquet("data/quarantine/transactions")
```

### 🔍 Principais Regras Validadas:
* **Integridade Relacional:** Transações devem pertencer a contas válidas; compras de cartão devem possuir `merchant_id` existente.
* **Regras de Negócio:**
  * Contas poupança (`SAVINGS`) só podem emitir cartões de débito.
  * Cartões de crédito obrigatoriamente possuem limite (`credit_limit > 0`).
  * Valores de transação devem ser estritamente positivos (`amount > 0`).
  * Moeda padronizada (`BRL`).
* **Padronização & Deduplicação:** Normalização de strings, sanitização de campos nulos e garantia de unicidade de Primary Keys.

---

## 6. A Camada Gold: Métricas Analíticas e Visão 360°

Com dados limpos e confiáveis na Silver, o Spark processa e consolida as tabelas de negócio prontas para consumo analítico:

1. **`customer_360`**: Visão unificada do cliente com total de contas, cartões ativos, saldo consolidado, volume transacionado e score de engajamento.
2. **`daily_transaction_summary`**: Agregações diárias por tipo de transação, volumetria total, ticket médio e taxas de aprovação.
3. **`customer_transaction_metrics`**: Comportamento de gastos por cliente (maior transação, média mensal, canais mais utilizados).
4. **`merchant_performance`**: Faturamento, ticket médio e categorização de desempenho dos estabelecimentos credenciados.
5. **`loan_portfolio`**: Saúde da carteira de crédito, inadimplência (*Default Rate*), valor total emprestado vs. valor recuperado.

---

## 7. Modern Lakehouse com Apache Iceberg & MinIO

O armazenamento tradicional em arquivos Parquet soltos possui limitações: falta de suporte a transações ACID concorrentes, lentidão na leitura de partições gigantescas e dificuldade de rollback.

Para evoluir a arquitetura para um **verdadeiro Lakehouse**, integramos o **Apache Iceberg** conectado a um storage compatível com S3 (**MinIO**):

```python
# spark/iceberg/build_iceberg.py
writer = df.writeTo("iceberg.banking.daily_transaction_summary") \
           .using("iceberg") \
           .partitionedBy(days("transaction_date")) \
           .createOrReplace()
```

### ✨ Por que Apache Iceberg?
* **Time Travel & Rollback:** Possibilidade de consultar o estado da tabela em qualquer instante do passado (`AS OF snapshot_id`).
* **Schema Evolution Seguro:** Adição e renomeação de colunas sem corromper dados antigos.
* **Particionamento Oculto (Hidden Partitioning):** Não é necessário criar colunas artificiais de partição nem se preocupar com queries quebradas.
* **Compaction e Otimização de Arquivos:** Manutenção simplificada de arquivos pequenos (*small files problem*).

---

## 8. Transformações Semânticas com dbt & DuckDB

Além dos jobs Spark, o projeto conta com um projeto **dbt (data build tool)** estruturado sob as melhores práticas da indústria:

* **Staging (`models/staging/`):** Tipagem de dados, renomeação de colunas e limpeza inicial.
* **Intermediate (`models/intermediate/`):** Joins e regras intermediárias (ex: `int_customer_transactions.sql`).
* **Marts (`models/marts/`):** Tabelas Fato e Dimensões (ex: `fct_daily_transactions.sql`, `customer_360.sql`).
* **Testes Automatizados:** Testes de `unique`, `not_null`, `relationships` e `accepted_values` declarados em arquivos `.yml`.

---

## 9. Orquestração com Apache Airflow em Docker

Para automatizar a execução de todo o fluxo com tolerância a falhas e observabilidade, criamos uma DAG no **Apache Airflow**:

```
[generate_data] ──> [build_bronze] ──> [build_silver] ──> [silver_qa] ──> [build_gold] ──> [gold_qa] ──> [build_iceberg]
```

### Destaques da Orquestração:
* **Execução Isolada em Contêineres:** O Airflow Worker dispara os jobs dentro do container dedicado do Spark via Docker Socket integration (`spark_exec`).
* **Quality Gates (QA Automático):** Os passos `silver_qa` e `gold_qa` validam volumetrias, desvios e schemas antes de permitir a escrita no Apache Iceberg.
* **Ambiente Completo em Docker Compose:** 7 serviços coordenados (Airflow Webserver/API, Scheduler, Celery Worker, Triggerer, Redis, Postgres, MinIO e Spark).

---

## 10. Principais Desafios de Engenharia & Lições Aprendidas

1. **Otimização de Partições no Spark (`spark.sql.shuffle.partitions`):**
   * Em ambientes locais/containerizados com 4GB de memória de driver, manter o padrão de 200 partições causava overhead excessivo em tabelas pequenas e gargalo de garbage collection. Ajustar para partições dinâmicas e balanceadas foi essencial para manter a pipeline rápida e sem estouro de heap.
2. **Gerenciamento de Metadados Iceberg em S3A:**
   * Configurar a interoperabilidade entre Spark 3.5+, Hadoop-AWS e MinIO sem depender de um catálogo Derby/Hive local exigiu parametrização cuidadosa de credenciais e *in-memory catalog implementation*.
3. **Design Resiliente com Quarentena:**
   * Separar dados inválidos no mesmo passo de gravação da Silver garantiu 100% de confiabilidade na camada Gold sem risco de falhas em cascata.

---

## 11. Conclusão e Próximos Passos

Este projeto demonstra como construir uma arquitetura moderna, escalável e resiliente capaz de lidar com a complexidade e rigor do setor bancário.

### 🚀 Roadmap de Evolução:
- [ ] Ingestão de eventos de transação em tempo real utilizando **Apache Kafka** e **Spark Structured Streaming**.
- [ ] Criação de dashboards de negócio no **Metabase / Looker Studio**.
- [ ] Pipeline de Feature Store para detecção de anomalias e antifraude com **Scikit-learn / XGBoost**.

---

### 💻 Código-fonte
O repositório completo do projeto com scripts, Docker Compose, DAGs do Airflow e modelos dbt está disponível no GitHub:
👉 **[github.com/renanzitoo/bank-data-pipeline](https://github.com/renanzitoo/bank-data-pipeline)**

---

*Gostou do artigo ou tem alguma dúvida sobre a arquitetura? Deixe seu comentário ou conecte-se comigo no LinkedIn!*
export const locales = ['en', 'pt-BR'] as const;

export type Locale = (typeof locales)[number];

export async function getMessages(locale: Locale): Promise<Record<string, string>> {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Error loading messages for locale "${locale}"`, error);
    return {};
  }
}

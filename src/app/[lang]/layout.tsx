// app/[lang]/layout.tsx

import { ReactNode } from "react";
import { NavBar } from "../components/navBar/NavBar";
import { Locale } from "@/lib/i18n";
import "../globals.css";


export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <>
      <NavBar lang={params.lang} />
      <main>{children}</main>
    </>
  );
}

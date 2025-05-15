import { ReactNode } from "react";
import { NavBar } from "../components/navBar/NavBar";
import { Locale } from "@/lib/i18n";
import '../globals.css';
import { Head } from "next/document";



interface Props {
  children: ReactNode;
  params: { lang: Locale };
}

export default function LangLayout({ children, params }: Props) {
  return (
    <>

      <NavBar lang={params.lang}></NavBar>
      <main>{children}</main>
    </>
  );
}

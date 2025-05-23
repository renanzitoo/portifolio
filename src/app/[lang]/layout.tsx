import { ReactNode } from "react";
import { NavBar } from "../components/navBar/NavBar";
import { Locale } from "@/lib/i18n";
import "../globals.css";

export default function LangLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>

      <main>{children}</main>
    </>
  );
}

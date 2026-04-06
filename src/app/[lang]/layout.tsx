import { ReactNode } from "react";
import "../globals.css";

export default function LangLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>{children}</main>
  );
}

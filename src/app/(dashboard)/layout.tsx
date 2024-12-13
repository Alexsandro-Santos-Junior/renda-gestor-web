"use client";

import { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen m-0 overflow-screen">
      {/* Header ocupa o topo inteiro */}
      <header className="fixed w-full h-16 z-10 bg-white">
        <Header />
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar fixa à esquerda abaixo do Header */}
        <aside className="max-h-screen w-48 bg-white shrink-0">
          <Sidebar />
        </aside>

        {/* Conteúdo principal ajustado */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

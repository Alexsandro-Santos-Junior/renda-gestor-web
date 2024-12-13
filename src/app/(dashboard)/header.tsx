"use client";

import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="flex justify-between items-center px-8 fixed top-0 w-full bg-white border-b border-slate-50">
      <div className="text-2xl font-serif">Renda-Gestor</div>

      <UserButton />
    </header>
  );
}

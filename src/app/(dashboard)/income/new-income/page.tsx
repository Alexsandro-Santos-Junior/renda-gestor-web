"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { CreateIncomeForm } from "./form";

export default function NewPageIncome() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/awarded">Premiados</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Novo Premiado</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-2 flex justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Nova renda</h1>
          <h6 className="mt-2 text-muted-foreground">
            Cadastre uma nova fonte de renda no sistema
          </h6>
        </div>
      </div>

      <main className="mt-16">
        <CreateIncomeForm />
      </main>
    </div>
  );
}

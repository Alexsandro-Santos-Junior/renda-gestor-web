"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { CreateExpenseForm } from "./form";

export default function NewPageExpense() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/expense">Despesas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nova Despesa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-2 flex justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Nova despesa</h1>
          <h6 className="mt-2 text-muted-foreground">
            Cadastre uma nova despesa no sistema
          </h6>
        </div>
      </div>

      <main className="mt-16">
        <CreateExpenseForm />
      </main>
    </div>
  );
}

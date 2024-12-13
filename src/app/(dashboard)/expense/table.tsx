"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Expense } from "~/api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface ExpenseTableProps {
  expense: Expense[];
}

export default function ExpenseTable({ expense }: ExpenseTableProps) {
  const [data, setData] = useState<Expense[]>(expense);
  return (
    <div className="mt-0 hidden overflow-auto rounded-lg shadow md:block">
      {data.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Nenhuma renda registrada. Registre sua renda para visualizar seus
          dados.
        </div>
      ) : (
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Despesa</TableHead>
              <TableHead className="text-center">Categoria</TableHead>
              <TableHead className="text-center">Valor</TableHead>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Forma de Pagamento</TableHead>
              <TableHead className="text-center">Recorrência</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
            {data.map((item) => (
              <TableRow className="hover:bg-slate-100">
                <TableCell className="text-center">{item.despesa}</TableCell>
                <TableCell className="text-center">{item.categoria}</TableCell>
                <TableCell className="text-center">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.valor)}
                </TableCell>
                <TableCell className="text-center">
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(item.data))}
                </TableCell>
                <TableCell className="text-center">
                  {item.forma_pagamento}
                </TableCell>
                <TableCell className="text-center">
                  {item.recorrencia}
                </TableCell>

                <TableCell className="flex justify-center gap-2 text-center">
                  <Link href={`/expense/edit-expense/${item.id}`}>
                    <Pencil className="h-4 w-4 text-teal-400 hover:text-black" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
          <TableBody>
            {data.map((item) => {
              console.log(item);
              return (
                <TableRow className="hover:bg-slate-100" key={item.id}>
                  <TableCell className="text-center">{item.despesa}</TableCell>
                  <TableCell className="text-center">
                    {item.categoria}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor)}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(item.data))}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.forma_pagamento}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.recorrencia}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2 text-center">
                    <Link href={`/expense/edit-expense/${item.id}`}>
                      <Pencil className="h-4 w-4 text-teal-400 hover:text-black" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

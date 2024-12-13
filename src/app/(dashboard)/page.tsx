"use client";

import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getExpenseDetails, getIncomeAndExpenses } from "./actions";

export default function Page() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expenseDetails, setExpenseDetails] = useState([]);

  const calculateRemaining = (income: number, expense: number) => {
    return income - expense;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chamando a função para obter os dados de rendas e despesas
        const financialData = await getIncomeAndExpenses();
        const expenseData = await getExpenseDetails();

        // Atualizando os estados com os valores recebidos da API
        setTotalIncome(financialData?.totalIncomeValue || 0);
        setTotalExpense(financialData?.totalExpenseValue || 0);
        setExpenseDetails(expenseData || []);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      } finally {
        setIsLoading(false); // Encerrando o loading após a busca
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date();
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const currentMonthName = monthNames[currentDate.getMonth()];

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6 bg-white px-4">
      <h1 className="text-2xl font-bold text-gray-600">
        Resumo Financeiro de {currentMonthName}
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 p-4 shadow-md bg-green-400">
          <h2 className="text-lg font-semibold text-black">Entradas</h2>
          <p className="flex justify-center gap-1">
            R$
            <span className="font-semi-bold">
              {totalIncome.toFixed(2)}
            </span>{" "}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-4 shadow-md bg-red-400">
          <h2 className="text-lg font-semibold text-gray-700">Saídas</h2>
          <p className="flex justify-center gap-1">
            R$
            <span>- {totalExpense.toFixed(2)}</span>{" "}
          </p>
        </div>

        <div
          className={`rounded-lg border border-gray-200 p-4 shadow-md ${
            calculateRemaining(totalIncome, totalExpense) < 0
              ? "bg-red-400"
              : calculateRemaining(totalIncome, totalExpense) >= 50
              ? "bg-green-400"
              : "bg-yellow-400"
          }`}
        >
          <h2 className="text-lg font-semibold text-gray-700">Sobra</h2>
          <p className="flex justify-center gap-1">
            R$
            <span>
              {calculateRemaining(totalIncome, totalExpense).toFixed(2)}
            </span>
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Investimento</h2>
          <p className="flex justify-center gap-1">
            {calculateRemaining(totalIncome, totalExpense) >= 50 ? (
              <>
                R$
                <span>
                  +{" "}
                  {(
                    calculateRemaining(totalIncome, totalExpense) * 0.2
                  ).toFixed(2)}
                </span>
              </>
            ) : (
              <>
                <span className="text-red-500">Pensar em quitar dívidas</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <Card className="flex-1 rounded-lg border border-gray-200 p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Resumo de Gastos
          </h2>
          <Table className="mt-4 w-full bg-white">
            <TableHeader className="">
              <TableRow>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Item
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Valor
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Data
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Motivo
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseDetails.length > 0 ? (
                expenseDetails.map((expense: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-lg font-medium text-gray-900">
                      <span>{expense.descricao}</span>
                    </TableCell>
                    <TableCell className="text-lg font-medium text-gray-900">
                      <span>{expense.categoria}</span>
                    </TableCell>
                    <TableCell className="text-lg font-medium text-gray-900">
                      <p className="flex justify-center gap-1">
                        R$
                        <span>{expense.valor.toFixed(2)}</span>
                      </p>
                    </TableCell>
                    <TableCell className="text-lg font-medium text-gray-900">
                      <span>{expense.forma_pagamento}</span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Nenhuma despesa encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-end">
            <Button className="hover:bg-brand-dark rounded-lg border border-brand bg-brand px-6 py-3 text-sm font-medium uppercase text-white">
              <a href="/customers">Visualizar</a>
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <Card className="flex-1 rounded-lg border border-gray-200 p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Resumo de Investimento
          </h2>
          <Table className="mt-4 w-full bg-white">
            <TableHeader className="">
              <TableRow>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Tipo
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Valor
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  nOME
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Data
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-lg font-medium text-gray-900">
                  <span>Ação</span>
                </TableCell>
                <TableCell className="text-lg font-medium text-gray-900">
                  <p className="flex justify-center gap-1">
                    R$
                    <span>50,00</span>
                  </p>
                </TableCell>
                <TableCell className="text-lg font-medium text-gray-900">
                  <span>MXRF_11</span>
                </TableCell>
                <TableCell className="text-lg font-medium text-gray-900">
                  <span>25/09/2024</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-end">
            <Button className="hover:bg-brand-dark rounded-lg border border-brand bg-brand px-6 py-3 text-sm font-medium uppercase text-white">
              <a href="/customers">Visualizar</a>
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <Card className="flex-1 rounded-lg border border-gray-200 p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Resumo de Dividas
          </h2>
          <Table className="mt-4 w-full bg-white">
            <TableHeader className="">
              <TableRow>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Tipo
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Valor
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Parcelas
                </TableHead>
                <TableHead className="text-xs font-medium uppercase text-gray-500">
                  Data Final
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-lg font-medium text-gray-900">
                  <span>Cartão</span>
                </TableCell>
                <TableCell className="text-lg font-medium text-gray-900">
                  <p className="flex justify-center gap-1">
                    R$
                    <span>500,00</span>
                  </p>
                </TableCell>
                <TableCell className="text-lg font-medium text-gray-900">
                  <span>19</span>
                </TableCell>
                <TableCell className="text-lg font-medium text-gray-900">
                  <span>17/04/2025</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-end">
            <Button className="hover:bg-brand-dark rounded-lg border border-brand bg-brand px-6 py-3 text-sm font-medium uppercase text-white">
              <a href="/customers">Visualizar</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

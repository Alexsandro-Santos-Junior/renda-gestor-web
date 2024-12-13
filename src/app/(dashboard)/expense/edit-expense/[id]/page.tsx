import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Expense } from "~/api/types";
import { EditExpenseForm } from "./form";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditExpensePage({ params }: PageProps) {
  const expense = await getExpenseById(params.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Editar Despesa</h1>
      <p className="mt-2 text-muted-foreground">
        Atualize as informações da sua despesa abaixo.
      </p>

      <div className="mt-4">
        <EditExpenseForm
          defaultValues={{
            ...expense,
            valor: expense.valor,
            data: expense.data,
            despesa:
              expense.despesa === "MORADIA" ||
              expense.despesa === "CONDOMINIO" ||
              expense.despesa === "ALUGUEL" ||
              expense.despesa === "AGUA" ||
              expense.despesa === "LUZ" ||
              expense.despesa === "GAS" ||
              expense.despesa === "INTERNET" ||
              expense.despesa === "IPTU" ||
              expense.despesa === "PLANO_DE_SAUDE" ||
              expense.despesa === "SEGURO_DE_VIDA" ||
              expense.despesa === "INVESTIMENTO" ||
              expense.despesa === "TARIFAS_BANCARIAS" ||
              expense.despesa === "PLANO_CELULAR" ||
              expense.despesa === "IPVA" ||
              expense.despesa === "SUPERMERCADO" ||
              expense.despesa === "CARTAO_DE_CREDITO" ||
              expense.despesa === "COMBUSTIVEL" ||
              expense.despesa === "FARMACIA" ||
              expense.despesa === "GASTOS_COM_ANIMAIS" ||
              expense.despesa === "IMPREVISTOS" ||
              expense.despesa === "ASSINATURA_VIDEO" ||
              expense.despesa === "ASSINATURA_MUSICA" ||
              expense.despesa === "PADARIA" ||
              expense.despesa === "FEIRA" ||
              expense.despesa === "LAZER" ||
              expense.despesa === "SALAO" ||
              expense.despesa === "CONSULTA_MEDICA" ||
              expense.despesa === "CURSO" ||
              expense.despesa === "DIVERSOS"
                ? expense.despesa
                : undefined,
            descricao: expense.descricao,
            categoria:
              expense.categoria === "ALIMENTACAO" ||
              expense.categoria === "TRANSPORTE" ||
              expense.categoria === "SAUDE" ||
              expense.categoria === "EDUCACAO" ||
              expense.categoria === "LAZER" ||
              expense.categoria === "HABITACAO" ||
              expense.categoria === "CONTAS" ||
              expense.categoria === "VESTUARIO" ||
              expense.categoria === "OUTROS"
                ? expense.categoria
                : undefined,
            forma_pagamento:
              expense.forma_pagamento === "DINHEIRO" ||
              expense.forma_pagamento === "CARTAO_DE_CREDITO" ||
              expense.forma_pagamento === "CARTAO_DE_DEBITO" ||
              expense.forma_pagamento === "TRANSFERENCIA" ||
              expense.forma_pagamento === "PIX" ||
              expense.forma_pagamento === "BOLETO"
                ? expense.forma_pagamento
                : undefined,
            recorrencia:
              expense.recorrencia === "UNICO" ||
              expense.recorrencia === "DIARIO" ||
              expense.recorrencia === "SEMANAL" ||
              expense.recorrencia === "MENSAL" ||
              expense.recorrencia === "TRIMESTRAL" ||
              expense.recorrencia === "ANUAL"
                ? expense.recorrencia
                : undefined,
          }}
        />
      </div>
    </div>
  );
}

async function getExpenseById(id: string): Promise<Expense> {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(`http://localhost:3000/expense/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (
      response.status === 401 ||
      response.status === 402 ||
      response.status === 403
    ) {
      notFound();
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao buscar a renda.");
  }
  const data = await response.json();

  return data;
}

"use server";

import { auth } from "@clerk/nextjs/server";

type FormaPagamento =
  | "DINHEIRO"
  | "CARTAO_DE_CREDITO"
  | "CARTAO_DE_DEBITO"
  | "TRANSFERENCIA"
  | "PIX"
  | "BOLETO";

type Fonte =
  | "SALARIO"
  | "FREELANCE"
  | "INVESTIMENTO"
  | "ALUGUEL"
  | "VENDA"
  | "OUTROS";

type Categoria =
  | "RENDA_PRINCIPAL"
  | "RENDA_SECUNDARIA"
  | "BONUS"
  | "COMISSAO"
  | "ALUGUEL"
  | "JUROS"
  | "VENDA"
  | "OUTROS";

type Recorrencia =
  | "UNICO"
  | "DIARIO"
  | "SEMANAL"
  | "MENSAL"
  | "TRIMESTRAL"
  | "ANUAL";

type UpdateIncomeRequest = {
  params: {
    id: string;
  };
  body: {
    valor?: number;
    data?: Date;
    fonte?: Fonte;
    categoria?: Categoria;
    forma_pagamento?: FormaPagamento;
    recorrencia?: Recorrencia;
  };
};

export async function updateIncome(request: UpdateIncomeRequest) {
  const { getToken } = auth();
  const token = await getToken();
  //console.log(`esse e o token do actions`, token);
  const response = await fetch(
    `http://localhost:3000/income/${request.params.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request.body),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar o cliente.");
  }
}

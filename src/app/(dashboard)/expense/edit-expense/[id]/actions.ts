"use server";

import { auth } from "@clerk/nextjs/server";

type FormaPagamento =
  | "DINHEIRO"
  | "CARTAO_DE_CREDITO"
  | "CARTAO_DE_DEBITO"
  | "TRANSFERENCIA"
  | "PIX"
  | "BOLETO";

type Categoria =
  | "ALIMENTACAO"
  | "TRANSPORTE"
  | "SAUDE"
  | "EDUCACAO"
  | "LAZER"
  | "HABITACAO"
  | "CONTAS"
  | "VESTUARIO"
  | "OUTROS";

type Recorrencia =
  | "UNICO"
  | "DIARIO"
  | "SEMANAL"
  | "MENSAL"
  | "TRIMESTRAL"
  | "ANUAL";

type Despesa =
  | "MORADIA"
  | "CONDOMINIO"
  | "ALUGUEL"
  | "SUPERMERCADO"
  | "AGUA"
  | "LUZ"
  | "GAS"
  | "INTERNET"
  | "IPTU"
  | "PLANO_DE_SAUDE"
  | "SEGURO_DE_VIDA"
  | "INVESTIMENTO"
  | "CARTAO_DE_CREDITO"
  | "COMBUSTIVEL"
  | "FARMACIA"
  | "GASTOS_COM_ANIMAIS"
  | "IMPREVISTOS"
  | "ASSINATURA_VIDEO"
  | "ASSINATURA_MUSICA"
  | "PADARIA"
  | "FEIRA"
  | "LAZER"
  | "SALAO"
  | "TARIFAS_BANCARIAS"
  | "PLANO_CELULAR"
  | "IPVA"
  | "CONSULTA_MEDICA"
  | "CURSO"
  | "DIVERSOS";

type UpdateExpenseRequest = {
  params: {
    id: string;
  };
  body: {
    valor?: number;
    data?: Date;
    despesa?: Despesa;
    descricao?: string;
    categoria?: Categoria;
    forma_pagamento?: FormaPagamento;
    recorrencia?: Recorrencia;
  };
};

export async function updateExpense(data: UpdateExpenseRequest) {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(
    `http://localhost:3000/expense/${data.params.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data.body),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar a despesa.");
  }
}

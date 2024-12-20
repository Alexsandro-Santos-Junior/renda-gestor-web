"use server";

import { auth } from "@clerk/nextjs/server";

export type CreateExpenseFixedRequest = {
  valor: number;
  data: Date;
  descricao: string;
  despesa: string;
  categoria: string;
  forma_pagamento: string;
  recorrencia: string;
};

export async function createExpenseFixed(data: CreateExpenseFixedRequest) {
  const { getToken, userId } = auth();
  const token = await getToken();

  const formattedData = {
    ...data,
    data: data.data.toISOString().split("T")[0],
  };

  if (
    !formattedData.valor ||
    !formattedData.descricao ||
    !formattedData.categoria ||
    !formattedData.despesa ||
    !formattedData.forma_pagamento ||
    !formattedData.recorrencia
  ) {
    console.error(
      "Um ou mais campos obrigatórios estão ausentes:",
      formattedData
    );
    throw new Error("Campos obrigatórios estão ausentes");
  }
  const response = await fetch("http://localhost:3000/expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...formattedData, userId }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao criar nova fonte de despesa" }));
    console.error("Erro na resposta da API:", errorData);
    throw new Error(errorData.message);
  }
}

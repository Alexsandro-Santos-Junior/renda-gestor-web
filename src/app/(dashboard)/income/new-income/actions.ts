"use server";

import { auth } from "@clerk/nextjs/server";

export type CreateIncomeRequest = {
  valor: number;
  data: Date;
  fonte: string;
  categoria: string;
  forma_pagamento: string;
  recorrencia: string;
};

export async function createIncome(data: CreateIncomeRequest) {
  const { getToken, userId } = auth();
  const token = await getToken();

  const formattedData = {
    ...data,
    data: data.data.toISOString().split("T")[0],
  };

  if (
    !formattedData.valor ||
    !formattedData.data ||
    !formattedData.fonte ||
    !formattedData.categoria ||
    !formattedData.forma_pagamento ||
    !formattedData.recorrencia
  ) {
    console.error(
      "Um ou mais campos obrigatórios estão ausentes:",
      formattedData
    );
    throw new Error("Campos obrigatórios estão ausentes");
  }

  const response = await fetch("http://localhost:3000/income", {
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
      .catch(() => ({ message: "Erro ao criar nova fonte de renda" }));
    console.error("Erro na resposta da API:", errorData);
    throw new Error(errorData.message);
  }

  // const result = await response.json();

  // return result;
}

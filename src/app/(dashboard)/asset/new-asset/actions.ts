"use server";

import { auth } from "@clerk/nextjs/server";

export type CreateAssetRequest = {
  userId: string;
  tipo: string;
  valor_estimado: number;
  data_aquisicao: Date;
  descricao: string;
};

export async function createAsset(data: CreateAssetRequest) {
  console.log("Iniciando createRenda com os dados:", data);
  const { getToken } = auth();
  const token = await getToken();

  console.log("Token obtido:", token);
  const response = await fetch("http://localhost:3000/asset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao criar nova fonte de renda" }));
    console.error("Erro na resposta da API:", errorData);
    throw new Error(errorData.message);
  }

  const result = await response.json();
  console.log("Resposta da API:", result);
  return result;
}

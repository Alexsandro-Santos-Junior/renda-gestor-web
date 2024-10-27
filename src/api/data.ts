"use server";

import { Asset, Expense, Income } from "./types";
import { auth } from "@clerk/nextjs/server";

export async function getIncome(): Promise<Income[]> {
  const { getToken } = auth();
  const token = await getToken();
  // console.log("Token obtido:", token);
  try {
    const response = await fetch("http://localhost:3000/income", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao buscar as rendas:", errorData.message);
      throw new Error(errorData.message || "Erro ao buscar as rendas.");
    }

    const income = await response.json();
    return income;
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    throw new Error("Erro ao obter os dados");
  }
}

export async function getExpense(): Promise<Expense[]> {
  const { getToken } = auth();
  const token = await getToken();
  console.log("Token obtido:", token);

  try {
    const response = await fetch("http://localhost:3000/expense", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao buscar as despesas:", errorData.message);
      throw new Error(errorData.message || "Erro ao buscar as despesas.");
    }

    const expense = await response.json();
    return expense;
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    throw new Error("Erro ao obter os dados");
  }
}

export async function getAsset(): Promise<Asset[]> {
  const { getToken } = auth();
  const token = await getToken();
  console.log("Token obtido:", token);

  try {
    const response = await fetch("http://localhost:3000/asset", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao buscar os patrimonios:", errorData.message);
      throw new Error(errorData.message || "Erro ao buscar os patrimonios.");
    }

    const asset = await response.json();
    return asset;
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    throw new Error("Erro ao obter os dados");
  }
}

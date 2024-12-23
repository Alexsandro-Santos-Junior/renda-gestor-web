"use server";

import { Asset, Expense, Income } from "./types";
import { auth } from "@clerk/nextjs/server";

export async function getIncome(): Promise<Income[]> {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/income`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Erro ao buscar as rendas.");
    }

    const income = await response.json();
    return income;
  } catch (error) {
    throw new Error("Erro ao obter os dados");
  }
}

export async function getExpense(): Promise<Expense[]> {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/expense`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Erro ao buscar as despesas.");
    }

    const expense = await response.json();
    return expense;
  } catch (error) {
    throw new Error("Erro ao obter os dados");
  }
}

export async function getAsset(): Promise<Asset[]> {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/asset`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Erro ao buscar os patrimonios.");
    }

    const asset = await response.json();
    return asset;
  } catch (error) {
    throw new Error("Erro ao obter os dados");
  }
}

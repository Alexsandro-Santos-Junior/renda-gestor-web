"use server";

import { auth } from "@clerk/nextjs/server";

export async function getIncomeAndExpenses() {
  const { getToken } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      "http://localhost:3000/dashboard/incomes-expenses",
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
      if (response.status === 401) {
        throw new Error("Unauthorized - faça o login novamente.");
      } else if (response.status === 404) {
        throw new Error("Pedido não encontrado.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Algo está errado...");
      }
    }

    const responseJson = await response.json();

    const {
      totalIncomeValue,
      totalIncomesCount,
      totalExpenseValue,
      totalExpensesCount,
      balance,
    } = responseJson.data;

    return {
      totalIncomeValue,
      totalIncomesCount,
      totalExpenseValue,
      totalExpensesCount,
      balance,
    };
  } catch (error) {
    console.error("Erro ao conectar ao servidor:", error);
    throw error;
  }
}

export async function getExpenseDetails() {
  const { getToken, userId } = auth();
  const token = await getToken();

  try {
    const response = await fetch(
      `http://localhost:3000/dashboard/expenses-details/${userId}`,
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
      if (response.status === 401) {
        throw new Error("Unauthorized - faça o login novamente.");
      } else if (response.status === 404) {
        throw new Error("Pedido não encontrado.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Algo está errado...");
      }
    }

    const responseJson = await response.json();
    const expenseDetails = responseJson.data;

    return expenseDetails;
  } catch (error) {
    throw error;
  }
}

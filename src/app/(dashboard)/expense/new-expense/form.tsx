"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SaveExpenseForm, SaveExpenseFormSchema } from "~/forms/save-expense";
import { useToast } from "~/hooks/use-toast";
import { createExpense } from "./actions";

export function CreateExpenseForm() {
  const { toast } = useToast();
  const router = useRouter();

  const createExpenseMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      toast({
        description: "Nova despesa registrada com sucesso.",
      });
      router.push("/expense");
    },
    onError: (error) => {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });

  async function handleSaveExpense(data: SaveExpenseFormSchema) {
    //console.log("Dados do formulário:", data);
    await createExpenseMutation.mutateAsync({
      valor: data.valor,
      data: data.data,
      descricao: data.descricao,
      despesa: data.despesa,
      categoria: data.categoria,
      forma_pagamento: data.forma_pagamento,
      recorrencia: data.recorrencia,
    });
  }

  return (
    <SaveExpenseForm
      action={handleSaveExpense}
      defaultValues={{
        valor: 100,
        data: new Date(),
        descricao: "",
        despesa: "AGUA",
        categoria: "CONTAS",
        forma_pagamento: "BOLETO",
        recorrencia: "ANUAL",
      }}
    />
  );
}

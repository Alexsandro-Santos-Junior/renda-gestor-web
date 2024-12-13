"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";
import { createExpenseFixed } from "./actions";
import { SaveExpenseFormSchema } from "~/forms/save-expense/config";
import { SaveExpenseForm } from "~/forms/save-expense";

export function CreateExpenseForm() {
  const { toast } = useToast();
  const router = useRouter();

  const createExpenseMutation = useMutation({
    mutationFn: createExpenseFixed,
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

  async function handleSaveExpenseFixed(data: SaveExpenseFormSchema) {
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
      action={handleSaveExpenseFixed}
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

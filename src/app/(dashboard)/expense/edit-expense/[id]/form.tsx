"use client";

import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { useToast } from "~/hooks/use-toast";
import { updateExpense } from "./actions";
import { SaveExpenseFormSchema } from "~/forms/save-expense/config";
import { SaveExpenseForm } from "~/forms/save-expense";

interface EditExpenseFormProps {
  defaultValues?: Partial<SaveExpenseFormSchema>;
}

export function EditExpenseForm({ defaultValues }: EditExpenseFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { id } = useParams();

  const updateExpenseMutation = useMutation({
    mutationFn: updateExpense,
  });

  async function handleSubmit({ ...data }: SaveExpenseFormSchema) {
    await updateExpenseMutation.mutateAsync(
      {
        params: {
          id: String(id),
        },
        body: {
          categoria: data.categoria,
          despesa: data.despesa,
          descricao: data.descricao,
          data: data.data,
          forma_pagamento: data.forma_pagamento,
          recorrencia: data.recorrencia,
          valor: data.valor,
        },
      },
      {
        onSuccess() {
          toast({
            description: "Renda atualizada com sucesso.",
          });
          router.push("/income");
        },
        onError() {
          toast({
            description: "Erro ao atualizar a renda.",
            variant: "destructive",
          });
        },
      }
    );
  }
  console.log("ID recebido no useParams:", id);
  return (
    <SaveExpenseForm action={handleSubmit} defaultValues={defaultValues} />
  );
}

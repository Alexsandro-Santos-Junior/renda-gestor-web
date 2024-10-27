"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SaveIncomeForm, SaveIncomeFormSchema } from "~/forms/save-income";
import { useToast } from "~/hooks/use-toast";
import { createIncome } from "./actions";

export function CreateIncomeForm() {
  const { toast } = useToast();
  const router = useRouter();
  const createIncomeMutation = useMutation({
    mutationFn: createIncome,
    onSuccess: () => {
      toast({
        description: "Nova renda registrada com sucesso.",
      });
      router.push("/income");
    },
    onError: (error) => {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });

  async function handleSaveIncome(data: SaveIncomeFormSchema) {
    //console.log("Dados do formulário:", data);
    await createIncomeMutation.mutateAsync({
      fonte: data.fonte,
      data: data.data,
      categoria: data.categoria,
      valor: data.valor,
      forma_pagamento: data.forma_pagamento,
      recorrencia: data.recorrencia,
    });
  }

  return (
    <SaveIncomeForm
      action={handleSaveIncome}
      defaultValues={{
        fonte: "ALUGUEL",
        data: new Date(),
        categoria: "BONUS",
        valor: 100,
        forma_pagamento: "BOLETO",
        recorrencia: "ANUAL",
      }}
    />
  );
}

"use client";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SaveIncomeForm, SaveIncomeFormSchema } from "~/forms/save-income";
import { useToast } from "~/hooks/use-toast";
import { updateIncome } from "./actions";

interface EditIncomeFormProps {
  defaultValues?: Partial<SaveIncomeFormSchema>;
}

export function EditIncomeForm({ defaultValues }: EditIncomeFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { id } = useParams();

  const updateIncomeMutation = useMutation({
    mutationFn: updateIncome,
  });

  async function handleSubmit({ ...data }: SaveIncomeFormSchema) {
    await updateIncomeMutation.mutateAsync(
      {
        params: {
          id: String(id),
        },
        body: {
          categoria: data.categoria,
          fonte: data.fonte,
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
  //console.log("ID recebido no useParams:", id);
  return <SaveIncomeForm action={handleSubmit} defaultValues={defaultValues} />;
}

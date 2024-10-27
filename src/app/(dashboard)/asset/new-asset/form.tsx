"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useToast } from "~/hooks/use-toast";
import { createAsset } from "./actions";
import { SaveAssetForm, SaveAssetFormSchema } from "~/forms/save-asset";

export function CreateAssetForm() {
  const { toast } = useToast();
  const router = useRouter();
  const createAssetMutation = useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      toast({
        description: "Nova renda registrada com sucesso.",
      });
      router.push("/asset");
    },
    onError: (error) => {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });

  async function handleSaveAsset(data: SaveAssetFormSchema) {
    //console.log("Dados do formulário:", data);
    await createAssetMutation.mutateAsync({
      userId: data.userId,
      tipo: data.tipo,
      valor_estimado: data.valor_estimado,
      data_aquisicao: data.data_aquisicao,
      descricao: data.descricao,
    });
  }

  return (
    <SaveAssetForm
      action={handleSaveAsset}
      defaultValues={{
        userId: "",
        tipo: "CASA",
        valor_estimado: 1,
        data_aquisicao: new Date(),
        descricao: "",
      }}
    />
  );
}

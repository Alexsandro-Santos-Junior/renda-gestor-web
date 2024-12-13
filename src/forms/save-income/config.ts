import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  data: z.date(),
  valor: z.coerce.number().min(1, "Digite o valor recebido por esta fonte"),
  fonte: z.enum([
    "SALARIO",
    "FREELANCE",
    "INVESTIMENTO",
    "ALUGUEL",
    "VENDA",
    "OUTROS",
  ]),
  categoria: z.enum([
    "RENDA_PRINCIPAL",
    "RENDA_SECUNDARIA",
    "ALUGUEL",
    "COMISSAO",
    "JUROS",
    "BONUS",
    "VENDA",
    "OUTROS",
  ]),
  forma_pagamento: z.enum([
    "DINHEIRO",
    "CARTAO_DE_CREDITO",
    "CARTAO_DE_DEBITO",
    "TRANSFERENCIA",
    "PIX",
    "BOLETO",
  ]),
  recorrencia: z.enum([
    "UNICO",
    "DIARIO",
    "SEMANAL",
    "MENSAL",
    "TRIMESTRAL",
    "ANUAL",
  ]),
});

export type SaveIncomeFormSchema = z.infer<typeof schema>;

export function useSaveIncomeForm(defaultValues: SaveIncomeFormSchema) {
  return useForm<SaveIncomeFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}

export type UseSaveIncomeForm = ReturnType<typeof useSaveIncomeForm>;

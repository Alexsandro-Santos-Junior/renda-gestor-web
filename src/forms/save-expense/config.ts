import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  // data: z
  //   .string()
  //   .min(1, "Campo obrigatório")
  //   .date("O valor deve ser uma data"),
  data: z.date(),
  descricao: z.string(),
  valor: z.preprocess(
    (value) => String(value).replaceAll(",", "."),
    z.coerce
      .number({
        required_error: "Campo obrigatório",
        invalid_type_error: "Insira um valor numérico",
      })
      .min(0.01, "Insira um valor maior que zero")
  ),
  despesa: z.enum([
    "MORADIA",
    "CONDOMINIO",
    "ALUGUEL",
    "SUPERMERCADO",
    "AGUA",
    "LUZ",
    "GAS",
    "INTERNET",
    "IPTU",
    "PLANO_DE_SAUDE",
    "SEGURO_DE_VIDA",
    "INVESTIMENTO",
    "CARTAO_DE_CREDITO",
    "COMBUSTIVEL",
    "FARMACIA",
    "GASTOS_COM_ANIMAIS",
    "IMPREVISTOS",
    "ASSINATURA_VIDEO",
    "ASSINATURA_MUSICA",
    "PADARIA",
    "FEIRA",
    "LAZER",
    "SALAO",
    "TARIFAS_BANCARIAS",
    "PLANO_CELULAR",
    "IPVA",
    "CONSULTA_MEDICA",
    "CURSO",
    "DIVERSOS",
  ]),
  categoria: z.enum([
    "ALIMENTACAO",
    "TRANSPORTE",
    "SAUDE",
    "EDUCACAO",
    "LAZER",
    "HABITACAO",
    "CONTAS",
    "VESTUARIO",
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

export type SaveExpenseFormSchema = z.infer<typeof schema>;

export function useSaveExpenseForm(defaultValues: SaveExpenseFormSchema) {
  return useForm<SaveExpenseFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}

export type UseSaveExpenseForm = ReturnType<typeof useSaveExpenseForm>;

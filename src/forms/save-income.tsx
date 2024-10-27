"use client";

import { z } from "zod";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useForm } from "react-hook-form";
import Link from "next/link";

const schema = z.object({
  data: z.date(),
  valor: z.coerce.number().min(1, "Digite o valor recebido por esta fonte"),
  fonte: z.enum(["SALARIO", "FREELANCE", "INVESTIMENTO", "ALUGUEL", "OUTROS"]),
  categoria: z.enum([
    "RENDA_PRINCIPAL",
    "RENDA_SECUNDARIA",
    "ALUGUEL",
    "COMISSAO",
    "JUROS",
    "BONUS",
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

function formatCurrency(value: any) {
  if (!value) return "";
  const number = parseInt(value, 10);
  return number
    ? (number / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "";
}

export function SaveIncomeForm({
  action,
  defaultValues,
}: {
  action: (data: SaveIncomeFormSchema) => Promise<void>;
  defaultValues?: Partial<SaveIncomeFormSchema>;
}) {
  const form = useForm<SaveIncomeFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div className="flex ">
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(async (data) => {
            const valorEmNumero = Number(data.valor) / 100;
            data.valor = valorEmNumero;
            await action(data);
          })}
          className="w-full max-w-screen-2xl space-y-6"
        >
          <fieldset className="group" disabled={form.formState.isSubmitting}>
            <div className="group-disabled:opacity-50">
              <div className="py-8">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">
                      Selecione uma forma de renda
                    </span>
                    <p className="text-sm text-slate-500">
                      Corresponde às informações selecionadas
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="grid gap-8 lg:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fonte"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fonte</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="ALUGUEL">
                                    ALUGUEL
                                  </SelectItem>
                                  <SelectItem value="FREELANCE">
                                    FREELANCE
                                  </SelectItem>
                                  <SelectItem value="INVESTIMENTO">
                                    INVESTIMENTO
                                  </SelectItem>
                                  <SelectItem value="SALARIO">
                                    SALÁRIO
                                  </SelectItem>
                                  <SelectItem value="OUTROS">OUTROS</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="categoria"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="ALUGUEL">
                                    ALUGUEL
                                  </SelectItem>
                                  <SelectItem value="BONUS">BÔNUS</SelectItem>
                                  <SelectItem value="COMISSAO">
                                    COMISSÃO
                                  </SelectItem>
                                  <SelectItem value="JUROS">JUROS</SelectItem>
                                  <SelectItem value="RENDA_PRINCIPAL">
                                    RENDA PRINCIPAL
                                  </SelectItem>
                                  <SelectItem value="RENDA_SECUNDARIA">
                                    RENDA SECUNDÁRIA
                                  </SelectItem>
                                  <SelectItem value="OUTROS">OUTROS</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="valor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Digite o valor"
                                className="w-full"
                                value={formatCurrency(field.value)}
                                onChange={(e) => {
                                  const unformattedValue =
                                    e.target.value.replace(/\D/g, "");
                                  field.onChange(unformattedValue);
                                }}
                                onBlur={() => {
                                  field.onBlur();
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-8">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Forma de Pagamento</span>
                    <p className="text-sm text-slate-500">
                      Selecione a forma de pagamento
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="grid gap-8 lg:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="forma_pagamento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Forma de Pagamento</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="BOLETO">BOLETO</SelectItem>
                                  <SelectItem value="CARTAO_DE_CREDITO">
                                    CARTÃO DE CRÉDITO
                                  </SelectItem>
                                  <SelectItem value="CARTAO_DE_DEBITO">
                                    CARTÃO DE DÉBITO
                                  </SelectItem>
                                  <SelectItem value="DINHEIRO">
                                    DINHEIRO
                                  </SelectItem>
                                  <SelectItem value="PIX">PIX</SelectItem>
                                  <SelectItem value="TRANSFERENCIA">
                                    TRANSFERÊNCIA
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="recorrencia"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recorrência</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="UNICO">ÚNICO</SelectItem>
                                  <SelectItem value="MENSAL">MENSAL</SelectItem>
                                  <SelectItem value="TRIMESTRAL">
                                    TRIMESTRAL
                                  </SelectItem>
                                  <SelectItem value="ANUAL">ANUAL</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="data"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data</FormLabel>
                            <FormControl>
                              <input
                                type="date"
                                value={
                                  field.value instanceof Date &&
                                  !isNaN(field.value.getTime())
                                    ? field.value.toISOString().split("T")[0]
                                    : ""
                                }
                                onChange={(e) =>
                                  field.onChange(new Date(e.target.value))
                                }
                                placeholder="Selecione uma data"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="flex justify-end gap-2">
                  <Link
                    href="/income"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Voltar
                  </Link>
                  <Button type="submit">Salvar</Button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}

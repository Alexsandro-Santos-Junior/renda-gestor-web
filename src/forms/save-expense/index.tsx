"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Link from "next/link";
import { SaveExpenseFormSchema, useSaveExpenseForm } from "./config";

export function SaveExpenseForm({
  action,
  defaultValues,
}: {
  action: (data: SaveExpenseFormSchema) => Promise<void>;
  defaultValues?: Partial<SaveExpenseFormSchema>;
}) {
  const form = useSaveExpenseForm(defaultValues as SaveExpenseFormSchema);

  return (
    <div className="flex max-w-screen-md px-2 mb-2">
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
              <div className="divide-y divide-slate-50">
                <div className="pb-8">
                  <div className="grid grid-cols-3 gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">
                        Selecione uma forma de despesa
                      </span>
                      <p className="text-sm text-slate-500">
                        Caso não tenha a despesa utilize 'diversos' e coloque o
                        nome no campo descrição
                      </p>
                    </div>

                    <div className="col-span-2">
                      <div className="grid gap-8 lg:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="despesa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Despesa</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white">
                                    <SelectItem value="AGUA">ÁGUA</SelectItem>
                                    <SelectItem value="ALUGUEL">
                                      ALUGUEL
                                    </SelectItem>
                                    <SelectItem value="ASSINATURA_MUSICA">
                                      ASSINATURA DE MÚSICA
                                    </SelectItem>
                                    <SelectItem value="ASSINATURA_VIDEO">
                                      ASSINATURA DE VÍDEO
                                    </SelectItem>
                                    <SelectItem value="CARTAO_DE_CREDITO">
                                      CARTÃO DE CRÉDITO
                                    </SelectItem>
                                    <SelectItem value="COMBUSTIVEL">
                                      COMBUSTÍVEL
                                    </SelectItem>
                                    <SelectItem value="CONDominio">
                                      CONDOMÍNIO
                                    </SelectItem>
                                    <SelectItem value="CONSULTA_MEDICA">
                                      CONSULTA MÉDICA
                                    </SelectItem>
                                    <SelectItem value="CURSO">CURSO</SelectItem>
                                    <SelectItem value="DIVERSOS">
                                      DIVERSOS
                                    </SelectItem>
                                    <SelectItem value="FARMACIA">
                                      FARMÁCIA
                                    </SelectItem>
                                    <SelectItem value="FEIRA">FEIRA</SelectItem>
                                    <SelectItem value="GAS">GÁS</SelectItem>
                                    <SelectItem value="GASTOS_COM_ANIMAIS">
                                      GASTOS COM ANIMAIS
                                    </SelectItem>
                                    <SelectItem value="IMPREVISTOS">
                                      IMPREVISTOS
                                    </SelectItem>
                                    <SelectItem value="INTERNET">
                                      INTERNET
                                    </SelectItem>
                                    <SelectItem value="INVESTIMENTO">
                                      INVESTIMENTO
                                    </SelectItem>
                                    <SelectItem value="IPTU">IPTU</SelectItem>
                                    <SelectItem value="IPVA">IPVA</SelectItem>
                                    <SelectItem value="LAZER">LAZER</SelectItem>
                                    <SelectItem value="LUZ">LUZ</SelectItem>
                                    <SelectItem value="MORADIA">
                                      MORADIA
                                    </SelectItem>
                                    <SelectItem value="PADARIA">
                                      PADARIA
                                    </SelectItem>
                                    <SelectItem value="PLANO_CELULAR">
                                      PLANO DE CELULAR
                                    </SelectItem>
                                    <SelectItem value="PLANO_DE_SAUDE">
                                      PLANO DE SAÚDE
                                    </SelectItem>
                                    <SelectItem value="SALAO">SALÃO</SelectItem>
                                    <SelectItem value="SEGURO_DE_VIDA">
                                      SEGURO DE VIDA
                                    </SelectItem>
                                    <SelectItem value="SUPERMERCADO">
                                      SUPERMERCADO
                                    </SelectItem>
                                    <SelectItem value="TARIFAS_BANCARIAS">
                                      TARIFAS BANCÁRIAS
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
                                    <SelectItem value="ALIMENTACAO">
                                      ALIMENTAÇÃO
                                    </SelectItem>
                                    <SelectItem value="CONTAS">
                                      CONTAS
                                    </SelectItem>
                                    <SelectItem value="EDUCACAO">
                                      EDUCAÇÃO
                                    </SelectItem>
                                    <SelectItem value="HABITACAO">
                                      HABITAÇÃO
                                    </SelectItem>
                                    <SelectItem value="LAZER">LAZER</SelectItem>
                                    <SelectItem value="SAUDE">SAÚDE</SelectItem>
                                    <SelectItem value="TRANSPORTE">
                                      TRANSPORTE
                                    </SelectItem>
                                    <SelectItem value="VESTUARIO">
                                      VESTUÁRIO
                                    </SelectItem>

                                    <SelectItem value="OUTROS">
                                      OUTROS
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
                          name="valor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Digite o valor (R$)</FormLabel>
                              <FormControl>
                                <Input type="text" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
                              <Input
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

              <div className="py-8">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Descrição</span>
                    <p className="text-sm text-slate-500">
                      Digite uma breve descrição da despesa (até 140 caracteres)
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="grid gap-8 lg:grid-cols-1">
                      <FormField
                        control={form.control}
                        name="descricao"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <textarea
                                {...field}
                                placeholder="Digite a descrição"
                                maxLength={140}
                                className="w-full p-2 border border-gray-300 rounded-md resize-none h-32"
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
                    href="/expense"
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

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
  userId: z.string(),
  tipo: z.enum([
    "CASA",
    "CARRO",
    "MOTO",
    "COMPUTADOR",
    "TERRENO",
    "JOIA",
    "ACOES",
    "OUTROS",
  ]),
  valor_estimado: z.coerce
    .number()
    .min(1, "Digite o valor recebido por esta fonte"),
  data_aquisicao: z.date(),
  descricao: z.string(),
});

export type SaveAssetFormSchema = z.infer<typeof schema>;

export function SaveAssetForm({
  action,
  defaultValues,
}: {
  action: (data: SaveAssetFormSchema) => Promise<void>;
  defaultValues?: Partial<SaveAssetFormSchema>;
}) {
  const form = useForm<SaveAssetFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div className="flex px-12">
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(action)}
          className="w-full max-w-screen-2xl space-y-6"
        >
          <fieldset className="group" disabled={form.formState.isSubmitting}>
            <div className="group-disabled:opacity-50">
              <div className="py-8">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">
                      Selecione uma forma de patrimonio
                    </span>
                    <p className="text-sm text-slate-500">
                      Corresponde às informações selecionadas
                    </p>
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="tipo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>tipo</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CASA">CASA</SelectItem>
                                <SelectItem value="CARRO">CARRO</SelectItem>
                                <SelectItem value="MOTO">MOTO</SelectItem>
                                <SelectItem value="COMPUTADOR">
                                  COMPUTADOR
                                </SelectItem>
                                <SelectItem value="TERRENO">TERRENO</SelectItem>
                                <SelectItem value="JOIA">JOIA</SelectItem>
                                <SelectItem value="ACOES">AÇÕES</SelectItem>
                                <SelectItem value="OUTROS">OUTROS</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="py-8">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Data de Compra</span>
                    <p className="text-sm text-slate-500">
                      Selecione a data de aquisição
                    </p>
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="data_aquisicao"
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="py-8">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Valor </span>
                    <p className="text-sm text-slate-500">
                      Digite o valor da renda
                    </p>
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="valor_estimado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>valor estimado</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite o valor"
                              className="w-full"
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="flex justify-end gap-2">
                  <Link
                    href="/asset"
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

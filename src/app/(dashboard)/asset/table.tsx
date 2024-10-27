"use client";

import { useState } from "react";
import { Asset } from "~/api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface AssetTableProps {
  asset: Asset[];
}

export default function AssetTable({ asset }: AssetTableProps) {
  const [data, setData] = useState<Asset[]>(asset);
  return (
    <>
      <div className="mt-0 hidden overflow-auto rounded-lg shadow md:block">
        {data.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Nenhuma renda registrada. Registre sua renda para visualizar seus
            dados.
          </div>
        ) : (
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Item</TableHead>
                <TableHead className="text-center">Categoria</TableHead>
                <TableHead className="text-center">Valor de mercado</TableHead>
                <TableHead className="text-center">
                  Valor de aquisição
                </TableHead>
                <TableHead className="text-center">Valorização</TableHead>
                <TableHead className="text-center">Ano de compra</TableHead>
                <TableHead className="text-center">Localização</TableHead>
                <TableHead className="text-center">Situação</TableHead>
                <TableHead className="text-center">Financiamento</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow className="hover:bg-slate-100">
                  <TableCell className="text-center">{item.tipo}</TableCell>
                  <TableCell className="text-center">
                    {item.descricao}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor_estimado)}
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor_estimado)}
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor_estimado)}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(item.data_aquisicao))}
                  </TableCell>
                  <TableCell className="text-center">Matão</TableCell>
                  <TableCell className="text-center">Quitada</TableCell>
                  <TableCell className="text-center">Não</TableCell>
                  <TableCell className="text-center">Editar</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}

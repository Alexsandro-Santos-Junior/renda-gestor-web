import { Income } from "~/api/types";
import { EditIncomeForm } from "./form";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditIncomePage({ params }: PageProps) {
  const income = await getIncomeById(params.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Editar Renda</h1>
      <p className="mt-2 text-muted-foreground">
        Atualize as informações da sua renda abaixo.
      </p>

      <div className="mt-4">
        <EditIncomeForm
          defaultValues={{
            ...income,
            valor: income.valor,
            data: income.data,
            fonte:
              income.fonte === "SALARIO" ||
              income.fonte === "FREELANCE" ||
              income.fonte === "INVESTIMENTO" ||
              income.fonte === "ALUGUEL" ||
              income.fonte === "OUTROS"
                ? income.fonte
                : undefined,
            categoria:
              income.categoria === "RENDA_PRINCIPAL" ||
              income.categoria === "RENDA_SECUNDARIA" ||
              income.categoria === "BONUS" ||
              income.categoria === "COMISSAO" ||
              income.categoria === "ALUGUEL" ||
              income.categoria === "JUROS" ||
              income.categoria === "OUTROS"
                ? income.categoria
                : undefined,
            forma_pagamento:
              income.forma_pagamento === "DINHEIRO" ||
              income.forma_pagamento === "CARTAO_DE_CREDITO" ||
              income.forma_pagamento === "CARTAO_DE_DEBITO" ||
              income.forma_pagamento === "TRANSFERENCIA" ||
              income.forma_pagamento === "PIX" ||
              income.forma_pagamento === "BOLETO"
                ? income.forma_pagamento
                : undefined,
            recorrencia:
              income.recorrencia === "UNICO" ||
              income.recorrencia === "DIARIO" ||
              income.recorrencia === "SEMANAL" ||
              income.recorrencia === "MENSAL" ||
              income.recorrencia === "TRIMESTRAL" ||
              income.recorrencia === "ANUAL"
                ? income.recorrencia
                : undefined,
          }}
        />
      </div>
    </div>
  );
}

async function getIncomeById(id: string): Promise<Income> {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(`http://localhost:3000/income/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (
      response.status === 401 ||
      response.status === 402 ||
      response.status === 403
    ) {
      notFound();
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao buscar a renda.");
  }
  const data = await response.json();
  //console.log(data);
  return data;
}

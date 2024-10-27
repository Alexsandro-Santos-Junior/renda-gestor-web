"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { CreateAssetForm } from "./form";

export default function NewPageAsset() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/asset">Patrimonio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Novo patrimonio</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-2 flex justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Novo patrimonio</h1>
          <h6 className="mt-2 text-muted-foreground">
            Cadastre um novo patrimonio no sistema
          </h6>
        </div>
      </div>

      <main className="mt-16">
        <CreateAssetForm />
      </main>
    </div>
  );
}

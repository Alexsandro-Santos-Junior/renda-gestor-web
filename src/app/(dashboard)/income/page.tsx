import { Button } from "~/components/ui/button";
import IncomeTable from "./table";
import { getIncome } from "~/api/data";

export default async function Income() {
  const income = await getIncome();

  return (
    <>
      <div className="hidden lg:flex">
        <h1 className="flex-1 justify-center text-2xl font-semibold text-text">
          Rendas
        </h1>
        <Button className="mr-2 items-center justify-center rounded-lg border border-text bg-white px-6 py-2 text-sm font-medium uppercase text-text hover:bg-brand_pages">
          <a href={"/income/new-income"}>Nova renda</a>
        </Button>
      </div>
      <main>
        <IncomeTable income={income} />
      </main>
    </>
  );
}

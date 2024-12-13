import { Button } from "~/components/ui/button";
import ExpenseTable from "./table";
import { getExpense } from "~/api/data";

export default async function Despesas() {
  const expense = await getExpense();
  return (
    <>
      <div className="flex">
        <h1 className="flex-1 justify-center text-2xl font-medium text-text">
          Despesas
        </h1>
        <Button className="mr-2 items-center justify-center rounded-lg border border-text bg-white px-6 py-2 text-sm font-medium uppercase text-text hover:bg-brand_pages">
          <a href={`/expense/new-expense`}>Nova despesa </a>
        </Button>
      </div>

      <main>
        <ExpenseTable expense={expense} />
      </main>
    </>
  );
}

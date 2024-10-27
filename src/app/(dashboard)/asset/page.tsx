import { Button } from "~/components/ui/button";
import AssetTable from "./table";
import { getAsset } from "~/api/data";

export default async function Bens() {
  const asset = await getAsset();
  return (
    <>
      <div className="hidden lg:flex">
        <h1 className="flex-1 justify-center text-2xl font-semibold text-text">
          Bens Materiais
        </h1>
        <Button className="mr-2 items-center justify-center rounded-lg border border-text bg-white px-6 py-2 text-sm font-medium uppercase text-text hover:bg-brand_pages">
          <a href={`/asset/new-asset`}>Novo patrimonio</a>
        </Button>
      </div>
      <main>
        <AssetTable asset={asset} />
      </main>
    </>
  );
}

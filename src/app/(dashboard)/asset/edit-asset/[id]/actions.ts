// "use server";

// import { auth } from "@clerk/nextjs/server";

// type TipoPropriedade =
//   | "CASA"
//   | "CARRO"
//   | "MOTO"
//   | "COMPUTADOR"
//   | "TERRENO"
//   | "JOIA"
//   | "ACOES"
//   | "OUTROS";

// type UpdateAssetRequest = {
//   params: {
//     id: string;
//   };
//   body: {
//     userId?: string;
//     tipo?: TipoPropriedade;
//     valor_estimado?: number;
//     data_aquisicao?: Date;
//     descricao?: string;
//   };
// };

// export async function updateAsset(data: UpdateAssetRequest) {
//   const { getToken } = auth();
//   const token = await getToken();
//   console.log(`esse e o token do actions`, token);

//   const response = await fetch(
//     `http://localhost:3000/asset/${data.params.id}`,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data.body),
//     }
//   );

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Erro ao atualizar o patrimonio.");
//   }
// }

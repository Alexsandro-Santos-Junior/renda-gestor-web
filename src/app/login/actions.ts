"use server";

import { auth } from "@clerk/nextjs/server";

export async function handleUserLogin() {
  console.log("Iniciando handleUserLogin");
  // Capturar a sessão do usuário autenticado
  const { userId, sessionId } = await auth();
  console.log(userId, sessionId, "esse foram dados do login");
  if (userId) {
    // Obter os detalhes do usuário do Clerk
    const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`, // Substitua pelo seu API Key do Clerk
      },
    }).then((res) => res.json());

    const { id, fullName, primaryEmailAddress } = user;
    console.log(user, "esse foi o user");
    // Obter o token da sessão atual do usuário
    const sessionToken = sessionId; // Você pode usar um método do Clerk para obter o token diretamente, como `auth.session.token`
    console.log("actionsLogin", sessionToken);
    // Enviar os dados do usuário para o backend com o token
    // const response = await fetch("http://api-server-url/api/users", {
    const response = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`, // Aqui você passa o token de autenticação para o backend
      },
      body: JSON.stringify({
        authProviderId: id,
        name: fullName,
        email: primaryEmailAddress,
      }),
    });
    console.log(response, "esse foi o response");
    if (response.ok) {
      console.log("Usuário salvo com sucesso.");
    } else {
      console.error("Erro ao salvar o usuário:", await response.json());
    }
  }
}

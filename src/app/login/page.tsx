import Image from "next/image";
import { LoginForm } from "./form";

export default async function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-200 lg:flex-row">
      <div className="flex flex-1 items-center justify-center bg-slate-100 p-4 lg:p-8">
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="flex flex-col">
            <span className="mb-4 text-center text-lg font-medium text-gray-600 lg:text-xl">
              Acesso ao sistema
            </span>
            <span className="text-center text-sm font-light text-gray-600 lg:text-base">
              Utilize seu email principal para acessar nosso sistema!
            </span>
          </div>
          <div className="p-2">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-brand_2 p-4 lg:pb-48">
        <div className="flex flex-col items-center text-center">
          <Image
            className="dark:invert"
            src="/logo.png"
            alt="logo"
            width={400}
            height={80}
            priority
          />
          <span className="mb-2 text-2xl font-semibold text-brand lg:text-4xl">
            Evolução financeira começa aqui.
          </span>
          <span className="text-center text-lg font-semibold text-white lg:text-2xl">
            Tudo depende de onde você quer chegar!
          </span>
        </div>
      </div>
    </div>
  );
}

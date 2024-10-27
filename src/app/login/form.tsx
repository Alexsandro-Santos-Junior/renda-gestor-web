"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { handleUserLogin } from "./actions";

export function LoginForm() {
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      handleUserLogin();
    }
  }, [isLoaded, userId]);

  return (
    <form method="POST">
      <fieldset className="group">
        <div className="group-disabled:opacity-50">
          <div className="flex justify-center p-6">
            <SignIn routing="hash" signUpUrl="/sign-up" />
          </div>
        </div>
      </fieldset>
    </form>
  );
}

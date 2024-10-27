import { Toaster } from "~/components/ui/toaster";
import { cn } from "~/lib/utils";
import { Providers } from "~/providers";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renda Gestor",
  description: "Administre seu patrimonio e cresça junto com o Renda Gestor",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <Providers>
          <body className={cn("font-sans antialiased", inter.variable)}>
            <Toaster />
            {children}
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}

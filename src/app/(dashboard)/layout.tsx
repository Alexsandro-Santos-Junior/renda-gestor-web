import { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto p-12">
        {children}
      </div>
    </div>
  );
}

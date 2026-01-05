import AdminShell from "@/components/admin/AdminShell";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getCurrentUser();

  if (!user) redirect("/login");

  return <AdminShell>{children}</AdminShell>;
}

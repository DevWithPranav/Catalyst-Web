import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 overflow-auto bg-neutral-50">{children}</main>
      </div>
    </div>
  );
}

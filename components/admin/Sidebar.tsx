import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        <Link href="/">Dashboard</Link>
        <Link href="/users">Users</Link>
      </nav>
    </aside>
  );
}
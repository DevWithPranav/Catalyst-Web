export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Stat title="Total Users" value="128" />
        <Stat title="Active Sessions" value="23" />
        <Stat title="System Health" value="Stable" />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded p-6">
      <p className="text-sm text-neutral-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

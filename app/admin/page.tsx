export default function AdminDashboardPage() {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 tracking-tight text-foreground">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Users" value="128" />
                <StatCard title="Total Events" value="45" />
                <StatCard title="Active Members" value="89" />
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 tracking-tight text-foreground">Recent Activity</h3>
                <div className="bg-card rounded-xl border shadow-sm p-6 text-foreground">
                    <p className="text-muted-foreground text-sm">No recent activity to display.</p>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-card rounded-xl border shadow-sm p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1 tracking-wider uppercase">{title}</p>
            <p className="text-4xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
    );
}

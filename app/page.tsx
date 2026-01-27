import { Header } from "@/components/shared/Header";

async function getStats() {
  const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.veexplatform.com/api/v1";

  try {
    const res = await fetch(`${registryUrl}/admin/stats`, {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch stats");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      devices: 0,
      fleets: 0,
      campaigns: 0,
      version: "unknown",
      status: "offline",
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <Header
        title="Dashboard"
        description="Real-time overview of your industrial IoT infrastructure"
      />

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Devices"
            value={stats.devices}
            trend="+12%"
          />
          <StatCard
            title="Active Fleets"
            value={stats.fleets}
            trend="+5%"
          />
          <StatCard
            title="OTA Campaigns"
            value={stats.campaigns}
          />
          <StatCard
            title="System Status"
            value={stats.status}
            valueColor={stats.status === "operational" ? "text-emerald-500" : "text-red-500"}
          />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="glass rounded-lg p-6">
            <p className="text-slate-400 text-sm">No recent activity</p>
          </div>
        </div>

        {/* System Info */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-4">System Information</h2>
          <div className="glass rounded-lg p-6">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-400">Platform Version</dt>
                <dd className="text-white font-mono">{stats.version}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Registry URL</dt>
                <dd className="text-white font-mono text-xs">{process.env.NEXT_PUBLIC_REGISTRY_URL || "default"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  valueColor = "text-white",
}: {
  title: string;
  value: string | number;
  trend?: string;
  valueColor?: string;
}) {
  return (
    <div className="glass rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className={`mt-2 text-3xl font-bold ${valueColor}`}>{value}</p>
          {trend && (
            <p className="mt-1 text-sm text-emerald-500">{trend}</p>
          )}
        </div>
      </div>
    </div>
  );
}

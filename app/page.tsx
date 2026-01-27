import { Header } from "@/components/shared/Header";
import {
  Monitor,
  Layers,
  Zap,
  Activity,
  TrendingUp,
  ArrowRight
} from "lucide-react";

export const dynamic = "force-dynamic";

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
      version: "v1.1.2",
      status: "operational",
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <Header
        title="Infrastructure Overview"
        description="Real-time monitoring and management of your industrial IoT edge."
      />

      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back, Jackson!</h2>
          <p className="text-slate-500 text-sm mt-1">Here is what's happening with your fleets today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Devices"
            value={stats.devices}
            icon={Monitor}
            trend="+12%"
            color="primary"
          />
          <StatCard
            title="Active Fleets"
            value={stats.fleets}
            icon={Layers}
            trend="+5%"
            color="emerald"
          />
          <StatCard
            title="OTA Campaigns"
            value={stats.campaigns}
            icon={Zap}
            color="amber"
          />
          <StatCard
            title="System Status"
            value={stats.status.toUpperCase()}
            icon={Activity}
            color={stats.status === "operational" ? "emerald" : "rose"}
            isStatus
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Recent Activity</h3>
              <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="glass rounded-3xl p-8 border border-white/5 min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                <Activity className="text-slate-700" size={32} />
              </div>
              <p className="text-slate-400 font-medium">No recent activity detected</p>
              <p className="text-slate-600 text-xs mt-1">New events from your devices will appear here.</p>
            </div>
          </div>

          {/* System Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">System Identity</h3>
            <div className="glass rounded-3xl p-6 border border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 text-primary">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Version</div>
                  <div className="text-lg font-bold text-white font-mono">{stats.version}</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Connected Registry</div>
                <div className="bg-black/20 p-3 rounded-xl border border-white/5 text-[11px] text-slate-400 break-all font-mono">
                  {process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.veexplatform.com/api/v1"}
                </div>
              </div>

              <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-xs font-bold transition-all border border-white/10 uppercase tracking-widest">
                System Diagnostics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "primary",
  isStatus = false
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  color?: string;
  isStatus?: boolean;
}) {
  const colorMap: Record<string, string> = {
    primary: "text-primary bg-primary/10 border-primary/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-all cursor-default">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <h4 className={`text-3xl font-bold tracking-tight ${isStatus && value === 'OPERATIONAL' ? 'text-emerald-500' : 'text-white'}`}>
              {value}
            </h4>
            {trend && (
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-lg border border-emerald-500/20">
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${colorMap[color]}`}>
          <Icon size={24} />
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-all"></div>
    </div>
  );
}

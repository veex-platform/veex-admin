import { Header } from "@/components/shared/Header";
import {
  Users,
  Settings,
  Activity,
  ArrowRightCircle,
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  Globe
} from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const registryUrl = process.env.REGISTRY_URL_INTERNAL || process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.veexplatform.com/api/v1";

  try {
    const res = await fetch(`${registryUrl}/admin/stats`, {
      next: { revalidate: 10 },
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
      version: "v1.3.0",
      status: "operational",
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="flex-1">
      {/* Content Header (Page header) */}
      <Header
        title="Dashboard"
        description="Version 1.3.0"
      />

      {/* Main content */}
      <section className="p-6">
        <div className="container-fluid mx-auto">
          {/* Small boxes (Stat box) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SmallBox
              title="Total Devices"
              value={stats.devices}
              icon={Cpu}
              bgColor="bg-info"
              href="/devices"
            />
            <SmallBox
              title="Active Fleets"
              value={stats.fleets}
              icon={Layers}
              bgColor="bg-success"
              href="/fleets"
            />
            <SmallBox
              title="OTA Campaigns"
              value={stats.campaigns}
              icon={Zap}
              bgColor="bg-warning text-white"
              href="/ota"
            />
            <SmallBox
              title="System Status"
              value={stats.status.toUpperCase()}
              icon={Activity}
              bgColor="bg-danger"
              href="/settings"
            />
          </div>

          {/* Info boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="info-box elevation-1">
              <span className="info-box-icon bg-info elevation-1"><Users size={24} /></span>
              <div className="info-box-content">
                <span className="info-box-text">Active Users</span>
                <span className="info-box-number">24</span>
              </div>
            </div>
            <div className="info-box elevation-1">
              <span className="info-box-icon bg-success elevation-1"><Globe size={24} /></span>
              <div className="info-box-content">
                <span className="info-box-text">Edge Coverage</span>
                <span className="info-box-number">98%</span>
              </div>
            </div>
            <div className="info-box elevation-1">
              <span className="info-box-icon bg-warning text-white elevation-1"><TrendingUp size={24} /></span>
              <div className="info-box-content">
                <span className="info-box-text">Data Processing</span>
                <span className="info-box-number">1.2 TB</span>
              </div>
            </div>
            <div className="info-box elevation-1">
              <span className="info-box-icon bg-danger elevation-1"><Settings size={24} /></span>
              <div className="info-box-content">
                <span className="info-box-text">Latency (ms)</span>
                <span className="info-box-number">45ms</span>
              </div>
            </div>
          </div>

          {/* Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Activity size={16} className="text-primary" />
                    Recent Activity
                  </h3>
                </div>
                <div className="p-20 text-center">
                  <p className="text-slate-400 text-sm">Waiting for edge telemetry signals...</p>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-sm font-bold text-slate-700">Project Identity</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Platform Core</span>
                    <span className="font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{stats.version}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Registry Gateway</span>
                    <span className="text-slate-400 font-mono text-[9px] truncate ml-2">
                      {process.env.NEXT_PUBLIC_REGISTRY_URL || "default"}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 px-4 py-3 text-center border-t border-slate-100">
                  <button className="text-[10px] font-bold text-primary uppercase hover:underline">Full Analytics Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SmallBox({
  title,
  value,
  icon: Icon,
  bgColor,
  href
}: {
  title: string;
  value: string | number;
  icon: any;
  bgColor: string;
  href: string
}) {
  const bgMap: Record<string, string> = {
    'bg-info': 'bg-cyan-500',
    'bg-success': 'bg-emerald-500',
    'bg-warning': 'bg-amber-400',
    'bg-danger': 'bg-rose-500',
  };

  const actualBg = bgMap[bgColor.split(' ')[0]] || bgColor;

  return (
    <div className={`${actualBg} rounded-md shadow-sm overflow-hidden relative group text-white`}>
      <div className="p-4 z-10 relative">
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        <p className="text-sm opacity-90">{title}</p>
      </div>
      <div className="absolute top-2 right-4 text-black/15 group-hover:scale-110 transition-transform">
        <Icon size={64} strokeWidth={1.5} />
      </div>
      <a href={href} className="block bg-black/10 hover:bg-black/20 text-center py-1 text-[11px] font-medium transition-colors">
        More info <ArrowRightCircle size={10} className="inline ml-1 mb-0.5" />
      </a>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Cpu,
  Network,
  Zap,
  AlertTriangle,
  TrendingUp,
  Settings,
  BarChart3
} from "lucide-react";

const logs = [
  { time: "12:45", type: "alert", message: "Device VX-102 Offline", color: "bg-destructive" },
  { time: "12:37", type: "info", message: "OTA Update Campaign #21 Started", color: "bg-secondary" },
  { time: "12:30", type: "fleet", message: "Fleet North Zone Updated", color: "bg-primary" },
  { time: "12:15", type: "info", message: "Device VX-230 Rebooted", color: "bg-amber-500" },
];

export default function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    devices: "0",
    fleets: "0",
    campaigns: "0",
    status: "loading",
    version: "v1.0.0"
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.veexplatform.com/api/v1";
        const res = await fetch(`${registryUrl}/admin/stats`);
        if (res.ok) {
          const data = await res.json();
          setDashboardStats({
            devices: data.devices.toString(),
            fleets: data.fleets.toString(),
            campaigns: data.campaigns.toString(),
            status: data.status,
            version: data.version
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Connected Devices", value: dashboardStats.devices, icon: Cpu, color: "text-primary", glow: "glow-blue" },
    { label: "Active Fleets", value: dashboardStats.fleets, icon: Network, color: "text-secondary", glow: "glow-green" },
    { label: "OTA Campaigns", value: dashboardStats.campaigns, sub: "Running", icon: Zap, color: "text-amber-500", glow: "glow-amber" },
    { label: "System Status", value: dashboardStats.status.toUpperCase(), icon: AlertTriangle, color: dashboardStats.status === "operational" ? "text-secondary" : "text-destructive", glow: dashboardStats.status === "operational" ? "glow-green" : "glow-red" },
  ];
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-64px)]">

      {/* 4 Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass p-5 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer ${stat.glow}`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</span>
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-white">{stat.value}</h2>
              {stat.sub && <span className="text-[10px] font-bold text-slate-500">{stat.sub}</span>}
            </div>

            {/* Background Pattern Mock */}
            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
              <stat.icon size={80} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Status & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Connection Status Chart Area */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">Connection Status</h3>
              <p className="text-[10px] text-slate-500">Flux monitoring last 24 hours</p>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all"><BarChart3 size={14} /></button>
              <button className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all"><Settings size={14} /></button>
            </div>
          </div>

          <div className="h-64 relative flex items-end gap-1">
            {/* Simple SVG Chart Mock for reliability */}
            <svg viewBox="0 0 800 200" className="w-full h-full">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,60 L800,200 L0,200 Z"
                fill="url(#lineGrad)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,60"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                filter="drop-shadow(0 0 10px rgba(59,130,246,0.5))"
              />

              {/* Horizontal Grid Lines */}
              {[0, 50, 100, 150].map(y => (
                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="white" strokeOpacity="0.05" />
              ))}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] font-bold text-slate-600 px-2 pt-4 border-t border-white/5">
              <span>07 AM</span>
              <span>10 AM</span>
              <span>14 AM</span>
              <span>18 PM</span>
              <span>22 PM</span>
            </div>
          </div>
        </div>

        {/* Global Distribution Map Area */}
        <div className="glass p-6 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center">
          <h3 className="absolute top-6 left-6 text-sm font-bold uppercase tracking-widest text-white/50">Global Distribution</h3>

          {/* World Map SVG Mock */}
          <div className="w-full aspect-square opacity-40 group hover:opacity-100 transition-all duration-700">
            <svg viewBox="0 0 200 120" className="w-full h-full fill-slate-700">
              <path d="M25,40 Q30,35 40,38 T60,35 T85,45 T110,40 T140,50 T180,45 L180,90 Q150,95 120,90 T80,95 T40,90 Z" />
              <path d="M10,20 Q15,15 20,20 T30,15 Z" />

              {/* Glowing Points */}
              <circle cx="45" cy="45" r="2" fill="#10b981" className="animate-pulse">
                <title>EU Cluster</title>
              </circle>
              <circle cx="120" cy="55" r="2" fill="#3b82f6" className="animate-pulse">
                <title>NA Cluster</title>
              </circle>
              <circle cx="160" cy="80" r="2" fill="#f59e0b" className="animate-pulse">
                <title>AS South</title>
              </circle>
            </svg>
          </div>

          <div className="mt-4 flex gap-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Active Nodes</p>
              <p className="text-xl font-black text-white">412</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Latency</p>
              <p className="text-xl font-black text-secondary">18ms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Event Log */}
      <div className="glass p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp size={18} className="text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">System Event Log</h3>
          </div>
          <button className="text-[10px] font-bold text-primary hover:underline">VIEW ALL LOGS</button>
        </div>

        <div className="space-y-2">
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center gap-4 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 cursor-pointer group"
            >
              <div className={`w-1 h-8 rounded-full ${log.color} group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]`}></div>
              <span className="text-xs font-mono text-slate-500">{log.time}</span>
              <span className="text-xs font-bold text-slate-300 flex-1">{log.message}</span>
              <div className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] font-bold uppercase text-slate-500 group-hover:text-white transition-all">DETAILS</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

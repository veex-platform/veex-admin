"use client";

import { useEffect, useState } from "react";
import { Bell, Moon, User, Search, Activity, Cpu, AlertTriangle } from "lucide-react";

interface HeaderProps {
    title: string;
    description?: string;
}

export function Header({ title, description }: HeaderProps) {
    const [stats, setStats] = useState({
        devices: 0,
        alerts: 0,
        status: "offline"
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.veexplatform.com/api/v1";
                const res = await fetch(`${registryUrl}/admin/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats({
                        devices: data.devices,
                        alerts: 0, // Backend doesn't provide alerts count yet
                        status: data.status === "operational" ? "Online" : "Partial"
                    });
                }
            } catch (error) {
                console.error("Failed to fetch header stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <header className="h-16 border-b border-white/5 bg-[#0a0b10]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
            {/* Status Indicators */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Production</span>
                </div>

                <div className="hidden md:flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <Activity size={14} className="text-secondary" />
                        <span className="text-slate-400">Registry:</span>
                        <span className="text-secondary font-bold">{stats.status}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10"></div>
                    <div className="flex items-center gap-2">
                        <Cpu size={14} className="text-primary" />
                        <span className="text-slate-400">Devices:</span>
                        <span className="text-white font-bold">{stats.devices.toLocaleString()}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10"></div>
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-destructive" />
                        <span className="text-slate-400">Alerts:</span>
                        <span className="text-destructive font-bold">{stats.alerts}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <div className="relative hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search fleet..."
                        className="bg-white/5 border border-white/10 rounded-xl py-1.5 pl-10 pr-4 text-xs focus:border-primary outline-none transition-all w-64"
                    />
                </div>

                <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-[#0a0b10]"></span>
                </button>
                <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                    <Moon size={18} />
                </button>
                <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
                <button className="flex items-center gap-2 hover:bg-white/5 p-1.5 rounded-xl transition-all">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
                        <User size={16} className="text-slate-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 hidden sm:block">Admin</span>
                </button>
            </div>
        </header>
    );
}

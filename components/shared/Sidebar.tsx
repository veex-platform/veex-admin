"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import {
    LayoutDashboard,
    Cpu,
    Network,
    Zap,
    BarChart3,
    Settings,
    ShieldCheck
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Devices", href: "/devices", icon: Cpu },
    { name: "Fleets", href: "/fleets", icon: Network },
    { name: "OTA Campaigns", href: "/ota", icon: Zap },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col sidebar-gradient border-r border-white/5">
            {/* Header */}
            <div className="flex h-20 items-center gap-3 px-6 border-b border-white/5">
                <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                    <Logo size={24} className="text-primary" />
                </div>
                <div>
                    <div className="text-base font-bold text-white tracking-tight">VEEX</div>
                    <div className="text-[10px] text-primary font-bold uppercase tracking-widest">Platform</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-4 py-6">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Main Menu</div>
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? "active-nav-link text-primary"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
                            <Icon size={18} className={isActive ? "text-primary" : "text-slate-500"} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 mx-4 mb-4 glass rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <ShieldCheck size={16} className="text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-[11px] font-bold text-white">System Secure</div>
                        <div className="text-[9px] text-slate-500">v1.1.2 Build</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

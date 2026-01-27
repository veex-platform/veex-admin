"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Cpu,
    Network,
    Zap,
    BarChart3,
    Settings,
    Share2,
    ChevronRight
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Devices", href: "/devices", icon: Cpu },
    { name: "Fleets", href: "/fleets", icon: Network },
    { name: "OTA", href: "/ota", icon: Zap },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "System", href: "/architecture", icon: Share2 },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-[#0d0f14] border-r border-white/5 flex flex-col z-20">
            {/* Brand */}
            <div className="p-6 flex items-center justify-center">
                <Link href="/" className="group">
                    <div className="flex items-center justify-center relative">
                        <img
                            src="/assets/logo.svg"
                            alt="VEEX Logo"
                            className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(59,130,246,0.25)] group-hover:drop-shadow-[0_0_18px_rgba(59,130,246,0.4)] transition-all duration-300"
                        />
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300
                ${isActive
                                    ? "bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(59,130,246,0.1)] border border-primary/20"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}
              `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon
                                    size={20}
                                    className={isActive ? "text-primary filter drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" : ""}
                                />
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight size={14} className="text-primary" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Profile Placeholder */}
            <div className="p-4 mt-auto border-t border-white/5">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center">
                        <span className="text-[10px] font-bold">ADM</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">Administrator</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Production</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

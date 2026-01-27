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
    Circle,
    Search,
    User
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
        <aside className="main-sidebar sidebar-dark-primary flex flex-col h-screen w-[250px] elevation-4 fixed left-0 top-0 z-50 overflow-y-auto">
            {/* Brand Logo */}
            <Link href="/" className="brand-link flex items-center h-[57px] px-4 border-b border-slate-700 hover:text-white transition-colors">
                <Logo size={33} className="mr-2 opacity-80" />
                <span className="brand-text font-light text-xl text-white">VEEX <span className="font-bold">Admin</span></span>
            </Link>

            <div className="sidebar px-2 pt-3 flex-1 overflow-y-auto">
                {/* User Panel */}
                <div className="user-panel flex items-center mb-3 pb-3 border-b border-slate-700">
                    <div className="image mr-3 pl-2">
                        <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center text-white border border-slate-500">
                            <User size={16} />
                        </div>
                    </div>
                    <div className="info">
                        <Link href="#" className="text-sm text-slate-300 hover:text-white transition-colors">Jackson Wendel</Link>
                    </div>
                </div>

                {/* Sidebar Search */}
                <div className="search-form mb-3 px-2">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full bg-slate-800 border-0 text-xs text-white rounded px-3 py-2 pl-8 focus:ring-1 focus:ring-primary focus:outline-none"
                            placeholder="Search..."
                        />
                        <Search className="absolute left-2.5 top-2 text-slate-500" size={14} />
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex flex-col space-y-1">
                        <li className="nav-header text-[10px] uppercase font-bold text-slate-500 px-3 mb-1 mt-2">MAIN SYSTEM</li>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <li key={item.name} className="nav-item">
                                    <Link
                                        href={item.href}
                                        className={`
                                            flex items-center px-3 py-2 text-sm rounded transition-colors
                                            ${isActive
                                                ? "bg-primary text-white"
                                                : "text-slate-300 hover:bg-slate-700 hover:text-white"
                                            }
                                        `}
                                    >
                                        <Icon size={18} className="mr-2" />
                                        <p className="flex-1">{item.name}</p>
                                        {isActive && <Circle size={8} className="fill-white" />}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Version */}
            <div className="p-3 border-t border-slate-700 text-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">VEEX PLATFORM v1.3</span>
            </div>
        </aside>
    );
}

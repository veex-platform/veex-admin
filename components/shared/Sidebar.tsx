"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Devices", href: "/devices" },
    { name: "Fleets", href: "/fleets" },
    { name: "OTA Campaigns", href: "/ota" },
    { name: "Analytics", href: "/analytics" },
    { name: "Settings", href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col bg-slate-900 border-r border-slate-800">
            {/* Header */}
            <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-800">
                <Logo size={32} className="flex-shrink-0" />
                <div>
                    <div className="text-sm font-bold text-white">VEEX</div>
                    <div className="text-xs text-slate-400">Admin Portal</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }
              `}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-800 p-4">
                <div className="text-xs text-slate-500">
                    Version 1.0.0
                </div>
            </div>
        </div>
    );
}

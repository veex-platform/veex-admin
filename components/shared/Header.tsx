"use client";

import { Bell, Search, Menu, Mail, Maximize, Grid } from "lucide-react";

export function Header({ title, description }: { title: string; description?: string }) {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light h-[57px] flex items-center justify-between px-4 sticky top-0 z-40 bg-white border-b border-slate-200">
            {/* Left links */}
            <div className="flex items-center gap-4">
                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                    <Menu size={18} />
                </button>
                <div className="hidden sm:flex gap-4">
                    <span className="text-sm font-medium text-slate-800 uppercase tracking-tight">{title}</span>
                </div>
            </div>

            {/* Right links */}
            <div className="flex items-center gap-4">
                {/* Navbar Search */}
                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                    <Search size={18} />
                </button>

                {/* Messages */}
                <button className="text-slate-600 hover:text-slate-900 transition-colors relative">
                    <Mail size={18} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] text-white flex items-center justify-center rounded-full border border-white">4</span>
                </button>

                {/* Notifications */}
                <button className="text-slate-600 hover:text-slate-900 transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-orange-400 text-[10px] text-white flex items-center justify-center rounded-full border border-white">15</span>
                </button>

                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                    <Maximize size={18} />
                </button>

                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                    <Grid size={18} />
                </button>
            </div>
        </nav>
    );
}

"use client";

import { Bell, Search, User } from "lucide-react";

export function Header({ title, description }: { title: string; description?: string }) {
    return (
        <div className="h-20 border-b border-white/5 bg-background/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
            <div>
                <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
                {description && (
                    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
                )}
            </div>

            <div className="flex items-center gap-4">
                <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 transition-colors">
                    <Search size={18} />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full border-2 border-background"></span>
                </button>
                <div className="h-8 w-[1px] bg-white/5 mx-2"></div>
                <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="text-right">
                        <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">Jackson Wendel</div>
                        <div className="text-[10px] text-slate-500">Super Admin</div>
                    </div>
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <User size={18} className="text-primary" />
                    </div>
                </button>
            </div>
        </div>
    );
}

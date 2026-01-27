"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Cpu,
    Terminal,
    Database,
    Cloud,
    Code2,
    Zap,
    Globe,
    Radio,
    Share2
} from "lucide-react";

const FlowArrow = ({ points, duration = 3, delay = 0, color = "#10b981" }: { points: string; duration?: number; delay?: number; color?: string }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <motion.path
            d={points}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray="8 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: 1,
                opacity: [0, 0.9, 0.9, 0],
                strokeDashoffset: [0, -32]
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay
            }}
        />
        <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity="0" />
                <stop offset="50%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
        </defs>
        <motion.path
            d={points}
            fill="none"
            stroke={`url(#gradient-${color.replace('#', '')})`}
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{
                pathLength: [0, 1, 1, 0]
            }}
            transition={{
                duration: duration * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
        />
    </svg>
);

const Node = ({ title, subtitle, icon: Icon, colorClass, bgClass, textClass, x, y, delay = 0 }: {
    title: string;
    subtitle: string;
    icon: any;
    colorClass: string;
    bgClass: string;
    textClass: string;
    x: number;
    y: number;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
            duration: 0.6, 
            ease: [0.23, 1, 0.32, 1],
            delay 
        }}
        whileHover={{ 
            scale: 1.08, 
            y: -4,
            transition: { duration: 0.2 }
        }}
        className={`absolute z-10 p-4 rounded-xl shadow-lg border-2 w-56 bg-white backdrop-blur-sm transition-all duration-300 ${colorClass} hover:shadow-xl`}
        style={{ left: x, top: y }}
    >
        <div className="flex items-center gap-3">
            <motion.div 
                className={`p-2 rounded-lg bg-opacity-10 ${bgClass}`}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
            >
                <Icon size={20} className={textClass} />
            </motion.div>
            <div>
                <h4 className={`text-[11px] font-bold uppercase tracking-wider leading-none text-slate-800`}>{title}</h4>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">{subtitle}</p>
            </div>
        </div>
    </motion.div>
);

const GroupBox = ({ title, colorClass, textClass, x, y, width, height, delay = 0 }: {
    title: string;
    colorClass: string;
    textClass: string;
    x: number;
    y: number;
    width: number;
    height: number;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        className={`absolute rounded-2xl border-2 border-dashed ${colorClass} bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm z-0 p-4 shadow-sm`}
        style={{ left: x, top: y, width, height }}
    >
        <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center ${textClass}`}>
            {title}
        </div>
    </motion.div>
);

export function SystemArchitecture() {
    return (
        <div className="relative w-full h-[900px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 rounded-3xl border border-slate-200 overflow-hidden p-8 shadow-inner">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <GroupBox
                title="Cloud Side (The Brain)"
                colorClass="border-blue-500/40"
                textClass="text-blue-600"
                x={80} y={40} width={360} height={280}
                delay={0.1}
            />

            <GroupBox
                title="Edge Side (The Muscle)"
                colorClass="border-emerald-500/40"
                textClass="text-emerald-600"
                x={520} y={40} width={360} height={280}
                delay={0.1}
            />

            <GroupBox
                title="Developer Tools"
                colorClass="border-amber-500/40"
                textClass="text-amber-600"
                x={300} y={580} width={380} height={240}
                delay={0.3}
            />

            <Node
                title="VEEX Studio"
                subtitle="Visual Low-Code Canvas"
                icon={Code2}
                colorClass="border-blue-500"
                bgClass="bg-blue-500"
                textClass="text-blue-600"
                x={130} y={100}
                delay={0.2}
            />
            <Node
                title="VEEX Builder"
                subtitle="VEX Artifact Compiler"
                icon={Zap}
                colorClass="border-blue-600"
                bgClass="bg-blue-600"
                textClass="text-blue-700"
                x={130} y={180}
                delay={0.3}
            />
            <Node
                title="VEEX Registry"
                subtitle="Global Hub & OTA Hub"
                icon={Database}
                colorClass="border-blue-700"
                bgClass="bg-blue-700"
                textClass="text-blue-800"
                x={130} y={260}
                delay={0.4}
            />

            <Node
                title="Stable Drivers"
                subtitle="CAN/GPIO/MQTT/BLE"
                icon={Radio}
                colorClass="border-emerald-500"
                bgClass="bg-emerald-500"
                textClass="text-emerald-600"
                x={570} y={100}
                delay={0.2}
            />
            <Node
                title="VEEX Runtime"
                subtitle="Core Industrial OS"
                icon={Cpu}
                colorClass="border-emerald-700"
                bgClass="bg-emerald-700"
                textClass="text-emerald-700"
                x={570} y={180}
                delay={0.3}
            />

            <Node
                title="VEEX CLI"
                subtitle="Swiss Army Knife"
                icon={Terminal}
                colorClass="border-amber-500"
                bgClass="bg-amber-500"
                textClass="text-amber-600"
                x={350} y={640}
                delay={0.5}
            />
            <Node
                title="Industrial Device"
                subtitle="ESP32 / M5Stack"
                icon={Zap}
                colorClass="border-amber-600"
                bgClass="bg-amber-600"
                textClass="text-amber-700"
                x={350} y={720}
                delay={0.6}
            />

            <FlowArrow points="M 250,180 L 250,260" duration={2.5} delay={1} color="#3b82f6" />
            <FlowArrow points="M 250,300 L 250,640" duration={4} delay={1.5} color="#3b82f6" />
            <FlowArrow points="M 690,300 L 690,640" duration={4} delay={1.7} color="#10b981" />
            <FlowArrow points="M 250,300 L 690,300" duration={3.5} delay={2} color="#6366f1" />
            <FlowArrow points="M 490,640 L 490,720" duration={2} delay={2.5} color="#f59e0b" />
            <FlowArrow points="M 250,300 L 490,300 L 490,640" duration={5} delay={2.2} color="#3b82f6" />

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="absolute top-[220px] left-[260px] text-[8px] font-bold text-blue-600 bg-blue-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-blue-200/50"
            >
                EXPORT VDL
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.4 }}
                className="absolute top-[300px] left-[260px] text-[8px] font-bold text-blue-600 bg-blue-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-blue-200/50"
            >
                SIGNED ARTIFACT
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.4 }}
                className="absolute top-[470px] left-[260px] text-[8px] font-bold text-blue-600 bg-blue-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-blue-200/50"
            >
                EXECUTES .VEX
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.4 }}
                className="absolute top-[470px] left-[700px] text-[8px] font-bold text-emerald-600 bg-emerald-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-emerald-200/50"
            >
                OTA UPDATE
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.4 }}
                className="absolute top-[320px] left-[470px] text-[8px] font-bold text-indigo-600 bg-indigo-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-indigo-200/50"
            >
                PULL / PUSH
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.4 }}
                className="absolute top-[680px] left-[370px] text-[8px] font-bold text-amber-600 bg-amber-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-amber-200/50"
            >
                FLASH / SIM
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.4 }}
                className="absolute top-[500px] left-[500px] text-[8px] font-bold text-blue-600 bg-blue-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-blue-200/50"
            >
                CLOUD → DEV
            </motion.div>
        </div>
    );
}

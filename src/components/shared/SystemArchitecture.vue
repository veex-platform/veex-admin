<template>
  <div class="relative w-full h-[900px] bg-black/40 backdrop-blur-xl rounded-[3rem] border border-white/[0.05] overflow-hidden p-8 shadow-inner">
    <div class="absolute inset-0 opacity-[0.05] pointer-events-none grid-dot" />
    
    <!-- Area Glows -->
    <div class="absolute top-[140px] left-[200px] w-64 h-64 bg-blue-500/10 blur-[120px] pointer-events-none"></div>
    <div class="absolute top-[140px] left-[650px] w-64 h-64 bg-emerald-500/10 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[100px] left-[400px] w-64 h-64 bg-amber-500/10 blur-[120px] pointer-events-none"></div>

    <GroupBox title="Cloud Infrastructure" color-class="border-blue-500/20" text-class="text-blue-400" :x="80" :y="40" :width="360" :height="280" :delay="0.1" />
    <GroupBox title="Industrial Edge" color-class="border-emerald-500/20" text-class="text-emerald-400" :x="520" :y="40" :width="360" :height="280" :delay="0.1" />
    <GroupBox title="Developer Bridge" color-class="border-amber-500/20" text-class="text-amber-400" :x="300" :y="580" :width="380" :height="240" :delay="0.3" />
    
    <ArchNode title="VEEX Studio" subtitle="Low-Code Canvas" :icon="Code2" color-class="border-blue-500" bg-class="bg-blue-500" text-class="text-blue-400" :x="130" :y="100" :delay="0.2" />
    <ArchNode title="VEEX Builder" subtitle="Artifact Compiler" :icon="Zap" color-class="border-blue-500" bg-class="bg-blue-500" text-class="text-blue-400" :x="130" :y="180" :delay="0.3" />
    <ArchNode title="VEEX Registry" subtitle="Global Hub" :icon="Database" color-class="border-blue-500" bg-class="bg-blue-500" text-class="text-blue-400" :x="130" :y="260" :delay="0.4" />
    
    <ArchNode title="Stable Drivers" subtitle="I/O Ecosystem" :icon="Radio" color-class="border-emerald-500" bg-class="bg-emerald-500" text-class="text-emerald-400" :x="570" :y="100" :delay="0.2" />
    <ArchNode title="VEEX Runtime" subtitle="Industrial Core" :icon="Cpu" color-class="border-emerald-500" bg-class="bg-emerald-500" text-class="text-emerald-400" :x="570" :y="180" :delay="0.3" />
    <ArchNode title="Node Identity" subtitle="Secure Vault" :icon="ShieldCheck" color-class="border-emerald-500" bg-class="bg-emerald-500" text-class="text-emerald-400" :x="570" :y="260" :delay="0.4" />

    <ArchNode title="VEEX CLI" subtitle="Local Bridge" :icon="Terminal" color-class="border-amber-500" bg-class="bg-amber-500" text-class="text-amber-400" :x="350" :y="640" :delay="0.5" />
    <ArchNode title="ESP32/M5Stack" subtitle="Target Hardware" :icon="Zap" color-class="border-amber-500" bg-class="bg-amber-500" text-class="text-amber-400" :x="350" :y="720" :delay="0.6" />
    
    <!-- Flow Labels -->
    <div class="absolute top-[220px] left-[260px] text-[8px] font-black text-blue-400/60 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 arch-label uppercase tracking-widest shadow-2xl" style="animation-delay: 1.2s">Export VDL</div>
    <div class="absolute top-[300px] left-[260px] text-[8px] font-black text-blue-400/60 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 arch-label uppercase tracking-widest shadow-2xl" style="animation-delay: 1.4s">Signed Artifact</div>
    <div class="absolute top-[470px] left-[260px] text-[8px] font-black text-blue-400/60 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 arch-label uppercase tracking-widest shadow-2xl" style="animation-delay: 1.8s">Sync .VEX</div>
    <div class="absolute top-[470px] left-[700px] text-[8px] font-black text-emerald-400/60 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 arch-label uppercase tracking-widest shadow-2xl" style="animation-delay: 1.9s">OTA Pulse</div>
    <div class="absolute top-[320px] left-[470px] text-[8px] font-black text-indigo-400/60 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 arch-label uppercase tracking-widest shadow-2xl" style="animation-delay: 2.2s">Registry Uplink</div>
  </div>
</template>

<script setup lang="ts">
import { Cpu, Terminal, Database, Zap, Radio, Code2, ShieldCheck } from 'lucide-vue-next'
import GroupBox from './SystemArchitectureGroup.vue'
import ArchNode from './SystemArchitectureNode.vue'
</script>

<style scoped>
.grid-dot {
  background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 0);
  background-size: 32px 32px;
}
.arch-label {
  opacity: 0;
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes fadeIn {
  to { 
    opacity: 1; 
    transform: translateY(-5px);
  }
}
</style>

<style scoped>
.grid-dot {
  background-image: radial-gradient(#000 1px, transparent 0);
  background-size: 24px 24px;
}
.arch-label {
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;
}
@keyframes fadeIn {
  to { opacity: 1; }
}
</style>

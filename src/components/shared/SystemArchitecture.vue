<template>
  <div class="relative w-full h-[900px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 rounded-3xl border border-slate-200 overflow-hidden p-8 shadow-inner">
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none grid-dot" />
    <GroupBox title="Cloud Side (The Brain)" color-class="border-blue-500/40" text-class="text-blue-600" :x="80" :y="40" :width="360" :height="280" :delay="0.1" />
    <GroupBox title="Edge Side (The Muscle)" color-class="border-emerald-500/40" text-class="text-emerald-600" :x="520" :y="40" :width="360" :height="280" :delay="0.1" />
    <GroupBox title="Developer Tools" color-class="border-amber-500/40" text-class="text-amber-600" :x="300" :y="580" :width="380" :height="240" :delay="0.3" />
    <ArchNode title="VEEX Studio" subtitle="Visual Low-Code Canvas" :icon="Code2" color-class="border-blue-500" bg-class="bg-blue-500" text-class="text-blue-600" :x="130" :y="100" :delay="0.2" />
    <ArchNode title="VEEX Builder" subtitle="VEX Artifact Compiler" :icon="Zap" color-class="border-blue-600" bg-class="bg-blue-600" text-class="text-blue-700" :x="130" :y="180" :delay="0.3" />
    <ArchNode title="VEEX Registry" subtitle="Global Hub & OTA Hub" :icon="Database" color-class="border-blue-700" bg-class="bg-blue-700" text-class="text-blue-800" :x="130" :y="260" :delay="0.4" />
    <ArchNode title="Stable Drivers" subtitle="CAN/GPIO/MQTT/BLE" :icon="Radio" color-class="border-emerald-500" bg-class="bg-emerald-500" text-class="text-emerald-600" :x="570" :y="100" :delay="0.2" />
    <ArchNode title="VEEX Runtime" subtitle="Core Industrial OS" :icon="Cpu" color-class="border-emerald-700" bg-class="bg-emerald-700" text-class="text-emerald-700" :x="570" :y="180" :delay="0.3" />
    <ArchNode title="VEEX CLI" subtitle="Swiss Army Knife" :icon="Terminal" color-class="border-amber-500" bg-class="bg-amber-500" text-class="text-amber-600" :x="350" :y="640" :delay="0.5" />
    <ArchNode title="Industrial Device" subtitle="ESP32 / M5Stack" :icon="Zap" color-class="border-amber-600" bg-class="bg-amber-600" text-class="text-amber-700" :x="350" :y="720" :delay="0.6" />
    <div class="absolute top-[220px] left-[260px] text-[8px] font-bold text-blue-600 bg-blue-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-blue-200/50 arch-label" style="animation-delay: 1.2s">EXPORT VDL</div>
    <div class="absolute top-[300px] left-[260px] text-[8px] font-bold text-blue-600 bg-blue-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-blue-200/50 arch-label" style="animation-delay: 1.4s">SIGNED ARTIFACT</div>
    <div class="absolute top-[470px] left-[260px] text-[8px] font-bold text-blue-600 bg-blue-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-blue-200/50 arch-label" style="animation-delay: 1.8s">EXECUTES .VEX</div>
    <div class="absolute top-[470px] left-[700px] text-[8px] font-bold text-emerald-600 bg-emerald-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-emerald-200/50 arch-label" style="animation-delay: 1.9s">OTA UPDATE</div>
    <div class="absolute top-[320px] left-[470px] text-[8px] font-bold text-indigo-600 bg-indigo-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-indigo-200/50 arch-label" style="animation-delay: 2.2s">PULL / PUSH</div>
    <div class="absolute top-[680px] left-[370px] text-[8px] font-bold text-amber-600 bg-amber-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-amber-200/50 arch-label" style="animation-delay: 2.6s">FLASH / SIM</div>
    <div class="absolute top-[500px] left-[500px] text-[8px] font-bold text-blue-600 bg-blue-50/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-blue-200/50 arch-label" style="animation-delay: 2.4s">CLOUD - DEV</div>
  </div>
</template>

<script setup lang="ts">
import { Cpu, Terminal, Database, Zap, Radio, Code2 } from 'lucide-vue-next'
import GroupBox from './SystemArchitectureGroup.vue'
import ArchNode from './SystemArchitectureNode.vue'
</script>

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

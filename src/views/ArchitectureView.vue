<template>
  <div class="flex-1 flex flex-col min-h-0 relative">
    <Header title="Network Topology" description="Comprehensive structural mapping of the VEEX edge-to-cloud ecosystem." />
    
    <div class="flex-1 p-8 space-y-8 overflow-y-auto z-10 custom-scrollbar">
      <div class="flex items-center justify-between mb-2">
        <div class="flex gap-4">
          <div class="flex items-center gap-2 group cursor-help">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span class="text-[9px] font-black tracking-widest text-slate-500 uppercase group-hover:text-emerald-400 transition-colors">Edge Runtime</span>
          </div>
          <div class="flex items-center gap-2 group cursor-help">
            <div class="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
            <span class="text-[9px] font-black tracking-widest text-slate-500 uppercase group-hover:text-amber-400 transition-colors">Dev Bridge</span>
          </div>
          <div class="flex items-center gap-2 group cursor-help">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <span class="text-[9px] font-black tracking-widest text-slate-500 uppercase group-hover:text-blue-400 transition-colors">Cloud Core</span>
          </div>
        </div>
        <div class="glass px-4 py-1.5 rounded-2xl border border-white/5 flex items-center gap-2 shadow-inner group cursor-pointer hover:border-primary/40 transition-all">
          <Share2 :size="14" class="text-primary" />
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">Live Schematic</span>
        </div>
      </div>

      <!-- Diagram Container -->
      <div class="glass-premium rounded-[3rem] overflow-hidden border border-white/[0.05] shadow-2xl relative min-h-[900px]">
         <SystemArchitecture />
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
        <div
          v-for="(feat, i) in features"
          :key="i"
          class="glass-premium p-8 rounded-[2.5rem] border border-white/[0.03] hover:border-white/[0.1] transition-all group relative overflow-hidden active:scale-95 cursor-default"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
          <div class="flex items-center gap-4 mb-6">
            <div :class="['p-3 rounded-2xl bg-black/40 border border-white/5 group-hover:scale-110 transition-transform shadow-lg', feat.color]">
              <Info :size="18" class="filter drop-shadow-[0_0_8px_currentColor]" />
            </div>
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-white leading-none group-hover:text-gradient transition-all">{{ feat.title }}</h3>
          </div>
          <p class="text-[11px] font-bold text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">
            {{ feat.desc }}
          </p>
          <div class="absolute -bottom-4 -right-4 w-16 h-16 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-colors"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Info, Share2 } from 'lucide-vue-next'
import Header from '@/components/shared/Header.vue'
import SystemArchitecture from '@/components/shared/SystemArchitecture.vue'

const features = [
  { 
    title: 'Edge Processing', 
    color: 'text-emerald-500',
    desc: 'VEEX Runtime executes encrypted .vex artifacts directly on low-power hardware. Native drivers manage real-time I/O with microsecond precision and hardware-level isolation.' 
  },
  { 
    title: 'Dev Lifecycle', 
    color: 'text-amber-500',
    desc: 'The VEEX CLI acts as the secure bridge for local flashing and cloud orchestration. Enabling zero-config prototyping with the ESP32 and M5Stack industrial ecosystems.' 
  },
  { 
    title: 'Cloud Core', 
    color: 'text-blue-500',
    desc: 'Studio compiles high-level VDL into signed binaries via the distributed Builder. Registry handles global versioning, tiered distribution, and atomic OTA campaigns.' 
  }
]
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
</style>

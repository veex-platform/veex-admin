<template>
  <header class="h-16 border-b border-white/[0.03] bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
    <div class="flex items-center gap-8">
      <div class="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full shadow-inner">
        <span class="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse-slow"></span>
        <span class="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Live-Sync</span>
      </div>
      <div class="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        <div class="flex items-center gap-2 group cursor-pointer hover:text-secondary transition-colors">
          <Activity :size="14" class="text-secondary/50 group-hover:text-secondary transition-colors" />
          <span>Ingest: <span class="text-white">Active</span></span>
        </div>
        <div class="w-[1px] h-3 bg-white/10"></div>
        <div class="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
          <Cpu :size="14" class="text-primary/50 group-hover:text-primary transition-colors" />
          <span>Pulse: <span class="text-white">{{ stats.devices }} Nodes</span></span>
        </div>
        <div class="w-[1px] h-3 bg-white/10"></div>
        <div class="flex items-center gap-2 group cursor-pointer hover:text-destructive transition-colors">
          <AlertTriangle :size="14" class="text-destructive/50 group-hover:text-destructive transition-colors" />
          <span>Alerts: <span class="text-white">0</span></span>
        </div>
      </div>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="relative hidden xl:block">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" :size="14" />
        <input
          type="text"
          placeholder="SEARCH REGISTRY..."
          class="bg-white/5 border border-white/5 rounded-2xl py-2 pl-10 pr-4 text-[10px] font-bold tracking-widest text-white placeholder:text-slate-600 focus:border-primary/40 focus:bg-white/[0.08] outline-none transition-all w-72 shadow-inner"
        />
      </div>
      
      <div class="flex items-center bg-white/5 rounded-2xl p-1 border border-white/5">
        <button class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all relative group">
          <Bell :size="18" />
          <span class="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-destructive rounded-full border border-black group-hover:scale-125 transition-transform"></span>
        </button>
        <button class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings :size="18" />
        </button>
      </div>

      <div class="w-[1px] h-6 bg-white/10 mx-1"></div>

      <button class="flex items-center gap-3 hover:bg-white/5 pl-1.5 pr-4 py-1.5 rounded-2xl transition-all border border-transparent hover:border-white/5 group">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg group-hover:border-primary/50 transition-colors">
          <User :size="16" class="text-slate-400 group-hover:text-white transition-colors" />
        </div>
        <div class="text-left leading-none hidden sm:block">
          <p class="text-[10px] font-black text-white tracking-tight">ADMIN_ROOT</p>
          <p class="text-[8px] font-bold text-slate-500 mt-1 uppercase">SysOp Level 4</p>
        </div>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bell, User, Search, Activity, Cpu, AlertTriangle, Settings } from 'lucide-vue-next'

defineProps<{ title: string; description?: string }>()

const stats = ref({ devices: 0, alerts: 0, status: 'offline' })
const registryBase = import.meta.env.VITE_REGISTRY_URL || 'https://registry.veexplatform.com/api/v1'

onMounted(async () => {
  try {
    const res = await fetch(`${registryBase}/admin/stats`)
    if (res.ok) {
      const data = await res.json()
      stats.value = {
        devices: data.devices,
        alerts: 0,
        status: data.status === 'operational' ? 'Online' : 'Partial'
      }
    }
  } catch {
    /* noop */
  }
})
</script>

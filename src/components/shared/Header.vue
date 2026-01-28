<template>
  <header class="h-16 border-b border-white/5 bg-[#0a0b10]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
        <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Production</span>
      </div>
      <div class="hidden md:flex items-center gap-4 text-xs">
        <div class="flex items-center gap-2">
          <Activity :size="14" class="text-secondary" />
          <span class="text-slate-400">Registry:</span>
          <span class="text-secondary font-bold">{{ stats.status }}</span>
        </div>
        <div class="w-[1px] h-4 bg-white/10"></div>
        <div class="flex items-center gap-2">
          <Cpu :size="14" class="text-primary" />
          <span class="text-slate-400">Devices:</span>
          <span class="text-white font-bold">{{ stats.devices.toLocaleString() }}</span>
        </div>
        <div class="w-[1px] h-4 bg-white/10"></div>
        <div class="flex items-center gap-2">
          <AlertTriangle :size="14" class="text-destructive" />
          <span class="text-slate-400">Alerts:</span>
          <span class="text-destructive font-bold">{{ stats.alerts }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="relative hidden lg:block">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" :size="16" />
        <input
          type="text"
          placeholder="Search fleet..."
          class="bg-white/5 border border-white/10 rounded-xl py-1.5 pl-10 pr-4 text-xs focus:border-primary outline-none transition-all w-64"
        />
      </div>
      <button class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
        <Bell :size="18" />
        <span class="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-[#0a0b10]"></span>
      </button>
      <button class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
        <Moon :size="18" />
      </button>
      <div class="w-[1px] h-6 bg-white/10 mx-1"></div>
      <button class="flex items-center gap-2 hover:bg-white/5 p-1.5 rounded-xl transition-all">
        <div class="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
          <User :size="16" class="text-slate-400" />
        </div>
        <span class="text-xs font-bold text-slate-300 hidden sm:block">Admin</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bell, Moon, User, Search, Activity, Cpu, AlertTriangle } from 'lucide-vue-next'

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

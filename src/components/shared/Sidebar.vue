<template>
  <div class="w-68 h-screen glass-dark border-r border-white/[0.03] flex flex-col z-20 relative overflow-hidden">
    <!-- Top Decorative Glow -->
    <div class="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="p-8 flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-xl glass border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <RouterLink to="/">
          <img src="/assets/logo.svg" alt="VEEX" class="w-6 h-6 object-contain filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </RouterLink>
      </div>
      <div>
        <h1 class="text-sm font-black text-white tracking-widest uppercase leading-none">VEEX</h1>
        <p class="text-[8px] font-bold text-slate-500 tracking-[0.2em] mt-1 uppercase">Admin Console</p>
      </div>
    </div>

    <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
      <RouterLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden border border-transparent"
        :class="route.path === item.href
          ? 'glass-premium text-white border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
          : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.02] hover:border-white/[0.05]'"
      >
        <div class="flex items-center gap-3.5 relative z-10">
          <component :is="item.icon" :size="19" :class="route.path === item.href ? 'text-primary filter drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]' : 'group-hover:text-slate-300 transition-colors'" />
          <span class="text-[13px] font-bold tracking-tight">{{ item.name }}</span>
        </div>
        
        <!-- Active Indicator -->
        <div v-if="route.path === item.href" class="w-1 h-5 rounded-full bg-primary relative z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        <ChevronRight v-else :size="12" class="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-slate-600" />
      </RouterLink>
    </nav>

    <div class="p-6 mt-auto">
      <div class="glass-premium p-4 rounded-3xl border border-white/[0.05] group cursor-pointer hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 w-12 h-12 bg-secondary/5 blur-2xl rounded-full"></div>
        <div class="flex items-center gap-3 relative z-10">
          <div class="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors shadow-lg shadow-black/40">
            <span class="text-[10px] font-black text-white/50">AD</span>
          </div>
          <div class="flex-1 overflow-hidden">
            <p class="text-xs font-black text-white truncate tracking-tight">System Admin</p>
            <div class="flex items-center gap-1 mt-0.5">
              <div class="w-1 h-1 rounded-full bg-secondary animate-pulse"></div>
              <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Master Node</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  Cpu,
  Network,
  Zap,
  BarChart3,
  Settings,
  Share2,
  ChevronRight
} from 'lucide-vue-next'

const route = useRoute()
const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Devices', href: '/devices', icon: Cpu },
  { name: 'Fleets', href: '/fleets', icon: Network },
  { name: 'OTA', href: '/ota', icon: Zap },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'System', href: '/architecture', icon: Share2 },
  { name: 'Settings', href: '/settings', icon: Settings }
]
</script>

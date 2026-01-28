<template>
  <div class="w-64 h-screen bg-[#0d0f14] border-r border-white/5 flex flex-col z-20">
    <div class="p-6 flex items-center justify-center">
      <RouterLink to="/" class="group">
        <img
          src="/assets/logo.svg"
          alt="VEEX Logo"
          class="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(59,130,246,0.25)] group-hover:drop-shadow-[0_0_18px_rgba(59,130,246,0.4)] transition-all duration-300"
        />
      </RouterLink>
    </div>
    <nav class="flex-1 px-4 py-4 space-y-1">
      <RouterLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300"
        :class="route.path === item.href
          ? 'bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(59,130,246,0.1)] border border-primary/20'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'"
      >
        <div class="flex items-center gap-3">
          <component :is="item.icon" :size="20" :class="route.path === item.href ? 'text-primary filter drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]' : ''" />
          <span class="text-sm font-medium">{{ item.name }}</span>
        </div>
        <ChevronRight v-if="route.path === item.href" :size="14" class="text-primary" />
      </RouterLink>
    </nav>
    <div class="p-4 mt-auto border-t border-white/5">
      <div class="flex items-center gap-3 p-2 rounded-xl bg-white/5">
        <div class="w-8 h-8 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center">
          <span class="text-[10px] font-bold">ADM</span>
        </div>
        <div class="flex-1 overflow-hidden">
          <p class="text-xs font-bold text-white truncate">Administrator</p>
          <p class="text-[10px] text-slate-500 uppercase tracking-wider">Production</p>
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

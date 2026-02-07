<template>
  <div class="flex-1 p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-64px)]">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="glass p-5 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer"
        :class="stat.glow"
      >
        <div class="flex justify-between items-start mb-4">
          <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500">{{ stat.label }}</span>
          <div :class="['p-2 rounded-lg bg-white/5', stat.color]">
            <component :is="stat.icon" :size="16" />
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <h2 class="text-3xl font-black text-white">{{ stat.value }}</h2>
          <span v-if="stat.sub" class="text-[10px] font-bold text-slate-500">{{ stat.sub }}</span>
        </div>
        <div class="absolute bottom-0 right-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
          <component :is="stat.icon" :size="80" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 glass p-6 rounded-3xl space-y-4">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-sm font-bold uppercase tracking-widest text-white">Connection Status</h3>
            <p class="text-[10px] text-slate-500">Flux monitoring last 24 hours</p>
          </div>
          <div class="flex gap-2">
            <button class="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all">
              <BarChart3 :size="14" />
            </button>
            <button class="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all">
              <Settings :size="14" />
            </button>
          </div>
        </div>
        <div class="h-64 relative flex items-end gap-1">
          <svg viewBox="0 0 800 200" class="w-full h-full">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.5" />
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,60 L800,200 L0,200 Z" fill="url(#lineGrad)" />
            <path d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,60" fill="none" stroke="#3b82f6" stroke-width="3" filter="drop-shadow(0 0 10px rgba(59,130,246,0.5))" class="chart-line" />
            <line v-for="y in [0, 50, 100, 150]" :key="y" x1="0" :y1="y" x2="800" :y2="y" stroke="white" stroke-opacity="0.05" />
          </svg>
          <div class="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] font-bold text-slate-600 px-2 pt-4 border-t border-white/5">
            <span>07 AM</span><span>10 AM</span><span>14 AM</span><span>18 PM</span><span>22 PM</span>
          </div>
        </div>
      </div>
      <div class="glass p-6 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center">
        <h3 class="absolute top-6 left-6 text-sm font-bold uppercase tracking-widest text-white/50">Global Distribution</h3>
        <div class="w-full aspect-square opacity-40 group-hover:opacity-100 transition-all duration-700">
          <svg viewBox="0 0 200 120" class="w-full h-full fill-slate-700">
            <path d="M25,40 Q30,35 40,38 T60,35 T85,45 T110,40 T140,50 T180,45 L180,90 Q150,95 120,90 T80,95 T40,90 Z" />
            <circle cx="45" cy="45" r="2" fill="#10b981" class="animate-pulse" />
            <circle cx="120" cy="55" r="2" fill="#3b82f6" class="animate-pulse" />
            <circle cx="160" cy="80" r="2" fill="#f59e0b" class="animate-pulse" />
          </svg>
        </div>
        <div class="mt-4 flex gap-6">
          <div class="text-center">
            <p class="text-[10px] font-bold text-slate-500 uppercase">Active Nodes</p>
            <p class="text-xl font-black text-white">412</p>
          </div>
          <div class="text-center">
            <p class="text-[10px] font-bold text-slate-500 uppercase">Latency</p>
            <p class="text-xl font-black text-secondary">18ms</p>
          </div>
        </div>
      </div>
    </div>
    <div class="glass p-6 rounded-3xl">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <TrendingUp :size="18" class="text-primary" />
          <h3 class="text-sm font-bold uppercase tracking-widest text-white">System Event Log</h3>
        </div>
        <button class="text-[10px] font-bold text-primary hover:underline">VIEW ALL LOGS</button>
      </div>
      <div class="space-y-2">
        <div
          v-for="(log, idx) in logs"
          :key="idx"
          class="flex items-center gap-4 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 cursor-pointer group"
        >
          <div :class="['w-1 h-8 rounded-full', log.color, 'group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]']"></div>
          <span class="text-xs font-mono text-slate-500">{{ log.time }}</span>
          <span class="text-xs font-bold text-slate-300 flex-1">{{ log.message }}</span>
          <div class="px-2 py-0.5 rounded-md bg-white/5 text-[8px] font-bold uppercase text-slate-500 group-hover:text-white transition-all">DETAILS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Cpu, Network, Zap, AlertTriangle, TrendingUp, BarChart3, Settings } from 'lucide-vue-next'

const dashboardStats = ref({
  devices: '0',
  fleets: '0',
  campaigns: '0',
  status: 'loading',
  version: 'v1.0.0'
})

const registryBase = import.meta.env.VITE_REGISTRY_URL || 'https://registry.veexplatform.com/api/v1'

const stats = computed(() => [
  { label: 'Connected Devices', value: dashboardStats.value.devices, icon: Cpu, color: 'text-primary', glow: 'glow-blue' },
  { label: 'Active Fleets', value: dashboardStats.value.fleets, icon: Network, color: 'text-secondary', glow: 'glow-green' },
  { label: 'OTA Campaigns', value: dashboardStats.value.campaigns, sub: 'Running', icon: Zap, color: 'text-amber-500', glow: 'glow-amber' },
  { label: 'System Status', value: dashboardStats.value.status.toUpperCase(), icon: AlertTriangle, color: dashboardStats.value.status === 'operational' ? 'text-secondary' : 'text-destructive', glow: dashboardStats.value.status === 'operational' ? 'glow-green' : 'glow-red' }
])

const logs = [
  { time: '12:45', type: 'alert', message: 'Device VX-102 Offline', color: 'bg-destructive' },
  { time: '12:37', type: 'info', message: 'OTA Update Campaign #21 Started', color: 'bg-secondary' },
  { time: '12:30', type: 'fleet', message: 'Fleet North Zone Updated', color: 'bg-primary' },
  { time: '12:15', type: 'info', message: 'Device VX-230 Rebooted', color: 'bg-amber-500' }
]

let intervalId: ReturnType<typeof setInterval>
onMounted(async () => {
  const fetchStats = async () => {
    try {
      const res = await fetch(`${registryBase}/admin/stats`)
      if (res.ok) {
        const data = await res.json()
        dashboardStats.value = {
          devices: data.devices.toString(),
          fleets: data.fleets.toString(),
          campaigns: data.campaigns.toString(),
          status: data.status,
          version: data.version
        }
      }
    } catch {
      /* noop */
    }
  }
  await fetchStats()
  intervalId = setInterval(fetchStats, 30000)
})
onBeforeUnmount(() => clearInterval(intervalId))
</script>

<style scoped>
.chart-line {
  animation: draw 2s ease-in-out forwards;
}
@keyframes draw {
  from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
  to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
}
</style>

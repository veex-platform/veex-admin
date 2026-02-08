<template>
  <div class="flex-1 p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-64px)] relative">
    <!-- Header -->
    <div class="flex justify-between items-end mb-2">
      <div>
        <h2 class="text-2xl font-black text-white tracking-tight flex items-center gap-3">
          <LayoutDashboard :size="24" class="text-primary" />
          <span class="text-gradient">Fleet Oversight</span>
        </h2>
        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Real-time performance metrics</p>
      </div>
      <div class="flex gap-2">
        <div class="glass px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
          <span class="text-[9px] font-black text-white/50 tracking-widest uppercase">System Operational</span>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="glass-premium p-6 rounded-[2.5rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 cursor-pointer border border-white/[0.03] hover:border-white/[0.1] active:scale-95"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
        
        <div class="flex justify-between items-start mb-6 relative z-10">
          <div class="p-3.5 rounded-2xl bg-black/40 border border-white/5 group-hover:border-primary/20 transition-colors shadow-inner">
            <component :is="stat.icon" :size="20" :class="stat.color" class="filter drop-shadow-[0_0_8px_currentColor]" />
          </div>
          <div class="flex flex-col items-end">
            <span class="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{{ stat.label }}</span>
            <div class="flex items-center gap-1 mt-1">
              <TrendingUp :size="10" class="text-secondary" />
              <span class="text-[9px] font-bold text-secondary tracking-tighter">+12.5%</span>
            </div>
          </div>
        </div>

        <div class="flex items-baseline gap-2 relative z-10">
          <h2 class="text-4xl font-black text-white tracking-tighter group-hover:text-primary transition-colors duration-500">{{ stat.value }}</h2>
          <span v-if="stat.sub" class="text-[11px] font-black text-slate-500 group-hover:text-slate-400 transition-colors uppercase tracking-widest">{{ stat.sub }}</span>
        </div>

        <!-- Decorative Stat Line -->
        <div class="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
          <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full w-2/3 group-hover:w-full transition-all duration-1000"></div>
        </div>

        <div class="absolute -bottom-6 -right-6 opacity-[0.03] transform group-hover:scale-110 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-all duration-700">
          <component :is="stat.icon" :size="120" />
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Logic Visualization Chart -->
      <div class="lg:col-span-2 glass-premium p-8 rounded-[3rem] space-y-6 border border-white/[0.05] relative overflow-hidden">
        <div class="flex justify-between items-center relative z-10">
          <div>
            <h3 class="text-sm font-black uppercase tracking-widest text-white/90">Core Throughput</h3>
            <p class="text-[10px] font-bold text-slate-500 tracking-wider">Message processing latency (ms)</p>
          </div>
          <div class="flex gap-2">
            <button class="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-lg">
              <Maximize2 :size="14" />
            </button>
            <button class="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-lg">
              <Download :size="14" />
            </button>
          </div>
        </div>

        <!-- High-Fidelity SVG Chart -->
        <div class="h-72 relative flex items-end group">
          <svg viewBox="0 0 800 240" class="w-full h-full preserve-3d">
            <defs>
              <linearGradient id="mainGraphGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3" />
                <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.1" />
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            <!-- Grid Lines -->
            <line v-for="y in [40, 90, 140, 190, 240]" :key="y" x1="0" :y1="y" x2="800" :y2="y" stroke="white" stroke-opacity="0.03" stroke-dasharray="4" />
            
            <!-- Area Fill -->
            <path d="M0,180 C100,160 150,40 250,80 C350,120 400,200 500,160 C600,120 700,60 800,90 L800,240 L0,240 Z" fill="url(#mainGraphGrad)" class="chart-area" />
            
            <!-- Main Path -->
            <path d="M0,180 C100,160 150,40 250,80 C350,120 400,200 500,160 C600,120 700,60 800,90" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" filter="url(#glow)" class="chart-line-premium" />
            
            <!-- Dynamic Points -->
            <circle cx="250" cy="80" r="4" fill="#3b82f6" class="animate-pulse" />
            <circle cx="500" cy="160" r="4" fill="#3b82f6" class="animate-pulse" />
          </svg>
          
          <div class="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] font-black text-slate-600 px-4 pt-4 border-t border-white/[0.03] uppercase tracking-[0.2em]">
            <span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>00:00</span>
          </div>
        </div>
      </div>

      <!-- Activity Feed / Live Logs -->
      <div class="glass-premium p-8 rounded-[3rem] border border-white/[0.05] flex flex-col relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div class="flex justify-between items-center mb-8 relative z-10">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Activity :size="16" class="text-secondary" />
            </div>
            <h3 class="text-sm font-black uppercase tracking-widest text-white">Live Event Feed</h3>
          </div>
          <div class="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></div>
        </div>

        <div class="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar relative z-10">
          <div
            v-for="(log, idx) in logs"
            :key="idx"
            class="flex items-start gap-4 p-4 rounded-2xl bg-black/40 hover:bg-black/60 transition-all border border-white/[0.02] hover:border-white/10 group/item cursor-pointer shadow-xl shadow-black/20"
          >
            <div :class="['w-1 h-10 shrink-0 rounded-full bg-gradient-to-b', log.color]"></div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[9px] font-black font-mono text-slate-500 group-hover/item:text-primary transition-colors tracking-tighter">{{ log.time }} UTC</span>
                <span class="text-[8px] font-black text-slate-600 border border-white-5 px-1.5 py-0.5 rounded uppercase group-hover/item:text-white transition-colors">Details</span>
              </div>
              <p class="text-[11px] font-bold text-slate-300 leading-relaxed truncate">{{ log.message }}</p>
            </div>
          </div>
        </div>

        <button class="mt-8 w-full py-4 rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/5 active:scale-95 shadow-inner">
          Full Diagnostic Repository
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { 
  Cpu, Network, Zap, AlertTriangle, TrendingUp, Activity, 
  LayoutDashboard, Maximize2, Download 
} from 'lucide-vue-next'

const dashboardStats = ref({
  devices: '0',
  fleets: '0',
  campaigns: '0',
  status: 'loading',
  version: 'v1.0.0'
})

const registryBase = import.meta.env.VITE_REGISTRY_URL || 'https://registry.veexplatform.com/api/v1'

const stats = computed(() => [
  { label: 'Cloud Nodes', value: dashboardStats.value.devices, icon: Cpu, color: 'text-primary', glow: 'glow-blue' },
  { label: 'Active Grids', value: dashboardStats.value.fleets, icon: Network, color: 'text-secondary', glow: 'glow-green' },
  { label: 'OTA Pipeline', value: dashboardStats.value.campaigns, sub: 'Campaigns', icon: Zap, color: 'text-amber-500', glow: 'glow-amber' },
  { label: 'Flux Health', value: dashboardStats.value.status.toUpperCase(), icon: AlertTriangle, color: dashboardStats.value.status === 'operational' ? 'text-secondary' : 'text-destructive', glow: dashboardStats.value.status === 'operational' ? 'glow-green' : 'glow-red' }
])

const logs = ref([
  { time: '14:22:15', type: 'alert', message: 'Edge Node VX-ALPHA connection drift detected', color: 'from-destructive to-transparent' },
  { time: '14:20:01', type: 'info', message: 'Global Deployment Campaign #8B finalized', color: 'from-secondary to-transparent' },
  { time: '14:18:45', type: 'fleet', message: 'Registry optimized for low-latency ingest', color: 'from-primary to-transparent' },
  { time: '14:15:20', type: 'info', message: 'Master Controller VX-SYNC reboot success', color: 'from-amber-500 to-transparent' },
  { time: '14:12:05', type: 'alert', message: 'Sensor array SIGMA-4 reporting high jitter', color: 'from-destructive to-transparent' }
])

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
          status: data.status || 'operational',
          version: data.version
        }
      }
    } catch {
      dashboardStats.value.status = 'operational' // Fallback for demo
    }
  }
  await fetchStats()
  intervalId = setInterval(fetchStats, 15000)
})
onBeforeUnmount(() => clearInterval(intervalId))
</script>

<style scoped>
.chart-line-premium {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.chart-area {
  opacity: 0;
  animation: fadeIn 2s ease-out 1s forwards;
}

@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.2);
}
</style>

</style>

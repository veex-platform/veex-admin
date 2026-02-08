<template>
  <div class="flex-1 flex flex-col min-h-0 relative">
    <Header title="Device Registry" description="Global node orchestration and hardware lifecycle management." />
    
    <div class="flex-1 p-8 space-y-8 overflow-y-auto relative z-10 custom-scrollbar">
      <!-- Action Bar -->
      <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="flex gap-4">
          <button class="glass-premium px-6 py-2.5 rounded-2xl flex items-center gap-3 border border-white/5 hover:border-primary/40 transition-all hover:bg-white/[0.05] group">
            <Plus :size="16" class="text-primary group-hover:scale-125 transition-transform" />
            <span class="text-[10px] font-black uppercase tracking-widest text-slate-300">Provision Node</span>
          </button>
          <button @click="fetchDevices" class="p-2.5 rounded-2xl glass-premium border border-white/5 text-slate-400 hover:text-white transition-all">
            <RefreshCw :size="16" :class="{ 'animate-spin': loading }" />
          </button>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="glass flex items-center px-4 py-1 rounded-2xl border border-white/5">
            <span class="text-[9px] font-black text-slate-500 mr-3 uppercase">Status:</span>
            <div class="flex gap-2">
              <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <div class="w-2 h-2 rounded-full bg-amber-500/20"></div>
              <div class="w-2 h-2 rounded-full bg-destructive/20"></div>
            </div>
          </div>
          <div class="h-8 w-[1px] bg-white/10 hidden md:block"></div>
          <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{{ devices.length }} Total Entities Registered</p>
        </div>
      </div>

      <!-- Main Registry Table -->
      <div class="glass-premium rounded-[2.5rem] overflow-hidden border border-white/[0.05] shadow-2xl relative">
        <div class="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
        <table class="w-full text-left border-collapse relative z-10">
          <thead>
            <tr class="bg-black/20 border-b border-white/[0.03]">
              <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Node Identifier</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Hardware Profile</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Last Heartbeat</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Runtime Status</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/[0.02]">
            <tr v-if="devices.length === 0 && !loading" class="group">
              <td colspan="5" class="px-8 py-20 text-center">
                <div class="flex flex-col items-center gap-4 opacity-30 group-hover:opacity-50 transition-opacity">
                  <Cpu :size="48" class="text-slate-500" />
                  <p class="text-xs font-bold uppercase tracking-widest text-slate-500">No active entities detected in registry</p>
                </div>
              </td>
            </tr>
            <tr v-for="device in devices" :key="device.id" class="hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-colors shadow-lg">
                    <HardDrive :size="18" class="text-slate-500 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p class="text-sm font-black text-white tracking-tight">{{ device.id }}</p>
                    <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{{ device.version || 'v0.0.0-UNSPECIFIED' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black text-slate-300 uppercase tracking-widest">Generic Edge</span>
                  <span class="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">M5STACK</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex flex-col">
                  <span class="text-xs font-mono text-slate-300">{{ device.last_seen || 'PENDING' }}</span>
                  <span class="text-[8px] font-black text-slate-600 mt-1 uppercase">Cloud Managed</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <div class="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-30"></div>
                  </div>
                  <span class="text-[10px] font-black text-white/90 uppercase tracking-widest">Active Pulse</span>
                </div>
              </td>
              <td class="px-8 py-6 text-right">
                <div class="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button class="p-2 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary transition-all border border-transparent hover:border-primary/30 shadow-lg" title="Remote Flash">
                    <Zap :size="14" />
                  </button>
                  <button class="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:text-amber-500 transition-all border border-transparent hover:border-amber-500/30 shadow-lg" title="Node Reset">
                    <RefreshCw :size="14" />
                  </button>
                  <button class="p-2 rounded-xl bg-white/5 hover:bg-destructive/20 hover:text-destructive transition-all border border-transparent hover:border-destructive/30 shadow-lg" title="Decommission">
                    <X :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Footer Info -->
      <div class="flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity px-4">
        <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Activity :size="12" />
          WebSocket Uplink: <span class="text-secondary">CONNECTED</span>
        </p>
        <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          Sync Interval: 30s
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/shared/Header.vue'
import { 
  Plus, RefreshCw, HardDrive, Cpu, Zap, X, Activity, 
  ChevronRight, MoreVertical 
} from 'lucide-vue-next'

interface Device {
  id: string
  version?: string
  last_seen?: string
  status: string
}

const devices = ref<Device[]>([])
const loading = ref(false)
const registryBase = import.meta.env.VITE_REGISTRY_URL || 'https://registry.veexplatform.com/api/v1'
let socket: WebSocket | null = null

const fetchDevices = async () => {
  loading.value = true
  try {
    const res = await fetch(`${registryBase}/admin/devices`)
    if (res.ok) devices.value = await res.json()
  } catch {
    devices.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchDevices()

  // WebSocket Connection
  const wsUrl = registryBase.replace(/^http/, 'ws') + '/ws'
  console.log('Connecting to WS:', wsUrl)
  
  try {
    socket = new WebSocket(wsUrl)
    
    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.type === 'device_registered' || msg.type === 'device_heartbeat') {
          fetchDevices()
        }
      } catch (e) {
        /* silent */
      }
    }
  } catch (e) {
    /* silent */
  }
})

onUnmounted(() => {
  if (socket) socket.close()
})
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

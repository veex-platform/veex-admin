<template>
  <div>
    <Header title="Devices" description="Manage and monitor all registered industrial devices" />
    <div class="p-8">
      <div class="glass rounded-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-slate-800/50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Device ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Version</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Last Seen</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-if="devices.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-slate-400">No devices registered yet</td>
            </tr>
            <tr v-for="device in devices" :key="device.id" class="hover:bg-slate-800/30">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-white">{{ device.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{{ device.version || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{{ device.last_seen || 'Never' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400">Online</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '@/components/shared/Header.vue'

interface Device {
  id: string
  version?: string
  last_seen?: string
  status: string
}

const devices = ref<Device[]>([])
const registryBase = import.meta.env.VITE_REGISTRY_URL || 'https://registry.veexplatform.com/api/v1'

onMounted(async () => {
  try {
    const res = await fetch(`${registryBase}/admin/devices`)
    if (res.ok) devices.value = await res.json()
  } catch {
    devices.value = []
  }
})
</script>

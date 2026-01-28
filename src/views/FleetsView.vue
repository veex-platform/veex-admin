<template>
  <div>
    <Header title="Fleets" description="Organize and manage device groups" />
    <div class="p-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-if="fleets.length === 0" class="col-span-full glass rounded-lg p-8 text-center">
          <p class="text-slate-400">No fleets created yet</p>
        </div>
        <div
          v-for="fleet in fleets"
          :key="fleet.id"
          class="glass rounded-lg p-6 hover:border-blue-500/50 cursor-pointer"
        >
          <h3 class="text-lg font-semibold text-white">{{ fleet.name }}</h3>
          <p class="mt-2 text-sm text-slate-400">{{ fleet.description || 'No description' }}</p>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-slate-500">{{ fleet.device_count || 0 }} devices</span>
            <span class="text-xs text-slate-600">ID: {{ fleet.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '@/components/shared/Header.vue'

interface Fleet {
  id: string
  name: string
  description?: string
  device_count?: number
}

const fleets = ref<Fleet[]>([])
const registryBase = import.meta.env.VITE_REGISTRY_URL || 'https://registry.veexplatform.com/api/v1'

onMounted(async () => {
  try {
    const res = await fetch(`${registryBase}/admin/fleets`)
    if (res.ok) fleets.value = await res.json()
  } catch {
    fleets.value = []
  }
})
</script>

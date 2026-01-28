<template>
  <div>
    <Header title="OTA Campaigns" description="Manage over-the-air firmware updates" />
    <div class="p-8">
      <div class="space-y-4">
        <div v-if="campaigns.length === 0" class="glass rounded-lg p-8 text-center">
          <p class="text-slate-400">No OTA campaigns yet</p>
        </div>
        <div v-for="campaign in campaigns" :key="campaign.id" class="glass rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-white">{{ campaign.name }}</h3>
              <p class="mt-1 text-sm text-slate-400">Fleet: {{ campaign.fleet_id }} - Version: {{ campaign.version }}</p>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                {{ campaign.status || 'Pending' }}
              </span>
              <p class="mt-1 text-xs text-slate-500">{{ campaign.created_at }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '@/components/shared/Header.vue'

interface Campaign {
  id: string
  name: string
  fleet_id: string
  version: string
  status: string
  created_at: string
}

const campaigns = ref<Campaign[]>([])
const registryBase = import.meta.env.VITE_REGISTRY_URL || 'https://registry.veexplatform.com/api/v1'

onMounted(async () => {
  try {
    const res = await fetch(`${registryBase}/admin/ota/campaigns`)
    if (res.ok) campaigns.value = await res.json()
  } catch {
    campaigns.value = []
  }
})
</script>

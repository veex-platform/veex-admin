import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import DevicesView from '@/views/DevicesView.vue'
import FleetsView from '@/views/FleetsView.vue'
import OtaView from '@/views/OtaView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import ArchitectureView from '@/views/ArchitectureView.vue'
import SettingsView from '@/views/SettingsView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Dashboard', component: DashboardView },
  { path: '/devices', name: 'Devices', component: DevicesView },
  { path: '/fleets', name: 'Fleets', component: FleetsView },
  { path: '/ota', name: 'OTA', component: OtaView },
  { path: '/analytics', name: 'Analytics', component: AnalyticsView },
  { path: '/architecture', name: 'Architecture', component: ArchitectureView },
  { path: '/settings', name: 'Settings', component: SettingsView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

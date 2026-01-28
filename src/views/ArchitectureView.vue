<template>
  <div class="flex-1">
    <Header title="System Architecture" description="Comprehensive view of industrial edge-to-cloud mapping." />
    <section class="p-6">
      <div class="container-fluid mx-auto">
        <div class="flex items-center justify-between mb-6">
          <div class="flex gap-4">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span class="text-xs font-bold text-slate-600">EDGE</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
              <span class="text-xs font-bold text-slate-600">DEVELOPER</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              <span class="text-xs font-bold text-slate-600">CLOUD</span>
            </div>
          </div>
          <div class="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
            <Share2 :size="14" />
            <span class="text-[10px] font-bold uppercase tracking-wider">Interactive Live View</span>
          </div>
        </div>
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 elevation-2">
          <SystemArchitecture />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div class="flex items-center gap-2 text-emerald-600 mb-3">
              <Info :size="16" />
              <h3 class="text-sm font-bold uppercase tracking-tight">Edge Processing</h3>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">
              VEEX Runtime executes encrypted .vex artifacts directly on low-power hardware.
              Drivers manage real-time I/O with microsecond precision.
            </p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div class="flex items-center gap-2 text-amber-600 mb-3">
              <Info :size="16" />
              <h3 class="text-sm font-bold uppercase tracking-tight">Dev Lifecycle</h3>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">
              CLI acts as the bridge for local flashing and cloud synchronization.
              Enables rapid prototyping with ESP32 and M5Stack ecosystems.
            </p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div class="flex items-center gap-2 text-blue-600 mb-3">
              <Info :size="16" />
              <h3 class="text-sm font-bold uppercase tracking-tight">Cloud Orchestration</h3>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">
              Studio compiles VDL into signed binaries via the Builder module.
              Registry handles versioning, global distribution, and batch OTA campaigns.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Info, Share2 } from 'lucide-vue-next'
import Header from '@/components/shared/Header.vue'
import SystemArchitecture from '@/components/shared/SystemArchitecture.vue'
</script>

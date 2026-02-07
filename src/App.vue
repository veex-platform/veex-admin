<template>
  <div class="flex h-screen w-screen bg-background text-foreground">
    <Sidebar />
    <div class="flex flex-col flex-1 min-h-0 relative">
      <main class="flex-1 flex flex-col min-h-0 overflow-hidden">
        <RouterView />
      </main>
      <footer class="h-10 border-t border-white/5 bg-[#0a0b10] flex items-center justify-between px-6 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
        <div class="flex items-center gap-4">
          <span>&copy; 2026 VEEX PLATFORM</span>
          <span class="text-white/10">|</span>
          <span>INDUSTRIAL GRADE CORE v1.3.0</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1">
            <div class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
            <span>SYSTEM STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/shared/Sidebar.vue'
</script>

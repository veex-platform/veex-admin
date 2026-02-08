<template>
  <div class="flex h-screen w-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
    <Sidebar />
    <div class="flex flex-col flex-1 min-h-0 relative">
      <main class="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        <!-- Background Glow Overlay -->
        <div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#3b82f630,transparent_50%)]"></div>
        <RouterView class="relative z-10" />
      </main>
      <footer class="h-10 border-t border-white/[0.03] bg-black/40 backdrop-blur-md flex items-center justify-between px-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <span class="text-white/20">© 2026</span>
            <span class="text-white/60 tracking-tight">VEEX PLATFORM</span>
          </div>
          <div class="h-1.5 w-1.5 rounded-full bg-white/10"></div>
          <span class="text-white/30">LTS CORE v1.4.2-STABLE</span>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2 group cursor-help">
            <div class="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse-slow"></div>
            <span class="group-hover:text-secondary transition-colors">GATEWAY CONNECTED</span>
          </div>
          <div class="flex items-center gap-2 group cursor-help">
            <div class="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div>
            <span class="group-hover:text-amber-500 transition-colors">DB SYNC: OK</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/shared/Sidebar.vue'
</script>

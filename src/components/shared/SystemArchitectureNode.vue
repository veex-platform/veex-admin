<template>
  <div
    class="absolute z-10 p-5 rounded-2xl border w-64 bg-black/40 backdrop-blur-xl transition-all duration-500 arch-node hover:shadow-2xl hover:scale-[1.05] hover:border-primary/40 group active:scale-95 cursor-pointer"
    :class="colorClass"
    :style="{ left: x + 'px', top: y + 'px', animationDelay: (delay ?? 0) + 's' }"
  >
    <div class="flex items-center gap-4">
      <div :class="['p-3 rounded-xl bg-black/40 border border-white/5 transition-colors group-hover:border-primary/20', bgClass]">
        <component :is="icon" :size="20" :class="textClass" class="filter drop-shadow-[0_0_8px_currentColor]" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] leading-none text-white group-hover:text-primary transition-colors truncate">{{ title }}</h4>
        <p class="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest leading-none">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  icon: unknown
  colorClass: string
  bgClass: string
  textClass: string
  x: number
  y: number
  delay?: number
}>()
</script>

<style scoped>
.arch-node {
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
  animation: nodeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
.arch-node:nth-child(1) { animation-delay: 0.2s; }
.arch-node:nth-child(2) { animation-delay: 0.3s; }
.arch-node:nth-child(3) { animation-delay: 0.4s; }
@keyframes nodeIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>

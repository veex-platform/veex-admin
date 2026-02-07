<template>
  <div
    class="absolute z-10 p-4 rounded-xl shadow-lg border-2 w-56 bg-white backdrop-blur-sm transition-all duration-300 arch-node hover:shadow-xl hover:scale-[1.08] hover:-translate-y-1"
    :class="colorClass"
    :style="{ left: x + 'px', top: y + 'px', animationDelay: (delay ?? 0) + 's' }"
  >
    <div class="flex items-center gap-3">
      <div :class="['p-2 rounded-lg bg-opacity-10', bgClass]">
        <component :is="icon" :size="20" :class="textClass" />
      </div>
      <div>
        <h4 class="text-[11px] font-bold uppercase tracking-wider leading-none text-slate-800">{{ title }}</h4>
        <p class="text-[10px] text-slate-500 mt-1 font-medium">{{ subtitle }}</p>
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

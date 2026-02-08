<template>
  <div
    class="absolute rounded-[2rem] border border-dashed z-0 p-6 shadow-2xl arch-group bg-black/20 backdrop-blur-md"
    :class="colorClass"
    :style="{ left: x + 'px', top: y + 'px', width: width + 'px', height: height + 'px', animationDelay: (delay ?? 0) + 's' }"
  >
    <div class="text-[9px] font-black uppercase tracking-[0.3em] mb-4 text-center opacity-60 group-hover:opacity-100 transition-opacity" :class="textClass">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  colorClass: string
  textClass: string
  x: number
  y: number
  width: number
  height: number
  delay?: number
}>()
</script>

<style scoped>
.arch-group {
  opacity: 0;
  animation: archFadeIn 0.5s ease forwards;
}
.arch-group {
  transform: scale(0.95);
  animation: archFadeIn 0.5s ease forwards;
}
@keyframes archFadeIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

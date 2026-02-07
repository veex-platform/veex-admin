<template>
  <div
    class="absolute rounded-2xl border-2 border-dashed z-0 p-4 shadow-sm arch-group bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm"
    :class="colorClass"
    :style="{ left: x + 'px', top: y + 'px', width: width + 'px', height: height + 'px', animationDelay: (delay ?? 0) + 's' }"
  >
    <div class="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center" :class="textClass">{{ title }}</div>
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

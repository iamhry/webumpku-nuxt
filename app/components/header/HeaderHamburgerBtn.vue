<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()
</script>

<template>
  <div class="rs-header-hamburger">
    <button
      class="rs-hamburger-btn"
      :class="{ 'is-open': modelValue }"
      aria-label="Toggle Menu"
      @click="emit('update:modelValue', !modelValue)"
    >
      <span /><span /><span />
    </button>
  </div>
</template>

<style scoped>
.rs-header-hamburger {
  display: none;
}
@media (max-width: 1199.98px) {
  .rs-header-hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.rs-hamburger-btn {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 38px;
  height: 38px;
  padding: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  color: currentColor;
}

.rs-hamburger-btn span {
  display: block;
  width: 20px;
  height: 2px;
  background-color: currentColor;
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.rs-hamburger-btn.is-open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.rs-hamburger-btn.is-open span:nth-child(2) {
  opacity: 0;
}

.rs-hamburger-btn.is-open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}
</style>
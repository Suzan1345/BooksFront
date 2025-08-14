<template>
  <button
    :class="['btn', variant && `btn--${variant}`, { 'is-active': active }]"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <span v-if="loading" class="loader" aria-hidden="true"></span>
    <span><slot /></span>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'ghost' | 'outline'
  disabled?: boolean
  loading?: boolean
  active?: boolean
}>(), {
  variant: 'primary',
  disabled: false,
  loading: false,
  active: false
})
defineEmits<{ (e: 'click'): void }>()
</script>

<style scoped>
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
  padding: .7rem 1rem; border-radius: 12px; border: 1px solid transparent;
  font-weight: 600; cursor: pointer; transition: transform .05s ease, background .2s ease, border-color .2s ease, opacity .2s ease;
}
.btn:active { transform: translateY(1px); }

.btn--primary { background: #ffcf33; color: #1a1f2e; }
.btn--primary:hover { opacity: .95; }

.btn--ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,.25); }
.btn--ghost.is-active { background: rgba(255,255,255,.12); }

.btn--outline { background: transparent; color: #1a1f2e; border-color: #c9d3ea; }

button[disabled] { opacity: .6; cursor: not-allowed; }

.loader {
  width: 1em; height: 1em; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg) } }
</style>

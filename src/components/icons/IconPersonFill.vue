<script setup>

const props = defineProps({
  size: {
    type: Number,
    default: 16,
  }
});

</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.size" :height="props.size" fill="currentColor"
    class="bi bi-person-square" viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />

  </svg>
</template>

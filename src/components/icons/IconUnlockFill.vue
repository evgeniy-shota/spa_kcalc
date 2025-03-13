<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 16,
  },
  attributes: {
    type: Object,
    default: {
    },
  }
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" v-bind="props.attributes" :width=props.size :height=props.size
    fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path
      d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2" />
  </svg>
</template>

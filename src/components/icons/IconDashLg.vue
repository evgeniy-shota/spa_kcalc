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
    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
  </svg>
</template>

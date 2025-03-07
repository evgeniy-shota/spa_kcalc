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
      d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
  </svg>
</template>

<script setup>

const props = defineProps({
  'size': {
    type: Number,
    default: 16,
  }
});

</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.size" :height="props.size" fill="currentColor"
    class="bi bi-plus-lg" viewBox="0 0 16 16">
    <path fill-rule="evenodd"
      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />


  </svg>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, Tooltip, Legend
} from 'chart.js'
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs';

const COLORS = ref(['#94D2BD', '#005F73', '#EE9B00', '#AE2012', '#B5179E']);

const props = defineProps({
  data: {
    type: Array,
    default: [{
      data: [40, 39, 10, 40, 39, 80, 40],
      label: 'label-1',
    },
    {
      data: [25, 15, 30, 20, 7, 54, 23],
      label: 'label-2',
    },
    ],
  },
  labels: {
    type: Array,
    default: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  },
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})

const chartData = computed(() => {

  let datasets = [];

  for (let i = 0; i < props.data.length; i++) {
    datasets.push({
      data: props.data[i].data,
      backgroundColor: COLORS.value[i],
      borderColor: COLORS.value[i],
      label: props.data[i].label,
    });
  }

  return {
    labels: props.labels,
    datasets: datasets,
  }
});

onBeforeMount(() => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);
});

</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

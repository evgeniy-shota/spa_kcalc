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

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

const props = defineProps({
  dataset: {
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
  // labels: {
  //   type: Array,
  //   default: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  // },
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})

const chartData = computed(() => {

  let labels = [];
  let kcalory = [];
  let carbohydrates = [];
  let proteins = [];
  let fats = [];

  // console.log(props.dataset);

  // let dataset_labels = Object.keys(props.dataset[0].data);
  // let dataset_data = [];

  // for (let i = 0; i < props.dataset.length; i++) {
  //   dataset_data.push(Object.values(props.dataset[i].data));
  //   labels.push(props.dataset[i].date);
  // }

  // let datasets = [];

  // for (let i = 0; i < dataset_labels.length; i++) {
  //   let data = []
  //   for (let j = 0; j < dataset_data.length; j++) {
  //     data.push(dataset_data[j][i]);
  //   }
  //   datasets.push({
  //     label: dataset_labels[i],
  //     data: data,
  //     backgroundColor: COLORS.value[i],
  //     borderColor: COLORS.value[i],
  //   });
  // }

  // console.log(dataset_data);

  for (let i = 0; i < props.dataset.length; i++) {
    labels.push(props.dataset[i].date);

    if (props.dataset[i].data.kcalory == 0) {
      console.log('NaN');
      kcalory.push(NaN);
      carbohydrates.push(NaN);
      proteins.push(NaN);
      fats.push(NaN);
      continue;
    }

    kcalory.push(props.dataset[i].data.kcalory);
    carbohydrates.push(props.dataset[i].data.carbohydrates);
    proteins.push(props.dataset[i].data.proteins);
    fats.push(props.dataset[i].data.fats);
  }

  let dataset_kcal = [
    {
      label: 'Калории, ккал',
      data: kcalory,
      backgroundColor: COLORS.value[0],
      // borderColor: COLORS.value[0],
      segment: {
        borderColor: COLORS.value[0],
        borderDash: ctx => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
    },];

  let datasets_pcf = [
    {
      label: 'Углеводы, гр.',
      data: carbohydrates,
      backgroundColor: COLORS.value[1],
      borderColor: COLORS.value[1],

      segment: {
        borderColor: COLORS.value[1],
        borderDash: ctx => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
    },
    {
      label: 'Белки, гр.',
      data: proteins,
      backgroundColor: COLORS.value[2],
      borderColor: COLORS.value[2],

      segment: {
        borderColor: COLORS.value[2],
        borderDash: ctx => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
    },
    {
      label: 'Жиры, гр.',
      data: fats,
      backgroundColor: COLORS.value[3],
      borderColor: COLORS.value[3],

      segment: {
        borderColor: COLORS.value[3],
        borderDash: ctx => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
    },
  ];

  // for (let i = 0; i < props.data.length; i++) {
  //   datasets.push({
  //     data: props.data[i].data,
  //     backgroundColor: COLORS.value[i],
  //     borderColor: COLORS.value[i],
  //     label: props.data[i].label,
  //   });
  // }

  return {
    kcalory: {
      labels: labels,
      datasets: dataset_kcal
    },
    pcf: {
      labels: labels,
      datasets: datasets_pcf
    },
  }

  return {
    labels: labels,
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
  <Line :data="chartData.pcf" :options="chartOptions" />
  <Line :data="chartData.kcalory" :options="chartOptions" />
</template>

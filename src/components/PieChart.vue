<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const props = defineProps(
  {
    kcal: {},
    carbohydrates: {},
    proteins: {},
    fats: {},
  }
);

const emit = defineEmits();

const chartData = computed(() => {
  return {
    labels: ['Белки', 'Углеводы', 'Жиры', 'Калории'],
    datasets: [
      {
        backgroundColor: ['#0dcaf0', '#20c997', '#ffc107'],
        data: [props.proteins, props.carbohydrates, props.fats],
      },
      {
        backgroundColor: ['#fd7e14'],
        data: [props.kcal],
      },
    ],
  };
});

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    borderWidth: 0,
    plugins: {
      legend: {
        labels: {
          generateLabels: function (chart) {
            const original = ChartJS.overrides.pie.plugins.legend.labels.generateLabels;
            const labelsOriginal = original.call(this, chart);
            // Build an array of colors used in the datasets of the chart
            let datasetColors = chart.data.datasets.map(function (e) {
              return e.backgroundColor;
            });
            datasetColors = datasetColors.flat();

            // Modify the color and hide state of each label
            labelsOriginal.forEach(label => {
              // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
              label.datasetIndex = (label.index - label.index % 2) / 2;

              // The hidden state must match the dataset's hidden state
              label.hidden = !chart.isDatasetVisible(label.datasetIndex);

              // Change the color to match the dataset
              label.fillStyle = datasetColors[label.index];
            });

            return labelsOriginal;
          }
        }
      },
      datalabels: {
        formatter: function (value, context) {
          // console.log(context);
          return `${context.chart.data.labels[context.dataIndex]} \n ${value} гр.`;
        },
        color: 'white',
        font: {
          weight: 'bold',
          anchor: 'start',
        }
      },
    }
  }
});

const plugins = computed(() => {
  return [ChartDataLabels];
});

onBeforeMount(() => {
  ChartJS.register(ArcElement, Tooltip, Legend)
});

</script>

<template>
  <Pie :data="chartData" :options="chartOptions" :plugins="plugins" />
</template>

<style lang="scss"></style>

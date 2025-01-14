<template>
  <Pie :data="chartData" :options="chartOptions" :plugins="plugins" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  props: ['kcal', 'carbohydrates', 'proteins', 'fats'],
  name: 'PieChart',
  components: {
    Pie
  },
  computed: {
    chartData() {
      return {
        labels: ['Белки', 'Углеводы', 'Жиры', 'Калории'],
        datasets: [
          {
            backgroundColor: ['#0dcaf0', '#20c997', '#ffc107'],
            data: [this.proteins, this.carbohydrates, this.fats],
          },
          {
            backgroundColor: ['#fd7e14'],
            data: [this.kcal],
          },
        ],
      };
    },
  },
  data() {
    return {
      // chartData: {
      //   labels: ['Белки', 'Углеводы', 'Жиры', 'Калории'],
      //   datasets: [
      //     {
      //       backgroundColor: ['#0dcaf0', '#20c997', '#ffc107'],
      //       data: [this.proteins, this.carbohydrates, this.fats],
      //     },
      //     {
      //       backgroundColor: ['#fd7e14'],
      //       data: [this.kcal],
      //     },
      //   ],
      // },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 0,
        plugins: {
          legend: {
            labels: {
              generateLabels: function (chart) {
                const original = ChartJS.overrides.pie.plugins.legend.labels.generateLabels;
                const labelsOriginal = original.call(this, chart);
                console.log(labelsOriginal);
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
                // const datasets = chart.data.datasets;
                // return datasets[0].data.map((data, i) => ({
                //   text: `${chart.data.labels[i]} ${data} гр.`,
                //   fillStyle: datasets[0].backgroundColor[i],
                //   index: i
                // }))
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
      },
      plugins: [ChartDataLabels],
    }
  }
}
</script>
<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'MultiPieChart',
  components: {
    Pie
  },
  data() {
    return {
      chartData: {
        labels: ['Калории', 'Белки', 'Углеводы', 'Жиры'],
        datasets: [
          {
            backgroundColor: ['#fd7e14'],
            data: [100],
          },
          {
            backgroundColor: ['#0dcaf0', '#ffc107', '#20c997'],
            data: [10, 20, 16],
          }
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
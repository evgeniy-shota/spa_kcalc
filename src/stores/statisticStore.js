import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'
import { formatTime } from '@/resource/js/dateTime'

const URL_STATISTIC = 'api/statistic/'

const skipped = (ctx, value) => (ctx.p0.skip || ctx.p1.skip ? value : undefined)
const down = (ctx, value) => (ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined)

export const useStatisticStore = defineStore('statistics', () => {
  const COLORS = ref(['#94D2BD', '#005F73', '#EE9B00', '#AE2012', '#B5179E'])

  const statistics = ref({
    from: '',
    to: '',
    groupBy: '',
    data: [],
  })

  const statisticToChart = ref({
    kcalory: [],
    prot_carb_fats: [],
    split_by_time: [],
  })

  const timeSplits = ref([])

  function $reset() {
    statistics.value = {
      from: '',
      to: '',
      groupBy: '',
      data: [],
    }
    statisticToChart.value = {
      kcalory: {},
      prot_carb_fats: {},
    }
    timeSplits.value.length = 0
  }

  async function getStatistic(from, to, groupBy = 'd') {
    const group = groupBy == 'd' ? 'Day' : groupBy == 'w' ? 'Week' : 'Month'
    const fromDate = 'from' + group + '=' + from
    const toDate = 'to' + group + '=' + to

    try {
      const response = await axios_instance.get(URL_STATISTIC + '?' + fromDate + '&' + toDate)

      if (response) {
        statistics.value.from = from
        statistics.value.to = to
        statistics.value.groupBy = groupBy
        statistics.value.data = response.data
        getDataToChart()
      }
    } catch (error) {
      console.warn('Get statistic fail')
      console.warn(error)
    }
  }

  async function getStatisticSplittedByTime(fromDay, toDay) {
    let timeSplitsFormated = timeSplits.value.map((item) => {
      return [formatTime(item.from), formatTime(item.to)]
    })
    try {
      const response = await axios_instance.post(URL_STATISTIC, {
        fromDay: fromDay,
        toDay: toDay,
        timeSplits: timeSplitsFormated,
      })

      if (response) {
        statistics.value.split_by_time = response.data
      }
    } catch (error) {
      console.log('geting statistic splited by time fail')
      console.log(error)
    }
  }

  function getSplitedByTimeDataToChart() {}

  function getDataToChart() {
    let labels = []
    let kcalory = []
    let carbohydrates = []
    let proteins = []
    let fats = []

    for (let i = 0; i < statistics.value.data.length; i++) {
      labels.push(statistics.value.data[i].date)

      if (statistics.value.data[i].data.kcalory == 0) {
        kcalory.push(NaN)
        carbohydrates.push(NaN)
        proteins.push(NaN)
        fats.push(NaN)
        continue
      }

      kcalory.push(statistics.value.data[i].data.kcalory)
      carbohydrates.push(statistics.value.data[i].data.carbohydrates)
      proteins.push(statistics.value.data[i].data.proteins)
      fats.push(statistics.value.data[i].data.fats)
    }

    let dataset_kcal = [
      {
        label: 'Калории, ккал',
        data: kcalory,
        backgroundColor: COLORS.value[0],
        // borderColor: COLORS.value[0],
        segment: {
          borderColor: COLORS.value[0],
          borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
      },
    ]

    let datasets_pcf = [
      {
        label: 'Углеводы, гр.',
        data: carbohydrates,
        backgroundColor: COLORS.value[1],
        borderColor: COLORS.value[1],

        segment: {
          borderColor: COLORS.value[1],
          borderDash: (ctx) => skipped(ctx, [6, 6]),
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
          borderDash: (ctx) => skipped(ctx, [6, 6]),
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
          borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
      },
    ]

    statisticToChart.value.kcalory = {
      labels: labels,
      datasets: dataset_kcal,
    }

    statisticToChart.value.prot_carb_fats = {
      labels: labels,
      datasets: datasets_pcf,
    }

    return {
      kcalory: {
        labels: labels,
        datasets: dataset_kcal,
      },
      prot_carb_fats: {
        labels: labels,
        datasets: datasets_pcf,
      },
    }
  }

  // async function getStatisticForDays(from, to) {
  //   try {
  //     // date format Y-m-d
  //     const response = await axios_instance.get(URL_STATISTIC + '?fromDay=' + from + '?toDay=' + to)

  //     if (response) {
  //       statistics.value = response.data
  //       statisticForDays.value.from = from
  //       statisticForDays.value.to = to
  //       statisticForDays.value.data = response.data
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function getStatisticForWeeks(from, to) {
  //   try {
  //     const response = await axios_instance.get(
  //       URL_STATISTIC + '?fromWeek=' + from + '?toWeek=' + to,
  //     )

  //     if (response) {
  //       statistics.value = response.data
  //       statisticForWeeks.value.from = from
  //       statisticForWeeks.value.to = to
  //       statisticForWeeks.value.data = response.data
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function getStatisticForMonths(from, to) {
  //   try {
  //     const response = await axios_instance.get(
  //       URL_STATISTIC + '?fromMonth=' + from + '?toMonth=' + to,
  //     )

  //     if (response) {
  //       statistics.value = response.data
  //       statisticForMonths.value.from = from
  //       statisticForMonths.value.to = to
  //       statisticForMonths.value.data = response.data
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return {
    statistics,
    statisticToChart,
    timeSplits,
    // statisticForDays,
    // statisticForWeeks,
    // statisticForMonths,
    getStatistic,
    getStatisticSplittedByTime,
    getDataToChart,

    // getStatisticForDays,
    // getStatisticForWeeks,
    // getStatisticForMonths,
    $reset,
  }
})

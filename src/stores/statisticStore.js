import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'
import { getDatasetsObj } from '@/resource/js/prepareStatForChart'
import { formatTime } from '@/resource/js/dateTime'
import { COLORS, COLORS_RED_LIKE, COLORS_BLUE_LIKE, COLORS_GREEN_LIKE } from '@/resource/colors'

const URL_STATISTIC = 'api/statistic/'

const skipped = (ctx, value) => (ctx.p0.skip || ctx.p1.skip ? value : undefined)
const down = (ctx, value) => (ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined)

export const useStatisticStore = defineStore('statistics', () => {
  const statistics = ref({
    from: '',
    to: '',
    groupBy: '',
    data: [],
  })

  const statisticSplitedByTime = ref({
    from: '',
    to: '',
    data: [],
  })

  const statisticToChart = ref({
    kcalory: {},
    prot_carb_fats: {},
    split_by_time_kcal: {
      labels: [],
      datasets: [],
    },
    split_by_time_pcf: {
      labels: [],
      datasets: [],
    },
    split_by_time_prot: {
      labels: [],
      datasets: [],
    },
    split_by_time_carb: {
      labels: [],
      datasets: [],
    },
    split_by_time_fats: {
      labels: [],
      datasets: [],
    },
  })

  const timeSplits = ref([])

  function $reset() {
    statistics.value = {
      from: '',
      to: '',
      groupBy: '',
      data: [],
    }
    statisticSplitedByTime.value = {
      from: '',
      to: '',
      data: [],
    }
    statisticToChart.value = {
      kcalory: {},
      prot_carb_fats: {},
      split_by_time_kcal: {
        labels: [],
        datasets: [],
      },
      split_by_time_pcf: {
        labels: [],
        datasets: [],
      },
      split_by_time_prot: {
        labels: [],
        datasets: [],
      },
      split_by_time_carb: {
        labels: [],
        datasets: [],
      },
      split_by_time_fats: {
        labels: [],
        datasets: [],
      },
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
        // statisticSplitedByTime.value.split_by_time = response.data
        statisticSplitedByTime.value.data = response.data
        return true
      }
    } catch (error) {
      console.log('geting statistic splited by time fail')
      console.log(error)
    }
  }

  function getSplitedByTimeDataToChart() {
    let datasets_kcal = {
      labels: [],
      datasets: [],
    }

    let datasets_prot = {
      labels: [],
      datasets: [],
    }

    let datasets_carb = {
      labels: [],
      datasets: [],
    }

    let datasets_fats = {
      labels: [],
      datasets: [],
    }

    // new Array(length).fill().map((_,i)=>getDatasetsObj(...))
    for (let i = 0; i < timeSplits.value.length; i++) {
      datasets_kcal.datasets.push(
        getDatasetsObj(
          `${formatTime(timeSplits.value[i].from)}-${formatTime(timeSplits.value[i].to)}`,
          COLORS[i],
        ),
      )

      datasets_prot.datasets.push(
        getDatasetsObj(
          `${formatTime(timeSplits.value[i].from)}-${formatTime(timeSplits.value[i].to)}-белки`,
          COLORS_RED_LIKE[i],
        ),
      )

      datasets_carb.datasets.push(
        getDatasetsObj(
          `${formatTime(timeSplits.value[i].from)}-${formatTime(timeSplits.value[i].to)}-углеводы`,
          COLORS_BLUE_LIKE[i],
        ),
      )

      datasets_fats.datasets.push(
        getDatasetsObj(
          `${formatTime(timeSplits.value[i].from)}-${formatTime(timeSplits.value[i].to)}-жиры`,
          COLORS_GREEN_LIKE[i],
        ),
      )
    }

    let labels = []

    for (let i = 0; i < statisticSplitedByTime.value.data.length; i++) {
      labels.push(statisticSplitedByTime.value.data[i].date)

      // let stackName = 'Stack ' + i
      if (statisticSplitedByTime.value.data[i].date.length != 0) {
        for (let j = 0; j < statisticSplitedByTime.value.data[i].data.length; j++) {
          // console.log(statisticSplitedByTime.value.data[i])
          // datasets_prot.datasets[j].stack = i

          if (statisticSplitedByTime.value.data[i].data[j].kcalory == 0) {
            datasets_kcal.datasets[j].stack = i
            datasets_prot.datasets[j].stack = i
            datasets_carb.datasets[j].stack = i
            datasets_fats.datasets[j].stack = i
            datasets_kcal.datasets[j].data.push(NaN)
            datasets_prot.datasets[j].data.push(NaN)
            datasets_carb.datasets[j].data.push(NaN)
            datasets_fats.datasets[j].data.push(NaN)
            continue
          }
          datasets_kcal.datasets[j].data.push(statisticSplitedByTime.value.data[i].data[j].kcalory)
          datasets_prot.datasets[j].data.push(statisticSplitedByTime.value.data[i].data[j].proteins)
          datasets_carb.datasets[j].data.push(
            statisticSplitedByTime.value.data[i].data[j].carbohydrates,
          )
          datasets_fats.datasets[j].data.push(statisticSplitedByTime.value.data[i].data[j].fats)
        }

        // datasets_pcf.data.push()
      }
    }
    datasets_kcal.labels = labels
    datasets_prot.labels = labels
    datasets_carb.labels = labels
    datasets_fats.labels = labels

    let res_datasets = {
      labels: labels,
      datasets: [].concat(datasets_prot.datasets, datasets_carb.datasets, datasets_fats.datasets),
    }

    console.log(datasets_kcal)
    console.log(datasets_prot)
    // console.log(res_datasets)
    statisticToChart.value.split_by_time_kcal = datasets_kcal
    statisticToChart.value.split_by_time_pcf = res_datasets
    statisticToChart.value.split_by_time_prot = datasets_prot
    statisticToChart.value.split_by_time_carb = datasets_carb
    statisticToChart.value.split_by_time_fats = datasets_fats
  }

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
        backgroundColor: COLORS[0],
        // borderColor: COLORS.value[0],
        segment: {
          borderColor: COLORS[0],
          borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
      },
    ]

    let datasets_pcf = [
      {
        label: 'Углеводы, гр.',
        data: carbohydrates,
        backgroundColor: COLORS[1],
        borderColor: COLORS[1],

        segment: {
          borderColor: COLORS[1],
          borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
      },
      {
        label: 'Белки, гр.',
        data: proteins,
        backgroundColor: COLORS[2],
        borderColor: COLORS[2],

        segment: {
          borderColor: COLORS[2],
          borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
      },
      {
        label: 'Жиры, гр.',
        data: fats,
        backgroundColor: COLORS[3],
        borderColor: COLORS[3],

        segment: {
          borderColor: COLORS[3],
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
    statisticSplitedByTime,
    // statisticForDays,
    // statisticForWeeks,
    // statisticForMonths,
    getStatistic,
    getStatisticSplittedByTime,
    getDataToChart,
    getSplitedByTimeDataToChart,

    // getStatisticForDays,
    // getStatisticForWeeks,
    // getStatisticForMonths,
    $reset,
  }
})

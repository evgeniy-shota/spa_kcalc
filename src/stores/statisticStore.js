import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

const URL_STATISTIC = 'api/statistic/'

export const useStatisticStore = defineStore('statistics', () => {
  const statistics = ref({
    from: '',
    to: '',
    groupBy: '',
    data: [],
  })
  // const statisticForDays = ref({
  //   from: '',
  //   to: '',
  //   data: [],
  // })
  // const statisticForWeeks = ref({
  //   from: '',
  //   to: '',
  //   data: [],
  // })
  // const statisticForMonths = ref({
  //   from: '',
  //   to: '',
  //   data: [],
  // })

  function $reset() {
    statistics.value = {
      from: '',
      to: '',
      groupBy: '',
      data: [],
    }
    // statisticForDays.value = {
    //   from: '',
    //   to: '',
    //   data: [],
    // }
    // statisticForWeeks.value = {
    //   from: '',
    //   to: '',
    //   data: [],
    // }
    // statisticForMonths.value = {
    //   from: '',
    //   to: '',
    //   data: [],
    // }
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
      }
    } catch (error) {
      console.warn('Get statistic fail')
      console.warn(error)
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
    // statisticForDays,
    // statisticForWeeks,
    // statisticForMonths,
    getStatistic,
    // getStatisticForDays,
    // getStatisticForWeeks,
    // getStatisticForMonths,
    $reset,
  }
})

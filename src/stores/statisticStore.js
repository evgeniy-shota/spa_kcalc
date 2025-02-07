import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

const URL_STATISTIC = 'api/statistic/'

export const useStatisticStore = defineStore('statistics', () => {
  const statistics = ref([])

  function $reset() {
    statistics.value = []
  }

  async function getStatistic() {
    try {
      const response = await axios_instance.get(URL_STATISTIC)

      if (response) {
        statistics.value = response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { statistics, getStatistic, $reset }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

const URL_STATISTIC = ''

export const useStatisticStore = defineStore('statistics', () => {
  const statistics = ref([])

  function $reset() {
    statistics.value = []
  }

  async function getStatistic() {
    try {
      const response = await axios_instance.get(URL_STATISTIC)

      if (response) {
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { statistics, getStatistic, $reset }
})

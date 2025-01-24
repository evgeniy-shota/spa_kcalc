import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

export const useSearchesStore = defineStore('searches', () => {
  const URL_SEARCH = 'api/search/'
  const searchActivitiesResult = ref({})
  const searchProductsResult = ref({})

  function $reset() {
    const searchActivitiesResult = ref({})
    const searchProductsResult = ref({})
  }

  async function searchProducts(searchQuery) {
    try {
      const response = await axios_instance.get(URL_SEARCH + '?searchQuery=' + searchQuery)

      if (response.data.data.length == 0) {
        return { result: 'nothing found', searchQuery: searchQuery, response: response.data.data }
      }

      return { result: 'success', searchQuery: searchQuery, response: response.data.data }
    } catch (error) {
      console.log('Search activities is fail:')
      console.log(error)
      return { result: 'fail', searchQuery: searchQuery, response: error }
    }
  }

  function searchActivities(searchQuery) {}

  return { searchActivitiesResult, searchProductsResult, searchActivities, searchProducts }
})

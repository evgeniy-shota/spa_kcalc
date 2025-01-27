import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

export const useSearchesStore = defineStore('searches', () => {
  const URL_SEARCH = 'api/search/'
  const searchActivitiesResult = ref({})
  const searchProductsResult = ref({})

  function $reset() {
    searchActivitiesResult.value = {}
    searchProductsResult.value = {}
  }

  async function searchProducts(searchQuery) {
    try {
      const response = await axios_instance.get(URL_SEARCH + '?searchQuery=' + searchQuery)

      console.log(response.data)
      if (
        response.data.products.count +
          response.data.personalUserProducts.count +
          response.data.diets.count ==
        0
      ) {
        return { result: 'nothing found', response: response.data }
      }

      return { result: 'success', response: response.data }
    } catch (error) {
      console.log('Search activities is fail:')
      console.log(error)
      return { result: 'fail', response: error }
    }
  }

  function searchActivities(searchQuery) {}

  return { searchActivitiesResult, searchProductsResult, searchActivities, searchProducts }
})

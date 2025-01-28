import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

export const useSearchesStore = defineStore('searches', () => {
  const URL_SEARCH = 'api/search/'
  const searchActivitiesResult = ref(false)
  const searchActivitiesResponse = ref(null)
  const searchRationResult = ref(false)
  const searchRationResponse = ref(null)

  function $reset() {
    searchActivitiesResult = false
    searchActivitiesResponse = null
    searchRationResult = false
    searchRationResponse = null
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
        searchRationResponse.value = response.data
      } else {
        searchRationResponse.value = null
      }

      searchRationResult.value = true
    } catch (error) {
      console.log('Search activities is fail:')
      console.log(error)
      searchRationResult.value = false
      searchRationResponse.value = null
    }
  }

  function searchActivities(searchQuery) {}

  return {
    searchActivitiesResult,
    searchProductsResult: searchRationResult,
    searchActivities,
    searchProducts,
    $reset,
  }
})

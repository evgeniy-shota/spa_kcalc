import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

export const useSearchesStore = defineStore('searches', () => {
  const URL_SEARCH = 'api/search/'
  // const searchActivitiesResult = ref(false)
  // const searchActivitiesResponse = ref(null)
  // const searchRationResult = ref(false)
  // const searchRationResponse = ref(null)

  const searchedResourse = ref('')
  const searchResult = ref(false)
  const searchResponse = ref(null)
  const searchResponseTotalCount = ref(0)

  function $reset() {
    // searchActivitiesResult = false
    // searchActivitiesResponse = null
    // searchRationResult = false
    // searchRationResponse = null

    searchedResourse.value = ''
    searchResult.value = false
    searchResponse.value = null
    searchResponseTotalCount.value = 0
  }

  async function searchProducts(searchQuery) {
    try {
      searchedResourse.value = 'products'
      const response = await axios_instance.get(URL_SEARCH + '?searchQuery=' + searchQuery)

      if (response.data.totalCountSearchResult != 0) {
        // console.log('array is not empty')
        searchResponseTotalCount.value = response.data.totalCountSearchResult

        searchResponse.value = {
          products: response.data.products,
          diets: response.data.diets,
        }
        console.log(searchResponse.value)
      } else {
        // console.log('array is empty')
        searchResponse.value = null
        searchResponseTotalCount.value = 0
      }

      searchResult.value = true
      return { searchCompleteSuccessul: true }
    } catch (error) {
      console.log('Search activities is fail:')
      console.log(error)
      searchResult.value = false
      searchResponse.value = null
      searchResponseTotalCount.value == 0
      return { searchCompleteSuccessul: false }
    }
  }

  function searchActivities(searchQuery) {
    searchedResourse.value = 'activities'
  }

  return {
    searchResponse,
    searchResult,
    searchResponseTotalCount,
    searchedResourse,
    // searchActivitiesResult,
    // searchRationResult,
    searchActivities,
    searchProducts,
    $reset,
  }
})

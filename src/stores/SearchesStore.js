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

  function $reset() {
    // searchActivitiesResult = false
    // searchActivitiesResponse = null
    // searchRationResult = false
    // searchRationResponse = null

    searchedResourse.value = ''
    searchResult.value = false
    searchResponse.value = null
  }

  async function searchProducts(searchQuery) {
    try {
      searchedResourse.value = 'products'
      const response = await axios_instance.get(URL_SEARCH + '?searchQuery=' + searchQuery)

      console.log(response.data)
      if (response.data.totalCountSearchResult != 0) {
        console.log('array is not empty')
        searchResponse.value = response.data
      } else {
        console.log('array is empty')
        searchResponse.value = null
      }

      searchResult.value = true

      return { searchCompleteSuccessul: true }
    } catch (error) {
      console.log('Search activities is fail:')
      console.log(error)
      searchResult.value = false
      searchResponse.value = null
      return { searchCompleteSuccessul: false }
    }
  }

  function searchActivities(searchQuery) {
    searchedResourse.value = 'activities'
  }

  return {
    searchResponse,
    searchResult,
    // searchActivitiesResult,
    // searchRationResult,
    searchActivities,
    searchProducts,
    $reset,
  }
})

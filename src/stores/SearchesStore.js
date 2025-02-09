import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

export const useSearchesStore = defineStore('searches', () => {
  const URL_SEARCH = 'api/search/'
  // const searchActivitiesResult = ref(false)
  // const searchActivitiesResponse = ref(null)
  // const searchRationResult = ref(false)
  // const searchRationResponse = ref(null)

  const searchRequest = ref('')
  const searchedResource = ref('')
  const searchResult = ref(false)
  const searchResponse = ref(null)
  const searchResponseTotalCount = ref(0)
  const searchHistory = ref([])

  function $reset() {
    // searchActivitiesResult = false
    // searchActivitiesResponse = null
    // searchRationResult = false
    // searchRationResponse = null
    searchRequest.value = ''
    searchedResource.value = ''
    searchResult.value = false
    searchResponse.value = null
    searchResponseTotalCount.value = 0
    searchHistory.value = []
  }

  async function searchProducts(searchQuery) {
    try {
      searchedResource.value = 'products'
      searchRequest.value = searchQuery
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
    searchedResource.value = 'activities'
    searchRequest.value = searchQuery
  }

  function saveRequestToHistory() {
    if (searchRequest.value.length > 2 && searchedResource.value.length != 0) {
      searchHistory.value.push({
        request: searchRequest.value,
        resource: searchedResource.value,
        result: searchResponse.value.length > 0 ? true : false,
      })
    }
  }

  function getSearchHistory(resource) {
    let res = searchHistory.value.filter((item) => item.resource == resource)
    return res.reverse()
  }

  function clearSearchRes() {
    searchResult.value = false
    searchResponse.value = null
  }

  return {
    searchRequest,
    searchResponse,
    searchResult,
    searchResponseTotalCount,
    searchedResource,
    searchHistory,
    // searchActivitiesResult,
    // searchRationResult,
    clearSearchRes,
    saveRequestToHistory,
    getSearchHistory,
    searchActivities,
    searchProducts,
    $reset,
  }
})

import axios_instance from '@/resource/js/axiosInstance'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const URL_ADDITIONAL_DATA = '/api/additional-products-data'

export const useAdditionalProductData = defineStore('additionalProductData', () => {
  const allCategories = ref([])
  const countriesOfManufacture = ref([])
  const dataSource = ref([])
  const manufacturers = ref([])

  async function getData() {
    try {
      const response = await axios_instance.get(URL_ADDITIONAL_DATA)

      if (response) {
        console.log(response.data)
        allCategories.value = response.data.categories.data
        countriesOfManufacture.value = response.data.country_of_manufactory.data
        dataSource.value = response.data.data_source.data
      }
    } catch (error) {
      console.log('Geting additional product data fail')
      console.log(error)
    }
  }

  function $reset() {
    allCategories.value = []
    countriesOfManufacture.value = []
    dataSource.value = []
    manufacturers.value = []
  }

  return { allCategories, countriesOfManufacture, dataSource, manufacturers, getData }
})

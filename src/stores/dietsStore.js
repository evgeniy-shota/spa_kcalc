import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios_instance from '@/resource/js/axiosInstance'

const URL_API_DIETS = 'api/diets'

export const useDietsStore = defineStore('diets', () => {
  const diets = ref([])
  const diet = ref({
    id: 0,
    name: '',
    description: '',
    products: {},
    summ_val: {},
  })

  function $reset() {
    diets = []
    diet = {}
  }

  // get list of categories
  const getDiets = async () => {
    axios_instance
      .get(URL_API_DIETS)
      .then((response) => {
        diets.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // get list of products in category
  const getDiet = async (diet_id = 0) => {
    axios_instance
      .get(URL_API_DIETS + `/${diet_id}`)
      .then((response) => {
        diet.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { diets, diet, getDiets, getDiet, $reset }
})

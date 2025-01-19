import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const URL_API_DIETS = 'http://localhost:8000/api/diets'

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
    axios.defaults.withXSRFToken = true
    axios.defaults.withCredentials = true
    axios
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
    axios.defaults.withXSRFToken = true
    axios.defaults.withCredentials = true

    axios
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

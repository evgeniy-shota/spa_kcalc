import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

export const useDailyRationsStore = defineStore('dailyRations', () => {
  const URL_API_DAILYRATION = 'api/daily-rations/'

  const dailyRation = ref([])
  const dailyRations = ref([])
  const dailyRationValue = ref({ kcalory: 0, carbohydrates: 0, proteins: 0, fats: 0 })
  const selectedProducts = ref([])

  const selectedProductsValue = computed(() => {
    let prValue = {
      kcalory: 0,
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
    }

    for (product in selectedProducts) {
      prValue.kcalory += product.kcalory
      prValue.carbohydrates += product.carbohydratees
      prValue.proteins += product.proteins
      prValue.fats += product.fats
    }

    return prValue
  })

  async function addSelectedProductsToDailyRation() {
    try {
      const response = await axios_instance.post(URL_API_DAILYRATION, {
        products: dailyRation,
      })
      if (response) {
        return { result: 'success' }
      }
    } catch (error) {
      console.log('addSelectedProductsToDailyRation error: ')
      console.warn(error)
    }
  }

  async function getDailyRation(id = 1) {
    try {
      const response = await axios_instance.get(URL_API_DAILYRATION + id)

      if (response) {
        dailyRation.value = response.data
      }
      console.log('Daily ration: ')
      console.log(dailyRation.value)
    } catch (error) {
      console.log('Get daily ration is fail:')
      console.warn(error)
    }
  }

  async function getDailyRations() {
    try {
      const response = await axios_instance.get(URL_API_DAILYRATION)
      if (response) {
        dailyRations.value = response.data.dailyRations
      }
      console.log('Daily rations :')
      console.log(dailyRations.value)
    } catch (error) {
      console.log('Get daily rations is fail:')
      console.log(error)
    }
  }

  function $reset() {
    dailyRation.value = []
    dailyRations.value = []
    dailyRationValue.value = { kcalory: 0, carbohydrates: 0, proteins: 0, fats: 0 }
    selectedProducts.value = []
  }

  return {
    dailyRation,
    dailyRations,
    selectedProducts,
    dailyRationValue,
    selectedProductsValue,
    getDailyRation,
    getDailyRations,
    $reset,
  }
})

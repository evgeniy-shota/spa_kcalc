import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'

export const useDailyRationsStore = defineStore('dailyRations', () => {
  const URL_API_DAILYRATION = 'api/daily-ration'

  const dailyRation = ref([])

  const dailyRationValue = ref({ kcal: 0, carb: 0, prot: 0, fats: 0 })

  const selectedProducts = ref([])
  const selectedProductsValue = computed(() => {
    let prValue = {
      kcal: 0,
      carb: 0,
      prot: 0,
      fats: 0,
    }

    for (product in selectedProducts) {
      prValue.kcal += product.calory
      prValue.carb += product.carbohydratees
      prValue.prot += product.proteins
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

  function $reset() {}

  return { dailyRation, selectedProducts, dailyRationValue, selectedProductsValue, $reset }
})

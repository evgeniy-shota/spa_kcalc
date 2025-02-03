import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'
import getTime from '@/resource/js/dateTime'

export const useDailyRationsStore = defineStore('dailyRations', () => {
  const URL_API_DAILYRATION = 'api/daily-rations/'

  const dailyRation = ref({})
  const dailyRations = ref([])
  const dailyRationEnergyValue = ref({ kcalory: 0, carbohydrates: 0, proteins: 0, fats: 0 })
  const dailyRationProducts = ref([])
  const selectedProducts = ref([])

  const idDeletedRationProducts = []

  const selectedProductsValue = computed(() => {
    let prValue = {
      kcalory: 0,
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
    }

    for (let product of selectedProducts.value) {
      prValue.kcalory += Number(product.kcalory)
      prValue.carbohydrates += product.carbohydrates
      prValue.proteins += product.proteins
      prValue.fats += product.fats
    }

    return prValue
  })

  function addProduct(product) {
    let newProduct = {
      time_of_use: getTime(),
      daily_ration_id: dailyRation.value.id,
      product_id: product.id,
      name: product.name,
      quantity: product.quantity,
      kcalory: product.kcalory,
      proteins: product.proteins,
      carbohydrates: product.carbohydrates,
      fats: product.fats,
    }
    selectedProducts.value.push(newProduct)
  }

  async function saveRation() {
    let date = new Date()
    try {
      const response = await axios_instance.patch(URL_API_DAILYRATION + dailyRation.value.id, {
        ration: dailyRation.value,
        products: [].concat(dailyRationProducts.value, selectedProducts.value),
        productsForDelete: idDeletedRationProducts,
      })
      if (response) {
        selectedProducts.value.length = 0
        dailyRation.value = response.data.data
        dailyRationProducts.value = dailyRation.value.products
        dailyRationEnergyValue.value = dailyRation.value.rationEnergyValue
        return { result: 'success' }
      }
    } catch (error) {
      console.log('addSelectedProductsToDailyRation error: ')
      console.warn(error)
    }
  }

  function deleteSelectedProduct(index) {
    if (typeof index == 'number' && selectedProducts.value[index] != undefined) {
      selectedProducts.value.splice(index, 1)
    }
  }

  function deleteProductFromRation(index) {
    if (typeof index == 'number' && dailyRationProducts.value[index] != undefined) {
      idDeletedRationProducts.push(dailyRationProducts.value[index].id)
      console.log(idDeletedRationProducts)
      dailyRationProducts.value.splice(index, 1)
    }
  }

  function changeSelectedProductQuantity(index, quantity) {
    if (typeof index == 'number' && selectedProducts.value[index] != undefined) {
      selectedProducts.value[index].quantity = quantity
    }
  }

  async function getDailyRation(id = 1) {
    try {
      const response = await axios_instance.get(URL_API_DAILYRATION + id)

      if (response) {
        dailyRation.value = response.data.data
        dailyRationProducts.value = dailyRation.value.products
        dailyRationEnergyValue.value = dailyRation.value.rationEnergyValue
      }
      console.log('Daily ration: ')
      console.log(dailyRation.value)
      console.log('Ration products:')
      console.log(dailyRationProducts.value)
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
    dailyRation.value = {}
    dailyRations.value = []
    dailyRationEnergyValue.value = { kcalory: 0, carbohydrates: 0, proteins: 0, fats: 0 }
    dailyRationProduucts.value = []
    selectedProducts.value = []
  }

  return {
    dailyRation,
    dailyRations,
    selectedProducts,
    dailyRationEnergyValue,
    selectedProductsValue,
    dailyRationProducts,
    addProduct,
    deleteSelectedProduct,
    deleteProductFromRation,
    changeSelectedProductQuantity,
    saveRation,
    getDailyRation,
    getDailyRations,
    $reset,
  }
})

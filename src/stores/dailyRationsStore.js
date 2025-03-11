import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'
import { getTime, getDate } from '@/resource/js/dateTime'
import roundTo from '@/resource/js/mathFunctions'

export const useDailyRationsStore = defineStore('dailyRations', () => {
  const URL_API_DAILYRATION = 'api/daily-rations/'

  const dailyRation = ref({})
  const dailyRations = ref([])
  // const dailyRationEnergyValue = ref({ kcalory: 0, carbohydrates: 0, proteins: 0, fats: 0 })
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
      prValue.kcalory += roundTo(product.kcalory_per_unit * product.quantity)
      prValue.carbohydrates += roundTo(product.carbohydrates_per_unit * product.quantity)
      prValue.proteins += roundTo(product.proteins_per_unit * product.quantity)
      prValue.fats += roundTo(product.fats_per_unit * product.quantity)
    }

    return prValue
  })

  const dailyRationEnergyValue = computed(() => {
    let prValue = {
      kcalory: 0,
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
    }

    for (let product of dailyRationProducts.value) {
      prValue.kcalory += roundTo(product.kcalory_per_unit * product.quantity)
      prValue.carbohydrates += roundTo(product.carbohydrates_per_unit * product.quantity)
      prValue.proteins += roundTo(product.proteins_per_unit * product.quantity)
      prValue.fats += roundTo(product.fats_per_unit * product.quantity)
    }
    return prValue
  })

  function addProduct(product) {
    let newProduct = {
      time: getTime(false),
      daily_ration_id: dailyRation.value.id,
      product_id: product.id,
      name: product.name,
      quantity: product.quantity,
      kcalory_per_unit: product.kcalory_per_unit,
      proteins_per_unit: product.proteins_per_unit,
      carbohydrates_per_unit: product.carbohydrates_per_unit,
      fats_per_unit: product.fats_per_unit,
      // kcalory_per_unit: roundTo(product.kcalory / product.quantity_to_calculate),
      // proteins_per_unit: roundTo(product.proteins / product.quantity_to_calculate),
      // carbohydrates_per_unit: roundTo(product.carbohydrates / product.quantity_to_calculate),
      // fats_per_unit: roundTo(product.fats / product.quantity_to_calculate),
    }
    selectedProducts.value.push(newProduct)
  }

  async function saveRation() {
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
        // dailyRationEnergyValue.value = dailyRation.value.rationEnergyValue
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

  function changeSelectedProductTime(index, time) {
    console.log('change time: ' + time)
    console.log(selectedProducts.value[index])
    console.log(typeof index)

    if (typeof index == 'number' && selectedProducts.value[index] != undefined) {
      selectedProducts.value[index].time = time
      console.log('fuck')
    }
  }

  function changeRationProductQuantity(index, quantity) {
    if (typeof index == 'number' && dailyRationProducts.value[index] != undefined) {
      dailyRationProducts.value[index].quantity = quantity
    }
  }

  function changeRationProductTime(index, time) {
    if (typeof index == 'number' && dailyRationProducts.value[index] != undefined) {
      dailyRationProducts.value[index].time = time
    }
  }

  async function getDailyRation(date = getDate().ymd) {
    try {
      const response = await axios_instance.get(URL_API_DAILYRATION + date)

      if (response) {
        dailyRation.value = response.data.data
        dailyRationProducts.value = dailyRation.value.products
        // dailyRationEnergyValue.value = dailyRation.value.rationEnergyValue
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
    dailyRationProducts.value = []
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
    changeSelectedProductTime,
    changeRationProductQuantity,
    changeRationProductTime,
    saveRation,
    getDailyRation,
    getDailyRations,
    $reset,
  }
})

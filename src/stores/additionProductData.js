import axios_instance from '@/resource/js/axiosInstance'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const URL_ADDITIONAL_DATA = '/api/additional-products-data'

export const useAdditionalProductData = defineStore('additionalProductData', () => {
  const allCategoryGroups = ref([])
  const allCategories = ref([])
  const countriesOfManufacture = ref([])
  const dataSource = ref([])
  const manufacturers = ref([])
  const caloryLimits = ref([])
  const proteinsLimits = ref([])
  const carbohydratesLimits = ref([])
  const fatsLimits = ref([])

  const categoryGroupsIdCategoriesIdMap = computed(() => {
    let categoryGroups = new Map()
    for (let i = 0; i < allCategoryGroups.value.length; i++) {
      let categories = new Set()
      for (let j = 0; j < allCategoryGroups.value[i].categories.data.length; j++) {
        categories.add(allCategoryGroups.value[i].categories.data[j].id)
      }
      categoryGroups.set(allCategoryGroups.value[i].id, categories)
    }
    return categoryGroups
  })

  const categoriesIdCategoryGroupsIdMap = computed(() => {
    let categories = new Map()
    for (let i = 0; i < allCategoryGroups.value.length; i++) {
      for (let j = 0; j < allCategoryGroups.value[i].categories.data.length; j++) {
        categories.set(
          allCategoryGroups.value[i].categories.data[j].id,
          allCategoryGroups.value[i].id,
        )
      }
    }
    return categories
  })

  function categoriesList(catGroup) {
    let categories = []
    for (let i = 0; i < catGroup.length; i++) {
      categories = categories.concat(catGroup[i].categories.data)
    }
    return categories
  }

  async function getData() {
    try {
      const response = await axios_instance.get(URL_ADDITIONAL_DATA)

      if (response) {
        allCategoryGroups.value = response.data.categoriesGroup.data
        allCategories.value = categoriesList(allCategoryGroups.value)
        countriesOfManufacture.value = response.data.country_of_manufactory.data
        dataSource.value = response.data.data_source.data

        caloryLimits.value = [response.data.kcalory_limits.min, response.data.kcalory_limits.max]

        proteinsLimits.value = [
          response.data.proteins_limits.min,
          response.data.proteins_limits.max,
        ]

        carbohydratesLimits.value = [
          response.data.carbohydrates_limits.min,
          response.data.carbohydrates_limits.max,
        ]

        fatsLimits.value = [response.data.fats_limits.min, response.data.fats_limits.max]
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
    caloryLimits.value = []
    proteinsLimits.value = []
    carbohydratesLimits.value = []
    fatsLimits.value = []
  }

  return {
    allCategoryGroups,
    allCategories,
    countriesOfManufacture,
    dataSource,
    manufacturers,
    caloryLimits,
    proteinsLimits,
    carbohydratesLimits,
    fatsLimits,
    getData,
    categoryGroupsIdCategoriesIdMap,
    categoriesIdCategoryGroupsIdMap,
    $reset,
  }
})

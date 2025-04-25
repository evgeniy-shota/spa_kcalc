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
    console.log('categoryGroupsIdCategoriesIdMap')
    let categoryGroups = new Map()
    const allCategoryGroupsLength = allCategoryGroups.value.length

    for (let i = 0; i < allCategoryGroupsLength; i++) {
      console.log(allCategoryGroups.value[i].name)
      let categories = new Set()
      let categoriesLength =
        'categories' in allCategoryGroups.value[i]
          ? allCategoryGroups.value[i].categories.data.length
          : 0

      for (let j = 0; j < categoriesLength; j++) {
        categories.add(allCategoryGroups.value[i].categories.data[j].id)
      }
      categoryGroups.set(allCategoryGroups.value[i].id, categories)
    }
    return categoryGroups
  })

  const categoriesIdCategoryGroupsIdMap = computed(() => {
    console.log('categoriesIdCategoryGroupsIdMap')
    let categories = new Map()
    const allCategoryGroupsLength = allCategoryGroups.value.length

    for (let i = 0; i < allCategoryGroupsLength; i++) {
      let categoriesLength =
        'categories' in allCategoryGroups.value[i]
          ? allCategoryGroups.value[i].categories.data.length
          : 0

      for (let j = 0; j < categoriesLength; j++) {
        categories.set(
          allCategoryGroups.value[i].categories.data[j].id,
          allCategoryGroups.value[i].id,
        )
      }
    }
    return categories
  })

  function addCategory(catGroupId, category) {
    allCategories.value.push(category)
    const allCategoryGroupsLength = allCategoryGroups.value.length

    for (let i = 0; i < allCategoryGroupsLength; i++) {
      if (allCategoryGroups.value[i].id === catGroupId) {
        allCategoryGroups.value[i].categories.data.push(category)
        allCategoryGroups.value[i].categories.count++
        console.log('added in group')
        return
      }
      console.log('search...')
    }
  }

  function addCategoryGroup(categoryGroup) {
    allCategoryGroups.value.push(categoryGroup)
  }

  function changeCategory(prevCatGroupId, catGroupId, categoryId, category) {
    const allCategoriesLength = allCategories.value.length

    for (let i = 0; i < allCategoriesLength; i++) {
      if (allCategories.value[i].id === categoryId) {
        allCategories.value[i] = category
      }
    }

    const allCategoryGroupsLength = allCategoryGroups.value.length
    const needRemoveFromPrevCatGroup = prevCatGroupId !== catGroupId
    let categoryRemoved = false
    let categoryAddedOrChanged = false

    for (let i = 0; i < allCategoryGroupsLength; i++) {
      let categoriesInGroupLength = allCategoryGroups.value[i].categories.data.length

      if (needRemoveFromPrevCatGroup && allCategoryGroups.value[i].id === prevCatGroupId) {
        for (let j = 0; j < categoriesInGroupLength; j++) {
          if (allCategoryGroups.value[i].categories.data[j].id === categoryId) {
            allCategoryGroups.value[i].categories.data.splice(j, 1)
            allCategoryGroups.value[i].categories.count--
            console.log('removed from group')
            categoryRemoved = true
            break
          }
        }
      }

      if (allCategoryGroups.value[i].id === catGroupId) {
        if (needRemoveFromPrevCatGroup && categoryRemoved) {
          allCategoryGroups.value[i].categories.data.push(category)
          allCategoryGroups.value[i].categories.count++
          console.log('added after removed')
          return
        }

        for (let j = 0; j < categoriesInGroupLength; j++) {
          if (allCategoryGroups.value[i].categories.data[j].id === categoryId) {
            allCategoryGroups.value[i].categories.data[j] = category
            console.log('changed in group')
            break
          }
        }

        categoryAddedOrChanged = true
      }

      if (categoryAddedOrChanged && categoryRemoved) {
        return
      }
      console.log('search...')
    }
  }

  function changeCategoryGroup(catGroupId, categoryGroup) {
    let allCategoryGroupsLength = allCategoryGroups.value.length

    for (let i = 0; i < allCategoryGroupsLength; i++) {
      if (allCategoryGroups.value[i].id === catGroupId) {
        allCategoryGroups.value[i] = categoryGroup
        break
      }
    }
  }

  function deleteCategory(catGroupId, categoryId) {
    const catGroupLength = allCategoryGroups.value.length

    for (let i = 0; i < catGroupLength; i++) {
      if (allCategoryGroups.value[i].id === catGroupId) {
        const categoriesLength = allCategoryGroups.value[i].categories.data.length

        for (let j = 0; j < categoriesLength; j++) {
          if (allCategoryGroups.value[i].categories.data[j].id === categoryId) {
            console.log(allCategoryGroups.value[i].categories.data)
            allCategoryGroups.value[i].categories.data.splice(j, 1)
            allCategoryGroups.value[i].categories.count--
            return
          }
        }
      }
    }
  }

  function deleteCategoryGroup(catGroupId) {
    const catGroupLength = allCategoryGroups.value.length

    for (let i = 0; i < catGroupLength; i++) {
      if (allCategoryGroups.value[i].id === catGroupId) {
        allCategoryGroups.value.splice(i, 1)
        return
      }
    }
  }

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
    addCategory,
    addCategoryGroup,
    changeCategory,
    changeCategoryGroup,
    deleteCategory,
    deleteCategoryGroup,
    categoryGroupsIdCategoriesIdMap,
    categoriesIdCategoryGroupsIdMap,
    $reset,
  }
})

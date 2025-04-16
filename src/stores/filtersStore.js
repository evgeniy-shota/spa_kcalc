import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUsersStore } from './usersStore'
import storageAvailable from '@/resource/js/webStorageAvailable'

const initialStateCategoryGroupsFilter = {
  categoryGroupsId: [],
  isPersonal: null,
  isFavorite: null,
  isHidden: null,
}
const initialStateCategoriesFilter = {
  categoryId: [],
  isFavorite: null,
  isHidden: null,
  isPersonal: null,
}
const initialStateProductsFilter = {
  name: null,
  isPersonal: null,
  isAbstract: null,
  isFavorite: null,
  isHidden: null,
  manufacturer: [],
  countryOfManufacture: [],
  quantity: null,
  kcalory: null,
  proteins: null,
  carbohydrates: null,
  fats: null,
}

export const useFiltersStore = defineStore('filters', () => {
  let localStorageCategoryGroupsFilter = null
  let localStorageCategoriesFilter = null
  let localStorageProductsFilter = null

  if (storageAvailable('localStorage')) {
    localStorageCategoryGroupsFilter = JSON.parse(localStorage.getItem('categoryGroupsFilter'))
    localStorageCategoriesFilter = JSON.parse(localStorage.getItem('categoriesFilter'))
    localStorageProductsFilter = JSON.parse(localStorage.getItem('productsFilter'))
  }

  const categoryGroupsFilter =
    localStorageCategoryGroupsFilter !== null
      ? ref(localStorageCategoryGroupsFilter)
      : ref({ ...initialStateCategoryGroupsFilter })

  const categoriesFilter =
    localStorageCategoriesFilter !== null
      ? ref(localStorageCategoriesFilter)
      : ref({ ...initialStateCategoriesFilter })

  const productsFilter =
    localStorageProductsFilter !== null
      ? ref(localStorageProductsFilter)
      : ref({ ...initialStateProductsFilter })

  const groupFilterResults = ref(true)
  const isCategoryGroupsChanged = ref(false)
  const isCategoriesChanged = ref(false)
  const isProductsChanged = ref(false)

  function setCategoryGroupsFilter(data) {
    categoryGroupsFilter.value = { ...data }
    isCategoryGroupsChanged.value = true
    localStorage.setItem('categoryGroupsFilter', JSON.stringify(categoryGroupsFilter.value))
  }

  function setCategoriesFilter(data) {
    categoriesFilter.value = { ...data }
    isCategoriesChanged.value = true
    localStorage.setItem('categoriesFilter', JSON.stringify(categoriesFilter.value))
  }

  function setProductsFilter(data) {
    productsFilter.value = { ...data }
    isProductsChanged.value = true
    localStorage.setItem('productsFilter', JSON.stringify(productsFilter.value))
  }

  function resetCategoryGroupsFilter() {
    localStorage.removeItem('categoryGroupsFilter')
    categoryGroupsFilter.value = { ...initialStateCategoryGroupsFilter }
    isCategoryGroupsChanged.value = false
  }

  function resetCategoriesFilter() {
    localStorage.removeItem('categoriesFilter')
    categoriesFilter.value = { ...initialStateCategoriesFilter }
    isCategoriesChanged.value = false
  }

  function resetProductsFilter() {
    localStorage.removeItem('productsFilter')
    productsFilter.value = { ...initialStateProductsFilter }
    isProductsChanged.value = false
  }

  function $reset() {
    const userStore = useUsersStore()
    let defaultHiddenValueCategoryGroups = null
    let defaultHiddenValueCategories = null
    let defaultHiddenValueProducts = null

    if (userStore.userIsAuthorized) {
      defaultHiddenValueCategoryGroups = false
      defaultHiddenValueCategories = false
      defaultHiddenValueProducts = false
    }

    categoryGroupsFilter.value = {
      ...initialStateCategoryGroupsFilter,
      isHidden: defaultHiddenValueCategoryGroups,
    }
    categoriesFilter.value = {
      ...initialStateCategoriesFilter,
      isHidden: defaultHiddenValueCategories,
    }
    productsFilter.value = {
      ...initialStateProductsFilter,
      isHidden: defaultHiddenValueProducts,
    }
    groupFilterResults.value = true

    isCategoryGroupsChanged.value = false
    isCategoriesChanged.value = false
    isProductsChanged.value = false
  }

  return {
    categoryGroupsFilter,
    categoriesFilter,
    productsFilter,
    groupFilterResults,
    setCategoryGroupsFilter,
    setCategoriesFilter,
    setProductsFilter,
    resetCategoryGroupsFilter,
    resetCategoriesFilter,
    resetProductsFilter,
    $reset,
  }
})

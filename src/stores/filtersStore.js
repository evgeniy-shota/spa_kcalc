import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUsersStore } from './usersStore'
import storageAvailable from '@/resource/js/webStorageAvailable'
import { deepCopy } from '@/resource/js/utils'

const initialStateCategoryGroupsFilter = {
  categoryGroupsId: [],
  isPersonal: null,
  isFavorite: null,
  isHidden: null,
}
const initialStateCategoriesFilter = {
  categoriesId: [],
  isPersonal: null,
  isFavorite: null,
  isHidden: null,
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

function setInitialState(storageData, initialData, userIsAuthorized) {
  let initialState = storageData !== null ? deepCopy(storageData) : deepCopy(initialData)

  if (userIsAuthorized === true) {
    initialState.isHidden = false
  }

  return initialState
}

export const useFiltersStore = defineStore('filters', () => {
  const userStore = useUsersStore()

  let localStorageCategoryGroupsFilter = null
  let localStorageCategoriesFilter = null
  let localStorageProductsFilter = null

  // check localStorage
  // if (storageAvailable('localStorage')) {
  //   console.log('storage available')
  //   localStorageCategoryGroupsFilter = JSON.parse(localStorage.getItem('categoryGroupsFilter'))
  //   localStorageCategoriesFilter = JSON.parse(localStorage.getItem('categoriesFilter'))
  //   localStorageProductsFilter = JSON.parse(localStorage.getItem('productsFilter'))
  // }

  const categoryGroupsFilter = ref(
    setInitialState(
      localStorageCategoryGroupsFilter,
      initialStateCategoryGroupsFilter,
      userStore.userIsAuthorized,
    ),
  )
  const categoriesFilter = ref(
    setInitialState(
      localStorageCategoriesFilter,
      initialStateCategoriesFilter,
      userStore.userIsAuthorized,
    ),
  )
  const productsFilter = ref(
    setInitialState(
      localStorageProductsFilter,
      initialStateProductsFilter,
      userStore.userIsAuthorized,
    ),
  )

  const appliedCategoryGroupsFilter = ref(null)
  const appliedCategoriesFilter = ref(null)
  const appliedProductsFilter = ref(null)
  const groupFilterResults = ref(true)
  const isCategoryGroupsChanged = ref(false)
  const isCategoriesChanged = ref(false)
  const isProductsChanged = ref(false)

  function addElementToCategoryGroupsId(element) {
    if (element === null) {
      return
    }

    if (typeof element === 'array') {
      categoryGroupsFilter.value.categoryGroupsId.push(...element)
    }

    if (categoryGroupsFilter.value.categoryGroupsId.includes(element)) {
      return
    }

    categoryGroupsFilter.value.categoryGroupsId.push(element)
  }

  function addElementToCategoriesId(element) {
    if (element === null) {
      return
    }

    if (typeof element === 'array') {
      categoriesFilter.value.categoriesId.push(...element)
    }

    if (categoriesFilter.value.categoriesId.includes(element)) {
      return
    }

    categoriesFilter.value.categoriesId.push(element)
  }

  const isFilterApplied = computed(() => {
    return (
      appliedProductsFilter.value !== null ||
      appliedCategoriesFilter.value !== null ||
      appliedCategoryGroupsFilter.value !== null
    )
  })

  const actualCategoryGroupsFilter = computed(() => {
    if (appliedCategoryGroupsFilter.value !== null) {
      return appliedCategoryGroupsFilter.value
    }
    console.log('actualCategoryGroupsFilter')
    return categoryGroupsFilter.value
  })

  const actualCategoriesFilter = computed(() => {
    if (appliedCategoriesFilter.value !== null) {
      return appliedCategoriesFilter.value
    }
    console.log('actualCategoriesFilter')
    return categoriesFilter.value
  })

  const actualProductsFilter = computed(() => {
    if (appliedProductsFilter.value !== null) {
      return appliedProductsFilter.value
    }
    return productsFilter.value
  })

  function setCategoryGroupsFilter(data, saveAppliedFilter = false) {
    // categoryGroupsFilter.value = Object.assign(categoryGroupsFilter.value, data)
    categoryGroupsFilter.value = deepCopy(data)

    if (saveAppliedFilter) {
      appliedCategoryGroupsFilter.value = deepCopy(categoryGroupsFilter.value)
      // appliedCategoryGroupsFilter.value = deepCopy(categoryGroupsFilter.value)
      // appliedCategoryGroupsFilter.value = Object.assign({}, categoryGroupsFilter.value)
    }

    isCategoryGroupsChanged.value = true
    // localStorage.setItem('categoryGroupsFilter', JSON.stringify(categoryGroupsFilter.value))
  }

  function setCategoriesFilter(data, saveAppliedFilter = false) {
    // categoriesFilter.value = Object.assign(categoriesFilter.value, data)
    categoriesFilter.value = deepCopy(data)

    if (saveAppliedFilter) {
      appliedCategoriesFilter.value = deepCopy(categoriesFilter.value)
    }

    isCategoriesChanged.value = true
    // localStorage.setItem('categoriesFilter', JSON.stringify(categoriesFilter.value))
  }

  function setProductsFilter(data, saveAppliedFilter = false) {
    productsFilter.value = Object.assign(productsFilter.value, data)

    if (saveAppliedFilter) {
      appliedProductsFilter.value = deepCopy(productsFilter.value)
    }

    isProductsChanged.value = true
    // localStorage.setItem('productsFilter', JSON.stringify(productsFilter.value))
  }

  function resetCategoryGroupsFilter() {
    // localStorage.removeItem('categoryGroupsFilter')
    categoryGroupsFilter.value = setInitialState(
      null,
      initialStateCategoryGroupsFilter,
      userStore.userIsAuthorized,
    )
    appliedCategoryGroupsFilter.value = null
    // categoryGroupsFilter.value = { ...initialStateCategoryGroupsFilter, ...initialData }
    isCategoryGroupsChanged.value = false
  }

  function resetCategoriesFilter() {
    // localStorage.removeItem('categoriesFilter')
    categoriesFilter.value = setInitialState(
      null,
      initialStateCategoriesFilter,
      userStore.userIsAuthorized,
    )
    appliedCategoriesFilter.value = null
    // categoriesFilter.value = { ...initialStateCategoriesFilter, ...initialData }
    isCategoriesChanged.value = false
  }

  function resetProductsFilter(initialData = null) {
    // localStorage.removeItem('productsFilter')
    productsFilter.value = setInitialState(
      null,
      initialStateProductsFilter,
      userStore.userIsAuthorized,
    )
    appliedProductsFilter.value = null
    // productsFilter.value = { ...initialStateProductsFilter, ...initialData }
    isProductsChanged.value = false
  }

  function $reset() {
    resetCategoryGroupsFilter()
    resetCategoriesFilter()
    resetProductsFilter()
    groupFilterResults.value = true
    console.log('clear')
  }

  return {
    categoryGroupsFilter,
    categoriesFilter,
    productsFilter,
    groupFilterResults,
    appliedCategoryGroupsFilter,
    appliedCategoriesFilter,
    appliedProductsFilter,
    addElementToCategoryGroupsId,
    addElementToCategoriesId,
    setCategoryGroupsFilter,
    setCategoriesFilter,
    setProductsFilter,
    resetCategoryGroupsFilter,
    resetCategoriesFilter,
    resetProductsFilter,
    actualCategoryGroupsFilter,
    actualCategoriesFilter,
    actualProductsFilter,
    isFilterApplied,
    $reset,
  }
})

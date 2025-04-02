import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios_instance from '@/resource/js/axiosInstance'
import { useUsersStore } from './usersStore'
import { CategoryGroupParams, CategoryParams, ProductParams } from '@/resource/js/sortParams'

// const FAKE_API = 'https://jsonplaceholder.typicode.com/todos'
const URL_API_CATEGORY_GROUPS = 'api/category-groups/'
const URL_API_CATEGORIES = 'api/categories/'
const URL_API_PRODUCTS = 'api/products/'
const URL_API_PRODUCT = 'api/products/'
const URL_API_PRODUCT_CREATE = 'api/products/create/'

const URL_CATEGORIES = 'api/categories/'
const URL_PRODUCTS = 'api/products/'

export const useProductsStore = defineStore('products', () => {
  const categoriesGroup = ref([])
  const currentCategoryGroup = ref({
    id: null,
    name: null,
    categoriesCount: null,
  })
  const isCategoriesGroupFound = ref(true)
  const categories = ref([])
  const currentCategory = ref({
    id: null,
    name: null,
    productsCount: null,
  })
  // const categoriesPrevPage = ref('')
  // const categoriesNextPage = ref('')
  const isCategoriesFound = ref(true)
  const products = ref([])
  const productsPrevCursor = ref('')
  const productsNextCursor = ref('')
  const isProductsFound = ref(true)
  const indexOfEditableProduct = ref(null)
  const indexOfEditableCategory = ref(null)
  const indexOfEditableCategoriesGroup = ref(null)
  const allCategories = ref([])
  const categoriesGroupSortParams = ref(CategoryGroupParams.default.key)
  const categoriesSortParams = ref(CategoryParams.default.key)
  const productsSortParams = ref(ProductParams.default.key)
  const productsFilter = ref({
    name: null,
    category_id: null,
    is_personal: null,
    is_abstract: null,
    is_favorite: null,
    is_hidden: null,
    manufacturer: null,
    country_of_manufacture: null,
    quantity: null,
    kcalory: null,
    proteins: null,
    carbohydrates: null,
    fats: null,
  })
  const product = ref({
    id: null,
    category_id: 0,
    name: '',
    composition: '',
    description: '',
    quantity: 0,
    quantityType: 'weight',
    manufacturer: '',
    countryOfManufacture: '',
    kcalory: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
    nutrientAndVitamines: {},
    is_visible: true,
  })

  const isProductFound = ref(true)

  function $reset() {
    indexOfEditableProduct.value = null
    indexOfEditableCategory.value = null
    indexOfEditableCategoriesGroup.value = null
    categoriesGroup.value.length = 0
    currentCategoryGroup.value = {
      id: null,
      name: null,
      categoriesCount: null,
    }
    categories.value.length = 0
    currentCategory.value = {
      id: null,
      name: null,
      productsCount: null,
    }
    products.value.length = 0
    product.value = {
      id: null,
      category_id: 0,
      name: '',
      composition: '',
      description: '',
      quantity: 0,
      quantityType: 'weight',
      manufacturer: '',
      countryOfManufacture: '',
      kcalory: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
      nutrientAndVitamines: {},
      is_visible: true,
    }
    productsPrevCursor.value = ''
    productsNextCursor.value = ''
    isCategoriesGroupFound.value = true
    isCategoriesFound.value = true
    isProductsFound.value = true
    isProductFound.value = true
    categoriesGroupSortParams.value = CategoryGroupParams.default.key
    categoriesSortParams.value = CategoryParams.default.key
    productsSortParams.value = ProductParams.default.key
    productsFilter.value = {
      name: null,
      category_id: null,
      is_personal: null,
      is_abstract: null,
      is_favorite: null,
      is_hidden: null,
      manufacturer: null,
      country_of_manufacture: null,
      quantity: null,
      kcalory: null,
      proteins: null,
      carbohydrates: null,
      fats: null,
    }
  }

  function clearProductFilter() {
    productsFilter.value = {
      name: null,
      category_id: null,
      is_personal: null,
      is_abstract: null,
      is_favorite: null,
      is_hidden: null,
      manufacturer: null,
      country_of_manufacture: null,
      quantity: null,
      kcalory: null,
      proteins: null,
      carbohydrates: null,
      fats: null,
    }
  }

  const getProductFilter = computed(() => {
    const userStore = useUsersStore()
    console.log(userStore.userIsAuthorized)
    if (!userStore.userIsAuthorized) {
      productsFilter.value.is_hidden = null
    } else {
      productsFilter.value.is_hidden = false
    }

    return productsFilter.value
  })

  const categoriesGroupList = computed(() => {
    if (categoriesGroupSortParams.value == CategoryGroupParams.nameAsc.key) {
      return categoriesGroup.value.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (categoriesGroupSortParams.value == CategoryGroupParams.nameDesc.key) {
      return categoriesGroup.value.sort((a, b) => b.name.localeCompare(a.name))
    }

    if (categoriesGroupSortParams.value == CategoryGroupParams.default.key) {
      return categoriesGroup.value.sort((a, b) => a.id - b.id)
    }

    if (categoriesGroupSortParams.value == CategoryGroupParams.favoriteAsc.key) {
      return categoriesGroup.value.sort((a, b) => b.is_favorite - a.is_favorite)
    }

    if (categoriesGroupSortParams.value == CategoryGroupParams.favoriteDesc.key) {
      return categoriesGroup.value.sort((a, b) => a.is_favorite - b.is_favorite)
    }

    return categoriesGroup.value
  })

  const categoriesList = computed(() => {
    if (categoriesSortParams.value == CategoryParams.nameAsc.key) {
      return categories.value.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (categoriesSortParams.value == CategoryParams.nameDesc.key) {
      return categories.value.sort((a, b) => b.name.localeCompare(a.name))
    }

    if (categoriesSortParams.value == CategoryParams.default.key) {
      return categories.value.sort((a, b) => a.id - b.id)
    }

    if (categoriesSortParams.value == CategoryParams.favoriteAsc.key) {
      return categories.value.sort((a, b) => b.is_favorite - a.is_favorite)
    }

    if (categoriesSortParams.value == CategoryParams.favoriteDesc.key) {
      return categories.value.sort((a, b) => a.is_favorite - b.is_favorite)
    }

    if (categoriesSortParams.value == CategoryParams.personalAsc.key) {
      return categories.value.sort((a, b) => b.is_personal - a.is_personal)
    }

    if (categoriesSortParams.value == CategoryParams.personalDesc.key) {
      return categories.value.sort((a, b) => a.is_personal - b.is_personal)
    }

    return categories.value
  })

  const productsList = computed(() => {
    return products.value
  })

  watch(productsSortParams, () => {
    getProducts(currentCategory.value.id)
  })

  async function getCategoryGroups() {
    isCategoriesGroupFound.value = true
    try {
      const response = await axios_instance.get(URL_API_CATEGORY_GROUPS)

      if (response) {
        isCategoriesGroupFound.value = response.data.count > 0 ? true : false
        categoriesGroup.value = response.data.data

        currentCategoryGroup.value = {
          id: null,
          name: null,
          categoriesCount: null,
        }

        currentCategory.value = {
          id: null,
          name: null,
          productsCount: null,
        }
      }
    } catch (error) {
      console.log('Get category groups fail')
      isCategoriesGroupFound.value = false
    }
  }

  async function getCategories(id) {
    isCategoriesFound.value = true

    try {
      const response = await axios_instance.get(URL_API_CATEGORY_GROUPS + id)

      if (response) {
        // console.log(response.data.data.categories.data)
        currentCategoryGroup.value = {
          id: response.data.data.id,
          name: response.data.data.name,
          categoriesCount: response.data.data.categories.count,
        }
        currentCategory.value = {
          id: null,
          name: null,
          productsCount: null,
        }
        isCategoriesFound.value = response.data.data.categories.count > 0 ? true : false
        categories.value = response.data.data.categories.data
      }
    } catch (error) {
      console.log('Get categories if fail')
      console.log(error)
      isCategoriesFound.value = false
    }
  }

  // get list of categories
  async function getAllCategories(filters) {
    try {
      const response = axios_instance.get(URL_API_CATEGORIES)
    } catch (error) {
      console.log('Get all categories fail')
      console.log(error)
    }
  }

  // get list of products in category
  async function getProducts(category_id, cursor = null) {
    isProductsFound.value = true
    // let requestParam = cursor ? category_id + '?cursor=' + cursor : category_id
    let requestParam = category_id ? category_id : ''
    requestParam += '?sort=' + productsSortParams.value
    requestParam += cursor ? '&cursor=' + cursor : ''

    try {
      const response = await axios_instance.post(
        URL_API_PRODUCTS + requestParam,
        productsFilter.value,
      )

      if (response) {
        isProductsFound.value = response.data.count > 0 ? true : false
        currentCategory.value = {
          id: category_id,
          name: null,
          productsCount: null,
        }

        if (cursor) {
          let tempArray = [].concat(products.value, response.data.data)
          products.value = tempArray
        } else {
          products.value = response.data.data
        }
        productsPrevCursor.value = response.data.meta.prev_cursor
        productsNextCursor.value = response.data.meta.next_cursor
      }
    } catch (error) {
      console.log(error)
      isProductsFound.value = false
    }
  }

  async function getFilteredProducts() {
    try {
      const response = await axios_instance.post(URL_API_PRODUCT, productsFilter.value)

      if (response) {
        isProductsFound.value = response.data.count > 0 ? true : false
        products.value = response.data.data
        productsPrevCursor.value = response.data.meta.prev_cursor
        productsNextCursor.value = response.data.meta.next_cursor
      }
    } catch (error) {
      console.log('Get filtered product fail')
      console.log(error)
    }
  }

  async function getProduct(product_id = 0) {
    isProductFound.value = true
    try {
      const response = await axios_instance.get(URL_API_PRODUCT + `${product_id}`)
      if (response) {
        isProductFound.value = true
        product.value = response.data.data
      } else {
        isProductFound.value = false
      }
    } catch (error) {
      console.log(error)
      isProductFound.value = false
    }
  }

  async function changeCategoryGroup(id, data, categoriesGroupIndex) {
    try {
      const response = await axios_instance.patch(URL_API_CATEGORY_GROUPS + id, {
        id: 'id' in data ? data.id : null,
        name: 'name' in data ? data.name : null,
        description: 'description' in data ? data.description : null,
        is_enabled: 'is_enabled' in data ? data.is_enabled : null,
        is_favorite: 'is_favorite' in data ? data.is_favorite : null,
        is_hidden: 'is_hidden' in data ? data.is_hidden : null,
      })
      if (response) {
        console.log('index: ' + categoriesGroupIndex)
        console.log(response.data)
        categoriesGroup.value[categoriesGroupIndex] = response.data
      }
    } catch (error) {
      console.log('changeCategoryGroup fail')
      console.log(error)
    }
  }

  async function changeCategory(id, data, index) {
    try {
      const response = await axios_instance.patch(URL_API_CATEGORIES + id, {
        category_group_id: data.category_group_id,
        name: data.name,
        description: data.description,
        is_personal: data.is_personal,
        is_enabled: data.is_enabled,
        icon_path: data.icon_path,
        is_favorite: data.is_favorite,
        is_hidden: data.is_hidden,
        thumbnail_image_path: data.thumbnail_image_path,
      })
      if (response) {
        console.log(response.data)
        categories.value[index] = response.data.data
      }
    } catch (error) {
      console.log('changeCategory fail')
      console.log(error)
    }
  }

  async function addCategory(data) {
    let newData = data
    try {
      const response = await axios_instance.post(URL_API_CATEGORIES, newData)
      if (response) {
        let data = response.data

        let indexCatGroup = categoriesGroup.value.findIndex(
          (item) => item.id === data.category_group_id,
        )

        if (indexCatGroup !== -1) {
          categoriesGroup.value[indexCatGroup].categories.data.push(data)

          if (data.category_group_id === currentCategoryGroup.value.id) {
            categories.value.push(data)
          }
        }

        // if new cat cat_group_id===currentGr categries.push()
        // else
      }
    } catch (error) {
      console.warn('Add category fail...')
      console.warn(error)
    }
  }

  async function deleteCategory(id, index) {
    try {
      const response = await axios_instance.delete(URL_API_CATEGORIES + id)

      if (response) {
        console.log('Category delete success')
        categories.value.splice(index, 1)
        return true
      }
    } catch (error) {
      console.warn('Category delete fail')
      console.warn(error)
    }
  }

  async function changeProduct(id, data, index) {
    try {
      const response = await axios_instance.patch(URL_API_PRODUCTS + id, {
        // user_id: '',
        category_id: data.category_id,
        type_id: data.type_id,
        is_personal: data.is_personal,
        is_enabled: data.is_enabled,
        is_abstract: data.is_abstract,
        name: data.name,
        thumbnail_image_name: data.thumbnail_image_name,
        manufacturer: data.manufacturer,
        country_of_manufacture: data.country_of_manufacture,
        trademark_id: data.trademark_id,
        description: data.description,
        units: data.units,
        condition: data.condition,
        state: data.state,
        quantity_to_calculate: data.quantity_to_calculate,
        quantity: data.quantity,
        composition: data.composition,
        kcalory: data.kcalory,
        proteins: data.proteins,
        carbohydrates: data.carbohydrates,
        fats: data.fats,
        kcalory_per_unit: data.kcalory_per_unit,
        proteins_per_unit: data.proteins_per_unit,
        carbohydrates_per_unit: data.carbohydrates_per_unit,
        fats_per_unit: data.fats_per_unit,
        nutrients_and_vitamins: data.nutrients_and_vitamins,
        data_source: data.data_source,
        is_favorite: data.is_favorite,
        is_hidden: data.is_hidden,
      })

      if (response) {
        products.value[index] = response.data.data
      }
    } catch (error) {
      console.log('changeProduct fail')
      console.log(error)
    }
  }

  async function addNewProduct(product, category) {
    try {
      const response = await axios_instance.post(URL_API_PRODUCT_CREATE, {
        product: product,
        category: category,
      })

      if (response.status == 201) {
        console.log('New product addeded')
        console.log(response)
        return true
      }
      return false
    } catch (error) {
      console.log('Add new product fail')
      console.log(error)
      return false
    }
  }

  return {
    indexOfEditableProduct,
    indexOfEditableCategory,
    indexOfEditableCategoriesGroup,
    categoriesGroupSortParams,
    categoriesSortParams,
    productsSortParams,
    categoriesGroupList,
    categoriesList,
    productsList,
    categories,
    products,
    product,
    categoriesGroup,
    currentCategoryGroup,
    currentCategory,
    isCategoriesGroupFound,
    isCategoriesFound,
    isProductsFound,
    getProductFilter,
    productsFilter,
    productsPrevCursor,
    productsNextCursor,
    clearProductFilter,
    getCategoryGroups,
    getCategories,
    getAllCategories,
    getProducts,
    getProduct,
    getFilteredProducts,
    addNewProduct,
    addCategory,
    changeCategoryGroup,
    changeCategory,
    changeProduct,
    deleteCategory,
    $reset,
  }
})

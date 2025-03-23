import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios_instance from '@/resource/js/axiosInstance'

// const FAKE_API = 'https://jsonplaceholder.typicode.com/todos'
const URL_API_CATEGORY_GROUPS = 'api/category-groups/'
const URL_API_CATEGORIES = 'api/categories/'
const URL_API_PRODUCTS = 'api/products/'
const URL_API_PRODUCT = 'api/products/'

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
  const allCategories = ref([])
  const productsFilter = ref({
    name: null,
    category_id: null,
    is_personal: null,
    is_abstract: null,
    manufacturer: null,
    country_of_manufacture: null,
    quantity: null,
    kcalory: null,
    proteins: null,
    carbohydrates: null,
    fats: null,
  })
  const product = ref({
    id: 0,
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
    categoriesGroup.value = []
    currentCategoryGroup.value = {
      id: null,
      name: null,
      categoriesCount: null,
    }
    categories.value = []
    currentCategory.value = {
      id: null,
      name: null,
      productsCount: null,
    }
    products.value = []
    product.value = {}
    productsPrevCursor.value = ''
    productsNextCursor.value = ''
    isCategoriesGroupFound.value = true
    isCategoriesFound.value = true
    isProductsFound.value = true
    isProductFound.value = true
    productsFilter.value = {
      name: null,
      category_id: null,
      is_personal: null,
      is_abstract: null,
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
      manufacturer: null,
      country_of_manufacture: null,
      quantity: null,
      kcalory: null,
      proteins: null,
      carbohydrates: null,
      fats: null,
    }
  }

  async function getCategoryGroups() {
    isCategoriesGroupFound.value = true
    try {
      const response = await axios_instance.get(URL_API_CATEGORY_GROUPS)

      if (response) {
        isCategoriesGroupFound.value = response.data.count > 0 ? true : false
        categoriesGroup.value = response.data.data
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

    requestParam += cursor ? '?cursor=' + cursor : ''

    console.log('request params - ' + requestParam)
    try {
      const response = await axios_instance.post(
        URL_API_PRODUCTS + requestParam,
        productsFilter.value,
      )

      if (response) {
        isProductsFound.value = response.data.count > 0 ? true : false

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

  async function addNewProduct(product, category) {
    try {
      const response = await axios_instance.post(URL_API_PRODUCT, {
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
  async function changeCategoryGroup(id, data) {
    try {
      axios_instance.patch(URL_API_CATEGORY_GROUPS + id, {
        id: 'id' in data ? data.id : null,
        name: 'name' in data ? data.name : null,
        description: 'description' in data ? data.description : null,
        is_enabled: 'is_enabled' in data ? data.is_enabled : null,
        is_favorite: 'is_favorite' in data ? data.is_favorite : null,
        is_hidden: 'is_hidden' in data ? data.is_hidden : null,
      })
    } catch (error) {
      console.log('changeCategoryGroup fail')
      console.log(error)
    }
  }

  async function changeCategory(id, data) {
    try {
      axios_instance.patch(URL_API_CATEGORIES + id, {
        user_id: data.user_id,
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
    } catch (error) {
      console.log('changeCategory fail')
      console.log(error)
    }
  }

  async function changeProduct(id, data) {
    try {
      axios_instance.patch(URL_API_PRODUCTS + id, {})
    } catch (error) {
      console.log('changeProduct fail')
      console.log(error)
    }
  }

  return {
    categories,
    products,
    product,
    categoriesGroup,
    currentCategoryGroup,
    currentCategory,
    isCategoriesGroupFound,
    isCategoriesFound,
    isProductsFound,
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
    changeCategoryGroup,
    changeCategory,
    changeProduct,
    $reset,
  }
})

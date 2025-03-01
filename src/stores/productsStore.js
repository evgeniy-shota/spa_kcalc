import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios_instance from '@/resource/js/axiosInstance'

// const FAKE_API = 'https://jsonplaceholder.typicode.com/todos'
const URL_API_CATEGORY_GROUPS = 'api/category-groups/'
const URL_API_CATEGORIES = 'api/categories/'
const URL_API_PRODUCTS = 'api/categories/'
const URL_API_PRODUCT = 'api/products/'

export const useProductsStore = defineStore('products', () => {
  const categoriesGroup = ref([])
  const isCategoriesGroupFound = ref(true)
  const categories = ref([])
  const isCategoriesFound = ref(true)
  const products = ref([])
  const isProductsFound = ref(true)
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
    categories.value = []
    products.value = []
    product.value = {}
    isCategoriesGroupFound = true
    isCategoriesFound = true
    isProductsFound = true
    isProductFound = true
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

  async function getCategories(id, filters = null) {
    isCategoriesFound.value = true
    try {
      const response = await axios_instance.get(URL_API_CATEGORY_GROUPS + id)

      if (response) {
        // console.log(response.data.data.categories.data)
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
  const getAllCategories = async () => {
    axios_instance
      // .get(URL_API_CATEGORIES)
      .get(URL_API_CATEGORY_GROUPS)
      .then((response) => {
        categories.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // get list of products in category
  async function getProducts(category_id, filters = null) {
    isProductsFound.value = true
    try {
      const response = await axios_instance.get(URL_API_PRODUCTS + category_id)

      if (response) {
        isProductsFound.value = response.data.count > 0 ? true : false
        products.value = response.data.data
      }
    } catch (error) {
      console.log(error)
      isProductsFound.value = false
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

  return {
    categories,
    products,
    product,
    categoriesGroup,
    isCategoriesGroupFound,
    isCategoriesFound,
    isProductsFound,
    getCategoryGroups,
    getCategories,
    getAllCategories,
    getProducts,
    getProduct,
    addNewProduct,
    $reset,
  }
})

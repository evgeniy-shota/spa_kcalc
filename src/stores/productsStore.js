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
  const categories = ref([])
  const products = ref([])
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

  function $reset() {
    categoriesGroup.value = []
    categories.value = []
    products.value = []
    product.value = {}
  }

  async function getCategoryGroups() {
    try {
      const response = await axios_instance.get(URL_API_CATEGORY_GROUPS)

      if (response) {
        // console.log(response.data.data)
        categoriesGroup.value = response.data.data
      }
    } catch (error) {
      console.log('Get category groups fail')
    }
  }

  async function getCategories(id) {
    try {
      const response = await axios_instance.get(URL_API_CATEGORY_GROUPS + id)

      if (response) {
        // console.log(response.data.data.categories.data)
        categories.value = response.data.data.categories.data
      }
    } catch (error) {
      console.log('Get categories if fail')
      console.log(error)
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
  async function getProducts(category_id) {
    try {
      const response = await axios_instance.get(URL_API_PRODUCTS + category_id)

      if (response) {
        // console.log(response.data.data)
        products.value = response.data.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProduct = async (product_id = 0) => {
    axios_instance
      .get(URL_API_PRODUCT + `${product_id}`)
      .then((response) => {
        product.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
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
    getCategoryGroups,
    getCategories,
    getAllCategories,
    getProducts,
    getProduct,
    addNewProduct,
    $reset,
  }
})

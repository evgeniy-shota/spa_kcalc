import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const FAKE_API = 'https://jsonplaceholder.typicode.com/todos'
const URL_API_CATEGORIES = 'http://127.0.0.1:8000/api/categories'
const URL_API_PRODUCTS = 'http://127.0.0.1:8000/api/categories/'
const URL_API_PRODUCT = 'http://127.0.0.1:8000/api/products/'

export const useProductsStore = defineStore('products', () => {
  const categories = ref([])
  const products = ref([])
  const product = ref({
    id: 0,
    category_id: 0,
    name: '',
    product_composition: {},
    description: '',
    calory: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
    nutrients_and_vitamins: { empty: 'val' },
    is_visible: true,
  })

  function $reset() {
    categories = []
    products = []
    product = {}
  }

  // get list of categories
  const getCategories = async () => {
    axios
      .get(URL_API_CATEGORIES)
      .then((response) => {
        categories.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // get list of products in category
  const getProducts = async (category_id = 0) => {
    axios
      .get(URL_API_PRODUCTS + `${category_id}`)
      .then((response) => {
        products.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getProduct = async (product_id = 0) => {
    axios
      .get(URL_API_PRODUCT + `${product_id}`)
      .then((response) => {
        product.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { categories, products, product, getCategories, getProducts, getProduct, $reset }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const FAKE_API = 'https://jsonplaceholder.typicode.com/todos'
const URL_API_CATEGORIES = 'http://127.0.0.1:8000/api/categories'
const URL_API_PRODUCTS = 'http://127.0.0.1:8000/api/categories/'

export const useProductsStore = defineStore('products', () => {
  const categories = ref([])
  const products = ref([])

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
  const getProducts = async (id_category = 0) => {
    axios
      .get(URL_API_PRODUCTS + `${id_category}`)
      .then((response) => {
        products.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { categories, products, getCategories, getProducts }
})

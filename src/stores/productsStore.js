import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const FAKE_API = 'https://jsonplaceholder.typicode.com/todos'
const URL_API_CATEGORIES = FAKE_API
const URL_API_PRODUCTS = FAKE_API

export const useProductsStore = defineStore('products', () => {
  const categories = ref([])
  const products = ref([])

  const getCategories = async () => {
    axios
      .get(URL_API_CATEGORIES)
      .then((response) => {
        categories.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getProducts = async () => {
    axios
      .get(URL_API_PRODUCTS)
      .then((response) => {
        products.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { categories, products, getCategories, getProducts }
})

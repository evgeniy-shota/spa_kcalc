import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const URL_API_USER = 'http://localhost:8000/api/users/'

export const useUsersStore = defineStore('users', () => {
  const user = ref({
    email: '',
    name: '',
  })

  function $reset() {
    user = {}
  }

  const getProduct = async (product_id = 0) => {
    axios.defaults.withXSRFToken = true
    axios.defaults.withCredentials = true

    axios
      .get(URL_API_PRODUCT + `${product_id}`)
      .then((response) => {
        product.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { user, $reset }
})

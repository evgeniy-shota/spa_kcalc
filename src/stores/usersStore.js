import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios_instance from '../resource/js/axiosInstance'

const URL_API_USERS = 'api/users'

export const useUsersStore = defineStore('users', () => {
  const userEmail = ref('')
  const userName = ref('')
  const userStatus = ref('')

  function $reset() {
    userEmail.value = ''
    userName.value = ''
    userStatus.value = ''
  }

  const getCurrentUserInfo = async () => {
    axios_instance
      .get('sanctum/csrf-cookie')
      .then((response) => {
        console.log('csrf-token request successful')
        // console.log(response)

        axios_instance
          .get(URL_API_USERS)
          .then((response) => {
            console.log('getUserInfo response:')
            // console.log(response.data.data.name)

            userName.value = response.data.data.name
          })
          .catch((error) => {
            console.log(`getUserInfo error: ${error}`)
          })
      })
      .catch((error) => {
        console.log('getUserInfo error')
        console.log(error)
      })
  }
  return { userEmail, userName, userStatus, getCurrentUserInfo, $reset }
})

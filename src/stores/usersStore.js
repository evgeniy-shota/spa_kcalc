import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios_instance from '../resource/js/axiosInstance'
import { compile } from 'sass'

const URL_API_USERS = 'api/users'
const URL_API_LOGIN = '/api/login'
const URL_API_LOGOUT = '/api/logout'
const URL_API_REGISTER = '/api/registration'

export const useUsersStore = defineStore('users', () => {
  const userEmail = ref('')
  const userName = ref('')
  const userIsBanned = ref(false)
  const userIsAuthorized = ref(false)
  const registrationIsSuccessful = ref(false)

  function $reset() {
    userEmail.value = ''
    userName.value = ''
    userIsBanned.value = false
    userIsAuthorized.value = false
  }

  async function checkUserStatus() {
    try {
      const response = await axios_instance.get(URL_API_USERS)

      if (response.data.is_banned == true) {
        return false
      }

      userIsAuthorized.value = true
      return true
    } catch (error) {
      console.log('checkUserStatus fail')
      userIsAuthorized.value = false
      return false
    }
  }

  const getToken = async () => {
    axios_instance
      .get('sanctum/csrf-cookie')
      .then((response) => {
        console.log('Getting token successful')
      })
      .catch((error) => {
        console.log('Getting token faile')
        console.log(error)
      })
  }

  const getCurrentUserInfo = async () => {
    try {
      const response = await axios_instance.get(URL_API_USERS)

      userIsAuthorized.value = true
      userIsBanned.value = response.data.data.is_banned
      if (!userIsBanned.value) {
        userName.value = response.data.data.name
        userEmail.value = response.data.data.email

        return {
          result: true,
          response: { name: userName.value, email: userEmail.value, is_banned: userIsBanned.value },
        }
      }

      return { result: true, response: { name: userName.value, is_banned: userIsBanned.value } }
    } catch (error) {
      userIsAuthorized.value = false
      return { result: false, response: error }
    }

    // axios_instance
    //   .get('sanctum/csrf-cookie')
    //   .then((response) => {
    //     console.log('csrf-token request successful')

    //     axios_instance
    //       .get(URL_API_USERS)
    //       .then((response) => {
    //         console.log('getUserInfo response:')
    //         userIsAuthorized.value = true
    //         if (!response.data.data.is_banned) {
    //           userName.value = response.data.data.name
    //           userEmail.value = response.data.data.email
    //         }
    //         userIsBanned.value = response.data.data.is_banned
    //       })
    //       .catch((error) => {
    //         console.log(`getUserInfo error: ${error}`)
    //         userIsAuthorized.value = false
    //       })
    //   })
    //   .catch((error) => {
    //     console.log('getUserInfo error')
    //     console.log(error)
    //   })
  }

  const login = async (email, password) => {
    try {
      const response = await axios_instance.post(URL_API_LOGIN, {
        email,
        password,
      })

      userIsAuthorized.value = true
      userIsBanned.value = response.data.data.is_banned

      if (!userIsBanned.value) {
        userName.value = response.data.data.name
        userEmail.value = response.data.data.email

        return {
          result: true,
          response: {
            name: userName.value,
            email: userEmail.value,
            is_banned: userIsBanned,
          },
        }
      }

      return {
        result: true,
        response: {
          name: userName.value,
          email: userEmail.value,
          is_banned: userIsBanned,
        },
      }
    } catch (error) {
      return { result: false, response: error }
    }

    // axios_instance
    //   .post(URL_API_LOGIN, {
    //     email,
    //     password,
    //   })
    //   .then((response) => {
    //     userIsAuthorized = true
    //     userIsBanned.value = response.data.data.is_banned
    //     if (!userIsBanned.value) {
    //       userName.value = response.data.data.name
    //       userEmail.value = response.data.data.email
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Login error:')
    //     console.log(error)
    //   })
  }

  const logout = async () => {
    try {
      const response = await axios_instance.get(URL_API_LOGOUT)
      return { result: true, response: response.data.data }
    } catch (error) {
      return { result: false, response: error }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await axios_instance.post(URL_API_REGISTER, {
        name: name,
        email: email,
        password: password,
      })

      return { result: true, response: response.data.data }
    } catch (error) {
      return { result: false, response: error }
    }

    // axios_instance
    //   .post(URL_API_REGISTER, {
    //     name: name,
    //     email: email,
    //     password: password,
    //   })
    //   .then((response) => {
    //     console.log('Registration succesful')
    //     // console.log(response.data.data)
    //     registrationIsSuccessful.value = true
    //     return { result: true, user: response.data.data }
    //   })
    //   .catch((error) => {
    //     console.log('Registration error')
    //     // console.log(error)
    //     registrationIsSuccessful.value = false
    //     return { result: false, error: error }
    //   })
  }

  return {
    userEmail,
    userName,
    userIsBanned,
    userIsAuthorized,
    checkUserStatus,
    getToken,
    getCurrentUserInfo,
    login,
    logout,
    register,
    registrationIsSuccessful,
    $reset,
  }
})

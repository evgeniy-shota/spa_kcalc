import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios_instance from '../resource/js/axiosInstance'

const URL_API_USERS = 'api/users/'
const URL_API_LOGIN = '/api/login'
const URL_API_LOGOUT = '/api/logout'
const URL_API_REGISTER = '/api/registration'

export const useUsersStore = defineStore('users', () => {
  const userId = ref(null)
  const userEmail = ref('')
  const userName = ref('')
  const dateOfRegistration = ref('')
  const userIsBanned = ref(false)
  const userIsAuthorized = ref(false)
  const gender = ref('')
  const dateOfBirth = ref('')
  const trainingLevel = ref('')
  const activityLevel = ref('')
  const height = ref(null)
  const targetWeight = ref(null)
  const weight = ref([])
  const registrationIsSuccessful = ref(false)

  function $reset() {
    userId.value = null
    userEmail.value = ''
    userName.value = ''
    dateOfRegistration.value = ''
    userIsBanned.value = false
    userIsAuthorized.value = false
    gender.value = ''
    dateOfBirth.value = ''
    trainingLevel.value = ''
    activityLevel.value = ''
    height.value = null
    targetWeight.value = null
    weight.value = []
    registrationIsSuccessful.value = false
  }

  // const currentWeight = ref({ date: '2025-02-25', value: 111 })
  const currentWeight = computed(() => {
    console.log(weight.value)

    return weight.value && weight.value.length > 0 ? weight.value[weight.value.length - 1] : null
  })

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

  const getUserInfo = async () => {
    try {
      const response = await axios_instance.get(URL_API_USERS)

      userIsAuthorized.value = true
      userIsBanned.value = response.data.data.is_banned

      if (!userIsBanned.value) {
        userId.value = response.data.data.id
        userName.value = response.data.data.name
        userEmail.value = response.data.data.email
        dateOfRegistration.value = response.data.data.date_of_registration
        gender.value = response.data.data.profile.gender
        dateOfBirth.value = response.data.data.profile.date_of_birth
        trainingLevel.value = response.data.data.profile.level_of_training
        activityLevel.value = response.data.data.profile.level_of_daily_activity
        height.value = response.data.data.profile.height
        targetWeight.value = response.data.data.profile.target_weight
        weight.value = response.data.data.profile.weight
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
  }

  async function updateUserInfo(info) {
    if (info.updatedWeight !== null) {
      if (weight.value === null || weight.value.length === 0) {
        weight.value = [
          {
            date: info.dateUpdatedWeight,
            value: info.updatedWeight,
          },
        ]
      } else if (info.dateUpdatedWeight !== weight.value[weight.value.length - 1].date) {
        weight.value.push({
          date: info.dateUpdatedWeight,
          value: info.updatedWeight,
        })
      } else {
        weight.value[weight.value.length - 1].value = info.updatedWeight
      }
    }

    try {
      const response = await axios_instance.patch(URL_API_USERS + userId.value, {
        gender: info.gender,
        dateOfBirth: info.dateOfBirth,
        level_of_training: info.level_of_training,
        level_of_daily_activity: info.level_of_activity,
        height: info.height,
        weight: weight.value,
        target_weight: info.targetWeight,
      })

      if (response) {
        userId.value = response.data.data.id
        userName.value = response.data.data.name
        userEmail.value = response.data.data.email
        dateOfRegistration.value = response.data.data.date_of_registration
        gender.value = response.data.data.profile.gender
        dateOfBirth.value = response.data.data.profile.date_of_birth
        trainingLevel.value = response.data.data.profile.level_of_training
        activityLevel.value = response.data.data.profile.level_of_daily_activity
        height.value = response.data.data.profile.height
        targetWeight.value = response.data.data.profile.target_weight
        weight.value = response.data.data.profile.weight
      }
    } catch (error) {
      console.log('Updating user info fail...')
      console.log(error)
    }
  }

  const login = async (login, password) => {
    try {
      const response = await axios_instance.post(URL_API_LOGIN, {
        name: login,
        password: password,
      })

      userIsAuthorized.value = true
      userIsBanned.value = response.data.data.is_banned

      if (!userIsBanned.value) {
        userId.value = response.data.data.id
        userName.value = response.data.data.name
        userEmail.value = response.data.data.email

        dateOfRegistration.value = response.data.data.date_of_registration
        gender.value = response.data.data.profile.gender
        dateOfBirth.value = response.data.data.profile.date_of_birth
        trainingLevel.value = response.data.data.profile.level_of_training
        activityLevel.value = response.data.data.profile.level_of_daily_activity
        height.value = response.data.data.profile.height
        targetWeight.value = response.data.data.profile.target_weight
        weight.value = response.data.data.profile.weight

        return {
          result: true,
          response: {
            id: userId.value,
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
      // console.log(error)
      return {
        result: false,
        response: error.response.data.errors,
      }
    }
  }

  const logout = async () => {
    try {
      const response = await axios_instance.get(URL_API_LOGOUT)
      return { result: true, response: response.data.data }
    } catch (error) {
      return { result: false, response: error }
    }
  }

  async function register(name, email, password) {
    try {
      const response = await axios_instance.post(URL_API_REGISTER, {
        name: name,
        email: email,
        password: password,
      })

      return { result: true, response: response.data.data }
    } catch (error) {
      console.log(error.response.data.errors)
      return { result: false, response: error.response.data.errors, error: error }
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
    userId,
    userEmail,
    userName,
    dateOfRegistration,
    userIsBanned,
    userIsAuthorized,
    gender,
    dateOfBirth,
    trainingLevel,
    activityLevel,
    height,
    targetWeight,
    weight,
    currentWeight,
    registrationIsSuccessful,
    checkUserStatus,
    getToken,
    getUserInfo,
    updateUserInfo,
    login,
    logout,
    register,
    $reset,
  }
})

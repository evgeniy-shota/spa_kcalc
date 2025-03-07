import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const URL_API_ACTIVITIES = 'http://localhost:8000/api/activities/'

export const useActivitiesStore = defineStore('activities', () => {
  const activities = ref([])
  const activity = ref({})

  function $reset() {
    activities.value = []
  }

  // get list of categories
  const getActivities = async () => {
    axios.defaults.withXSRFToken = true
    axios.defaults.withCredentials = true
    axios
      .get(URL_API_ACTIVITIES)
      .then((response) => {
        activities.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getActivity = async (id) => {
    axios.defaults.withXSRFToken = true
    axios.defaults, (withCredentials = true)
    axios
      .get(URL_API_ACTIVITIES + id)
      .then((response) => {
        activity.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { activities, activity, getActivities, getActivity, $reset }
})

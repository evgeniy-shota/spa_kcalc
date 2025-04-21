import { notificationPriority } from '@/resource/js/notificationPriority'
import { notificationType } from '@/resource/js/notificationType'
import { deepCopy } from '@/resource/js/utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const initialStateNotification = {
  id: null,
  type: notificationType.Default,
  priority: notificationPriority.Default,
  title: null,
  message: null,
  body: null,
  source: null,
  time: null,
}

const initialStateNotificationQueue = {
  ExtraHigh: [],
  High: [],
  Default: [],
}

export const useNotificationStore = defineStore('notifications', () => {
  const notificationQueue = ref(initialStateNotificationQueue)
  const notifications = ref(new Map())
  const shownNotifications = ref(new Map())
  const showNotification = ref(true)

  //   const popNotification = computed(() => {

  //   })

  const notificationToShow = computed(() => {
    let notificationKey = null

    if (notificationQueue.value.ExtraHigh.length > 0) {
      notificationKey = notificationQueue.value.ExtraHigh.shift()
    } else if (notificationQueue.value.High.length > 0) {
      notificationKey = notificationQueue.value.ExtraHigh.shift()
    } else {
      notificationKey = notificationQueue.value.Default.shift()
    }

    return {
      notifications: notifications.value.get(notificationKey),
      callBack: (key) => addNotificationToShown(key),
    }
  })

  function addNotification(data) {
    let notification = deepCopy({ ...initialStateNotification, ...data })

    if (notification.time === null) {
      notification.time = new Date().time
    }

    let key = notification.time + notification.type
    notifications.value.set(key, notification)
  }

  function addNotificationToShown(key) {
    if (notifications.value.has(key)) {
      let notification = notifications.value.get(key)
      shownNotifications.value.set(key, notification)
      notifications.value.delete(key)
    }
  }

  function $reset() {
    notifications.value = new Map()
    shownNotifications.value = new Map()
  }

  return {
    notificationQueue,
    showNotification,
    notifications,
    shownNotifications,
    addNotification,
    addNotificationToShown,
    notificationToShow,
    $reset,
  }
})

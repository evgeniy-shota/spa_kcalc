<script setup>
import { computed, onBeforeMount, onMounted } from 'vue';
import { RouterView } from 'vue-router';

// import axios_instance from './resource/js/axiosInstance'

import { useUsersStore } from './stores/usersStore';

import NavBar from './components/NavBar.vue';
import StatusBar from './components/StatusBar.vue';
import Toasts from './components/Toasts.vue';
import Footer from './components/Footer.vue';
import { useNotificationStore } from './stores/notificationStore';

const userStore = useUsersStore();
const notificationStore = useNotificationStore()

const userIsActive = computed(() => {
  return userStore.userIsAuthorized && !userStore.userIsBanned
});

onBeforeMount(() => {
  userStore.getToken();
  userStore.getUserInfo();
});

onMounted(() => {
  console.log('App is mounted');
});

</script>


<template>
  <div id="appContainer" class="container">
    <!-- nav-bar -->
    <div class="row mb-2">
      <NavBar :user-is-authorized="userIsActive" :user-name="userStore.userName" />
    </div>

    <!-- status bar -->
    <!-- show if user is not banned and authorized -->
    <div v-show="userIsActive" class="row mb-2">
      <StatusBar />
    </div>

    <div class="row mb-2" id="mainRow">
      <RouterView />
    </div>

    <Toasts />

    <!-- footer   fixed-bottom -->
    <!-- <div class=" fixed-bottom">
      <Footer />
    </div> -->

  </div>
</template>

<style scoped lang="scss">
#mainRow {
  height: 86vh;
  max-height: 86vh;
}
</style>

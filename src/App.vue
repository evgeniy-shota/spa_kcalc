<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import StatusBar from './components/StatusBar.vue';

</script>


<template>
  <div class="container">
    <!-- nav-bar -->
    <div class="row mb-2">
      <NavBar />
    </div>

    <!-- @ $ 0 & != !== === >-->
    <!-- status bar -->
    <div class="row mb-2">
      <StatusBar />
    </div>

    <div class="row">
      <RouterView />
    </div>

    <!-- footer   fixed-bottom -->
    <div class="row">
      footer
    </div>

  </div>
</template>

<style scoped></style>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import StatusBar from './components/StatusBar.vue';
import Footer from './components/Footer.vue';

</script>


<template>
  <div class="container">
    <!-- nav-bar -->
    <div class="row mb-2">
      <NavBar />
    </div>

    <!-- status bar -->
    <div class="row mb-2">
      <StatusBar />
    </div>

    <div class="row mb-2">
      <RouterView />
    </div>

    <!-- footer   fixed-bottom -->
    <!-- <div class=" fixed-bottom">
      <Footer />
    </div> -->

  </div>
</template>

<style scoped></style>

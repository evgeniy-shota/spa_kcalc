<script setup>
import { ref } from 'vue';
import ProductsList from '@/components/ProductsList.vue';
import ProductInfo from '@/components/ProductInfo.vue';

</script>

<template>
    <!-- big col -->
    <div class="col-7">
        <ProductsList />
    </div>

    <!-- small col -->
    <div class="col">
        <ProductInfo />
    </div>
</template>

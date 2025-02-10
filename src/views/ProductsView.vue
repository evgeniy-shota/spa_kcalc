<script setup>
import { ref } from 'vue';
import ProductsList from '@/components/ProductsList.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import ModalWindow from '@/components/ModalWindow.vue';

const isShowNewProductWindow = ref(false);

function showNewProductWindow() {
    isShowNewProductWindow.value = true;
}
function hideNewProductWindow() {
    isShowNewProductWindow.value = false;
}
</script>

<template>
    <!-- <div class="row">
        <div class="col"> -->
    <ModalWindow :show-window="isShowNewProductWindow" @close-window="hideNewProductWindow" />
    <!-- </div>
    </div> -->
    <!-- big col -->
    <div class="col">
        <ProductsList />
    </div>

    <!-- small col -->
    <div class="col">
        <ProductInfo />
    </div>
</template>

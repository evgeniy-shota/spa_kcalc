<script setup>
import { onBeforeMount, ref } from 'vue';
import ListWithControls from './ListWithControls.vue';
import { useProductsStore } from '@/stores/productsStore';

const productStore = useProductsStore();

const currentSlide = ref(0);
const slideLimit = 2;



onBeforeMount(() => {

});

function slideTo(slideNum) {
    if (slideNum == currentSlide.value || slideNum < 0 || slideNum > slideLimit) {
        return;
    }

    currentSlide.value = slideNum;

}
</script>

<template>
    <div class="card border-light" style="height: 100%;">
        <div class="card-body">
            <div class="controls mb-2">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button @click="slideTo(0)" :class="{ 'active': currentSlide == 0 }" type="button"
                        class="btn btn-light">Группы</button>
                    <button @click="slideTo(1)" :class="{ 'active': currentSlide == 1 }" type="button"
                        class="btn btn-light">Категории</button>
                    <button @click="slideTo(2)" :class="{ 'active': currentSlide == 2 }" type="button"
                        class="btn btn-light">Продукты</button>
                </div>
            </div>
            <div class="lists-container">
                <div v-show="currentSlide == 0" class="list-container">
                    Группы
                    <ListWithControls />
                </div>
                <div v-show="currentSlide == 1" class="list-container">
                    Категории
                    <ListWithControls />
                </div>
                <div v-show="currentSlide == 2" class="list-container">
                    Продукты
                    <ListWithControls />
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
.lists-container {
    max-height: 100%;
    overflow-y: scroll;
}

.list-container {
    height: 100%;
}
</style>
<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import ListWithControls from './ListWithControls.vue';

const currentSlide = ref(0);
const slideLimit = 1;

const props = defineProps({
    categories: {
        type: Array,
        default: [],
    },
    isCategoriesFound: {
        type: Boolean,
        default: false,
    },
    products: {
        type: Array,
        default: [],
    },
    isProductsFound: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits({

});

function slideTo(slideNum) {
    if (slideNum == currentSlide.value || slideNum < 0 || slideNum > slideLimit) {
        return;
    }
    currentSlide.value = slideNum;
}

function selectCategory() { }

function selectProduct() { }
</script>

<!-- <template>
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
                    <ListWithControls />
                </div>
                <div v-show="currentSlide == 1" class="list-container">
                    <ListWithControls />
                </div>
                <div v-show="currentSlide == 2" class="list-container">
                    <ListWithControls :data="productStore.products" :is-data-found="productStore.isProductsFound" />
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
.lists-container {
    height: 100%;
}

.list-container {
    min-height: 100%;
    overflow-y: scroll;
}
</style> -->

<template>
    <div class="carusel-container card py-2 border-light ">

        <div class="carusel-controll px-2 pb-1 mb-1 border-bottom">

            <div class="btn-group" role="group" aria-label="Basic example">
                <button @click="slideTo(0)" :class="{ 'active': currentSlide == 0 }" type="button"
                    class="btn btn-light">Категории</button>
                <button @click="slideTo(1)" :class="{ 'active': currentSlide == 1 }" type="button"
                    class="btn btn-light">Продукты</button>
            </div>
        </div>

        <div id="productsCarosel" class="carusel">
            <div class="slides">
                <div id="categoriesSlide" v-show="currentSlide == 0" class="slide ps-2 pe-2">
                    <ListWithControls :data="props.categories" :is-data-found="props.isCategoriesFound"
                        @select-element="selectCategory" />
                </div>
                <div id="productsSlide" v-show="currentSlide == 1" class="slide ps-2 pe-2">
                    <ListWithControls :data="props.products" :is-data-found="props.isProductsFound"
                        @select-element="selectProduct" />
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
.carusel-container {
    min-height: 100%;
    max-height: 100%;
    max-width: 100%;
    // height: 100%;
}

.carusel {
    height: 100%;
    max-height: 100%;
    width: 100%;
    overflow-y: scroll;
    // max-width: 100%;
}

.slides {
    height: 100%;
    overflow-y: hidden;
    transition: transform .5s;
}

.slide {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
}


.carusel-controll {
    .controll-item::after {
        content: '/';
        padding-left: 1vw;
    }

    .controll-item:last-child:after {
        content: '';
        padding-left: 1vw;
    }
}
</style>
<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import ListWithControls from './ListWithControls.vue';
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';

onBeforeMount(() => {
    emit('getCategoryGropus');
});

const props = defineProps({
    categoryGroups: {
        type: Array,
        default: [],
    },
    isCategoryGroupsFound: {
        type: Boolean,
        default: false,
    },
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
    getCategoryGropus: () => {
        return true;
    },
    getCategories: (id) => {
        if (id) {
            return true;
        }
        return false;
    },
    getProducts: (id) => {
        if (id) {
            return true;
        }
        return false;
    },
    getProduct: (id) => {
        if (id) {
            return true;
        }
        return false;
    },
});

const currentSlide = ref(0);
const slideLimit = 2;

function slideTo(slideNum) {

    if (slideNum > slideLimit) {
        return;
    }

    if (slideNum < 0) {
        return;
    }

    if (slideNum == currentSlide.value) {
        return;
    }

    currentSlide.value = slideNum;
}

function selectGroup(id) {
    emit('getCategories', id);
    // setTimeout(() => slideTo(1), 800);
    slideTo(1);
}

function selectCategory(id) {
    emit('getProducts', id);
    // setTimeout(() => slideTo(2), 800);
    slideTo(2);
}

function selectProduct(id) {
    emit('getProduct', id);
}

</script>

<template>
    <div class="carusel-container card py-2 border-light ">

        <div class="carusel-controll d-flex gap-2 px-2 pb-1 mb-1 border-bottom">

            <div class="controll-item">
                <div class="btn btn-light" @click="slideTo(0)">
                    Группы
                </div>
                <!-- <div class="btn-group">
                    <button type="button" class="btn btn-light">Group</button>
                    <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div> -->
            </div>

            <div v-show="currentSlide > 1" class="controll-item">
                <div class="btn btn-light" @click="slideTo(1)">
                    Категории
                </div>
            </div>
            <div v-show="currentSlide > 0" class="controll-item">
                <div class="btn btn-light" @click="slideTo(currentSlide - 1)">
                    <IconArrowLeftShort :size="20" />
                    Назад
                </div>
            </div>
        </div>

        <div id="productsCarosel" class="carusel">
            <div class="slides">
                <div id="groupsSlide" v-show="currentSlide == 0" class="slide ps-2 pe-2">
                    <ListWithControls :data="props.categoryGroups" :is-data-found="props.isCategoryGroupsFound"
                        @select-element="selectGroup" />
                </div>
                <div id="categoriesSlide" v-show="currentSlide == 1" class="slide ps-2 pe-2">
                    <ListWithControls :data="props.categories" :is-data-found="props.isCategoriesFound"
                        @select-element="selectCategory" />
                </div>
                <div id="productsSlide" v-show="currentSlide == 2" class="slide ps-2 pe-2">
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
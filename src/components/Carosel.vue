<script setup>
import { computed, onBeforeMount, ref } from 'vue';
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
    categories: {
        type: Array,
        default: [],
    },
    products: {
        type: Array,
        default: [],
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

const caruselOffsset = ref(0);
const currentSlide = ref(0);
const slideLimit = 2;

const currentOffset = computed(() => {
    return { transform: 'translateX(' + caruselOffsset.value + 'px)' };
});

const slideSize = computed(() => {
    // let elementWidth = document.getElementById('productsCarosel').clientWidth;
    // let elementHeight = document.getElementById('productsCarosel').clientHeight;
    return { width: '100px', height: '100%' }
    return { width: elementWidth, height: elementHeight }
});

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

    let containerWidth = document.getElementById('productsCarosel').clientWidth;
    caruselOffsset.value += containerWidth * (currentSlide.value - slideNum);
    console.log('Offset ' + caruselOffsset.value);
    currentSlide.value = slideNum;
}

function selectGroup(id) {
    emit('getCategories', id);
    setTimeout(() => slideTo(1), 1000);
    // slideTo(1);
}

function selectCategory(id) {
    emit('getProducts', id);
    setTimeout(() => slideTo(2), 1000);
    // slideTo(2);
}

function selectProduct(id) {
    emit('getProduct', id);
}

</script>

<template>
    <div id="productscarusel" class="card py-2 border border-light carusel-container">

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

        <div id="productsCarosel" class="carusel ">
            <div class="slides active-slide" :style="currentOffset">
                <div id="groupsSlide" class="slide ps-2 pe-2">
                    <ListWithControls :data="props.categoryGroups" @select-element="selectGroup" />
                </div>
                <div id="categoriesSlide" class="slide ps-2 pe-2">
                    <ListWithControls :data="props.categories" @select-element="selectCategory" />
                </div>
                <div id="productsSlide" class="slide ps-2 pe-2">
                    <ListWithControls :data="props.products" @select-element="selectProduct" />
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
.carusel-container {
    max-height: 100%;
    height: 100%;
}

.carusel {
    display: block;
    overflow: hidden;
    max-height: 100%;
    max-width: 100%;
}

.slides {
    // position: relative;
    // display: flex;
    display: block;
    // flex-wrap: nowrap;
    // align-items: stretch;
    overflow: visible;
    // flex-shrink: 0;
    width: auto;
    max-height: 100%;
    transition: transform .5s;
}

.slide {
    // position: relative;
    display: inline-block;
    // display: block;
    // float: left;
    // margin-right: 1vw;
    // display: none;
    // background-color: aquamarine;
    max-height: 100%;
    overflow-y: scroll;
    min-width: 100%;
    max-width: 100%;
    // overflow-y: scroll;
}

.active-slide {
    // display: inline-block;
    transform: translateX(0px);
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
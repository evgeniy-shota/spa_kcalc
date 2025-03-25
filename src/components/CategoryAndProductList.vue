<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { throttle } from '@/resource/js/throttle';
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
    showFilteredProducts: {
        type: Boolean,
        default: false,
    },
    nextPageCursor: {
        type: String,
        default: null
    }
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
    changeCategoryGroupFavoriteStatus: (id, status) => {
        if (id && status) {
            return true;
        }
        return false;
    },
    changeCategoryGroupHiddenStatus: (id, status) => {
        if (id && status) {
            return true;
        }
        return false;
    },
    changeCategoryFavoriteStatus: (id, status) => {
        if (id && status) {
            return true;
        }
        return false;
    },
    changeCategoryHiddenStatus: (id, status) => {
        if (id && status) {
            return true;
        }
        return false;
    },
    changeProductFavoriteStatus: (id, status) => {
        if (id && status) {
            return true;
        }
        return false;
    },
    changeProductHiddenStatus: (id, status) => {
        if (id && status) {
            return true;
        }
        return false;
    },
    editCategory: (id, index) => {
        if (id, index) {
            return true
        }
        return true
    },
    editProduct: (id, index) => {
        if (id, index) {
            return true
        }
        return true
    },
    showFilter: () => {
        return true;
    },
    hideFilteredProduct: () => {
        return true;
    },
});

// watch(() => props.nextPageCursor, () => {
//     currentTimer.value = null
// });

watch(() => props.showFilteredProducts, () => {
    if (props.showFilteredProducts) {
        slideTo(0);
    }
});

const currentSlide = ref(1);
const previouslySlide = ref(1);
const slideLimit = 3;

let timeOutMs = 500;
const currentTimer = ref(null);

const currentSelectedCategoryGroup = ref()
const currentSelectedCategory = ref()
const currentSelectedProduct = ref()

function slideTo(slideNum) {

    if (slideNum > slideLimit) {
        return;
    }

    if (currentSlide.value == 0) {
        emit('hideFilteredProduct');
        if (previouslySlide.value === 3 && slideNum < 0) {
            selectCategory(currentSelectedCategory.value)
        } else {
            currentSlide.value = previouslySlide.value
        }
    }

    if (slideNum < 0) {
        return
    }

    if (slideNum == currentSlide.value) {
        return;
    }

    previouslySlide.value = currentSlide.value
    currentSlide.value = slideNum;
}

function selectGroup(id) {
    currentSelectedCategoryGroup.value = id
    emit('getCategories', id);
    // setTimeout(() => slideTo(1), 800);
    slideTo(2);
}

function selectCategory(id) {

    console.log('categoryId: ' + id)
    currentSelectedCategory.value = id
    emit('getProducts', id);
    // setTimeout(() => slideTo(2), 800);
    slideTo(3);
}

function selectProduct(id) {
    currentSelectedProduct.value = id
    emit('getProduct', id);
}

function showFilter() {
    emit('showFilter');
}

function changeCategoryGroupFavorieStatus(id, status, index) {
    console.log(`changeCategoryGroupFavorieStatus ${id}-${status}`);
    emit('changeCategoryGroupFavoriteStatus', id, status, index);
}

function changeCategoryGroupHiddenStatus(id, status, index) {
    console.log(`changeCategoryGroupHiddenStatus ${id}-${status}`);
    emit('changeCategoryGroupHiddenStatus', id, status, index);
}

function changeCategoryFavorieStatus(id, status, index) {
    console.log(`changeCategoryFavorieStatus ${id}-${status}`);
    emit('changeCategoryFavoriteStatus', id, status, index);
}

function changeCategoryHiddenStatus(id, status, index) {
    console.log(`changeCategoryHiddenStatus ${id}-${status}`);
    emit('changeCategoryHiddenStatus', id, status, index);
}

function changeProductFavorieStatus(id, status, index) {
    console.log(`changeProductFavorieStatus ${id}-${status}`);
    emit('changeProductFavoriteStatus', id, status, index);
}

function changeProductHiddenStatus(id, status, index) {
    console.log(`changeProductHiddenStatus ${id}-${status}`);
    emit('changeProductHiddenStatus', id, status, index);
}

function editCategory(id, index) {
    console.log('editCategory: ' + id);
    emit('editCategory', id, index);
}

function editProduct(id, index) {
    console.log('editProduct: ' + id);
    emit('editProduct', id, index);
}

function resetTimer() {
    console.log('timer reset');

    currentTimer.value = null
}

function getNextDataPage() {
    emit('getProducts', props.showFilteredProducts ? null : currentSelectedCategory.value, props.nextPageCursor);
}

function scrollList(event) {

    if (!props.nextPageCursor) {
        return
    }

    if (currentTimer.value) {
        return
    }

    let currentSroll = event.target.scrollTop + event.target.offsetHeight;
    let scrollOffset = event.target.scrollHeight * 0.1

    if (currentSroll + scrollOffset >= event.target.scrollHeight) {
        getNextDataPage();
        currentTimer.value = setTimeout(resetTimer, timeOutMs);
    }
}

</script>

<template>
    <div class="carusel-container card py-2 border-light">

        <div class="carusel-controll d-flex gap-2 px-2 pb-1 mb-1 border-bottom">

            <div v-show="currentSlide >= 0" class="controll-item">
                <div class="btn btn-light" @click="slideTo(1)">
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

            <div v-show="currentSlide == 0 && props.showFilteredProducts" class="controll-item">
                <div class="btn btn-light" @click="slideTo(currentSlide - 1)">
                    Результаты поиска
                </div>
            </div>

            <div v-show="currentSlide > 2 && !props.showFilteredProducts" class="controll-item">
                <div class="btn btn-light" @click="slideTo(2)">
                    Категории
                </div>
            </div>
            <div v-show="currentSlide > 1 || props.showFilteredProducts" class="controll-item">
                <div class="btn btn-light" @click="slideTo(currentSlide - 1)">
                    <IconArrowLeftShort :size="20" />
                    Назад
                </div>
            </div>
        </div>

        <!-- filter -->

        <div class="filter-container px-2 pb-1 mb-1">
            <div @click="showFilter($event)" class="btn btn-sm btn-info">Фильтр</div>
        </div>

        <!-- @scroll="scrollList" -->
        <!-- <div id="productsCarosel" class="carusel"> -->
        <!-- <div class="slides"> -->

        <div id="filterResultSlide" @scroll="scrollList($event)" v-show="currentSlide == 0" class="slide ps-2 pe-2">
            <ListWithControls :data="props.showFilteredProducts ? props.products : []"
                :is-data-found="props.isProductsFound" @select-element="selectProduct"
                @change-favorite-status="changeProductFavorieStatus" @change-hidden-status="changeProductHiddenStatus"
                @edit-elemet="editProduct" />
        </div>
        <div id="groupsSlide" v-show="currentSlide == 1" class="slide ps-2 pe-2">
            <ListWithControls :data="props.categoryGroups" :is-data-found="props.isCategoryGroupsFound"
                @select-element="selectGroup" @change-favorite-status="changeCategoryGroupFavorieStatus"
                @change-hidden-status="changeCategoryGroupHiddenStatus" />
        </div>
        <div id="categoriesSlide" v-show="currentSlide == 2" class="slide ps-2 pe-2">
            <ListWithControls :data="props.categories" :is-data-found="props.isCategoriesFound"
                @select-element="selectCategory" @change-favorite-status="changeCategoryFavorieStatus"
                @change-hidden-status="changeCategoryHiddenStatus" @edit-elemet="editCategory" />
        </div>
        <div id="productsSlide" @scroll="scrollList($event)" v-show="currentSlide == 3" class="slide ps-2 pe-2">
            <ListWithControls :data="!props.showFilteredProducts ? props.products : []"
                :is-data-found="props.isProductsFound" @select-element="selectProduct"
                @change-favorite-status="changeProductFavorieStatus" @change-hidden-status="changeProductHiddenStatus"
                @edit-elemet="editProduct" />
        </div>

        <!-- </div> -->
        <!-- </div> -->

    </div>
</template>

<style lang="scss">
.carusel-container {
    min-height: 100%;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    // height: 100%;
}

.carusel {
    height: 100%;
    max-height: 100%;
    width: 100%;
    // overflow-y: hidden;
    overflow: hidden;
    // max-width: 100%;
}

.slides {
    height: 100%;
    max-height: 100%;
    // overflow-y: hidden;
    overflow: hidden;
    transition: transform .5s;
}

.slide {
    width: 100%;
    height: 100%;
    max-height: 100%;
    box-sizing: border-box;
    // overflow-y: hidden;
    overflow-y: auto;
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
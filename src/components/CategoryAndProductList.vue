<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useCategoryGroupsStore } from '@/stores/categoryGroupsStore';
import { useCategoriesStore } from '@/stores/categoriesStore';

import ListWithControls from './ListWithControls.vue';
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';
import IconFunnel from './icons/IconFunnel.vue';
import IconSortDown from './icons/IconSortDown.vue';
import IconPlusLg from './icons/IconPlusLg.vue';
import { CategoryGroupParams, CategoryParams, ProductParams } from '@/resource/js/sortParams';
import { useProductsStore } from '@/stores/productsStore';
import { useFiltersStore } from '@/stores/filtersStore';

const categoryGroupStore = useCategoryGroupsStore();
const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const filtersStore = useFiltersStore();

onBeforeMount(() => {
    categoryGroupStore.getCategoryGroups();
    // emit('getCategoryGroups');
});

const props = defineProps({

    showFilteredProducts: {
        type: Boolean,
        default: false,
    },
    nextPageCursor: {
        type: String,
        default: null
    },
    userIsAuthorized: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits({

    getCategoryGroups: () => {
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
        if (id && status !== null) {
            return true;
        }
        return false;
    },
    changeCategoryGroupHiddenStatus: (id, status) => {
        if (id && status !== null) {
            return true;
        }
        return false;
    },
    changeCategoryFavoriteStatus: (id, status) => {
        if (id && status !== null) {
            return true;
        }
        return false;
    },
    changeCategoryHiddenStatus: (id, status) => {
        if (id && status !== null) {
            return true;
        }
        return false;
    },
    changeProductFavoriteStatus: (id, status) => {
        if (id && status !== null) {
            return true;
        }
        return false;
    },
    changeProductHiddenStatus: (id, status) => {
        if (id && status !== null) {
            return true;
        }
        return false;
    },
    editCategoriesGroup: (id, index) => {
        if (id, index) {
            return true
        }
        return true
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
    showFilter: (eventSource) => {
        if (eventSource) {
            return true
        }
        return false;
    },
    hideFilteredProduct: () => {
        return true;
    },
    applyCategoriesGroupSort: (sortParams) => {
        if (sortParams) {
            return true
        }
        return false
    },
    applyCategoriesSort: (sortParams) => {
        if (sortParams) {
            return true
        }
        return false
    },
    applyProductsSort: (sortParams) => {
        if (sortParams) {
            return true
        }
        return false
    },
    addCategoryGroup: () => {
        return true;
    },
    addCategory: () => {
        return true;
    },
    addProduct: () => {
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

const categoryGroupSortTypeValue = ref(categoryGroupStore.sortType)
const categorySortTypeValue = ref(categoriesStore.sortType)
const productSortTypeValue = ref(productsStore.sortType)

function setCategoryGroupSortType(val) {
    categoryGroupStore.sortType = val
    // categoryGroupSortTypeValue.value = val
    // emit('applyCategoriesGroupSort', val);
}

function setCategorySortType(val) {
    categoriesStore.sortType = val
}

function setProductSortType(val) {
    productsStore.sortType = val
}

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

    if (slideNum === 1) {
        categoryGroupStore.getCategoryGroups()
    }
    previouslySlide.value = currentSlide.value
    currentSlide.value = slideNum;
}

function selectGroup(id) {
    currentSelectedCategoryGroup.value = id
    filtersStore.categoryGroupsFilter.categoryGroupsId.length = 0
    filtersStore.categoryGroupsFilter.categoryGroupsId.push(id)
    categoriesStore.categories.length = 0
    categoriesStore.getCategories(id);
    slideTo(2);
}

function selectCategory(id) {
    currentSelectedCategory.value = id
    categoriesStore.currentCategory = id
    filtersStore.categoriesFilter.categoryId.length = 0;
    filtersStore.categoriesFilter.categoryId.push(id);
    productsStore.products.length = 0
    productsStore.getProducts(id);
    slideTo(3);
}

function selectProduct(id) {
    currentSelectedProduct.value = id
    productsStore.getProduct(id)
}

function showFilter(event, eventSource) {
    emit('showFilter', eventSource);
}

function changeCategoryGroupFavorieStatus(id, status, index) {
    categoryGroupStore.changeCategoryGroup(id, { isFavorite: status }, index);
}

function changeCategoryGroupHiddenStatus(id, status, index) {
    categoryGroupStore.changeCategoryGroup(id, { isHidden: status }, index);
}

function changeCategoryFavorieStatus(id, status, index) {
    categoriesStore.changeCategory(id, { isFavorite: status }, index)
}

function changeCategoryHiddenStatus(id, status, index) {
    categoriesStore.changeCategory(id, { isHidden: status }, index)
}

function changeProductFavorieStatus(id, status, index) {
    productsStore.changeProduct(id, { isFavorite: status }, index)
}

function changeProductHiddenStatus(id, status, index) {
    productsStore.changeProduct(id, { isHidden: status }, index)
}

function editCategoriesGroup(id, index) {
    console.log('editCategory: ' + id);
    emit('editCategoriesGroup', id, index);
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
    currentTimer.value = null;
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

function addCategoryGroup() {
    console.log('add CategoryGroup')
    emit('addCategoryGroup')
}

function addCategory() {
    console.log('add Category')
    emit('addCategory')
}

function addProduct() {
    console.log('add Product')
    emit('addProduct')
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

        <div class="list-controllers d-flex gap-2 ms-2">
            <!-- filter -->
            <div class="filter-container  pb-1 mb-1">
                <div @click="showFilter($event, currentSlide)" class="btn btn-sm btn-outline-dark">
                    <IconFunnel />
                    Фильтр
                </div>
            </div>

            <!-- sort -->
            <div class="sort-container pb-1 mb-1 me-auto">
                <div class="btn btn-sm btn-outline-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <IconSortDown />
                    Сортировка
                </div>
                <ul class="dropdown-menu">
                    <li v-show="currentSlide === 1" v-for="(item) in CategoryGroupParams" :key="item.key">
                        <button @click="setCategoryGroupSortType(item.key)"
                            :class="{ 'active': item.key == categoryGroupStore.sortType }" class="dropdown-item"
                            type="button">
                            {{ item.title }}
                        </button>
                    </li>
                    <li v-show="currentSlide === 2" v-for="(item) in CategoryParams" :key="item.key">
                        <button @click="setCategorySortType(item.key)"
                            :class="{ 'active': item.key == categoriesStore.sortType }" class="dropdown-item"
                            type="button">
                            {{ item.title }}
                        </button>
                    </li>
                    <li v-show="currentSlide === 3 || currentSlide === 0" v-for="(item) in ProductParams"
                        :key="item.key">
                        <button @click="setProductSortType(item.key)"
                            :class="{ 'active': item.key == productsStore.sortType }" class="dropdown-item"
                            type="button">
                            {{ item.title }}
                        </button>
                    </li>
                </ul>
            </div>


            <div class="dropdown me-2">
                <button class="btn btn-sm btn-outline-primary d-flex align-items-center" type="button"
                    data-bs-toggle="dropdown">
                    <IconPlusLg />
                    Добавить
                </button>
                <ul class="dropdown-menu">
                    <button @click="addCategoryGroup" class="btn dropdown-item">Добавить группу</button>
                    <button @click="addCategory" class="btn dropdown-item">Добавить категорию</button>
                    <button @click="addProduct" class="btn dropdown-item">Добавить продукт</button>
                </ul>
            </div>

        </div>


        <!-- @scroll="scrollList" -->
        <!-- <div id="productsCarosel" class="carusel"> -->
        <!-- <div class="slides"> -->

        <div id="filterResultSlide" @scroll="scrollList($event)" v-show="currentSlide == 0" class="slide ps-2 pe-2">
            <ListWithControls :user-is-authorized="props.userIsAuthorized"
                :data="props.showFilteredProducts ? props.products : []" data-type="product"
                :is-data-found="props.isProductsFound" @select-element="selectProduct"
                @change-favorite-status="changeProductFavorieStatus" @change-hidden-status="changeProductHiddenStatus"
                @edit-elemet="editProduct" />
        </div>
        <div id="groupsSlide" v-show="currentSlide == 1" class="slide ps-2 pe-2">
            <ListWithControls :user-is-authorized="props.userIsAuthorized" :data="categoryGroupStore.categoryGroupsList"
                data-type="categoryGroup" :is-data-found="categoryGroupStore.isCategoryGroupsFound"
                @select-element="selectGroup" @change-favorite-status="changeCategoryGroupFavorieStatus"
                @change-hidden-status="changeCategoryGroupHiddenStatus" />
        </div>
        <div id="categoriesSlide" v-show="currentSlide == 2" class="slide ps-2 pe-2">
            <ListWithControls :user-is-authorized="props.userIsAuthorized" :data="categoriesStore.categoriesList"
                data-type="category" :is-data-found="categoriesStore.isCategoriesFound" @select-element="selectCategory"
                @change-favorite-status="changeCategoryFavorieStatus" @change-hidden-status="changeCategoryHiddenStatus"
                @edit-element="editCategory" />
        </div>
        <div id="productsSlide" @scroll="scrollList($event)" v-show="currentSlide == 3" class="slide ps-2 pe-2">
            <ListWithControls :user-is-authorized="props.userIsAuthorized"
                :data="!props.showFilteredProducts ? productsStore.productsList : []" data-type="product"
                :is-data-found="productsStore.isProductsFound" @select-element="selectProduct"
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
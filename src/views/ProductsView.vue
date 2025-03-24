<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import ProductsList from '@/components/ProductsList.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import ProductForm from '@/components/ProductForm.vue';
import { useProductsStore } from '@/stores/productsStore';
import { useUsersStore } from '@/stores/usersStore';
import Offcanv from '@/components/Offcanv.vue';
import CategoryAndProductList from '@/components/CategoryAndProductList.vue';
import { useAdditionalProductData } from '@/stores/additionProductData';
import App from '@/App.vue';

const productsStore = useProductsStore();
const additionalProductDataStore = useAdditionalProductData();
// const userStore = useUsersStore();

const showTwoCol = ref(true);

onMounted(() => {
    // productsStore.getCategories();
    // console.log(productsStore.categories);
    additionalProductDataStore.getData();
});
const isShowProductFilter = ref(false)
const isShowFilteredProducts = ref(false)
const isApplyFilter = ref(false)
const isClearFilter = ref(false)
const isShowNewProductWindow = ref(false);
const isShowProductInfoWindow = ref(false);
const saveNewProductResult = ref(false);

const propsForModalFilter = computed(() => {
    return {
        categories: additionalProductDataStore.allCategories,
        dataSource: additionalProductDataStore.dataSource,
        countries: additionalProductDataStore.countriesOfManufacture,
        caloryLimits: additionalProductDataStore.caloryLimits,
        proteinsLimits: additionalProductDataStore.proteinsLimits,
        carbohydratesLimits: additionalProductDataStore.carbohydratesLimits,
        fatsLimits: additionalProductDataStore.fatsLimits,
        isApplyFilter: isApplyFilter.value,
        isClearFilter: isClearFilter.value,
        applyFilter: applyFilter,
        clearFilter: clearFilter,
        clickApplyFilter: clickApplyFilter,
        clickClearFilter: clickClearFilter,
    }
});

const propsForModalWindowSlots = computed(() => {
    return {
        saveNewProduct: saveNewProduct,
        // product: {
        //     name: 'some product',
        //     description: 'description some product',
        //     kcalory: 200,
        //     proteins: 14,
        //     carbohydrates: 47,
        //     fats: 18,
        // },
        categories: productsStore.categories,
        saveNewProductResult: saveNewProductResult.value,
        isReadonly: false,
    }

});

const categoriesGroup = computed(() => {
    if (productsStore.categoriesGroup) {
        return productsStore.categoriesGroup
    }
    return [];
});

const isCategoryGroupsFound = computed(() => {
    return productsStore.isCategoriesGroupFound;
});

const categories = computed(() => {
    if (productsStore.categories) {
        return productsStore.categories
    }
    return []
});

const isCategoriesFound = computed(() => {
    return productsStore.isCategoriesFound;
});

const products = computed(() => {
    if (productsStore.products) {
        return productsStore.products
    }
    return []
});

const isProductsFound = computed(() => {
    return productsStore.isProductsFound;
});

function showNewProductWindow() {
    saveNewProductResult.value = false;
    isShowNewProductWindow.value = true;
}

function hideNewProductWindow() {
    isShowNewProductWindow.value = false;
}

function showProductInfoWindow() {
    isShowProductInfoWindow.value = true;
}

function hideProductInfoWindow() {
    isShowProductInfoWindow.value = false;
}

function showProductFilter() {
    isShowProductFilter.value = true;
}
function hideProductFilter() {
    isShowProductFilter.value = false;
}

async function getCategories(id) {
    productsStore.categories.length = 0
    productsStore.getCategories(id);
}

function getProducts(id, cursor = null) {
    if (!cursor) {
        productsStore.products.length = 0
    }
    productsStore.getProducts(id, cursor);
}

function getProduct(id) {
    productsStore.getProduct(id);
}
function clickApplyFilter() {
    isApplyFilter.value = true
}

function clickClearFilter() {
    isClearFilter.value = true
}

async function applyFilter(filter) {
    isApplyFilter.value = false
    isShowProductFilter.value = false
    // console.log(filter);
    productsStore.productsFilter = filter;
    // productsStore.getProducts();
    productsStore.getProducts();
    isShowFilteredProducts.value = true
}

async function clearFilter() {
    console.log('cleaFilter');
    productsStore.clearProductFilter();
    isClearFilter.value = false
}

function hideFilteredProducts() {
    productsStore.clearProductFilter();
    isShowFilteredProducts.value = false
}

function changeCategoryGroupFavoriteStatus(id, status, index) {
    productsStore.changeCategoryGroup(id, {
        id: id,
        is_favorite: status
    }, index);
}

function changeCategoryGroupHiddenStatus(id, status, index) {
    productsStore.changeCategoryGroup(id, {
        id: id,
        is_hidden: status
    }, index);
}

function changeCategoryFavoriteStatus(id, status, index) {
    productsStore.changeCategory(id, {
        id: id,
        is_favorite: status
    }, index);
}

function changeCategoryHiddenStatus(id, status, index) {
    productsStore.changeCategory(id, {
        id: id,
        is_hidden: status
    }, index);
}

function changeProductFavoriteStatus(id, status, index) {
    productsStore.changeProduct(id, {
        id: id,
        is_favorite: status
    }, index);
}

function changeProductHiddenStatus(id, status, index) {
    productsStore.changeProduct(id, {
        id: id,
        is_hidden: status
    }, index);
}



async function saveNewProduct(product, category) {
    console.log('save new product');
    const response = await productsStore.addNewProduct(product, category);

    console.log(response);
    if (response) {
        saveNewProductResult.value = true;
        hideNewProductWindow();
    }

}
</script>

<template>

    <ModalWindow :show-window="isShowNewProductWindow" title="Добавление нового продукта"
        @close-window="hideNewProductWindow" :props-for-slots="propsForModalWindowSlots">

        <!-- <template #main="{ propsForSlot }">
            <ProductForm @submit-form="propsForSlot.saveNewProduct" :product="propsForSlot.product"
                :product-saved-successful="propsForSlot.saveNewProductResult" :categories="propsForSlot.categories"
                :is-readonly="propsForSlot.isReadonly" />
        </template> -->

        <template #main="{ saveNewProduct, product, categories, saveNewProductResult, isReadonly }">
            <ProductForm @submit-form="saveNewProduct" :product="product"
                :product-saved-successful="saveNewProductResult" :categories="categories" :is-readonly="isReadonly" />
        </template>

    </ModalWindow>

    <ModalWindow :show-window="isShowProductFilter" title="Расширенный фильтр" @close-window="hideProductFilter"
        :props-for-slots="propsForModalFilter">

        <template
            #main="{ categories, dataSource, countries, isApplyFilter, isClearFilter, applyFilter, clearFilter, caloryLimits, proteinsLimits, carbohydratesLimits, fatsLimits }">
            <ProductFilter :categories="categories" :data-source="dataSource" :countries="countries"
                @apply-filter="applyFilter" @clear-filter="clearFilter" :is-apply-filter="isApplyFilter"
                :is-clear-filter="isClearFilter" :calory-limit="caloryLimits" :proteins-limit="proteinsLimits"
                :carbohydrates-limit="carbohydratesLimits" :fats-limit="fatsLimits" />
        </template>

        <template #footer="{ clickClearFilter, clickApplyFilter }">
            <div @click="clickApplyFilter" class="btn btn-primary me-2">Применить</div>
            <div @click="clickClearFilter" class="btn btn-secondary me-2">Очистить</div>
        </template>

    </ModalWindow>

    <!-- <Offcanvas title="test offcanvas" /> -->

    <div class="col" style="max-height: 100%;">

        <CategoryAndProductList :category-groups="categoriesGroup" :categories="categories" :products="products"
            :is-category-groups-found="isCategoryGroupsFound" :is-categories-found="isCategoriesFound"
            :is-products-found="isProductsFound" :show-filtered-products="isShowFilteredProducts"
            :next-page-cursor="productsStore.productsNextCursor" @hide-filtered-product="hideFilteredProducts"
            @get-category-gropus="productsStore.getCategoryGroups();" @get-categories="getCategories"
            @get-products="getProducts" @get-product="getProduct" @show-filter="showProductFilter"
            @change-category-group-favorite-status="changeCategoryGroupFavoriteStatus"
            @change-category-group-hidden-status="changeCategoryGroupHiddenStatus"
            @change-category-favorite-status="changeCategoryFavoriteStatus"
            @change-category-hidden-status="changeCategoryHiddenStatus"
            @change-product-favorite-status="changeProductFavoriteStatus"
            @change-product-hidden-status="changeProductHiddenStatus">
        </CategoryAndProductList>

        <!-- <ProductsList @on-click-add-new-product="showNewProductWindow" @show-product-info="showProductInfoWindow"
            :user-is-authorized="userStore.userIsAuthorized" /> -->

        <Offcanv v-if="!showTwoCol" title="Информация о продукте" :hidden="!isShowProductInfoWindow"
            @hide="hideProductInfoWindow">
            <template #main>
                <ProductInfo />
            </template>
        </Offcanv>
    </div>

    <!-- <ModalWindow title="Информаация о продукте" :show-window="isShowProductInfoWindow"
        @close-window="hideProductInfoWindow">
        <template #main>
            <ProductInfo />
        </template>
    </ModalWindow> -->

    <!-- small col -->

    <div v-if="showTwoCol" style="max-height: 100%;" class="col">
        <ProductInfo />
    </div>

</template>

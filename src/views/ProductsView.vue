<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import ProductsList from '@/components/ProductsList.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import ProductForm from '@/components/ProductForm.vue';
import { useProductsStore } from '@/stores/productsStore';
import { useUsersStore } from '@/stores/usersStore';
import Offcanv from '@/components/Offcanv.vue';
import CategoryAndProductList from '@/components/CategoryAndProductList.vue';

const productsStore = useProductsStore();
// const userStore = useUsersStore();

const showTwoCol = ref(true);

onMounted(() => {
    // productsStore.getCategories();
    // console.log(productsStore.categories);
});

const isShowNewProductWindow = ref(false);
const isShowProductInfoWindow = ref(false);
const saveNewProductResult = ref(false);

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

async function getCategories(id) {
    productsStore.categories.length = 0
    productsStore.getCategories(id);
}

function getProducts(id) {
    productsStore.products.length = 0
    productsStore.getProducts(id);
}

function getProduct(id) {
    productsStore.getProduct(id);
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

    <!-- <Offcanvas title="test offcanvas" /> -->

    <div class="col" style="max-height: 100%;">

        <CategoryAndProductList :category-groups="categoriesGroup" :categories="categories" :products="products"
            :is-category-groups-found="isCategoryGroupsFound" :is-categories-found="isCategoriesFound"
            :is-products-found="isProductsFound" @get-category-gropus="productsStore.getCategoryGroups();"
            @get-categories="getCategories" @get-products="getProducts" @get-product="getProduct">
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

<script setup>
import { onBeforeMount, ref } from 'vue';
import ProductsList from '@/components/ProductsList.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import ProductForm from '@/components/ProductForm.vue';
import { useProductsStore } from '@/stores/productsStore';
import { useUsersStore } from '@/stores/usersStore';

const productsStore = useProductsStore();
const userStore = useUsersStore();

onBeforeMount(() => {
    // productsStore.getCategories();
});

const isShowNewProductWindow = ref(false);
const saveNewProductResult = ref(false);

const propsForModalWindowSlots = ref({
    saveNewProduct: saveNewProduct,
    product: {
        name: 'some product',
        description: 'description some product',
        kcalory: 200,
        proteins: 14,
        carbohydrates: 47,
        fats: 18,
    },
    categories: productsStore.categories,
    saveNewProductResult: saveNewProductResult
});

function showNewProductWindow() {
    saveNewProductResult.value = false;
    isShowNewProductWindow.value = true;
}

function hideNewProductWindow() {
    isShowNewProductWindow.value = false;
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

    <ModalWindow :show-window="isShowNewProductWindow" @close-window="hideNewProductWindow"
        :props-for-slots="propsForModalWindowSlots">
        <template #main="{ propsForSlot }">
            <ProductForm @submit-form="propsForSlot.saveNewProduct" :product="propsForSlot.product"
                :product-saved-successful="propsForSlot.saveNewProductResult" :categories="propsForSlot.categories" />
        </template>
    </ModalWindow>

    <div class="col">
        <ProductsList @on-click-add-new-product="showNewProductWindow"
            :user-is-authorized="userStore.userIsAuthorized" />
    </div>

    <!-- small col -->
    <div class="col">
        <ProductInfo />
    </div>
</template>

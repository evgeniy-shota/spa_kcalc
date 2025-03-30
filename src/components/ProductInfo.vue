<script setup>
import { ref, computed } from 'vue';
import PieChart from './PieChart.vue';
import ProductForm from './ProductForm.vue';
import { useProductsStore } from '@/stores/productsStore';
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';
import IconPlusLg from './icons/IconPlusLg.vue';
import IconPlusSquare from './icons/IconPlusSquare.vue';
import { useAdditionalProductData } from '@/stores/additionProductData';

const productsStore = useProductsStore();
const additionalProductData = useAdditionalProductData()

const props = defineProps({
    userIsAuthorized: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits({
    submitProductForm: (product, categrory) => {
        if (product !== null && categrory !== null) {
            return true
        }
        return false
    }
});

const productFormIsEditable = ref(false)

</script>

<template>
    <div class="card pr-info-container ps-2 pe-2 pt-2 border border-light"
        :class="{ 'overflow-y-hidden': productsStore.product.id === null && !productFormIsEditable }">
        <!-- switch  -->
        <!-- <div class="hstack gap-1 mb-2">
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>
            </div>
        </div> -->

        <div v-if="productsStore.product.id === null && !productFormIsEditable"
            class="position-absolute top-0 start-0 p-2 h-100 w-100 d-inline-block product-info-placeholder">
            <h5 class="p-2 border-bottom border-info ">
                Ничего не выбранно...
            </h5>
            <div class="d-flex align-items-center">
                <IconArrowLeftShort :size="30" />
                <h6 class="p-2 ">
                    Выберите продукт из списка для отображения подробной информации о нем
                </h6>
            </div>
            <div v-if="props.userIsAuthorized" class="d-flex justify-content-center mb-2 fs-6">
                или можете ...
            </div>
            <div v-if="props.userIsAuthorized" class="d-flex justify-content-center">
                <button @click="() => productFormIsEditable = true" class="btn btn-primary py-3 px-4 fs-5">
                    <IconPlusLg :size="30" />
                    Добавить продукт
                </button>
            </div>
        </div>

        <div v-if="!productFormIsEditable && productsStore.product.id !== null"
            class="mb-1 d-flex justify-content-between">
            <div v-if="props.userIsAuthorized">
                <button :disabled="!productsStore.product.is_personal"
                    class="btn btn-primary me-1">Редактировать</button>
                <button @click="productFormIsEditable = true" class="btn btn-primary">Добавить продукт</button>
            </div>
            <div>
                <button class="btn btn-sm btn-light">help</button>
            </div>

        </div>

        <div v-if="!productFormIsEditable" class="container mb-2">
            <PieChart :kcal="productsStore.product.kcalory" :carbohydrates="productsStore.product.carbohydrates"
                :proteins="productsStore.product.proteins" :fats="productsStore.product.fats" />
        </div>

        <!-- форма продукта -->
        <div class="container px-1">
            <ProductForm :product="productsStore.product" :product-category="productsStore.product.category_id"
                :categories="productsStore.categories" :is-readonly="!productFormIsEditable"
                :countries-of-manufacture="additionalProductData.countriesOfManufacture" @submit-form=""
                @cancel-form="() => productFormIsEditable = false" />
        </div>
    </div>

</template>

<style>
.pr-info-container {
    min-height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

.product-info-placeholder {
    background-color: rgb(255, 255, 255);
    /* background-image: url('/2rect2.png'); */
    opacity: .9;
}
</style>
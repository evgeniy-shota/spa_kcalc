<script setup>
import { ref, computed } from 'vue';
import PieChart from './PieChart.vue';
import ProductForm from './ProductForm.vue';
import { useProductsStore } from '@/stores/productsStore';

const productsStore = useProductsStore();

</script>

<template>
    <div class="card pr-info-container ps-2 pe-2 pt-2 border border-light">
        <div class="hstack gap-1 mb-2">
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>
            </div>
        </div>

        <div class="container mb-2">
            <PieChart :kcal="productsStore.product.calory" :carbohydrates="productsStore.product.carbohydrates"
                :proteins="productsStore.product.proteins" :fats="productsStore.product.fats" />
        </div>

        <!-- форма продукта -->
        <div class="container px-1">

            <ProductForm :product="productsStore.product" :product-category="productsStore.product.category_id"
                :categories="productsStore.categories" />

        </div>
    </div>

</template>

<style>
.pr-info-container {
    max-height: 86vh;
    overflow-y: scroll;
}
</style>
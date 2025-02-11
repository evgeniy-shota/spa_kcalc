<script setup>
// import axios from 'axios';
// import { defineStore } from 'pinia';
import { ref, onMounted, onUpdated } from 'vue';
import { useProductsStore } from '../stores/productsStore';
import IconSearch from './icons/IconSearch.vue';
import IconPlusLg from './icons/IconPlusLg.vue';

const productsStore = useProductsStore();
productsStore.getCategories();

const idSelectedCategory = ref(0);
const idSelectedProduct = ref(0);

const props = defineProps({
    userIsAuthorized: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits({
    onClickAddNewProduct: () => {
        return true
    }
});

// Get list of products if don't click to the same category
function getProductsList(category_id) {
    if (category_id != idSelectedCategory.value) {
        productsStore.products.length = 0;
        productsStore.getProducts(category_id);
    }
    idSelectedCategory.value = category_id;
}

// Get product info if don't click to the same product
function getProductInfo(product_id) {
    if (product_id != idSelectedProduct.value) {
        productsStore.getProduct(product_id);
    }
    idSelectedProduct.value = product_id;
}

function addNewProduct() {
    emit('onClickAddNewProduct');
}

onMounted(() => {
    console.log("onMounted!");
    console.log("onMounted done!");
});

onUpdated(() => {
    console.log("Component has updated");
});

</script>

<template>
    <div class="card ps-2 pe-2 pt-2 border border-light">

        <div class="row mb-2">
            <div class="col">
                <button class="btn btn-sm btn-outline-secondary me-2" type="button" id="button-addon1">
                    <IconSearch /> Поиск
                </button>
                <button type="button" class="btn btn-sm btn-secondary me-2">Фильтр</button>
                <button type="button" class="btn btn-sm btn-outline-danger ">Сбросить</button>
            </div>

            <div v-show="userIsAuthorized" class="col">
                <div class="d-grid">

                    <button @click="addNewProduct" class="btn btn-sm btn-primary">
                        <IconPlusLg />
                        <span>Добавить продукт</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- <div class="hstack gap-2 mb-2">

            <div class="input-group input-group-sm">
                <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon"
                    aria-describedby="button-addon1">
                <button class="btn btn-sm btn-outline-secondary" type="button" id="button-addon1">
                    <IconSearch /> Поиск
                </button>
            </div>

            <div class="vr"></div>

            <button type="button" class="btn btn-sm btn-secondary">Фильтр</button>
            <button type="button" class="btn btn-sm btn-secondary">Избранное</button>
            <button type="button" class="btn btn-sm btn-outline-danger ">Сбросить</button>
            <div class="vr"></div>
            <button class="btn btn-primary">
                <IconPlusLg /> Добавить продукт
            </button>
        </div> -->

        <div class="list-group mb-2 cat-list-height-limit">

            <!-- Acccordions -->
            <div class="accordion" id="accordionExample">

                <div v-for="category in productsStore.categories" v-bind:key="category.id"
                    v-on:click="getProductsList(category.id)" class="accordion-item">

                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            v-bind:data-bs-target="'#collapse-' + category.id" aria-expanded="true"
                            aria-controls="collapseOne">
                            {{ category.name }}
                        </button>
                    </h2>
                    <div :id="'collapse-' + category.id" class="accordion-collapse collapse"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">

                            <div class="list-group list-height-limit">

                                <a v-for="product in productsStore.products" :key="product.id"
                                    class="list-group-item list-group-item-action" style="cursor: pointer;"
                                    aria-current="true" v-on:click="getProductInfo(product.id)">
                                    <p class="mb-1">{{ product.name }}</p>
                                    <small>Калорийность: {{ product.kcalory }}</small>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                            the collapse
                            plugin adds the appropriate classes that we use to style each element. These classes control
                            the
                            overall appearance, as well as the showing and hiding via CSS transitions. You can modify
                            any of this
                            with custom CSS or overriding our default variables. It's also worth noting that just about
                            any HTML
                            can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>

</template>

<style>
.cat-list-height-limit {
    max-height: 80vh;
    overflow-y: scroll;
}

.cat-list-height-limit .list-height-limit {
    max-height: 55vh;
    overflow-y: scroll;
}
</style>

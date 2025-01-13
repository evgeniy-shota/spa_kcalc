<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useProductsStore } from '../stores/productsStore';

const productsStore = useProductsStore();
productsStore.getCategories();
// productsStore.getCategories();

// need chenge getting products on watched val?

onMounted(() => {
    console.log("onMounted!");
    console.log("onMounted done!");
});

</script>

<template>
    <div class="card ps-2 pe-2 pt-2">
        <div class="hstack gap-2 mb-2">

            <div class="input-group input-group-sm">
                <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon"
                    aria-describedby="button-addon1">
                <button class="btn btn-sm btn-outline-secondary" type="button" id="button-addon1">Поиск</button>
            </div>

            <div class="vr"></div>

            <button type="button" class="btn btn-sm btn-secondary">Фильтр</button>
            <button type="button" class="btn btn-sm btn-secondary">Избранное</button>
            <button type="button" class="btn btn-sm btn-outline-danger ">Сбросить</button>
        </div>

        <div class="list-group mb-2 cat-list-height-limit">

            <div class="accordion" id="accordionExample">

                <!-- need add parametr category.id in click->productsStore.getProducts() -->
                <div v-for="category in productsStore.categories" v-bind:key="category.id"
                    v-on:click="productsStore.getProducts(category.id)" class="accordion-item">

                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            v-bind:data-bs-target="'#collapse-' + category.id" aria-expanded="true"
                            aria-controls="collapseOne">
                            <!-- need change title -->
                            {{ category.name }}
                        </button>
                    </h2>
                    <!-- add class 'show' to show collaspsed -->
                    <div :id="'collapse-' + category.id" class="accordion-collapse collapse"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">

                            <div class="list-group list-height-limit">

                                <a v-for="product in productsStore.products" :key="product.id" href="#"
                                    class="list-group-item list-group-item-action" aria-current="true">
                                    <p class="mb-1">{{ product.name }}</p>
                                    <small>Калорийность: {{ product.calory }}</small>
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
    max-height: 85vh;
    overflow-y: scroll;
}

.cat-list-height-limit .list-height-limit {
    max-height: 55vh;
    overflow-y: scroll;
}
</style>

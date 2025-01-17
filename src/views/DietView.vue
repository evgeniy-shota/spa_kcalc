<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="col-5">
        <div class="card ps-2 pe-2">diet list
            <div class="list-group list-height-limit">

                <!-- <a v-for="product in productsStore.products" :key="product.id"
                    class="list-group-item list-group-item-action" style="cursor: pointer;" aria-current="true"
                    v-on:click="getProductInfo(product.id)">
                    <p class="mb-1">{{ product.name }}</p>
                    <small>Калорийность: {{ product.calory }}</small>
                </a> -->

            </div>
        </div>
    </div>
    <div class="col">
        <div class="card ps-2 pe-2">add new diet</div>
    </div>
</template>
<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useDietsStore } from '@/stores/dietsStore';
import DietList from '@/components/DietList.vue';
import DietFrom from '@/components/DietFrom.vue';
// import axios from 'axios';

const selected_products = ref([]);
const idTheLastSelectedDiet = ref(0);

const dietsStore = useDietsStore();


function selectDiet(diet_id) {
    if (diet_id == idTheLastSelectedDiet.value) {
        return 0;
    }

    console.log('select diet');

    dietsStore.getDiet(diet_id);
    idTheLastSelectedDiet.value = diet_id;
}

const productsInDiet = computed(() => {
    let data = Object.entries(dietsStore.diet.products);
    console.log(`data: ${data}`);

    return data;
});

const kcalSelectedDiet = computed(() => {
    return dietsStore.diet.summ_val.kcal;
});

const carbSelectedDiet = computed(() => {
    return dietsStore.diet.summ_val.carb;
});

const protSelectedDiet = computed(() => {
    return dietsStore.diet.summ_val.prot;
});

const fatsSelectedDiet = computed(() => {
    return dietsStore.diet.summ_val.fats;
});

onMounted(() => {
    dietsStore.getDiets();
});

onUpdated(() => {
    console.log('diets: ');
    console.log(dietsStore.diets);
    console.log('diet: ');
});
</script>

<template>
    <!-- diets list -->
    <div class="col">
        <DietList :diets="dietsStore.diets" @select-item="selectDiet" />
    </div>

    <!-- diet info -->
    <div class="col">
        <DietFrom />
    </div>

</template>

<style>
.list-height-limit {
    cursor: pointer;
    max-height: 85vh;
    overflow-y: scroll;
}
</style>
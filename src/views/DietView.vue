<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useDietsStore } from '@/stores/dietsStore';
// import axios from 'axios';

const selected_products = ref([]);
const idTheLastSelectedDiet = ref(0);

const dietsStore = useDietsStore();


function getSelectedDietInfo(diet_id) {
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
    <div class="col-5">
        <div class="card pt-2 ps-2 pe-2">

            <div class="d-flex flex-row mb-2">
                <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm"
                    aria-label=".form-control-sm example">

                <button type="button" class="btn btn-light">Поиск</button>
                <button type="button" class="btn btn-light">Фильтр</button>
                <button type="button" class="btn btn-light">Очистить</button>

            </div>

            <div class="list-group list-height-limit mb-2">
                <a v-for="diet in dietsStore.diets" :key="diet.id" @click="getSelectedDietInfo(diet.id)"
                    class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">{{ diet.name }}</h6>
                        <small>Delete</small>
                    </div>
                    <p class="mb-1">{{ diet.description }}</p>
                    <small>Calory, carb, prot, fats</small>
                </a>
                <!-- <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">List group item heading</h5>
                        <small class="text-body-secondary">3 days ago</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small class="text-body-secondary">And some muted small print.</small>
                </a> -->
            </div>
        </div>
    </div>
    <!-- diet info -->
    <div class="col">
        <div class="card pt-2 ps-2 pe-2">

            <form action="">
                <input class="form-control mb-2" placeholder="Название диеты\рациона" type="text" name="diet_name"
                    id="diet_name" :value="dietsStore.diet.name">
                <input class="form-control mb-2" type="text" placeholder="Начните вводить название продукта..."
                    aria-label="default input example">
                <ul class="list-group mb-2">
                    <li v-for="product in productsInDiet" class="list-group-item">
                        <div class="d-flex flex-row">
                            <div class="p-1 flex-grow-1">{{ product[0] }}</div>
                            <div class="p-1">
                                <input :value="product[1]" class="form-control" type="number" name="productNumber"
                                    id="productNumber">
                            </div>

                            <button type="button" class="btn p-1" aria-label="Remove">X</button>

                        </div>
                    </li>

                </ul>

                <h6 class="m-2">Общая калорийность</h6>
                <div class="card mb-2">
                    <div class="row card-body">
                        <div class="col text-center"> 
                            <div>Калории</div>
                            <div>{{ kcalSelectedDiet }} ккал </div>
                        </div>
                        <div class="col text-center">
                            <div>Углеводы</div>
                            <div>{{ carbSelectedDiet }} гр.</div>
                        </div>
                        <div class="col text-center">
                            <div>Белки</div>
                            <div>{{ protSelectedDiet }} гр.</div>
                        </div>
                        <div class="col text-center">
                            <div>Жиры</div>
                            <div>{{ fatsSelectedDiet }} гр.</div>
                        </div>
                    </div>
                </div>

                <div class="d-grid gap-2 mb-2">
                    <button class="btn btn-primary" type="button">Сохранить</button>
                    <button class="btn btn-outline-warning" type="button">Очистить</button>
                    <button class="btn btn-outline-danger" type="button">Удалить</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
.list-height-limit {
    cursor: pointer;
    max-height: 85vh;
    overflow-y: scroll;
}
</style>
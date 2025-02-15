<script setup>
import { computed, ref, watch } from 'vue';
import IconPlusLg from './icons/IconPlusLg.vue';


const dietName = ref('');
const dietDescription = ref('');
const productsInDiet = ref([]);

const dietKcalory = computed(() => {
    let kcalory = 0;

    for (let i = 0; i < productsInDiet.value.length; i++) {
        kcalory = productsInDiet.value[i].kcalory;
    }

    return kcalory;
});

const dietProteins = computed(() => {
    let proteins = 0;

    for (let i = 0; i < productsInDiet.value.length; i++) {
        proteins = productsInDiet.value[i].proteins;
    }

    return proteins;
});

const dietFats = computed(() => {
    let fats = 0;

    for (let i = 0; i < productsInDiet.value.length; i++) {
        fats = productsInDiet.value[i].fats;
    }

    return fats;
});

const dietCarbohydrates = computed(() => {
    let carbohydrates = 0;

    for (let i = 0; i < productsInDiet.value.length; i++) {
        carbohydrates = productsInDiet.value[i].carbohydrates;
    }

    return carbohydrates;
});

const props = defineProps({
    diet: {
        type: Object,
        default: null,
    }
});

const emit = defineEmits({
    saveDiet: (diet) => {
        if (diet) {
            return true;
        }
        return false;
    },
});

watch(() => props.diet, () => {
    if (props.diet) {
        dietName.value = props.diet.name;
        dietDescription.value = props.diet.description;
        productsInDiet.value = props.diet.products;
    } else {

    }
});

function addProduct() {
    console.log('add product');
}

function saveDiet() {
    console.log('save diet');
}

function clearDiet() {
    console.log('clear diet');
}

function deleteDiet() {
    console.log('delete diet');
}

</script>

<template>

    <div class="card pt-2 ps-2 pe-2 border border-light diet-container">

        <form action="">
            <input class="form-control mb-2" placeholder="Название диеты\рациона" type="text" name="diet_name"
                id="dietName" :value="dietName">

            <textarea id="dietDescription" class="form-control mb-2" v-model="dietDescription"></textarea>

            <!-- <h6 class="m-2">Общая калорийность</h6>
            <div class="card mb-2">
                <div class="row card-body">
                    <div class="col text-center">
                        <div>Калории</div>
                        <div>{{ dietKcalory }} ккал </div>
                    </div>
                    <div class="col text-center">
                        <div>Углеводы</div>
                        <div>{{ dietCarbohydrates }} гр.</div>
                    </div>
                    <div class="col text-center">
                        <div>Белки</div>
                        <div>{{ dietProteins }} гр.</div>
                    </div>
                    <div class="col text-center">
                        <div>Жиры</div>
                        <div>{{ dietFats }} гр.</div>
                    </div>
                </div>
            </div> -->

            <div class="border rounded bg-light-subtle border-light-suntitle mb-2">
                <div class="px-2 py-1 text-center">
                    Общая пищевая ценность диеты
                </div>
                <div class="d-flex ps-2 pe-2 border-top justify-content-around text-center">
                    <div>
                        <small>Калории</small>
                        <div>{{ dietKcalory }} <small>ккал</small></div>
                    </div>

                    <div class="vr"></div>
                    <div>
                        <small>Углеводы</small>
                        <div>{{ dietCarbohydrates }} <small>гр.</small></div>
                    </div>

                    <div class="vr"></div>
                    <div>
                        <small>Белки</small>
                        <div>{{ dietProteins }} <small>гр.</small></div>
                    </div>

                    <div class="vr"></div>
                    <div>
                        <small>Жиры</small>
                        <div>{{ dietFats }} <small>гр.</small></div>
                    </div>
                </div>
            </div>

            <input class="form-control mb-2" type="text" placeholder="Начните вводить название продукта..."
                aria-label="default input example">

            <div class="col d-grid pe-1 mb-2">
                <button @click="addProduct" class="btn btn-outline-primary" type="button">
                    <IconPlusLg />
                    Добавить продукт
                </button>
            </div>

            <!-- <div class="row mb-2">
                <div class="col d-grid ps-1">
                    <button @click="saveCurrentRation" class="btn btn-outline-success" type="button">
                        <IconCheckLg />
                        Сохранить рацион
                    </button>
                </div>
            </div> -->

            <ul class="list-group mb-2 products-list-container">
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
                <li>
                    <p>some line</p>
                    <p>some line</p>
                    <p>some line</p>
                    <p>some line</p>
                    <p>some line</p>
                    <p>some line</p>
                    <p>some line</p>
                    <p>some line</p>
                    <p>some line</p>
                    <p>some line</p>
                </li>
            </ul>


            <div class="d-grid gap-2 mb-2">
                <button @click="saveDiet" class="btn btn-primary" type="button">Сохранить</button>
            </div>

            <div class="row">
                <div class="col pe-0">
                    <div class="d-grid gap-2 mb-2">
                        <button @click="clearDiet" class="btn btn-sm btn-outline-warning"
                            type="button">Очистить</button>
                    </div>
                </div>
                <div class="col">
                    <div class="d-grid mb-2">
                        <button @click="deleteDiet" class="btn btn-sm btn-outline-danger" type="button">Удалить</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

<style lang="scss">
.diet-container {
    height: 86vh;
}

.products-list-container {
    height: 40vh;
    overflow-y: scroll;
}
</style>
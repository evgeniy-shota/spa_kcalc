<script setup>
import { computed, ref, watch } from 'vue';
import IconPlusLg from './icons/IconPlusLg.vue';
import ProductCardMin from './ProductCardMin.vue';


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
    addProduct: () => {
        return true;
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
    emit('addProduct');
}

function changeProductQuantity() {
    console.log('change product quantity');
};

function delAddedProduct() {
    console.log('delete product');
};

function saveDiet() {
    console.log('save diet');

    let diet = {
        name: dietName.value,
        description: dietDescription.value,
        products: productsInDiet.value,
    };

    emit('saveDiet', diet);
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
            <label for="dietName" class="form-label mb-0">Название диеты</label>
            <input class="form-control mb-2" placeholder="Введите название диеты" type="text" name="diet_name"
                id="dietName" :value="dietName">

            <label for="dietDescription" class="form-label mb-0">Описание диеты</label>
            <textarea id="dietDescription" placeholder="Описание диеты" class="form-control mb-2"
                v-model="dietDescription"></textarea>

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

            <!-- <input class="form-control mb-2" type="text" placeholder="Начните вводить название продукта..."
                aria-label="default input example"> -->

            <div class="col d-grid pe-1 mb-2">
                <button @click="addProduct" class="btn btn-outline-primary" type="button">
                    <IconPlusLg />
                    Добавить продукт
                </button>
            </div>

            <ul class="list-group mb-2 products-list-container">
                <li v-for="(product, product_index) in productsInDiet"
                    class="list-group-item bg-light-subtle border-light-subtle mb-1">

                    <ProductCardMin :product="product" :is-editable="true" :index="product_index"
                        @on-click-close-btn="delAddedProduct" @on-cange-quantity="changeProductQuantity"
                        @on-input-quantity="changeProductQuantity" />

                </li>
                <!-- <li>
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
                </li> -->
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
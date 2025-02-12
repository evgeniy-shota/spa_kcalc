<script setup>
import { ref, watch } from 'vue';

const optionForNewCategory = ref('new')

const productName = ref('');
const productDescription = ref('');
const productComposition = ref('');
const productQuantity = ref(100);
const productQuantityType = ref('weight');
const productKcalory = ref(0);
const productCarbohydrates = ref(0);
const productProteins = ref(0);
const productFats = ref(0);
const productNutrientVitamine = ref({});
const productManufacturer = ref('');
const productCountryOfManufacture = ref('');

const selectedCategory = ref(-1);
const newCategoryName = ref('');

const validationError = ref({

    productName: '',
    productKcalory: '',
    productCarbohydrates: '',
    productProteins: '',
    productFats: '',
    categoriesSelect: '',
    newCategoryName: '',
    productManufacturer: '',
    productCountryOfManufacture: '',
    productComposition: '',
    productDescription: '',

});

const props = defineProps(
    {
        product: {
            type: Object,
            default: null
        },
        categories: {
            type: Array,
            default: [],
        },
        productSavedSuccessful: {
            type: Boolean,
            default: false,
        },
        isEditable: {
            type: Boolean,
            default: false,
        }
    }
);

const emit = defineEmits(
    {
        submitForm: () => {
            return true;
        },
    }
);

watch(() => props.product, () => {
    console.log('watch product');
    productName.value = props.product.name;
    productDescription.value = props.product.description;
    productComposition.value = props.product.composition;
    productQuantity.value = props.product.quantity;
    productQuantityType.value = props.product.quantityType;
    productKcalory.value = props.product.kcalory;
    productCarbohydrates.value = props.product.carbohydrates;
    productProteins.value = props.product.proteins;
    productFats.value = props.product.fats;
    productNutrientVitamine.val = props.product.nutrientVitamine;
});

watch(() => props.productSavedSuccessful, () => {
    if (props.productSavedSuccessful === true) {
        console.log('save is success');
        productName.value = '';
        productDescription.value = '';
        productComposition.value = '';
        productQuantity.value = 100;
        productQuantityType.value = '';
        productKcalory.value = 0;
        productCarbohydrates.value = 0;
        productProteins.value = 0;
        productFats.value = 0;
        productNutrientVitamine.val = {};
        productManufacturer.value = '';
        productCountryOfManufacture.value = '';

        selectedCategory.value = -1;
        newCategoryName.value = '';
    }
});

// watch(selectedCategory, () => {
//     console.log('category: ' + selectedCategory.value);
// });

function submitForm() {
    // console.log('submit form');

    if (selectedCategory.value == '-1') {
        console.log('Please selsect category!');
        validationError.value.categoriesSelect = 'Выберите категорию';
    }

    if (productName.value.length == 0) {
        validationError.value.productName = 'Введите имя'
        return 0
    }

    let product = {
        name: productName.value,
        description: productDescription.value,
        quantity: productQuantity.value,
        composition: productComposition.value,
        kcalory: productKcalory.value,
        proteins: productProteins.value,
        carbohydrates: productCarbohydrates.value,
        fats: productFats.value,
        nutrients_and_vitamins: productNutrientVitamine.value,
    }

    let category = {
        id: selectedCategory.value,
        name: newCategoryName.value,
        description: ''
    }

    emit('submitForm', product, category);
}
</script>

<template>

    <div class="container px-0">

        <form action="" method="">
            <div class="form-floating mb-2">
                <input type="text" v-model="productName"
                    :class="{ 'validation-error': validationError.productName.length > 0 }" class="form-control"
                    id="productName" placeholder="Наименование продукта">
                <label for="productName">Название продукта</label>
            </div>

            <div class="input-group mb-2">
                <div class="form-floating">
                    <input type="text" v-model="productKcalory"
                        :class="{ 'validation-error': validationError.productKcalory.length > 0 }" class="form-control"
                        id="productKcalory" placeholder="Наименование продукта">
                    <label for="productKcalory">Калории</label>
                </div>
                <div class="form-floating">
                    <input type="text" v-model="productCarbohydrates"
                        :class="{ 'validation-error': validationError.productCarbohydrates.length > 0 }"
                        class="form-control" id="productCarbohydrates" placeholder="Наименование продукта">
                    <label for="productCarbohydrates">Углеводы</label>
                </div>
                <div class="form-floating">
                    <input type="text" v-model="productProteins"
                        :class="{ 'validation-error': validationError.productProteins.length > 0 }" class="form-control"
                        id="productProteins" placeholder="Наименование продукта">
                    <label for="productProteins">Белки</label>
                </div>
                <div class="form-floating">
                    <input type="text" v-model="productFats"
                        :class="{ 'validation-error': validationError.productFats.length > 0 }" class="form-control"
                        id="productFats" placeholder="Наименование продукта">
                    <label for="productFats">Жиры</label>
                </div>
            </div>

            <!-- category selsect -->
            <div class="form-floating mb-2">
                <select v-model="selectedCategory" :class="{ 'validation-error': validationError.selectedCategory }"
                    class="form-select" id="categoriesSelect" aria-label="Floating label select example">
                    <option value="-1">Выберирте категорию</option>
                    <option :value="optionForNewCategory">Создать свою категорию</option>
                    <option v-for="element in props.categories" :value="element.id">{{ element.name }}</option>
                </select>
                <label for="categoriesSelect">Катеория продукта</label>
            </div>

            <!-- new category input -->
            <div v-show="selectedCategory == optionForNewCategory" class="form-floating mb-2">
                <input v-model="newCategoryName" type="text" class="form-control" id="newCategoryName"
                    placeholder="name@example.com">
                <label for="newCategoryName">Название новой катеории</label>
            </div>

            <!-- product manufacturer -->
            <div class="form-floating mb-2">
                <input type="text" v-model="productManufacturer"
                    :class="{ 'validation-error': validationError.productManufacturer.length > 0 }" class="form-control"
                    id="productManufacturer" placeholder="Производитель">
                <label for="productManufacturer">Производитель</label>
            </div>

            <!-- product country Of Manufacture -->
            <div class="form-floating mb-2">
                <input type="text" v-model="productCountryOfManufacture"
                    :class="{ 'validation-error': validationError.productCountryOfManufacture.length > 0 }"
                    class="form-control" id="productCountryOfManufacture" placeholder="Страна производства">
                <label for="productCountryOfManufacture">Страна производства</label>
            </div>

            <!-- product composition -->
            <div class="form-floating mb-2">
                <textarea v-model="productComposition"
                    :class="{ 'validation-error': validationError.productComposition.length > 0 }" class="form-control"
                    placeholder="Состав" id="productComposition" style="height: 100px"></textarea>
                <label for="productComposition">Состав</label>
            </div>

            <!-- product description -->
            <div class="form-floating mb-2">
                <textarea v-model="productDescription"
                    :class="{ 'validation-error': validationError.productDescription.length > 0 }" class="form-control"
                    placeholder="Описание" id="productDescription" style="height: 100px"></textarea>
                <label for="productDescription">Описание</label>
            </div>

            <div class="card mb-2">
                <div class="card-header">Нутриенты и витамины</div>
                <div class="card-body pt-1 pb-1">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Элемент</th>
                                <th>Количество</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- need add condition to add new line with inputs -->
                            <tr v-for="val in productNutrientVitamine">
                                <td>
                                    <!-- v-model to what?.. -->
                                    <input :value="val[0]" type="text" name="nutrVitam"
                                        :id="'NutrientVitamine-' + val[0]">
                                </td>
                                <td>
                                    <input :value="val[1]" type="text" name="nutrVitam"
                                        :id="'NutrientVitamine-' + val[1]">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="d-grid gap-2 mb-2">
                <button @click="submitForm" class="btn btn-primary" type="button">Сохранить</button>
            </div>

        </form>
    </div>

</template>

<style lang="scss">
.validation-error {
    border-color: red;
}
</style>
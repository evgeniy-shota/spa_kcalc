<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps(
    {
        product: {
            type: Object,
            default: null
        },
        productCategory: {
            type: Number,
            default: null,
        },
        categoriesGroup: {
            type: Array,
            default: () => [],
        },
        categories: {
            type: Array,
            default: () => [],
        },
        productSavedSuccessful: {
            type: Boolean,
            default: false,
        },
        isReadonly: {
            type: Boolean,
            default: true,
        },
        countriesOfManufacture: {
            type: Array,
            default: () => [],
        },
        manufacturer: {
            type: Array,
            default: () => [],
        },
    }
);

const emit = defineEmits(
    {
        submitForm: (product, categrory) => {
            if (product !== null && categrory !== null) {
                return true
            }
            return false;
        },
        cancelForm: () => {
            return true;
        },
        showCategoryFormWindow: () => {
            return true
        },
        showCategoriesGroupFromWindow: () => {
            return true
        },
        showManufacturerFormWindow: () => {
            return true
        },
    }
);

const optionForNewCategory = ref(-1)
const optionForNewCategoriesGroup = ref(-1)
const optionForNewManufacturer = ref(-1)

const productName = ref('');
const productDescription = ref('');
const productComposition = ref('');
const productQuantity = ref(100);
const productQuantityType = ref('gr');
const productKcalory = ref(0);
const productCarbohydrates = ref(0);
const productProteins = ref(0);
const productFats = ref(0);
const productNutrientVitamine = ref({});
const productCountryOfManufacture = ref(null);

const selectedCategory = ref(null);
const selectedCategoriesGroup = ref(null);
const selectedManufacturer = ref(null);
const newCategoryName = ref('');
const newCategoriesGroupName = ref('');
const newManufacturerName = ref('');

const validationError = ref({

    productName: '',
    productKcalory: '',
    productCarbohydrates: '',
    productProteins: '',
    productFats: '',
    categoriesSelect: '',
    productManufacturer: '',
    productCountryOfManufacture: '',
    productComposition: '',
    productDescription: '',

});

const productCategory = computed(() => {
    for (let i = 0; i < props.categories.length; i++) {
        if (props.categories[i].id == props.productCategory) {
            return props.categories[i].name;
        }
    }
    return '';
});


const nutrientAndVitamins = computed(() => {
    console.log(props.product)
    if (props.product == null || props.product.nutrientAndVitamines == null || Object.keys(props.product.nutrientAndVitamines).length == 0) {
        return [];
    }
    return Object.entries(props.product.nutrientAndVitamines);
});

// watch(selectedCategory, () => {
//     if (selectedCategory.value === optionForNewCategory.value) {
//         emit('showNewCategoryWindow');
//     }
// });

// watch(selectedCategoriesGroup, () => {
//     if (selectedCategoriesGroup.value === optionForNewCategoriesGroup.value) {
//         emit('showNewCategoriesGroupWindow');
//     }
// });

// watch(selectedManufacturer, () => {
//     if (selectedCategoriesGroup.value === optionForNewManufacturer.value) {
//         emit('showNewManufacturerWindow');
//     }
// });

watch(() => props.product, () => {
    console.log('watch product');
    productName.value = props.product.name;
    productDescription.value = props.product.description;
    productComposition.value = props.product.composition;
    selectedManufacturer.value = props.product.manufacturer;
    productCountryOfManufacture.value = props.product.countryOfManufacture;
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
        selectedManufacturer.value = null;
        productCountryOfManufacture.value = null;

        selectedCategory.value = -1;
        newCategoryName.value = '';
    }
});

// watch(selectedCategory, () => {
//     console.log('category: ' + selectedCategory.value);
// });

function submitForm() {
    // console.log('submit form');
    let isValid = true;

    if (selectedCategory.value == '-1') {
        console.log('Please selsect category!');
        isValid = false;
        validationError.value.categoriesSelect = 'Выберите категорию';
    } else {
        validationError.value.categoriesSelect = '';
    }

    if (productName.value.length == 0) {
        isValid = false;
        validationError.value.productName = 'Введите название продукта'
    } else {
        validationError.value.productName = ''
    }

    if (productKcalory.value < 0 || productKcalory.value > 1000) {
        isValid = false;
        validationError.value.productKcalory = 'Не верное значение'
    } else {
        validationError.value.productKcalory = ''
    }

    if (productCarbohydrates.value < 0 || productCarbohydrates.value > 100) {
        isValid = false;
        validationError.value.productCarbohydrates = 'Не верное значение'
    } else {
        validationError.value.productCarbohydrates = ''
    }

    if (productProteins.value < 0 || productProteins.value > 100) {
        isValid = false;
        validationError.value.productProteins = 'Не верное значение'
    } else {
        validationError.value.productProteins = ''
    }

    if (productFats.value < 0 || productFats.value > 100) {
        isValid = false;
        validationError.value.productFats = 'Не верное значение'
    } else {
        validationError.value.productFats = ''
    }

    if (!isValid) {
        return 0;
    }

    let data = {
        name: productName.value,
        description: productDescription.value,
        quantity: productQuantity.value,
        composition: productComposition.value,
        kcalory: productKcalory.value,
        proteins: productProteins.value,
        carbohydrates: productCarbohydrates.value,
        fats: productFats.value,
        country_of_manufacture: productCountryOfManufacture.value,
        nutrients_and_vitamins: productNutrientVitamine.value,

        category_id: selectedCategory.value,
        new_category_name: newCategoryName.value,
        categories_group_id: selectedCategoriesGroup.value,
        new_categories_group_name: newCategoriesGroupName.value,
        manufacturer_id: selectedManufacturer.value,
        new_manufacturer_name: newManufacturerName.value,
    }

    let product = {
        // name: productName.value,
        // description: productDescription.value,
        // quantity: productQuantity.value,
        // composition: productComposition.value,
        // manufacturer: selectedManufacturer.value,
        // country_of_manufacture: productCountryOfManufacture.value,
        // kcalory: productKcalory.value,
        // proteins: productProteins.value,
        // carbohydrates: productCarbohydrates.value,
        // fats: productFats.value,
        // nutrients_and_vitamins: productNutrientVitamine.value,
    }

    let category = {
        id: selectedCategory.value,
        name: newCategoryName.value,
        description: ''
    }

    console.log('submitForm: ')
    console.log(product)
    console.log(category)
    emit('submitForm', product, category);
}

function clearForm() {
    console.log('Clear product form');
    productName.value = '';
    productDescription.value = '';
    productComposition.value = '';
    productQuantity.value = 100;
    productQuantityType.value = 'weight';
    productKcalory.value = 0;
    productCarbohydrates.value = 0;
    productProteins.value = 0;
    productFats.value = 0;
    productNutrientVitamine.value = {};
    selectedManufacturer.value = null;
    productCountryOfManufacture.value = null;
}

function cancelForm() {
    console.log('Cancel product from')
    emit('cancelForm');
}

function createCategory() {
    emit('showCategoryFormWindow');
}

</script>

<template>

    <div class="container px-0">

        <form action="" method="">

            <div v-if="!props.isReadonly" class="d-flex justify-content-between gap-2 mb-1">
                <div>
                    <button @click="submitForm" class="btn btn-primary px-4 me-2" type="button">Сохранить</button>
                    <button @click="clearForm" class="btn btn-outline-secondary me-2" type="button">Очистить</button>
                    <button @click="cancelForm" class="btn btn-outline-warning text-secondary me-2"
                        type="button">Отменить</button>
                </div>
                <div>
                    <button class="btn btn-light" type="button">help</button>
                </div>
            </div>

            <!-- Product Name -->
            <div class="mb-2">
                <label for="productName" class="form-label mb-1"
                    :class="{ 'required-input': !props.isReadonly }">Название
                    продукта</label>
                <input type="text" v-model="productName" :readonly="props.isReadonly"
                    :class="{ 'validation-error': validationError.productName.length > 0 }" class="form-control"
                    id="productName" placeholder="Название продукта" aria-describedby="productNameHelpBlock">
                <div class="form-text text-danger my-0">{{ validationError.productName }}</div>
                <div v-if="!props.isReadonly" id="productNameHelpBlock" class="form-text my-0">
                    Название длиной не более 200 символов
                </div>
            </div>

            <!-- Product quantity and units -->
            <div class="row mb-2">
                <div class="col-6 col-sm">
                    <label for="" class="form-label mb-1">Вес (гр) или Объём (мл)</label>
                    <input type="text" v-model="productQuantity" :readonly="props.isReadonly" name="productQuantity"
                        id="productQuantity" class="form-control">
                    <div v-if="!props.isReadonly" id="productQuantityHelpBlock" class="form-text my-0">
                        От 0 до 10000
                    </div>
                </div>
                <div class="col-6 col-sm">
                    <label for="" class="form-label mb-1">Единицы измерения</label>
                    <select name="productUnits" v-model="productQuantityType" id="productUnits" class="form-select">
                        <option selected value="gr">грамм</option>
                        <option value="ml">миллилитр</option>
                    </select>
                    <div v-if="!props.isReadonly" id="productUnitsHelpBlock" class="form-text my-0">

                    </div>
                    <!-- <input type="text" name="unitsOfProduct" id="unitsOfProduct" class="form-control"> -->
                </div>
            </div>

            <div class="mb-1">
                Пищевая ценность, на 100 грамм или миллилитров:
            </div>
            <div class="row mb-2">
                <div class="col-6 col-sm">
                    <label for="productKcalory" class="form-label mb-1"
                        :class="{ 'required-input': !props.isReadonly }">Калории</label>
                    <input type="number" v-model="productKcalory" :readonly="props.isReadonly"
                        :class="{ 'validation-error': validationError.productKcalory.length > 0 }" class="form-control"
                        id="productKcalory" placeholder="ккал." aria-describedby="productKcaloryHelpBlock">
                    <div class="form-text text-danger my-0">{{ validationError.productKcalory }}</div>
                    <div v-if="!props.isReadonly" id="productKcaloryHelpBlock" class="form-text my-0">От 0 до 1000
                    </div>
                </div>

                <div class="col-6 col-sm">
                    <label for="productCarbohydrates" class="form-label mb-1"
                        :class="{ 'required-input': !props.isReadonly }">Углеводы</label>
                    <input type="number" v-model="productCarbohydrates" :readonly="props.isReadonly"
                        :class="{ 'validation-error': validationError.productCarbohydrates.length > 0 }"
                        class="form-control" id="productCarbohydrates" placeholder="гр."
                        aria-describedby="productCarbohydratesHelpBlock">
                    <div class="form-text text-danger my-0">{{ validationError.productCarbohydrates }}</div>
                    <div v-if="!props.isReadonly" id="productCarbohydratesHelpBlock" class="form-text my-0">От 0
                        до 100</div>
                </div>

                <div class="col-6 col-sm">
                    <label for="productProteins" class="form-label mb-1"
                        :class="{ 'required-input': !props.isReadonly }">Белки</label>
                    <input type="number" v-model="productProteins" :readonly="props.isReadonly"
                        :class="{ 'validation-error': validationError.productProteins.length > 0 }" class="form-control"
                        id="productProteins" placeholder="гр." aria-describedby="productProteinsHelpBlock">
                    <div class="form-text text-danger my-0">{{ validationError.productProteins }}</div>
                    <div v-if="!props.isReadonly" id="productProteinsHelpBlock" class="form-text my-0">От 0 до 100
                    </div>
                </div>

                <div class="col-6 col-sm">
                    <label for="productFats" class="form-label mb-1"
                        :class="{ 'required-input': !props.isReadonly }">Жиры</label>
                    <input type="number" v-model="productFats" :readonly="props.isReadonly"
                        :class="{ 'validation-error': validationError.productFats.length > 0 }" class="form-control"
                        id="productFats" placeholder="гр." aria-describedby="productFatsHelpBlock">
                    <div class="form-text text-danger my-0">{{ validationError.productFats }}</div>
                    <div v-if="!props.isReadonly" id="productFatsHelpBlock" class="form-text my-0">От 0 до 100
                    </div>
                </div>

            </div>

            <div v-if="props.isReadonly" class="mb-2">
                <label class="form-label mb-1" for="productCategories">Катеория продукта</label>
                <input type="text" readonly :value="productCategory" class="form-control" name="productCateory"
                    id="productCategories">
            </div>
            <!-- category selsect -->
            <div v-else>
                <div class="row mb-2">
                    <div class="col col-sm-8">
                        <label class="form-label required-input mb-1" for="categoriesSelect">Катеория продукта</label>
                        <select v-model="selectedCategory" :disabled="props.isReadonly"
                            :class="{ 'validation-error': validationError.categoriesSelect }" class="form-select"
                            id="categoriesSelect" aria-label="categorySelect"
                            aria-describedby="categorySelectHelpBlock">
                            <option value="">Выберирте категорию</option>
                            <!-- <option :value="optionForNewCategory">+ Создать свою категорию</option> -->
                            <optgroup v-for="itemGroup in props.categoriesGroup" :key="itemGroup.id"
                                :label="itemGroup.name">
                                <option v-for="item in itemGroup.categories.data" :value="item.id">{{ item.name }}
                                </option>
                            </optgroup>
                        </select>
                        <!-- <div class="form-text text-danger my-0">{{ validationError.categoriesSelect }}</div>
                        <div id="categorySelectHelpBlock" class="form-text my-0">
                            Для создания новой категории выберите "Создать свою категорию"
                        </div> -->
                    </div>

                    <div class="col col-sm-4">
                        <div class="form-label mb-1">Новая категория</div>
                        <div class="d-grid">
                            <button @click="createCategory" type="button"
                                class="btn btn-outline-primary">Создать</button>
                        </div>
                    </div>
                    <div class="form-text text-danger my-0">{{ validationError.categoriesSelect }}</div>
                    <div id="categorySelectHelpBlock" class="form-text my-0">
                        Выберите категорию из списка или создайте новую, нажав кнопку "Создать"
                    </div>
                </div>
            </div>


            <!-- product manufacturer -->
            <div class="mb-2">
                <label class="form-label mb-1" for="productManufacturer">Производитель</label>
                <select class="form-select" :readonly="props.isReadonly" v-model="selectedManufacturer"
                    :class="{ 'validation-error': validationError.productManufacturer.length > 0 }"
                    name="productManufacturer" id="productManufacturer">
                    <option selected value="">Выберите производителя</option>
                    <option :value="optionForNewManufacturer">+ Добавить производителя</option>
                    <option v-for="item in props.manufacturer" :value="item.id">{{ item.name }}</option>
                </select>
                <div id="productManufacturerHelpBlock" class="form-text my-0">
                    Для добавления нового производителя выберите "Добавить произодителя"
                </div>

                <div v-if="selectedManufacturer === optionForNewManufacturer" class="mb-1 border rounded p-2 px-3 m-2">
                    <label for="newProductManufacturer" class="form-label mb-1">Название нового производителя</label>
                    <input v-model="newManufacturerName" type="text" name="newProductManufacturer"
                        id="newProductManufacturer" class="form-control">
                    <div id="productManufacturerHelpBlock" class="form-text my-0">
                        Введите название произодителя
                    </div>
                </div>
                <!-- <input type="text" v-model="productManufacturer" :readonly="props.isReadonly"
                    :class="{ 'validation-error': validationError.productManufacturer.length > 0 }" class="form-control"
                    id="productManufacturer" placeholder="Производитель"> -->
            </div>

            <!-- product country Of Manufacture -->
            <div class="mb-2">
                <label class="form-label mb-1" for="productCountryOfManufacture">Страна производства</label>
                <select v-model="productCountryOfManufacture" placeholder="Выберите страну"
                    name="countriesOfManufacture" id="countriesOfManufacture" class="form-select"
                    :class="{ 'validation-error': validationError.productCountryOfManufacture.length > 0 }">
                    <option value="null">Выберите страну</option>
                    <option v-for="item in props.countriesOfManufacture" :value="item.id">{{
                        item.name_ru }}
                    </option>
                </select>
                <!-- <input type="text" v-model="productCountryOfManufacture" :readonly="props.isReadonly"
                    :class="{ 'validation-error': validationError.productCountryOfManufacture.length > 0 }"
                    class="form-control" id="productCountryOfManufacture" placeholder="Страна производства"> -->
            </div>

            <!-- product composition -->
            <div class="mb-2">
                <label class="form-label mb-1" for="productComposition">Состав</label>
                <textarea v-model="productComposition" :readonly="props.isReadonly"
                    :class="{ 'validation-error': validationError.productComposition.length > 0 }" class="form-control"
                    placeholder="Состав" id="productComposition" style="height: 100px"></textarea>
            </div>

            <!-- product description -->
            <div class="mb-2">
                <label class="form-label mb-1" for="productDescription">Описание</label>
                <textarea v-model="productDescription" :readonly="props.isReadonly"
                    :class="{ 'validation-error': validationError.productDescription.length > 0 }" class="form-control"
                    placeholder="Описание" id="productDescription" style="height: 100px"></textarea>
            </div>

            <!-- nutr. and vit.,  hiden -->
            <div v-if="true" class="card mb-2">
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
                            <tr v-for="val in nutrientAndVitamins">
                                <td>
                                    <!-- v-model to what?.. -->
                                    <input class="form-control" :readonly="props.isReadonly" :value="val[0]" type="text"
                                        name="nutrVitam" :id="'NutrientVitamine-' + val[0]">
                                </td>
                                <td>
                                    <input class="form-control" :readonly="props.isReadonly" :value="val[1]" type="text"
                                        name="nutrVitam" :id="'NutrientVitamine-' + val[1]">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </form>
    </div>

</template>

<style lang="scss">
.validation-error {
    border-color: red;
}

.required-input::after {
    content: '*';
}
</style>
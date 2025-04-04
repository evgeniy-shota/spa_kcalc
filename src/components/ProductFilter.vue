<script setup>
import { watch, ref, computed } from 'vue';
import { filterNumberInput } from '@/resource/js/inputFilters';
import { validateFloatNumber } from '@/resource/js/dataValidation';

import IconSquare from './icons/IconSquare.vue';
import IconDashSquare from './icons/IconDashSquare.vue';
import IconDashSquareFill from './icons/IconDashSquareFill.vue';
import IconCheckSquareSm from './icons/IconCheckSquareSm.vue';
import IconCheckSquareFillSm from './icons/IconCheckSquareFillSm.vue';

const props = defineProps({
    categoriesGroup: {
        type: Array,
        default: () => [],
    },
    categories: {
        type: Array,
        default: () => [],
    },
    countries: {
        type: Array,
        default: () => [],
    },
    dataSource: {
        type: Array,
        default: () => [],
    },
    isApplyFilter: {
        type: Boolean,
        default: false,
    },
    isClearFilter: {
        type: Boolean,
        default: false,
    },
    caloryLimit: {
        type: Array,
        default: () => [0, 999]
    },
    proteinsLimit: {
        type: Array,
        default: () => [0, 999]
    },
    carbohydratesLimit: {
        type: Array,
        default: () => [0, 999]
    },
    fatsLimit: {
        type: Array,
        default: () => [0, 999]
    },
    productsFilterDefaultVal: {
        type: Object,
        default: null,
    },
    currentCategoryId: {
        type: Number,
        default: null,
    },
    userIsAuthorized: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits({
    applyFilter: (filter) => {
        if (filter) {
            return true;
        }
        return false;
    },
    clearFilter: () => {
        return true;
    },
});

watch([
    () => props.caloryLimit,
    () => props.proteinsLimit,
    () => props.carbohydratesLimit,
    () => props.fatsLimit], () => {

        if (props.caloryLimit) {
            caloryLimitFrom.value = props.caloryLimit[0]
            caloryLimitTo.value = props.caloryLimit[1]
        }

        if (props.proteinsLimit) {
            proteinsLimitFrom.value = props.proteinsLimit[0]
            proteinsLimitTo.value = props.proteinsLimit[1]
        }

        if (props.carbohydratesLimit) {
            carbohydratesLimitFrom.value = props.carbohydratesLimit[0]
            carbohydratesLimitTo.value = props.carbohydratesLimit[1]
        }

        if (props.fatsLimit) {
            fatsLimitFrom.value = props.fatsLimit[0]
            fatsLimitTo.value = props.fatsLimit[1]
        }
    });

watch(() => props.isApplyFilter, () => {
    if (props.isApplyFilter) {
        applyFilter();
    }
});

watch(() => props.isClearFilter, () => {
    console.log('watch clear');
    if (props.isClearFilter) {
        clearFilter();
    }
});

const CUSTOM_CHECKBOX_VALUES = [null, true, false];

const selectedCategories = ref([]);
const selectedDataSource = ref([]);
const selectedCountries = ref([]);
const isFavoriteChecked = ref(props.productsFilterDefaultVal?.is_favorite !== undefined ? props.productsFilterDefaultVal.is_favorite : null);
const isPersonalChecked = ref(props.productsFilterDefaultVal?.is_personal !== undefined ? props.productsFilterDefaultVal.is_personal : null);
const isHiddenChecked = ref(props.productsFilterDefaultVal?.is_hidden !== undefined ? props.productsFilterDefaultVal.is_hidden : null);
const isAbstractChecked = ref(props.productsFilterDefaultVal?.is_abstract !== undefined ? props.productsFilterDefaultVal.is_abstract : null);
const caloryLimitFrom = ref(null);
const caloryLimitTo = ref(null);
const proteinsLimitFrom = ref(null);
const proteinsLimitTo = ref(null);
const carbohydratesLimitFrom = ref(null);
const carbohydratesLimitTo = ref(null);
const fatsLimitFrom = ref(null);
const fatsLimitTo = ref(null);

watch(() => props.currentCategoryId, () => {
    if (props.currentCategoryId !== null) {
        selectedCategories.value.length = 0
        selectedCategories.value.push(props.currentCategoryId);
    }
});

function applyFilter() {
    let filter = {
        // name
        category_id: selectedCategories.value.length > 0 ? selectedCategories.value : null,
        // data_source: selectedDataSource.value,
        country_of_manufacture: selectedCountries.value.length > 0 ? selectedCountries.value : null,
        // manufacturer
        is_favorite: isFavoriteChecked.value,
        is_personal: isPersonalChecked.value,
        is_hidden: isHiddenChecked.value,
        is_abstract: isAbstractChecked.value,
        kcalory: [caloryLimitFrom.value ? Number(caloryLimitFrom.value) : 0, caloryLimitTo.value ? Number(caloryLimitTo.value) : props.caloryLimit[1]],
        proteins: [proteinsLimitFrom.value ? Number(proteinsLimitFrom.value) : 0, proteinsLimitTo.value ? Number(proteinsLimitTo.value) : props.proteinsLimit[1]],
        carbohydrates: [carbohydratesLimitFrom.value ? Number(carbohydratesLimitFrom.value) : 0, carbohydratesLimitTo.value ? Number(carbohydratesLimitTo.value) : props.carbohydratesLimit[1]],
        fats: [fatsLimitFrom.value ? Number(fatsLimitFrom.value) : 0, fatsLimitTo.value ? Number(fatsLimitTo.value) : props.fatsLimit[1]],
    };

    emit('applyFilter', filter);
}

function clearFilter() {
    selectedCategories.value = [props.currentCategoryId];
    selectedDataSource.value = [];
    selectedCountries.value = [];
    isFavoriteChecked.value = props.productsFilterDefaultVal?.is_favorite !== undefined ? props.productsFilterDefaultVal.is_favorite : null;
    isPersonalChecked.value = props.productsFilterDefaultVal?.is_personal !== undefined ? props.productsFilterDefaultVal.is_personal : null;
    isHiddenChecked.value = props.productsFilterDefaultVal?.is_hidden !== undefined ? props.productsFilterDefaultVal.is_hidden : null;
    isAbstractChecked.value = props.productsFilterDefaultVal?.is_abstract !== undefined ? props.productsFilterDefaultVal.is_abstract : null;
    caloryLimitFrom.value = props.caloryLimit[0];
    caloryLimitTo.value = props.caloryLimit[1];
    proteinsLimitFrom.value = props.proteinsLimit[0];
    proteinsLimitTo.value = props.proteinsLimit[1];
    carbohydratesLimitFrom.value = props.carbohydratesLimit[0];
    carbohydratesLimitTo.value = props.carbohydratesLimit[1];
    fatsLimitFrom.value = props.fatsLimit[0];
    fatsLimitTo.value = props.fatsLimit[1];

    emit('clearFilter');
}

function inputCharFilter(event) {
    // console.log(event)
    if (filterNumberInput(event.keyCode)) {
        // event.data = event.data.replace(/\D/, '')
        return
    }
    event.preventDefault();
}

function changeCustomCheckboxValue(refValue) {
    console.log(refValue);
    let currentValueIndex = CUSTOM_CHECKBOX_VALUES.indexOf(refValue);

    if (currentValueIndex < CUSTOM_CHECKBOX_VALUES.length - 1) {
        return CUSTOM_CHECKBOX_VALUES[currentValueIndex + 1];
    }

    if (currentValueIndex === CUSTOM_CHECKBOX_VALUES.length - 1) {
        return CUSTOM_CHECKBOX_VALUES[0];
    }

    return CUSTOM_CHECKBOX_VALUES[0]
}

function changeAllCustomCheckboxValue(newValue) {
    isAbstractChecked.value = newValue;

    if (props.userIsAuthorized) {
        isFavoriteChecked.value = newValue;
        isPersonalChecked.value = newValue;
        isHiddenChecked.value = newValue;
    }
}


function checkboxClasses(value, disableForUnauthorized = true) {
    let classes = 'border-bottom ';

    if (disableForUnauthorized && !props.userIsAuthorized) {
        return classes + 'text-secondary '
    }

    if (value === null) {
        classes += 'border-light-subtle ';
    } else if (value === true) {
        classes += 'border-primary ';
    } else {
        classes += 'border-danger-subtle ';
    }

    return classes
};

</script>

<template>
    <div class="filter-container">
        <div class="row pe-4">
            <div class="col-12 col-md-6">
                <div class="border-bottom border-light-subtle">Категории</div>
                <div class="categories-filter-container mb-1 rounded border-light me-2">
                    <ul class="list-group list-group-flush px-2">
                        <li v-show="props.categories.length == 0">
                            <div class="form-text">Нет данных</div>
                        </li>
                        <li v-for="itemGroup in props.categoriesGroup">
                            <div class="mb-1">
                                {{ itemGroup.name }}
                            </div>
                            <ul class="list-group list-group-flush px-2">
                                <li v-for="item in itemGroup.categories.data" :key="item.id">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" :value="item.id"
                                            v-model="selectedCategories" :id="'categoryFilter1' + item.id">
                                        <label class="form-check-label" :for="'categoryFilter1' + item.id">
                                            {{ item.name }}
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <!-- <li v-for="item in props.categories" :key="item.id">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" :value="item.id"
                                    v-model="selectedCategories" :id="'categoryFilter1' + item.id">
                                <label class="form-check-label" :for="'categoryFilter1' + item.id">
                                    {{ item.name }}
                                </label>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="border-bottom border-light-subtle">Страна производства</div>
                <div class="country-filter-container mb-1 rounded border-light me-2">
                    <ul class="list-group list-group-flush px-2">
                        <li v-show="props.countries.length == 0">
                            <div class="form-text">Нет данных</div>
                        </li>
                        <li v-for="item in props.countries">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" :value="item.id"
                                    v-model="selectedCountries" :id="'countryFilter1' + item.id">
                                <label class="form-check-label" :for="'countryFilter1' + item.id">
                                    {{ item.name_ru }}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="status-filter-container mb-1 ">
            <div class="border-bottom border-light-subtle">
                Статус
            </div>
            <div class="d-flex gap-1 mb-1 align-items-center ps-1">
                <div class="btn btn-light py-0 px-1" @click="changeAllCustomCheckboxValue(true)">
                    <IconCheckSquareFillSm class="text-primary" /> - вкл.
                </div>
                <div class="btn btn-light py-0 px-1" @click="changeAllCustomCheckboxValue(false)">
                    <IconDashSquareFill class="text-danger" /> - искл.
                </div>
                <div class="btn btn-light py-0 px-1" @click="changeAllCustomCheckboxValue(null)">
                    <IconSquare /> - любое значение
                </div>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isAbstractChecked" type="checkbox" value=""
                    id="abstractProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => isAbstractChecked = changeCustomCheckboxValue(isAbstractChecked)"
                    for="abstractProductsFilter">

                    <IconSquare v-show="isAbstractChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isAbstractChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isAbstractChecked === true" />

                    <div :class="checkboxClasses(isAbstractChecked, false)">
                        Абстрактные продукты
                    </div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isFavoriteChecked" type="checkbox" value=""
                    id="favoriteProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isFavoriteChecked = changeCustomCheckboxValue(isFavoriteChecked) : 0"
                    for="favoriteProductsFilter">

                    <IconSquare v-show="isFavoriteChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isFavoriteChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isFavoriteChecked === true" />

                    <div :class="checkboxClasses(isFavoriteChecked)">Избранные продукты</div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isPersonalChecked" type="checkbox" value=""
                    id="personalProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isPersonalChecked = changeCustomCheckboxValue(isPersonalChecked) : 0"
                    for="personalProductsFilter">

                    <IconSquare v-show="isPersonalChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isPersonalChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isPersonalChecked === true" />

                    <div :class="checkboxClasses(isPersonalChecked)">
                        Персональные продукты
                    </div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isHiddenChecked" type="checkbox" value=""
                    id="hiddenProductsFilter"> -->
                <label class="form-label d-flex gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isHiddenChecked = changeCustomCheckboxValue(isHiddenChecked) : 0"
                    for="hiddenProductsFilter">

                    <IconSquare v-show="isHiddenChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isHiddenChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isHiddenChecked === true" />

                    <div :class="checkboxClasses(isHiddenChecked)">
                        Скрытые продукты
                    </div>
                </label>
            </div>
        </div>

        <div class="limits-filter-container">
            <div class="mb-1 border-bottom border-light-subtle">Ограничения </div>
            <div class="row mb-2">
                <div class="col">
                    <div>Калории (ккал)</div>
                    <div class="row">
                        <div class="col">
                            <div class="d-flex gap-2 align-items-center">
                                <label for="caloryFilterFrom" class="form-label my-0">от:</label>
                                <input id="caloryFilterFrom" v-model="caloryLimitFrom"
                                    @keydown="inputCharFilter($event)" type="number"
                                    class="form-control form-control-sm" placeholder="ккал.">
                                <label for="caloryFilterTo" class="form-label my-0">до:</label>
                                <input id="caloryFilterTo" v-model="caloryLimitTo" @keydown="inputCharFilter($event)"
                                    type="number" class="form-control form-control-sm" placeholder="ккал.">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div>Углеводы (гр.)</div>
                    <div class="row">
                        <div class="col">
                            <div class="d-flex gap-2 align-items-center">
                                <label for="carbohydratesFilterFrom" class="form-label my-0">от:</label>
                                <input id="carbohydratesFilterFrom" v-model="carbohydratesLimitFrom"
                                    @keydown="inputCharFilter($event)" type="number"
                                    class="form-control form-control-sm" placeholder="гр.">
                                <label for="carbohydratesFilterTo" class="form-label my-0">до:</label>
                                <input id="carbohydratesFilterTo" v-model="carbohydratesLimitTo"
                                    @keydown="inputCharFilter($event)" type="number"
                                    class="form-control form-control-sm" placeholder="гр.">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-2">
                <div class="col">
                    <div>Белки (гр.)</div>
                    <div class="row">
                        <div class="col">
                            <div class="d-flex gap-2 align-items-center">
                                <label for="proteinsFilterFrom" class="form-label my-0">от:</label>
                                <input id="proteinsFilterFrom" v-model="proteinsLimitFrom"
                                    @keydown="inputCharFilter($event)" type="number"
                                    class="form-control form-control-sm" placeholder="гр.">
                                <label for="proteinsFilterTo" class="form-label my-0">до:</label>
                                <input id="proteinsFilterTo" v-model="proteinsLimitTo"
                                    @keydown="inputCharFilter($event)" type="number"
                                    class="form-control form-control-sm" placeholder="гр.">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div>Жиры (гр.)</div>
                    <div class="row">
                        <div class="col">
                            <div class="d-flex gap-2 align-items-center">
                                <label for="fatsFilterFrom" class="form-label my-0">от:</label>
                                <input id="fatsFilterFrom" v-model="fatsLimitFrom" @keydown="inputCharFilter($event)"
                                    type="number" class="form-control form-control-sm" placeholder="гр.">
                                <label for="fatsFilterTo" class="form-label my-0">до:</label>
                                <input id="fatsFilterTo" v-model="fatsLimitTo" @keydown="inputCharFilter($event)"
                                    type="number" class="form-control form-control-sm" placeholder="гр.">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="mb-2">

        </div>

    </div>
</template>

<style lang="scss">
.categories-filter-container,
.country-filter-container {
    // min-height: 10vh;
    max-height: 20vh;
    width: 100%;
    overflow-y: scroll;
    background-color: #faffffe0;
    // background-color: green;
}

.checkboxUnckecked::before {
    content: \F842;
}
</style>
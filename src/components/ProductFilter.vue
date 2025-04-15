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
    categoryGroupsFilterDefaultVal: {
        type: Object,
        default: null,
    },
    categoriesFilterDefaultVal: {
        type: Object,
        default: null,
    },
    productsFilterDefaultVal: {
        type: Object,
        default: null,
    },
    groupFilterResult: {
        type: Boolean,
        default: true,
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

const groupFilterResults = ref(props.groupFilterResult);
const selectedCategories = ref([]);
const selectedDataSource = ref([]);
const selectedCountries = ref([]);

const isCategoryGroupFavoriteChecked = ref(props.categoryGroupsFilterDefaultVal?.isFavorite !== undefined ? props.categoryGroupsFilterDefaultVal.isFavorite : null);
const isCategoryGroupPersonalChecked = ref(props.categoryGroupsFilterDefaultVal?.isPersonal !== undefined ? props.categoryGroupsFilterDefaultVal.isPersonal : null);
const isCategoryGroupHiddenChecked = ref(props.categoryGroupsFilterDefaultVal?.isHidden !== undefined ? props.categoryGroupsFilterDefaultVal.isHidden : null);
// const isCategoryGroupAbstractChecked = ref(props.categoryGroupsFilterDefaultVal?.isAbstract !== undefined ? props.categoryGroupsFilterDefaultVal.isAbstract : null);

const isCategoryFavoriteChecked = ref(props.categoriesFilterDefaultVal?.isFavorite !== undefined ? props.categoriesFilterDefaultVal.isFavorite : null);
const isCategoryPersonalChecked = ref(props.categoriesFilterDefaultVal?.isPersonal !== undefined ? props.categoriesFilterDefaultVal.isPersonal : null);
const isCategoryHiddenChecked = ref(props.categoriesFilterDefaultVal?.isHidden !== undefined ? props.categoriesFilterDefaultVal.isHidden : null);
// const isCategoryAbstractChecked = ref(props.categoriesFilterDefaultVal?.isAbstract !== undefined ? props.categoriesFilterDefaultVal.isAbstract : null);

const isProductFavoriteChecked = ref(props.productsFilterDefaultVal?.isFavorite !== undefined ? props.productsFilterDefaultVal.isFavorite : null);
const isProductPersonalChecked = ref(props.productsFilterDefaultVal?.isPersonal !== undefined ? props.productsFilterDefaultVal.isPersonal : null);
const isProductHiddenChecked = ref(props.productsFilterDefaultVal?.isHidden !== undefined ? props.productsFilterDefaultVal.isHidden : null);
const isProductAbstractChecked = ref(props.productsFilterDefaultVal?.isAbstract !== undefined ? props.productsFilterDefaultVal.isAbstract : null);

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
    let productsFilter = {
        // name
        // data_source: selectedDataSource.value,
        country_of_manufacture: selectedCountries.value.length > 0 ? selectedCountries.value : null,
        // manufacturer
        is_favorite: isProductFavoriteChecked.value,
        is_personal: isProductPersonalChecked.value,
        is_hidden: isProductHiddenChecked.value,
        is_abstract: isProductAbstractChecked.value,
        kcalory: [caloryLimitFrom.value ? Number(caloryLimitFrom.value) : 0, caloryLimitTo.value ? Number(caloryLimitTo.value) : props.caloryLimit[1]],
        proteins: [proteinsLimitFrom.value ? Number(proteinsLimitFrom.value) : 0, proteinsLimitTo.value ? Number(proteinsLimitTo.value) : props.proteinsLimit[1]],
        carbohydrates: [carbohydratesLimitFrom.value ? Number(carbohydratesLimitFrom.value) : 0, carbohydratesLimitTo.value ? Number(carbohydratesLimitTo.value) : props.carbohydratesLimit[1]],
        fats: [fatsLimitFrom.value ? Number(fatsLimitFrom.value) : 0, fatsLimitTo.value ? Number(fatsLimitTo.value) : props.fatsLimit[1]],
    };

    let categoryGroupsFilter = {
        isFavorite: isCategoryGroupFavoriteChecked.value,
        isPersonal: isCategoryGroupPersonalChecked.value,
        isHidden: isCategoryGroupHiddenChecked.value,
    }

    let categoriesFilter = {
        categoryId: selectedCategories.value.length > 0 ? selectedCategories.value : [],
        isFavorite: isCategoryFavoriteChecked.value,
        isPersonal: isCategoryPersonalChecked.value,
        isHidden: isCategoryHiddenChecked.value,
    }

    emit('applyFilter', {
        categoryGroupsFilter: categoryGroupsFilter,
        categoriesFilter: categoriesFilter,
        productsFilter: productsFilter,
        groupFilterResults: groupFilterResults.value,
    });
}

function clearFilter() {
    selectedCategories.value = [props.currentCategoryId];
    selectedDataSource.value = [];
    selectedCountries.value = [];
    groupFilterResults.value = props.groupFilterResult;
    isCategoryGroupFavoriteChecked.value = props.categoryGroupsFilterDefaultVal?.isFavorite !== undefined ? props.categoryGroupsFilterDefaultVal.isFavorite : null;
    isCategoryGroupPersonalChecked.value = props.categoryGroupsFilterDefaultVal?.isPersonal !== undefined ? props.categoryGroupsFilterDefaultVal.isPersonal : null;
    isCategoryGroupHiddenChecked.value = props.categoryGroupsFilterDefaultVal?.isHidden !== undefined ? props.categoryGroupsFilterDefaultVal.isHidden : null;
    isCategoryFavoriteChecked.value = props.categoriesFilterDefaultVal?.isFavorite !== undefined ? props.categoriesFilterDefaultVal.isFavorite : null;
    isCategoryPersonalChecked.value = props.categoriesFilterDefaultVal?.isPersonal !== undefined ? props.categoriesFilterDefaultVal.isPersonal : null;
    isCategoryHiddenChecked.value = props.categoriesFilterDefaultVal?.isHidden !== undefined ? props.categoriesFilterDefaultVal.isHidden : null;
    isProductFavoriteChecked.value = props.productsFilterDefaultVal?.isFavorite !== undefined ? props.productsFilterDefaultVal.isFavorite : null;
    isProductPersonalChecked.value = props.productsFilterDefaultVal?.isPersonal !== undefined ? props.productsFilterDefaultVal.isPersonal : null;
    isProductHiddenChecked.value = props.productsFilterDefaultVal?.isHidden !== undefined ? props.productsFilterDefaultVal.isHidden : null;
    isProductAbstractChecked.value = props.productsFilterDefaultVal?.isAbstract !== undefined ? props.productsFilterDefaultVal.isAbstract : null;
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

function changeAllCategoryGroupsCustomCheckboxValue(newValue) {
    if (props.userIsAuthorized) {
        isCategoryGroupFavoriteChecked.value = newValue;
        isCategoryGroupPersonalChecked.value = newValue;
        isCategoryGroupHiddenChecked.value = newValue;
    }
}

function changeAllCategoriesCustomCheckboxValue(newValue) {
    if (props.userIsAuthorized) {
        isCategoryFavoriteChecked.value = newValue;
        isCategoryPersonalChecked.value = newValue;
        isCategoryHiddenChecked.value = newValue;
    }
}

function changeAllProductsCustomCheckboxValue(newValue) {
    isProductAbstractChecked.value = newValue;

    if (props.userIsAuthorized) {
        isProductFavoriteChecked.value = newValue;
        isProductPersonalChecked.value = newValue;
        isProductHiddenChecked.value = newValue;
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
            <div class="col px-3">
                <div class="form-check">
                    <input type="checkbox" name="groupFilterResults" id="groupFilterResults" class="form-check-input"
                        v-model="groupFilterResults">
                    <label for="groupFilterResults" class="form-label mb-1">Объединять отфильтрованные данные по группам
                        и
                        категориям</label>
                </div>
            </div>
        </div>
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

        <!-- filter for categoryGroup status -->
        <div class="status-filter-container mb-1 ">
            <div class="border-bottom border-light-subtle">
                Статус групп
            </div>
            <div class="d-flex gap-1 mb-1 align-items-center ps-1">
                <div class="btn btn-light py-0 px-1" @click="changeAllCategoryGroupsCustomCheckboxValue(true)">
                    <IconCheckSquareFillSm class="text-primary" /> - вкл.
                </div>
                <div class="btn btn-light py-0 px-1" @click="changeAllCategoryGroupsCustomCheckboxValue(false)">
                    <IconDashSquareFill class="text-danger" /> - искл.
                </div>
                <div class="btn btn-light py-0 px-1" @click="changeAllCategoryGroupsCustomCheckboxValue(null)">
                    <IconSquare /> - любое значение
                </div>
            </div>
            <div class="ps-3">

                <!-- <input class="form-check-input" v-model="isFavoriteChecked" type="checkbox" value=""
                    id="favoriteProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isCategoryGroupFavoriteChecked = changeCustomCheckboxValue(isCategoryGroupFavoriteChecked) : 0"
                    for="favoriteProductsFilter">

                    <IconSquare v-show="isCategoryGroupFavoriteChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isCategoryGroupFavoriteChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isCategoryGroupFavoriteChecked === true" />

                    <div :class="checkboxClasses(isCategoryGroupFavoriteChecked)">Избранные группы</div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isPersonalChecked" type="checkbox" value=""
                    id="personalProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isCategoryGroupPersonalChecked = changeCustomCheckboxValue(isCategoryGroupPersonalChecked) : 0"
                    for="personalProductsFilter">

                    <IconSquare v-show="isCategoryGroupPersonalChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isCategoryGroupPersonalChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isCategoryGroupPersonalChecked === true" />

                    <div :class="checkboxClasses(isCategoryGroupPersonalChecked)">
                        Персональные группы
                    </div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isHiddenChecked" type="checkbox" value=""
                    id="hiddenProductsFilter"> -->
                <label class="form-label d-flex gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isCategoryGroupHiddenChecked = changeCustomCheckboxValue(isCategoryGroupHiddenChecked) : 0"
                    for="hiddenProductsFilter">

                    <IconSquare v-show="isCategoryGroupHiddenChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isCategoryGroupHiddenChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isCategoryGroupHiddenChecked === true" />

                    <div :class="checkboxClasses(isCategoryGroupHiddenChecked)">
                        Скрытые группы
                    </div>
                </label>
            </div>
        </div>

        <!-- filter for category status -->
        <div class="status-filter-container mb-1 ">
            <div class="border-bottom border-light-subtle">
                Статус категорий
            </div>
            <div class="d-flex gap-1 mb-1 align-items-center ps-1">
                <div class="btn btn-light py-0 px-1" @click="changeAllCategoriesCustomCheckboxValue(true)">
                    <IconCheckSquareFillSm class="text-primary" /> - вкл.
                </div>
                <div class="btn btn-light py-0 px-1" @click="changeAllCategoriesCustomCheckboxValue(false)">
                    <IconDashSquareFill class="text-danger" /> - искл.
                </div>
                <div class="btn btn-light py-0 px-1" @click="changeAllCategoriesCustomCheckboxValue(null)">
                    <IconSquare /> - любое значение
                </div>
            </div>
            <div class="ps-3">

                <!-- <input class="form-check-input" v-model="isFavoriteChecked" type="checkbox" value=""
                    id="favoriteProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isCategoryFavoriteChecked = changeCustomCheckboxValue(isCategoryFavoriteChecked) : 0"
                    for="favoriteProductsFilter">

                    <IconSquare v-show="isCategoryFavoriteChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isCategoryFavoriteChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isCategoryFavoriteChecked === true" />

                    <div :class="checkboxClasses(isCategoryFavoriteChecked)">Избранные категории</div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isPersonalChecked" type="checkbox" value=""
                    id="personalProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isCategoryPersonalChecked = changeCustomCheckboxValue(isCategoryPersonalChecked) : 0"
                    for="personalProductsFilter">

                    <IconSquare v-show="isCategoryPersonalChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isCategoryPersonalChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isCategoryPersonalChecked === true" />

                    <div :class="checkboxClasses(isCategoryPersonalChecked)">
                        Персональные категории
                    </div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isHiddenChecked" type="checkbox" value=""
                    id="hiddenProductsFilter"> -->
                <label class="form-label d-flex gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isCategoryHiddenChecked = changeCustomCheckboxValue(isCategoryHiddenChecked) : 0"
                    for="hiddenProductsFilter">

                    <IconSquare v-show="isCategoryHiddenChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isCategoryHiddenChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isCategoryHiddenChecked === true" />

                    <div :class="checkboxClasses(isCategoryHiddenChecked)">
                        Скрытые категории
                    </div>
                </label>
            </div>
        </div>

        <!-- filter for product status -->
        <div class="status-filter-container mb-1 ">
            <div class="border-bottom border-light-subtle">
                Статус продуктов
            </div>
            <div class="d-flex gap-1 mb-1 align-items-center ps-1">
                <div class="btn btn-light py-0 px-1" @click="changeAllProductsCustomCheckboxValue(true)">
                    <IconCheckSquareFillSm class="text-primary" /> - вкл.
                </div>
                <div class="btn btn-light py-0 px-1" @click="changeAllProductsCustomCheckboxValue(false)">
                    <IconDashSquareFill class="text-danger" /> - искл.
                </div>
                <div class="btn btn-light py-0 px-1" @click="changeAllProductsCustomCheckboxValue(null)">
                    <IconSquare /> - любое значение
                </div>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isAbstractChecked" type="checkbox" value=""
                    id="abstractProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => isProductAbstractChecked = changeCustomCheckboxValue(isProductAbstractChecked)"
                    for="abstractProductsFilter">

                    <IconSquare v-show="isProductAbstractChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isProductAbstractChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isProductAbstractChecked === true" />

                    <div :class="checkboxClasses(isProductAbstractChecked, false)">
                        Абстрактные продукты
                    </div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isFavoriteChecked" type="checkbox" value=""
                    id="favoriteProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isProductFavoriteChecked = changeCustomCheckboxValue(isProductFavoriteChecked) : 0"
                    for="favoriteProductsFilter">

                    <IconSquare v-show="isProductFavoriteChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isProductFavoriteChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isProductFavoriteChecked === true" />

                    <div :class="checkboxClasses(isProductFavoriteChecked)">Избранные продукты</div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isPersonalChecked" type="checkbox" value=""
                    id="personalProductsFilter"> -->
                <label class="form-label d-flex mb-1 gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isProductPersonalChecked = changeCustomCheckboxValue(isProductPersonalChecked) : 0"
                    for="personalProductsFilter">

                    <IconSquare v-show="isProductPersonalChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isProductPersonalChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isProductPersonalChecked === true" />

                    <div :class="checkboxClasses(isProductPersonalChecked)">
                        Персональные продукты
                    </div>
                </label>
            </div>
            <div class="ps-3">
                <!-- <input class="form-check-input" v-model="isHiddenChecked" type="checkbox" value=""
                    id="hiddenProductsFilter"> -->
                <label class="form-label d-flex gap-1 align-items-center"
                    @click="() => props.userIsAuthorized ? isProductHiddenChecked = changeCustomCheckboxValue(isProductHiddenChecked) : 0"
                    for="hiddenProductsFilter">

                    <IconSquare v-show="isProductHiddenChecked === null" />
                    <IconDashSquareFill class="text-danger" v-show="isProductHiddenChecked === false" />
                    <IconCheckSquareFillSm class="text-primary" v-show="isProductHiddenChecked === true" />

                    <div :class="checkboxClasses(isProductHiddenChecked)">
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
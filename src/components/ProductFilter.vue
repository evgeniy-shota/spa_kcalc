<script setup>
import { watch, ref, computed, onUpdated } from 'vue';
import { filterNumberInput } from '@/resource/js/inputFilters';
import { validateFloatNumber } from '@/resource/js/dataValidation';

import IconSquare from './icons/IconSquare.vue';
import IconDashSquareFill from './icons/IconDashSquareFill.vue';
import IconCheckSquareFillSm from './icons/IconCheckSquareFillSm.vue';
import IconInfoCircle from './icons/IconInfoCircle.vue';
import { useFiltersStore } from '@/stores/filtersStore';
import { useAdditionalProductData } from '@/stores/additionProductData';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useCategoryGroupsStore } from '@/stores/categoryGroupsStore';

const filtersStore = useFiltersStore();
const additionalProductDataStore = useAdditionalProductData();
const categoriesStore = useCategoriesStore();
const categoryGroups = useCategoryGroupsStore();

const props = defineProps({
    isFilterShowed: {
        type: Boolean,
        default: false,
    },
    isApplyFilter: {
        type: Boolean,
        default: false,
    },
    isClearFilter: {
        type: Boolean,
        default: false,
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

// watch(filtersStore.actualCategoryGroupsFilter.categoryGroupsId, (value) => {
//     console.log(filtersStore.actualCategoryGroupsFilter.categoryGroupsId)
//     if (value.length === 0) {
//         selectedCategoryGroups.value.clear()
//         return
//     }

//     for (let i = 0; i < value.length; i++) {
//         initCategories(value[i])
//     }
// })

// watch(filtersStore.actualCategoriesFilter.categoriesId, (value) => {
//     console.log(filtersStore.actualCategoriesFilter.categoriesId)
//     if (value.length === 0) {
//         selectedCategories.value.clear()
//         return
//     }

//     for (let i = 0; i < value.length; i++) {
//         initCategoryGroups(value[i])
//     }
// })

const CUSTOM_CHECKBOX_VALUES = [null, true, false];

const groupFilterResults = ref(null);
const selectedCategoryGroups = ref(null)
const selectedCategories = ref(null);
// const selectedCategories = ref([categoriesStore.currentCategory]);
const selectedDataSource = ref([]);
const selectedCountries = ref([]);

const isCategoryGroupFavoriteChecked = ref(null);
const isCategoryGroupPersonalChecked = ref(null);
const isCategoryGroupHiddenChecked = ref(null);
// const isCategoryGroupAbstractChecked = ref(props.categoryGroupsFilterDefaultVal?.isAbstract !== undefined ? props.categoryGroupsFilterDefaultVal.isAbstract : null);

const isCategoryFavoriteChecked = ref(null);
const isCategoryPersonalChecked = ref(null);
const isCategoryHiddenChecked = ref(null);
// const isCategoryAbstractChecked = ref(props.categoriesFilterDefaultVal?.isAbstract !== undefined ? props.categoriesFilterDefaultVal.isAbstract : null);

const isProductFavoriteChecked = ref(null);
const isProductPersonalChecked = ref(null);
const isProductHiddenChecked = ref(null);
const isProductAbstractChecked = ref(null);

const caloryLimitFrom = ref(null);
const caloryLimitTo = ref(null);
const proteinsLimitFrom = ref(null);
const proteinsLimitTo = ref(null);
const carbohydratesLimitFrom = ref(null);
const carbohydratesLimitTo = ref(null);
const fatsLimitFrom = ref(null);
const fatsLimitTo = ref(null);

// watch([
//     () => additionalProductDataStore.caloryLimits,
//     () => additionalProductDataStore.proteinsLimits,
//     () => additionalProductDataStore.carbohydratesLimits,
//     () => additionalProductDataStore.fatsLimits], () => {

//         if (additionalProductDataStore.caloryLimits) {
//             caloryLimitFrom.value = additionalProductDataStore.caloryLimits[0]
//             caloryLimitTo.value = additionalProductDataStore.caloryLimits[1]
//         }

//         if (additionalProductDataStore.proteinsLimits) {
//             proteinsLimitFrom.value = additionalProductDataStore.proteinsLimits[0]
//             proteinsLimitTo.value = additionalProductDataStore.proteinsLimits[1]
//         }

//         if (additionalProductDataStore.carbohydratesLimits) {
//             carbohydratesLimitFrom.value = additionalProductDataStore.carbohydratesLimits[0]
//             carbohydratesLimitTo.value = additionalProductDataStore.carbohydratesLimits[1]
//         }

//         if (additionalProductDataStore.fatsLimits) {
//             fatsLimitFrom.value = additionalProductDataStore.fatsLimits[0]
//             fatsLimitTo.value = additionalProductDataStore.fatsLimits[1]
//         }
//     });

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

watch(() => props.isFilterShowed, ((value) => {
    if (value == true) {
        prepareToShow()
    }
}))

function prepareToShow() {
    console.log('prepereToShow')
    selectedCategories.value = new Set(filtersStore.actualCategoriesFilter.categoriesId);
    selectedCategoryGroups.value = new Set(filtersStore.actualCategoryGroupsFilter.categoryGroupsId)
    groupFilterResults.value = filtersStore.groupFilterResults;
    isCategoryGroupFavoriteChecked.value = filtersStore.actualCategoryGroupsFilter.isFavorite ?? null;
    isCategoryGroupPersonalChecked.value = filtersStore.actualCategoryGroupsFilter.isPersonal ?? null;
    isCategoryGroupHiddenChecked.value = filtersStore.actualCategoryGroupsFilter.isHidden ?? null;
    isCategoryFavoriteChecked.value = filtersStore.actualCategoriesFilter.isFavorite ?? null;
    isCategoryPersonalChecked.value = filtersStore.actualCategoriesFilter.isPersonal ?? null;
    isCategoryHiddenChecked.value = filtersStore.actualCategoriesFilter.isHidden ?? null;
    isProductFavoriteChecked.value = filtersStore.actualProductsFilter.isFavorite ?? null;
    isProductPersonalChecked.value = filtersStore.actualProductsFilter.isPersonal ?? null;
    isProductHiddenChecked.value = filtersStore.actualProductsFilter.isHidden ?? null;
    isProductAbstractChecked.value = filtersStore.actualProductsFilter.isAbstract ?? null;
    caloryLimitFrom.value = additionalProductDataStore.caloryLimits[0];
    caloryLimitTo.value = additionalProductDataStore.caloryLimits[1];
    proteinsLimitFrom.value = additionalProductDataStore.proteinsLimits[0];
    proteinsLimitTo.value = additionalProductDataStore.proteinsLimits[1];
    carbohydratesLimitFrom.value = additionalProductDataStore.carbohydratesLimits[0];
    carbohydratesLimitTo.value = additionalProductDataStore.carbohydratesLimits[1];
    fatsLimitFrom.value = additionalProductDataStore.fatsLimits[0];
    fatsLimitTo.value = additionalProductDataStore.fatsLimits[1];
}

function initCategories(id) {
    let categoriesFromCategoryGroup = additionalProductDataStore.categoryGroupsIdCategoriesIdMap.get(id)
    if (selectedCategoryGroups.value.has(id)) {
        categoriesFromCategoryGroup.forEach(categoryId => {
            selectedCategories.value.add(categoryId);
        });
    } else {
        categoriesFromCategoryGroup.forEach(categoryId => {
            selectedCategories.value.delete(categoryId)
        });
    }
}

function initCategoryGroups(id) {
    let categoryGroupContainsCategory =
        additionalProductDataStore.categoriesIdCategoryGroupsIdMap.get(id)
    let categoriesFromCategoryGroup =
        additionalProductDataStore.categoryGroupsIdCategoriesIdMap.get(categoryGroupContainsCategory)

    if (selectedCategories.value.has(id)) {
        selectedCategoryGroups.value.add(categoryGroupContainsCategory);
    } else {
        let countSelectedCategoriesFromSameCategoryGroup = 0

        categoriesFromCategoryGroup.forEach(categoryId => {
            if (selectedCategories.value.has(categoryId)) {
                countSelectedCategoriesFromSameCategoryGroup += 1;
            }
        });

        if (countSelectedCategoriesFromSameCategoryGroup === 0) {
            selectedCategoryGroups.value.delete(categoryGroupContainsCategory);
        }
    }
}

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
        categoryGroupsId: selectedCategoryGroups.value.size > 0 ? Array.from(selectedCategoryGroups.value) : [],
        isFavorite: isCategoryGroupFavoriteChecked.value,
        isPersonal: isCategoryGroupPersonalChecked.value,
        isHidden: isCategoryGroupHiddenChecked.value,
    }

    let categoriesFilter = {
        categoriesId: selectedCategories.value.size > 0 ? Array.from(selectedCategories.value) : [],
        isFavorite: isCategoryFavoriteChecked.value,
        isPersonal: isCategoryPersonalChecked.value,
        isHidden: isCategoryHiddenChecked.value,
    }

    console.log({
        categoryGroupsFilter: categoryGroupsFilter,
        categoriesFilter: categoriesFilter,
        productsFilter: productsFilter,
        groupFilterResults: groupFilterResults.value,
    })

    emit('applyFilter', {
        categoryGroupsFilter: categoryGroupsFilter,
        categoriesFilter: categoriesFilter,
        productsFilter: productsFilter,
        groupFilterResults: groupFilterResults.value,
    });
}

function clearFilter() {
    emit('clearFilter');

    selectedCategoryGroups.value = new Set(filtersStore.actualCategoryGroupsFilter.categoryGroupsId);
    selectedCategories.value = new Set(filtersStore.actualCategoriesFilter.categoriesId);
    selectedDataSource.value = [];
    selectedCountries.value = [];
    groupFilterResults.value = filtersStore.groupFilterResults;

    isCategoryGroupFavoriteChecked.value = filtersStore.actualCategoryGroupsFilter.isFavorite ?? null;
    isCategoryGroupPersonalChecked.value = filtersStore.actualCategoryGroupsFilter.isPersonal ?? null;
    isCategoryGroupHiddenChecked.value = filtersStore.actualCategoryGroupsFilter.isHidden ?? null;
    isCategoryFavoriteChecked.value = filtersStore.actualCategoriesFilter.isFavorite ?? null;
    isCategoryPersonalChecked.value = filtersStore.actualCategoriesFilter.isPersonal ?? null;
    isCategoryHiddenChecked.value = filtersStore.actualCategoriesFilter.isHidden ?? null;
    isProductFavoriteChecked.value = filtersStore.actualProductsFilter.isFavorite ?? null;
    isProductPersonalChecked.value = filtersStore.actualProductsFilter.isPersonal ?? null;
    isProductHiddenChecked.value = filtersStore.actualProductsFilter.isHidden ?? null;
    isProductAbstractChecked.value = filtersStore.actualProductsFilter.isAbstract ?? null;

    caloryLimitFrom.value = additionalProductDataStore.caloryLimits[0];
    caloryLimitTo.value = additionalProductDataStore.caloryLimits[1];
    proteinsLimitFrom.value = additionalProductDataStore.proteinsLimits[0];
    proteinsLimitTo.value = additionalProductDataStore.proteinsLimits[1];
    carbohydratesLimitFrom.value = additionalProductDataStore.carbohydratesLimits[0];
    carbohydratesLimitTo.value = additionalProductDataStore.carbohydratesLimits[1];
    fatsLimitFrom.value = additionalProductDataStore.fatsLimits[0];
    fatsLimitTo.value = additionalProductDataStore.fatsLimits[1];
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

function changeCategoryGroupCheckbox(id) {
    initCategories(id)
}

function changeCategoryCheckbox(id) {
    initCategoryGroups(id)
}

</script>

<template>
    <div class="filter-container">
        <!-- temporarily disabled -->
        <!-- <div class="row pe-4">
            <div class="col px-3">
                <div class="form-check">
                    <input type="checkbox" name="groupFilterResults" id="groupFilterResults" class="form-check-input"
                        v-model="groupFilterResults">
                    <label for="groupFilterResults" class="form-label mb-1">Объединять отфильтрованные данные по группам
                        и
                        категориям</label>
                </div>
            </div>
        </div> -->

        <div class="row pe-4">
            <div class="col">
                <div class="p-2 bg-info bg-opacity-10 border border-info rounded">
                    <IconInfoCircle />
                    Фильтр по умолчанию заполняется автоматически, в зависимости от контекста использования. Например,
                    если открыть фильтр находясь в группе "Овощи и зелень", все категории из группы будут выбранны
                    автоматически
                </div>
            </div>
        </div>
        <div class="row pe-4">
            <div class="col-12 col-md-6">
                <div class="border-bottom border-light-subtle">Категории</div>
                <div class="categories-filter-container mb-1 rounded border-light me-2">
                    <ul class="list-group list-group-flush px-2">
                        <li v-show="additionalProductDataStore.allCategoryGroups.length == 0">
                            <div class="form-text">Нет данных</div>
                        </li>
                        <li v-for="itemGroup in additionalProductDataStore.allCategoryGroups">
                            <div class="form-check">
                                <input @change="changeCategoryGroupCheckbox(itemGroup.id)"
                                    v-model="selectedCategoryGroups" class="form-check-input" type="checkbox"
                                    :value="itemGroup.id" :name="'categoryGroupFilter' + itemGroup.id"
                                    :id="'categoryGroupFilter' + itemGroup.id">
                                <label class="form-check-label" :for="'categoryGroupFilter' + itemGroup.id">
                                    {{ itemGroup.name }}
                                </label>
                            </div>
                            <ul v-if="'categories' in itemGroup" class="list-group list-group-flush px-2 border-start">
                                <li v-for="item in itemGroup.categories.data" :key="item.id">
                                    <div class="form-check ms-2">
                                        <input @change="changeCategoryCheckbox(item.id)" v-model="selectedCategories"
                                            class="form-check-input" type="checkbox" :value="item.id"
                                            :id="'categoryFilter1' + item.id">
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
                        <li v-show="additionalProductDataStore.countriesOfManufacture.length == 0">
                            <div class="form-text">Нет данных</div>
                        </li>
                        <li v-for="item in additionalProductDataStore.countriesOfManufacture">
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
<script setup>
import { watch, ref } from 'vue';


const props = defineProps({
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

const selectedCategories = ref([]);
const selectedDataSource = ref([]);
const selectedCountries = ref([]);
const isFavoriteChecked = ref(false);
const isPersonalChecked = ref(false);
const isHiddenChecked = ref(false);
const isAbstractChecked = ref(false);
const caloryLimitFrom = ref(null);
const caloryLimitTo = ref(null);
const proteinsLimitFrom = ref(null);
const proteinsLimitTo = ref(null);
const carbohydratesLimitFrom = ref(null);
const carbohydratesLimitTo = ref(null);
const fatsLimitFrom = ref(null);
const fatsLimitTo = ref(null);

function applyFilter() {
    let filter = {
        // name
        category_id: selectedCategories.value.length > 0 ? selectedCategories.value : null,
        // data_source: selectedDataSource.value,
        country_of_manufacture: selectedCountries.value.length > 0 ? selectedCountries.value : null,
        // manufacturer
        is_favorite: isFavoriteChecked.value,
        is_personal: isPersonalChecked.value,
        // is_hidden: isHiddenChecked.value,
        is_abstract: isAbstractChecked.value,
        kcalory: [caloryLimitFrom.value ? Number(caloryLimitFrom.value) : 0, caloryLimitTo.value ? Number(caloryLimitTo.value) : 999],
        proteins: [proteinsLimitFrom.value ? Number(proteinsLimitFrom.value) : 0, proteinsLimitTo.value ? Number(proteinsLimitTo.value) : 999],
        carbohydrates: [carbohydratesLimitFrom.value ? Number(carbohydratesLimitFrom.value) : 0, carbohydratesLimitTo.value ? Number(carbohydratesLimitTo.value) : 999],
        fats: [fatsLimitFrom.value ? Number(fatsLimitFrom.value) : 0, fatsLimitTo.value ? Number(fatsLimitTo.value) : 999],
    };

    emit('applyFilter', filter);
}

function clearFilter() {
    selectedCategories.value = [];
    selectedDataSource.value = [];
    selectedCountries.value = [];
    isFavoriteChecked.value = false;
    isPersonalChecked.value = false;
    isHiddenChecked.value = false;
    isAbstractChecked.value = false;
    caloryLimitFrom.value = null;
    caloryLimitTo.value = null;
    proteinsLimitFrom.value = null;
    proteinsLimitTo.value = null;
    carbohydratesLimitFrom.value = null;
    carbohydratesLimitTo.value = null;
    fatsLimitFrom.value = null;
    fatsLimitTo.value = null;

    emit('clearFilter');
}

</script>

<template>
    <div class="filter-container">
        <div class="row">
            <div class="col-12 col-md-6">
                <div>Категории</div>
                <div class="categories-filter-container mb-1 border-bottom border-light">
                    <ul class="list-group list-group-flush  px-2">
                        <li v-show="props.categories.length == 0">
                            <div class="form-text">Нет данных</div>
                        </li>
                        <li v-for="item in props.categories" :key="item.id">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" :value="item.id"
                                    v-model="selectedCategories" id="categoryFilter1">
                                <label class="form-check-label" for="categoryFilter1">
                                    {{ item.name }}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div>Страна производства</div>
                <div class="country-filter-container mb-1 border-bottom">
                    <ul class="list-group list-group-flush px-2">
                        <li v-show="props.countries.length == 0">
                            <div class="form-text">Нет данных</div>
                        </li>
                        <li v-for="item in props.countries">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" :value="item.id"
                                    v-model="selectedCountries" id="categoryFilter1">
                                <label class="form-check-label" for="categoryFilter1">
                                    {{ item.name_ru }}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="status-filter-container mb-1">
            <div>Статус</div>
            <div class="form-check">
                <input class="form-check-input" v-model="isFavoriteChecked" type="checkbox" value=""
                    id="favoriteProductsFilter">
                <label class="form-check-label" for="favoriteProductsFilter">
                    Избранные продукты
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="isPersonalChecked" type="checkbox" value=""
                    id="personalProductsFilter">
                <label class="form-check-label" for="personalProductsFilter">
                    Персональные продукты
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="isAbstractChecked" type="checkbox" value=""
                    id="abstractProductsFilter">
                <label class="form-check-label" for="abstractProductsFilter">
                    Абстрактные продукты
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="isHiddenChecked" type="checkbox" value=""
                    id="hiddenProductsFilter">
                <label class="form-check-label" for="hiddenProductsFilter">
                    Скрытые продукты
                </label>
            </div>
        </div>

        <div class="limits-filter-container">
            <div class="mb-1">Ограничения </div>
            <!-- <div class="d-flex">
                <div class="d-flex flex-column mb-1 me-1">
                    <label for="" class="form-label">Калории от:</label>
                    <label for="" class="form-label">Белки от:</label>
                    <label for="" class="form-label">Жиры от:</label>
                    <label for="" class="form-label">Углеводы от:</label>
                </div>

                <div class="d-flex flex-column mb-1 me-1">
                    <input type="text" class="form-control form-control-sm mb-1">
                    <input type="text" class="form-control form-control-sm mb-1">
                    <input type="text" class="form-control form-control-sm mb-1">
                    <input type="text" class="form-control form-control-sm mb-1">
                </div>

                <div class="d-flex flex-column mb-1 me-1">
                    <label for="" class="form-label">до:</label>
                    <label for="" class="form-label">до:</label>
                    <label for="" class="form-label">до:</label>
                    <label for="" class="form-label">до:</label>
                </div>

                <div class="d-flex flex-column mb-1 me-1">
                    <input type="text" class="form-control form-control-sm">
                    <input type="text" class="form-control form-control-sm">
                    <input type="text" class="form-control form-control-sm">
                    <input type="text" class="form-control form-control-sm">
                </div>
            </div> -->

            <div class="row mb-2">
                <div class="col">
                    <div>Калории (ккал)</div>
                    <div class="row">
                        <div class="col">
                            <div class="d-flex gap-2 align-items-center">
                                <label for="caloryFilterFrom" class="form-label">от:</label>
                                <input id="caloryFilterFrom" v-model="caloryLimitFrom" type="text"
                                    class="form-control form-control-sm" placeholder="ккал.">
                                <label for="caloryFilterTo" class="form-label">до:</label>
                                <input id="caloryFilterTo" v-model="caloryLimitTo" type="text"
                                    class="form-control form-control-sm" placeholder="ккал.">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div>Углеводы (гр.)</div>
                    <div class="row">
                        <div class="col">
                            <div class="d-flex gap-2 align-items-center">
                                <label for="carbohydratesFilterFrom" class="form-label">от:</label>
                                <input id="carbohydratesFilterFrom" v-model="carbohydratesLimitFrom" type="text"
                                    class="form-control form-control-sm" placeholder="гр.">
                                <label for="carbohydratesFilterTo" class="form-label">до:</label>
                                <input id="carbohydratesFilterTo" v-model="carbohydratesLimitTo" type="text"
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
                                <label for="proteinsFilterFrom" class="form-label">от:</label>
                                <input id="proteinsFilterFrom" v-model="proteinsLimitFrom" type="text"
                                    class="form-control form-control-sm" placeholder="гр.">
                                <label for="proteinsFilterTo" class="form-label">до:</label>
                                <input id="proteinsFilterTo" v-model="proteinsLimitTo" type="text"
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
                                <label for="fatsFilterFrom" class="form-label">от:</label>
                                <input id="fatsFilterFrom" v-model="fatsLimitFrom" type="text"
                                    class="form-control form-control-sm" placeholder="гр.">
                                <label for="fatsFilterTo" class="form-label">до:</label>
                                <input id="fatsFilterTo" v-model="fatsLimitTo" type="text"
                                    class="form-control form-control-sm" placeholder="гр.">
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
    overflow-y: scroll;
    background-color: #fafafa;
}
</style>
<script setup>

const props = defineProps();

const emit = defineEmits();

</script>

<template>
    <div class="filter-container">
        <div class="categories-filter-container mb-1">
            <div>Категории</div>
            <ul class="list-group list-group-flush">
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="1" id="categoryFilter1">
                        <label class="form-check-label" for="categoryFilter1">
                            Название категории
                        </label>
                    </div>
                </li>
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="2" id="categoryFilter2">
                        <label class="form-check-label" for="categoryFilter2">
                            Название категории
                        </label>
                    </div>
                </li>
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="3" id="categoryFilter3">
                        <label class="form-check-label" for="categoryFilter3">
                            Default checkbox
                        </label>
                    </div>
                </li>
            </ul>
        </div>

        <div class="status-filter-container mb-1">
            <div>Статус</div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="favoriteProductsFilter">
                <label class="form-check-label" for="favoriteProductsFilter">
                    Избранные продукты
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="personalProductsFilter">
                <label class="form-check-label" for="personalProductsFilter">
                    Персональные продукты
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="hiddenProductsFilter">
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
                                <input id="caloryFilterFrom" type="text" class="form-control form-control-sm"
                                    placeholder="ккал.">
                                <label for="caloryFilterTo" class="form-label">до:</label>
                                <input id="caloryFilterTo" type="text" class="form-control form-control-sm"
                                    placeholder="ккал.">
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
                                <input id="carbohydratesFilterFrom" type="text" class="form-control form-control-sm"
                                    placeholder="гр.">
                                <label for="carbohydratesFilterTo" class="form-label">до:</label>
                                <input id="carbohydratesFilterTo" type="text" class="form-control form-control-sm"
                                    placeholder="гр.">
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
                                <input id="proteinsFilterFrom" type="text" class="form-control form-control-sm"
                                    placeholder="гр.">
                                <label for="proteinsFilterTo" class="form-label">до:</label>
                                <input id="proteinsFilterTo" type="text" class="form-control form-control-sm"
                                    placeholder="гр.">
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
                                <input id="fatsFilterFrom" type="text" class="form-control form-control-sm"
                                    placeholder="гр.">
                                <label for="fatsFilterTo" class="form-label">до:</label>
                                <input id="fatsFilterTo" type="text" class="form-control form-control-sm"
                                    placeholder="гр.">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="mb-2">
            <label for="" class="form-label">Страна производства</label>
            <div class="country-filter-container">
                <ul class="list-group list-group-flush">
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="1" id="categoryFilter1">
                            <label class="form-check-label" for="categoryFilter1">
                                Страна 1
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="2" id="categoryFilter2">
                            <label class="form-check-label" for="categoryFilter2">
                                Страна 2
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="3" id="categoryFilter3">
                            <label class="form-check-label" for="categoryFilter3">
                                Страна 3
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="2" id="categoryFilter2">
                            <label class="form-check-label" for="categoryFilter2">
                                Страна 4
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="3" id="categoryFilter3">
                            <label class="form-check-label" for="categoryFilter3">
                                Страна 5
                            </label>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

    </div>
</template>

<style lang="scss">
.categories-filter-container {
    min-height: 10vh;
    max-height: 20vh;
    overflow-y: scroll;
}
</style>
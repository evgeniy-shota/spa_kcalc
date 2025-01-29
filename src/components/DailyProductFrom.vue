<script setup>
import { computed, ref, watch } from 'vue';
import SearchInput from './SearchInput.vue';
import { useSearchesStore } from '@/stores/SearchesStore';

const searchStore = useSearchesStore();
const selectedProducts = ref([]);
const dailyRationSearchQuery = ref("");
const searchResponse = ref({});
const searchResult = ref({});
const searchResultLabel = ref('');

const emit = defineEmits({
    showSearch(searchTitle) {
        if (searchTitle?.length != 0) {
            return true;
        }
        return false;
    }
});

watch(searchResponse, () => {
    if (!('result' in searchResponse.value) || searchResponse.value.result != 'success') {
        searchResult.value = {};
        searchResultLabel.value = 'Поиск не дал результатов';
    } else {
        searchResult.value = searchResponse.value.response;
        searchResultLabel.value = 'Результаты поиска';
    }
});

const productSearchTimerDelayMs = ref(1500);

function selectSearchResult(selectedElement) {
    console.log("Selected result of product search - type: " + selectedElement.type + ", id: " + selectedElement.id);
    let element = {
        id: selectedElement.id,
        elementType: selectedElement.type,
        name: selectedElement.name,
        kcal: selectedElement.calory,
        carb: selectedElement.carbohydrates,
        prot: selectedElement.proteins,
        fats: selectedElement.fats,
    };
    selectedProducts.value.push(element);
}

// async function searchProducts(searchQuery) {

//     searchResponse.value = await searchStore.searchProducts(searchQuery);

// }

function showSearch(event) {
    let title = 'Поиск продуктов', searchLabel = 'Введите название продукта или диеты', searchedResource = 'products'
    emit('showSearch', title, searchLabel, searchedResource)
}

</script>

<template>
    <div class="card ps-2 pe-2 pt-2 daily-view-container">
        <div class="card mb-1 daily-form-container">
            <div class="card-header">
                <div class="hstack gap-1 justify-content-between">
                    <h6 class="mb-1">Добавление дневного рациона</h6>
                    <small>help</small>
                </div>
            </div>
            <div class="card-body p-3 pt-2">
                <form action="" method="">

                    <div class="d-grid">
                        <button @click="showSearch" class="btn btn-primary" type="button">Добавить продукт \
                            диету</button>
                    </div>

                    <!-- <SearchInput @search-event="searchProducts" @select-search-result-event="selectSearchResult"
                        :search-result="searchResult" search-label="Поиск продукта\диеты"
                        :search-result-label="searchResultLabel" :time-delay-ms="productSearchTimerDelayMs" /> -->

                    <!-- list of added products -->
                    <ul class="list-group list-height-limit">
                        <li v-for="element in selectedProducts" :key="element.type + 'i' + element.id"
                            class="list-group-item">

                            <div class="hstack gap-1">
                                <div style="">
                                    <div :title="element.name" class="daily-ration-element-name">
                                        {{ element.name }}
                                    </div>
                                    <small>ккал</small>
                                </div>

                                <div class="input-group input-group-sm">


                                    <input type="text" class="form-control" aria-label="Text input with radio button"
                                        :value="element.count">
                                    <span class="input-group-text">гр.</span>
                                </div>

                                <a class=" btn btn-outline-warning btn-sm ">del</a>
                            </div>
                        </li>

                    </ul>

                    <div class="position-absolute bottom-0 start-0 end-0 w-100 mb-2 ps-3 pe-3">

                        <div class="d-flex mb-1 ps-2 pe-2 border rounded justify-content-between text-center">
                            <div>
                                <small>Калории</small>
                                <div>540 <small>ккал</small></div>
                            </div>
                            <div>
                                <small>Углеводы</small>
                                <div>34 <small>гр.</small></div>
                            </div>
                            <div>
                                <small>Белки</small>
                                <div>14 <small>гр.</small></div>
                            </div>
                            <div>
                                <small>Жиры</small>
                                <div>7 <small>гр.</small></div>
                            </div>
                        </div>
                        <div class="d-grid">
                            <button class="btn btn-primary" type="button">Сохранить рацион</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


        <div class="card mb-2 daily-ration-container">
            <div class="card-header">
                <h6>Дневной рацион</h6>
            </div>
            <div class="card-body p-1">
                <ul class="list-group list-group-flush ration-list-height-limit">

                    <li class="list-group-item">
                        <div class="d-flex justify-content-between">
                            <h5>Some Product name</h5>
                            <small>Some action</small>
                        </div>
                        <small>Some product value</small>
                    </li>


                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.list-height-limit {
    max-height: 20vh;
    height: 20vh;
    overflow-y: scroll;
    cursor: auto;
    scrollbar-width: thin;
}

.daily-view-container {
    max-height: 87vh;
    height: 87vh;
}

.daily-form-container,
.daily-ration-container {
    max-height: 49%;
    height: 49%;
}

.ration-list-height-limit {
    overflow-y: scroll;
    scrollbar-width: thin;
    max-height: 36vh;
}

.daily-ration-element-name {
    max-width: 20em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
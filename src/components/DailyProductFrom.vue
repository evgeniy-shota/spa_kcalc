<script setup>
import { ref, watch } from 'vue';
import SearchInput from './SearchInput.vue';

const addedProducts = ref()
const dailyRationSearchQuery = ref("");
const searchResult = ref([]);

let productSearchTimerDelayMs = 1500;

function selectSearchResult(type, id) {
    console.log("Selected result of product search - type: " + type + ", id: " + id);
}

function searchProducts(searchQuery) {
    if (dailyRationSearchQuery.value.length > 2) {
        console.log(dailyRationSearchQuery.value);
    }
    console.log('Search query for product: ' + searchQuery);
    searchResult.value = [
        {
            id: 1,
            type: 'product',
            name: 'Колбаска'
        },
        {
            id: 3,
            type: 'personal_product',
            name: 'Колбаска фкуфная'
        },
        {
            id: 1,
            type: 'diet',
            name: 'Безколбасная диета'
        },
        {
            id: 5,
            type: 'product',
            name: 'Сососисиски'
        }
    ];
}


// watch(dailyRationSearchQuery, () => {
//     if (productSearchTimerId != null) {
//         clearTimeout(productSearchTimerId);
//     }
//     productSearchTimerId = setTimeout(searchProducts, 2000);
// });


</script>

<template>
    <div class="card ps-2 pe-2 pt-2">
        <h6>Добавление дневного рациона</h6>
        <form action="" method="">

            <!-- search input -->
            <!-- <div class="input-group mb-2">
                <input type="text" v-model="dailyRationSearchQuery" class="form-control"
                    placeholder="Recipient's username" aria-label="Recipient's username"
                    aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
            </div> -->

            <SearchInput @search-event="searchProducts" @select-search-result-event="selectSearchResult"
                :search-result="searchResult" search-label="Поиск продукта\диеты" search-result-label="Результат поиска"
                :time-delay-ms="productSearchTimerDelayMs" />

            <!-- <div class="row">
                <div class="col">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input name="radiogr1" class="form-check-input mt-0" type="radio" value=""
                                aria-label="Radio button for following text input">
                        </div>
                        <input type="text" class="form-control" aria-label="Text input with radio button">
                        <span class="input-group-text">гр.</span>
                    </div>
                </div>

                <div class="col">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input name="radiogr1" class="form-check-input mt-0" type="radio" value=""
                                aria-label="Radio button for following text input">
                        </div>
                        <input type="text" class="form-control" aria-label="Text input with radio button">
                        <span class="input-group-text">шт.</span>
                    </div>
                </div>
            </div> -->

            <!-- list of added products -->
            <ul class="list-group list-height-limit">
                <li class="list-group-item">
                    <div class="hstack gap-5">
                        <div class="">Продукт</div>

                        <div class="input-group">
                            <div class="input-group-text">
                                <input type="radio" name="product-qantity-type" class="btn-check"
                                    id="radio-product-weight" autocomplete="off" checked>
                                <label class="btn" for="radio-product-weight">гр.</label>

                                <input type="radio" name="product-qantity-type" class="btn-check"
                                    id="radio-product-count" autocomplete="off">
                                <label class="btn" for="radio-product-count">шт.</label>
                            </div>
                            <input type="text" class="form-control" aria-label="Text input with radio button">
                            <!-- <span class="input-group-text">гр.</span> -->
                        </div>

                        <a class=" btn btn-outline-warning btn-sm ms-auto">del</a>
                    </div>
                </li>

                <!-- <li class="list-group-item">
                    <div class="hstack gap-5">
                        <div class="">Продукт 1</div>
                        <a class=" btn btn-outline-warning btn-sm ms-auto">del</a>
                    </div>
                </li> -->
            </ul>

            <table class="table table-sm">
                <thead>
                    <th>Наименование</th>
                    <th>Значение</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Кальций</td>
                        <td>1 гр</td>
                    </tr>
                    <tr>
                        <td>Магний</td>
                        <td>3 гр</td>
                    </tr>
                </tbody>
            </table>

            <div class="d-grid gap-2 mb-2">
                <button class="btn btn-primary" type="button">Добавить</button>
            </div>
        </form>
    </div>
</template>

<style>
.list-height-limit {
    max-height: 35vh;
    overflow-y: scroll;
    cursor: auto;
}
</style>
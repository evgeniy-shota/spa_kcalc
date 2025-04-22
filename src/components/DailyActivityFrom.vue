<script setup>
import { ref } from 'vue';
import SearchInput from './SearchInput.vue';

const searchResult = ref([

]);

let activitySearchTimerDelayMs = 1500;

function search(searchQuery) {
    console.log('Search activities: ' + searchQuery);
    searchResult.value = [
        {
            id: 1,
            type: 'activity',
            name: 'Бег'
        },
        {
            id: 2,
            type: 'activity',
            name: 'Ходьба'
        },
        {
            id: 3,
            type: 'activity',
            name: 'Плаванье'
        },
        {
            id: 4,
            type: 'activity',
            name: 'Отжимания'
        }
    ];
}

function selectSearchResult(type, id) {
    console.log('Selected Activity search result - type: ' + type + ', id: ' + id);
}

</script>

<template>
    <div id="dailyActivityContainer" class="card border-light ps-2 pe-2 pt-2" style="height: 100%;">
        <h6>Дневная активность</h6>
        <form action="" method="">

            <SearchInput @search-event="search" @select-search-result-event="selectSearchResult"
                :search-result="searchResult" search-label="Поиск активности"
                :time-delay-ms='activitySearchTimerDelayMs' />

            <!-- <div class="input-group mb-2">
                <input type="text" class="form-control" placeholder="Recipient's username"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
            </div> -->

            <!-- <div class="row">
                <div class="col">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input name="radiogr1" class="form-check-input mt-0" type="radio" value=""
                                aria-label="Radio button for following text input">
                        </div>
                        <input type="text" class="form-control" aria-label="Text input with radio button">
                        <span class="input-group-text">мин.</span>
                    </div>
                </div>

                <div class="col">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input name="radiogr1" class="form-check-input mt-0" type="radio" value=""
                                aria-label="Radio button for following text input">
                        </div>
                        <input type="text" class="form-control" aria-label="Text input with radio button">
                        <span class="input-group-text">раз</span>
                    </div>
                </div>
            </div> -->

            <ul class="list-group mb-2">
                <li class="list-group-item">
                    <div class="hstack gap-5">
                        <div class="">Активность</div>

                        <div class="input-group">
                            <div class="input-group-text">
                                <input type="radio" name="product-qantity-type" class="btn-check"
                                    id="radio-product-weight" autocomplete="off" checked>
                                <label class="btn" for="radio-product-weight">мин.</label>

                                <input type="radio" name="product-qantity-type" class="btn-check"
                                    id="radio-product-count" autocomplete="off">
                                <label class="btn" for="radio-product-count">повторения</label>
                            </div>
                            <input type="text" class="form-control" aria-label="Text input with radio button">
                            <!-- <span class="input-group-text">гр.</span> -->
                        </div>

                        <a class=" btn btn-outline-warning btn-sm ms-auto">del</a>
                    </div>
                </li>
                <!-- <li class="list-group-item">
                    <div class="hstack gap-5">
                        <div class="">Активность 1</div>
                        <a class=" btn btn-outline-warning btn-sm ms-auto">del</a>
                    </div>
                </li> -->
            </ul>

            <!-- общее значение активностей -->
            <div class="mb-2">
                <span class="border rounded ps-2 pe-2 me-2">Primary</span>
                <span class="border rounded ps-2 pe-2 me-2">Primary</span>
                <span class="border rounded ps-2 pe-2 me-2">Primary</span>
            </div>

            <div class="d-grid gap-2 mb-2">
                <button class="btn btn-primary" type="button">Добавить</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">
.dailyActivityContainer {
    max-height: 100%;
    height: 100%;
}
</style>
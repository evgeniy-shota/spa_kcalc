<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import SearchInput from './SearchInput.vue';
import { useDailyRationsStore } from '@/stores/dailyRationsStore';
import IconCloseXlg from './icons/IconCloseXlg.vue';
// const selectedProducts = ref([]);
// const dailyRationSearchQuery = ref("");

const dailyRationStore = useDailyRationsStore();

onBeforeMount(() => {

    dailyRationStore.getDailyRation(1);
});

const emit = defineEmits({
    showSearch(searchTitle) {
        if (searchTitle?.length != 0) {
            return true;
        }
        return false;
    }
});

function showSearch(event) {
    let title = 'Поиск продуктов', searchLabel = 'Введите название продукта или диеты', searchedResource = 'products'
    emit('showSearch', title, searchLabel, searchedResource)
}

</script>

<template>
    <!-- ps-2 pe-2 pt-2  -->
    <div class="card daily-view-container">
        <div class="card-header">
            <div class="hstack gap-1 justify-content-between">
                <h6 class="mb-1">Дневной рацион</h6>
                <small>help</small>
            </div>
        </div>
        <!-- daily-form-container -->
        <div class="card-body p-2">

            <form action="" method="">
                <div class="d-grid mb-2">
                    <button @click="showSearch" class="btn btn-primary" type="button">Добавить продукт \
                        диету</button>
                </div>

                <!-- list of selected products -->
                <ul class="list-group list-height-limit">
                    <li v-for="element in dailyRationStore.selectedProducts" :key="element.type + 'i' + element.id"
                        class="list-group-item">

                        <div class="row">
                            <div class="col-11 px-1">
                                <div class="row">
                                    <div class="col mb-1">
                                        <div :title="element.name" class="daily-ration-element-name">
                                            {{ element.name }}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <input type="text" class="form-control"
                                                aria-label="Text input with radio button" :value="element.quantity">
                                            <span class="input-group-text">гр</span>
                                        </div>
                                    </div>

                                    <div class="col">
                                        <small>К: {{ element.kcalory }} ккал</small>
                                        <small>Б: {{ element.proteins }} гр.</small>
                                        <small>Ж: {{ element.fats }} гр.</small>
                                        <small>У: {{ element.carbohydrates }} гр.</small>
                                    </div>
                                </div>
                            </div>

                            <div class="col px-0 my-auto">
                                <!-- <button type="button" class="btn-close" aria-label="Close"></button> -->
                                <!-- <div class="d-flex align-item-center justify-content-center"> -->

                                <button type="button" class="btn btn-sm btn-light">
                                    <IconCloseXlg />
                                </button>
                                <!-- </div> -->
                            </div>
                        </div>

                    </li>
                </ul>

                <!-- list of products added to the ration  -->
                <ul class="list-group list-height-limit">
                    <li v-for="element in dailyRationStore.dailyRation" :key="element.type + 'i' + element.id"
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

                <!-- ration summary -->
                <div class="position-absolute bottom-0 start-0 end-0 w-100 mb-2 ps-2 pe-2">

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


        <!-- 
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
        </div> -->

    </div>
</template>

<style lang="scss">
.list-height-limit {
    max-height: 4i0vh;
    height: 40vh;
    overflow-y: scroll;
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
    max-width: 30em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
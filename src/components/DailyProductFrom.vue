<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import SearchInput from './SearchInput.vue';
import { useDailyRationsStore } from '@/stores/dailyRationsStore';
import ProductCardMin from './ProductCardMin.vue';
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

function delAddedProduct(index) {
    console.log('Delete product: ' + index);
    dailyRationStore.deleteSelectedProduct(index);
}

function delProductFromRation(index) {
    console.log('Delete from ration: ' + index);
    dailyRationStore.deleteProductFromRation(index);
}

async function saveCurrentRation() {
    console.log('Save ration');
    const respons = await dailyRationStore.saveRation();
    if (respons) {
        console.log('Ration saved');
    } else {
        console.log('Ration is not saved');
    }
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

                <div class="row mb-2">
                    <div class="col d-grid pe-1">
                        <button @click="showSearch" class="btn btn-outline-primary" type="button">Добавить
                            продукт</button>
                    </div>

                    <div class="col d-grid ps-1">
                        <button @click="saveCurrentRation" class="btn btn-outline-success" type="button">Сохранить
                            рацион</button>
                    </div>
                </div>

                <div class="border  rounded">
                    <div class="px-2 py-1">
                        Общая пищевая ценность рациона
                    </div>
                    <div class="d-flex ps-2 pe-2 border-top justify-content-around text-center">

                        <div>
                            <small>Калории</small>
                            <div>5540 <small>ккал</small></div>
                        </div>
                        <div class="vr"></div>
                        <div>
                            <small>Углеводы</small>
                            <div>134 <small>гр.</small></div>
                        </div>
                        <div class="vr"></div>
                        <div>
                            <small>Белки</small>
                            <div>84 <small>гр.</small></div>
                        </div>
                        <div class="vr"></div>
                        <div>
                            <small>Жиры</small>
                            <div>77 <small>гр.</small></div>
                        </div>
                    </div>
                </div>



                <div class="d-grid mb-2">
                </div>

                <div class="products-lists-container">
                    <!-- list of selected products -->
                    <ul class="list-group list-group-flush mb-1">
                        <li v-for="(element, el_index) in dailyRationStore.selectedProducts"
                            :key="element.type + 'i' + element.id" class="list-group-item ">

                            <ProductCardMin :product="element" :is-editable="true" :index="el_index"
                                @on-click-close-btn="delAddedProduct" />

                        </li>
                    </ul>

                    <div class="vstack products-lists-separator mb-1">
                        <small class="mx-auto px-2 border border-bottom-0 rounded-top border-info-subtle">Добавляемые
                            продукты</small>
                        <div class="horizontal-separator border-top border-info-subtle mb-2"></div>
                        <div class="horizontal-separator border-bottom border-success-subtle"></div>
                        <small class="mx-auto px-2 border border-top-0 rounded-bottom border-success-subtle">Продукты в
                            рационе</small>
                    </div>

                    <!-- list of products added to the ration  -->
                    <ul class="list-group list-group-flush">
                        <li v-for="(element, el_index) in dailyRationStore.dailyRationProducts"
                            :key="element.daily_ration_id + 'i' + element.id" class="list-group-item">

                            <ProductCardMin :product="element" :is-editable="true" :index="el_index"
                                @on-click-close-btn="delProductFromRation" />

                        </li>
                    </ul>
                </div>

                <!-- ration summary -->
                <div class="position-absolute bottom-0 start-0 end-0 w-100 mb-2 ps-2 pe-2">

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

.products-lists-container {
    height: 65vh;
    overflow-y: scroll;
    scrollbar-width: thin;

    .products-lists-separator {
        .horizontal-separator {
            width: 100%;
            height: 2px;
        }
    }
}
</style>
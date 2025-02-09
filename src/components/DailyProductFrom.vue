<script setup>
import { onBeforeMount } from 'vue';
// import SearchInput from './SearchInput.vue';
import { useDailyRationsStore } from '@/stores/dailyRationsStore';
import ProductCardMin from './ProductCardMin.vue';
// import IconPlusSquare from './icons/IconPlusSquare.vue';
import IconPlusLg from './icons/IconPlusLg.vue';
import IconCheckLg from './icons/IconCheckLg.vue';
import IconQuestionCircle from './icons/IconQuestionCircle.vue';
// const selectedProducts = ref([]);
// const dailyRationSearchQuery = ref("");

const dailyRationStore = useDailyRationsStore();
// const searchRueqest = ref('')

onBeforeMount(() => {
    dailyRationStore.getDailyRation();
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
    let title = 'Поиск продуктов',
        searchLabel = 'Введите название продукта или диеты',
        searchedResource = 'products'
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

function changeProductQuantity(index, quantity) {
    console.log('Change quantity id -' + index + ':' + quantity);
    dailyRationStore.changeSelectedProductQuantity(index, quantity)
}

function changeRationProductQuantity(index, quantity) {
    dailyRationStore.changeRationProductQuantity(index, quantity);
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
    <div class="card daily-view-container border border-light">
        <div class="card-header bg-light-subtle border-light-suntitle">
            <div class="hstack gap-1 justify-content-between">
                <!-- add descr -->
                <h6 class="mb-1">Дневной рацион: {{ dailyRationStore.dailyRation.date }} </h6>
                <small>
                    <IconQuestionCircle />
                </small>
            </div>
        </div>
        <!-- daily-form-container -->
        <div class="card-body p-2">

            <form action="" method="">

                <div class="row mb-2">
                    <div class="col d-grid pe-1">
                        <button @click="showSearch" class="btn btn-outline-primary" type="button">
                            <IconPlusLg />
                            Добавить продукт
                        </button>
                    </div>

                    <div class="col d-grid ps-1">
                        <button @click="saveCurrentRation" class="btn btn-outline-success" type="button">
                            <IconCheckLg />
                            Сохранить рацион
                        </button>
                    </div>
                </div>

                <div class="border rounded bg-light-subtle border-light-suntitle">
                    <div class="px-2 py-1 text-center">
                        Общая пищевая ценность рациона
                    </div>
                    <div class="d-flex ps-2 pe-2 border-top justify-content-around text-center">

                        <div>
                            <small>Калории</small>
                            <div>{{ dailyRationStore.dailyRationEnergyValue.kcalory }} <small>ккал</small></div>
                            <div v-show="dailyRationStore.selectedProducts.length > 0">+ {{
                                dailyRationStore.selectedProductsValue.kcalory }} <small>ккал</small></div>
                        </div>
                        <div class="vr"></div>
                        <div>
                            <small>Углеводы</small>
                            <div>{{ dailyRationStore.dailyRationEnergyValue.carbohydrates }} <small>гр.</small></div>
                            <div v-show="dailyRationStore.selectedProducts.length > 0">+ {{
                                dailyRationStore.selectedProductsValue.carbohydrates }} <small>гр.</small></div>

                        </div>
                        <div class="vr"></div>
                        <div>
                            <small>Белки</small>
                            <div>{{ dailyRationStore.dailyRationEnergyValue.proteins }} <small>гр.</small></div>
                            <div v-show="dailyRationStore.selectedProducts.length > 0">+ {{
                                dailyRationStore.selectedProductsValue.proteins }} <small>гр.</small></div>

                        </div>
                        <div class="vr"></div>
                        <div>
                            <small>Жиры</small>
                            <div>{{ dailyRationStore.dailyRationEnergyValue.fats }} <small>гр.</small></div>
                            <div v-show="dailyRationStore.selectedProducts.length > 0">+ {{
                                dailyRationStore.selectedProductsValue.fats }} <small>гр.</small></div>

                        </div>
                    </div>
                </div>



                <div class="d-grid mb-2">
                </div>

                <div class="products-lists-container">
                    <!-- list of selected products -->
                    <ul class="list-group list-group-flush mb-1">
                        <li v-for="(element, el_index) in dailyRationStore.selectedProducts"
                            :key="element.type + 'i' + element.id"
                            class="list-group-item bg-light-subtle border-light-subtle mb-1">

                            <!-- добавить индикацию измененных элементов -->

                            <ProductCardMin :product="element" :is-editable="true" :index="el_index"
                                @on-click-close-btn="delAddedProduct" @on-cange-quantity="changeProductQuantity"
                                @on-input-quantity="changeProductQuantity" />

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
                            :key="element.daily_ration_id + 'i' + element.id"
                            class="list-group-item bg-light-subtle border-light-subtle mb-1">

                            <ProductCardMin :product="element" :is-editable="true" :index="el_index"
                                @on-click-close-btn="delProductFromRation"
                                @on-input-quantity="changeRationProductQuantity" />

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
    max-height: 40vh;
    height: 35vh;
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
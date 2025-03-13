<script setup>
import { computed, nextTick, onBeforeMount, onMounted, ref, useTemplateRef, watch } from 'vue';
import { getDate, getTime, formatTime, formatTimeStrToObj } from '@/resource/js/dateTime';
// import SearchInput from './SearchInput.vue';
import { useDailyRationsStore } from '@/stores/dailyRationsStore';
import ProductCardMin from './ProductCardMin.vue';
import VueDatePickerExtended from './VueDatePickerExtended.vue';
import Preloader from './Preloader.vue';
// import IconPlusSquare from './icons/IconPlusSquare.vue';
import IconPlusLg from './icons/IconPlusLg.vue';
import IconCheckLg from './icons/IconCheckLg.vue';
import IconQuestionCircle from './icons/IconQuestionCircle.vue';
import IconLockFill from './icons/IconLockFill.vue';
import IconUnlockFill from './icons/IconUnlockFill.vue';
// const selectedProducts = ref([]);
// const dailyRationSearchQuery = ref("");

const dailyRationStore = useDailyRationsStore();
const currentDate = ref(new Date())
const dailyRationEditable = ref(true)
const dailyRationChanged = ref(false)
const dailyRationDate = ref(currentDate.value)
const timerId = ref(null)
const timeOutMs = 350
const dailyRationDataLoading = ref(false)

const btnDailyRationBlocked = useTemplateRef('btnDailyRationBlocked')
const btnDailyRationSave = useTemplateRef('btnDailyRationSave')
// const searchRueqest = ref('')

onMounted(() => {
    getDailyRation(getDate(dailyRationDate.value).ymd);
});

const emit = defineEmits({
    showSearch(searchTitle) {
        if (searchTitle?.length != 0) {
            return true;
        }
        return false;
    }
});

watch(dailyRationDate, () => {

    dailyRationEditable.value = (currentDate.value.getTime() == dailyRationDate.value.getTime())
    dailyRationDataLoading.value = true
    dailyRationStore.dailyRationProducts.length = 0

    if (timerId.value) {
        clearTimeout(timerId.value);
        timerId.value = null
    }

    timerId.value = setTimeout(() => {
        getDailyRation(getDate(dailyRationDate.value).ymd);
        dailyRationDataLoading.value = false
    }, timeOutMs);

    // getDailyRation(getDate(dailyDationDate.value).ymd);
});



function dailyRationIsEdited() {
    return dailyRationStore.selectedProducts.length > 0 || dailyRationChanged.value ? true : false
}

function notificationToSaveDailyRation() {
    // console.log(templateRef.value)
    // btnDailyRationSave.value.classList.add('active')
    let interval = setInterval(() => btnDailyRationSave.value.classList.toggle('active'), 150)

    setTimeout(() => {
        btnDailyRationSave.value.classList.remove('active')
        clearInterval(interval)
    }, 750)
}

function notificationToUnlockDailyRation() {
    console.log(btnDailyRationBlocked.value)
    let origText = btnDailyRationBlocked.value.innerHTML;
    btnDailyRationBlocked.value.innerHTML = 'Заблокирован';
    // console.log(templateRef.value)
    // btnDailyRationSave.value.classList.add('active')
    let interval = setInterval(() => btnDailyRationBlocked.value.classList.toggle('active'), 150)

    setTimeout(() => {
        btnDailyRationBlocked.value.classList.remove('active')
        clearInterval(interval)
        btnDailyRationBlocked.value.innerHTML = origText
    }, 750)
}

function getDailyRation(date) {
    dailyRationStore.getDailyRation(date)
}

function showSearch(event) {
    if (!dailyRationEditable.value) {
        notificationToUnlockDailyRation()
        return
    }

    let title = 'Поиск продуктов',
        searchLabel = 'Введите название продукта или диеты',
        searchedResource = 'products'
    emit('showSearch', title, searchLabel, searchedResource)
}

function delAddedProduct(index) {
    console.log('Delete product: ' + index);
    dailyRationChanged.value = true
    dailyRationStore.deleteSelectedProduct(index);
}

function delProductFromRation(index) {
    console.log('Delete from ration: ' + index);
    dailyRationChanged.value = true
    dailyRationStore.deleteProductFromRation(index);
}

function changeProductQuantity(index, quantity) {
    console.log('Change quantity id -' + index + ':' + quantity);
    dailyRationChanged.value = true
    dailyRationStore.changeSelectedProductQuantity(index, quantity)
}

function changeProductTime(index, time) {
    dailyRationChanged.value = true
    dailyRationStore.changeSelectedProductTime(index, formatTime(time));
}

function changeRationProductQuantity(index, quantity) {
    dailyRationChanged.value = true
    dailyRationStore.changeRationProductQuantity(index, quantity);
}

function changeRationProductTime(index, time) {
    dailyRationChanged.value = true
    let strTime = formatTime(time)
    dailyRationStore.changeRationProductTime(index, strTime);
}

async function saveCurrentRation() {
    console.log('Save ration');
    const respons = await dailyRationStore.saveRation();
    if (respons) {
        dailyRationChanged.value = false;
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
                <h6 class="mb-1">Дневной рацион: </h6>

                <VueDatePickerExtended v-model="dailyRationDate" :max-date="new Date()"
                    :readonly="dailyRationIsEdited()"
                    @readonly-trigger="notificationToSaveDailyRation(btnDailyRationSave)">
                </VueDatePickerExtended>

                <!-- <small>
                    <IconQuestionCircle />
                </small> -->
            </div>
        </div>
        <!-- daily-form-container -->
        <div class="card-body p-2">

            <form action="" method="">

                <div class="row mb-2">
                    <div class="col d-grid pe-1">
                        <button @click="showSearch" :class="{ 'btn-outline-secondary': !dailyRationEditable }"
                            class="btn btn-outline-primary" type="button">
                            <IconPlusLg />
                            Добавить продукт
                        </button>
                    </div>

                    <div class="col d-grid ps-1">

                        <button ref="btnDailyRationBlocked" v-show="!dailyRationEditable"
                            @click="dailyRationEditable = true" class="btn btn-outline-warning text-dark" type="button">
                            <IconUnlockFill />
                            Разблокировать
                        </button>

                        <button ref="btnDailyRationSave" v-show="dailyRationEditable" @click="saveCurrentRation"
                            :class="{ 'btn-outline-success': dailyRationIsEdited() }" class="btn" type="button">
                            <IconCheckLg />
                            {{ dailyRationIsEdited() ? 'Сохранить рацион' : 'Рацион сохранён' }}

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

                            <ProductCardMin :product="element" :isReadonly="!dailyRationEditable" :index="el_index"
                                @on-click-close-btn="delAddedProduct" @on-cange-quantity="changeProductQuantity"
                                @on-input-quantity="changeProductQuantity" :time="getTime(false)"
                                @change-time="changeProductTime" @readonly-trigger="notificationToUnlockDailyRation" />

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

                    <div v-show="dailyRationStore.dailyRationProducts.length == 0 && !dailyRationDataLoading"
                        class="text-secondary mb-1 p-1">
                        Нет продуктов...
                    </div>

                    <div v-show="dailyRationDataLoading" class=" mb-1">
                        <Preloader text="Загрузка..." />
                    </div>
                    <!-- list of products added to the ration  -->
                    <ul class="list-group list-group-flush">
                        <li v-show="!dailyRationDataLoading"
                            v-for="(element, el_index) in dailyRationStore.dailyRationProducts"
                            :key="element.daily_ration_id + 'i' + element.id"
                            class="list-group-item bg-light-subtle border-light-subtle mb-1">

                            <ProductCardMin :product="element" :isReadonly="!dailyRationEditable" :index="el_index"
                                @on-click-close-btn="delProductFromRation"
                                @on-input-quantity="changeRationProductQuantity"
                                @change-time="changeRationProductTime" />

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
    max-height: 86vh;
    height: 86vh;
    // max-height: 100%;
    // height: 100%;
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
    max-height: 62vh;
    // max-height: 100%;

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
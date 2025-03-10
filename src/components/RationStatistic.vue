<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';
import IconArrowRightShort from './icons/IconArrowRightShort.vue';
import IconCloseX from './icons/IconCloseX.vue';
import DatePicker from './DatePicker.vue';
import LineChart from './LineChart.vue';
import { useStatisticStore } from '@/stores/statisticStore';
import { getDate, getDateWithOffset } from '@/resource/js/dateTime';
import { offset } from '@popperjs/core';

const statisticStore = useStatisticStore();

const defaultOffsetFromDay = -6;

let timerId = null;
const defaultDelayMs = 450;
// const chartData = ref({});
const currentDate = ref({});
const fromDayOffset = ref(-6)
const toDayOffset = ref(1)
const minDate = ref()
const maxDate = ref()
const fromDay = ref({});
const toDay = ref({});


onBeforeMount(() => {
    setDefaultDateSettings();
    getStatistic();
});

watch([fromDay, toDay], () => {

    if (timerId != null) {
        clearTimeout(timerId);
        timerId = null
    }

    timerId = setTimeout(() => getStatistic(), defaultDelayMs)
});

function getStatistic() {
    statisticStore.getStatistic(fromDay.value.ymd, toDay.value.ymd);
}

// function changeFromDay(offset) {
//     fromDay.value = getDate(offset, fromDay.value);
// }

// function changeToDay(offset) {
//     toDay.value = getDate(offset, toDay.value);
// }

function setDefaultDateSettings() {
    console.log(getDate())
    currentDate.value = getDate();
    console.log(getDateWithOffset(currentDate.value.time, fromDayOffset))
    fromDay.value = getDateWithOffset(currentDate.value.time, fromDayOffset.value);
    toDay.value = getDateWithOffset(currentDate.value.time, toDayOffset.value);
}

</script>

<template>

    <div class="card border border-light ration-statistic-container">
        <div class="card-header">Статистика питания</div>
        <div class="card-body" style="height: 100%; max-height: 100%;">

            <!-- filters -->
            <div class="row">
                <div class="col">
                    <!-- date from  @change-date="changeFromDay"-->
                    <DatePicker v-model="fromDay" :default-date-offset-in-days="fromDayOffset"
                        :can-increase="fromDay.ymd < toDay.ymd" />
                </div>

                <div class="col">
                    <!-- date to  @change-date="changeToDay"-->
                    <DatePicker v-model="toDay" :default-date-offset-in-days="toDayOffset"
                        :can-reduced="fromDay.ymd < toDay.ymd" />
                </div>
            </div>

            <div class="row mb-2">
                <div class="col">

                    <!-- input-group-sm -->
                    <div class="input-group mb-2 ">
                        <span class="input-group-text border border-light-subtle">Группировка</span>

                        <input type="radio" class="btn-check" name="options-base" checked id="Days" autocomplete="off">
                        <label class="btn btn-outline-secondary border-light-subtle" for="Days">Дни</label>

                        <input type="radio" class="btn-check" name="options-base" id="Weeks" autocomplete="off">
                        <label class="btn btn-outline-secondary border-light-subtle" for="Weeks">Недели</label>

                        <input type="radio" class="btn-check" name="options-base" id="Months" autocomplete="off">
                        <label class="btn btn-outline-secondary border-light-subtle" for="Months">Месяцы</label>

                    </div>

                    <div class="btn btn-sm btn-outline-warning">Сброс</div>

                </div>
                <!-- preset filter -->
                <!-- <div class="col">
                    <div class="input-group mb-2">
                        <button class="btn btn-outline-secondary border-light-subtle" type="button"
                            id="button-addon1">Неделя</button>
                        <button class="btn btn-outline-secondary border-light-subtle" type="button"
                            id="button-addon1">Месяц</button>
                    </div>
                </div> -->
            </div>

            <!-- chart -->

            <div class="charts-container" style="height: 100%; overflow-y: scroll;">
                <div class="mb-1 border-bottom border-light">
                    Калории
                </div>
                <div class="chart-container mb-1">
                    <LineChart v-if="statisticStore.statistics.data.length > 0"
                        :dataset="statisticStore.statisticToChart.kcalory" />
                </div>
                <div class="mb-1 border-bottom border-light">
                    Углеводы, белки, жиры
                </div>
                <div class="chart-container mb-1">
                    <LineChart v-if="statisticStore.statistics.data.length > 0"
                        :dataset="statisticStore.statisticToChart.prot_carb_fats" />
                </div>
                <div class="mb-1 border-bottom border-light">
                    Употребление по времени
                </div>
                <div class="chart-container mb-1">
                    <LineChart v-if="statisticStore.statistics.data.length > 0"
                        :dataset="statisticStore.statisticToChart.prot_carb_fats" />
                </div>
                <div class="mb-1 border-bottom border-light">
                    Основные источники элементов
                </div>
                <div class="chart-container mb-1">
                    <LineChart v-if="statisticStore.statistics.data.length > 0"
                        :dataset="statisticStore.statisticToChart.prot_carb_fats" />
                </div>

            </div>

        </div>
    </div>

</template>

<style lang="scss">
.ration-statistic-container {
    height: 100%;
    max-height: 100%;
    overflow-y: hidden;
    // max-height: 87vh;
}

.charts-container {
    height: 100%;
}

.chart-container {
    min-height: 25vh;
    max-height: 30vh;
}
</style>
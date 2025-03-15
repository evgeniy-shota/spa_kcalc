<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue';
// import TimePicker from './TimePicker.vue';
import IconPlusLg from './icons/IconPlusLg.vue';
import IconDashLg from './icons/IconDashLg.vue';
import IconCheckLg from './icons/IconCheckLg.vue';
import IconCloseX from './icons/IconCloseX.vue';

// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePickerExtended from './VueDatePickerExtended.vue';
import VueTimePickerExtended from './VueTimePickerExtended.vue';

// import DatePicker from './DatePicker.vue';
import LineChart from './LineChart.vue';
import BarChart from './BarChart.vue';
import { useStatisticStore } from '@/stores/statisticStore';
import { getDate, getDateWithOffset, getTimeWithOffset, getMonthName, formatDate, getTime } from '@/resource/js/dateTime';
import { offset } from '@popperjs/core';

const statisticStore = useStatisticStore();

const defaultOffsetFromDay = -6;

let timerId = null;
const defaultDelayMs = 450;
// const chartData = ref({});
const currentDate = ref(Date.now());
const fromDayOffset = ref(-6)
const toDayOffset = ref(1)
// const minDate = ref()
// const maxDate = ref()
const fromDay = ref(new Date(getTimeWithOffset(currentDate.value, fromDayOffset.value)));
// const fromDay = ref(getDate(fromDayTime.value))
const toDay = ref(new Date(getTimeWithOffset(currentDate.value, toDayOffset.value)));
// const toDay = ref(getDate(toDayTime.value))

// const timeRangeForStatisticSepByTime = ref([])

const datePickerFormat = (date) => {
    const day = date.getDate();
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();

    return `${day} ${month}. ${year}`
};

onMounted(() => {
    // setDefaultDateSettings();
    if (statisticStore.timeSplits.length == 0) {
        addTimeRange();
    }
    getStatistic();
});

onMounted(() => {
    console.log(formatDate(fromDay.value))
    console.log(toDay.value)
});

watch([fromDay, toDay], () => {

    // fromDay.value = getDate(fromDayTime.value)
    // toDay.value = getDate(toDayTime.value)

    if (timerId != null) {
        clearTimeout(timerId);
        timerId = null
    }

    timerId = setTimeout(() => getStatistic(), defaultDelayMs)
});

function addTimeRange() {
    // timeRangeForStatisticSepByTime.value.push(
    if (statisticStore.timeSplits.length >= 5) {
        return
    }

    statisticStore.timeSplits.push(
        {
            active: true,
            from: getTime(false, true),
            to: getTime(false, true)

        });
}

function removeTimeInterval(index) {
    console.log(index)
    console.log(statisticStore.timeSplits.splice(index, 1));
}

function toggleTimeInterval(index) {
    statisticStore.timeSplits[index].active = !statisticStore.timeSplits[index].active
}

function getStatistic() {
    statisticStore.getStatistic(formatDate(fromDay.value), formatDate(toDay.value));
}

async function getStatisticSplittedByTime() {
    let res = await statisticStore.getStatisticSplittedByTime(formatDate(fromDay.value), formatDate(toDay.value))
    if (res) {
        statisticStore.getSplitedByTimeDataToChart()
    }
}

// function changeFromDay(offset) {
//     fromDay.value = getDate(offset, fromDay.value);
// }

// function changeToDay(offset) {
//     toDay.value = getDate(offset, toDay.value);
// }

function setDefaultDateSettings() {
    // console.log(getDate())
    currentDate.value = getDate();
    // console.log(getDateWithOffset(currentDate.value.time, fromDayOffset))
    fromDay.value = ref(new Date(getTimeWithOffset(currentDate.value, fromDayOffset.value)));
    toDay.value = ref(new Date(getTimeWithOffset(currentDate.value, toDayOffset.value)));
}

</script>

<template>

    <div class="card border border-light ration-statistic-container" style="height: 100%;">
        <div class="card-header">Статистика питания</div>
        <div class="card-body" style="height: 100%;">

            <!-- filters -->
            <div class="row mb-1 controls">
                <div class="col-12 col-md-6 col-lg-6">
                    <!-- date from  @change-date="changeFromDay"-->
                    <!-- <DatePicker v-model="fromDay" :default-date-offset-in-days="fromDayOffset"
                        :can-increase="fromDay.ymd < toDay.ymd"
                        :min-date="getDateWithOffset(Date.now(), -5 + fromDayOffset)"
                        :max-date="getDateWithOffset(Date.now(), 5 + fromDayOffset)" /> -->
                    <!-- <div class="hstack"> -->
                    <VueDatePickerExtended v-model="fromDay" :max-date="toDay">
                    </VueDatePickerExtended>
                    <!-- </div> -->

                    <!-- <VueDatePicker :enable-time-picker="false" v-model="fromDayTime" :clearable="false"
                        :max-date="toDayTime" :format="datePickerFormat" locale="ru">

                    </VueDatePicker> -->

                </div>

                <div class="col-12 col-md-6 col-lg-6">
                    <!-- date to  @change-date="changeToDay"-->
                    <!-- <DatePicker v-model="toDay" :default-date-offset-in-days="toDayOffset"
                        :can-reduced="fromDay.ymd < toDay.ymd"
                        :min-date="getDateWithOffset(Date.now(), -5 + toDayOffset)"
                        :max-date="getDateWithOffset(Date.now(), 2 + toDayOffset)" /> -->

                    <VueDatePickerExtended v-model="toDay" :min-date="fromDay">
                    </VueDatePickerExtended>
                </div>
            </div>

            <!-- <div class="row mb-2"> -->
            <!-- <div class="col"> -->

            <!-- input-group-sm -->
            <!-- <div class="input-group mb-2 ">
                        <span class="input-group-text border border-light-subtle">Группировка</span>

                        <input type="radio" class="btn-check" name="options-base" checked id="Days" autocomplete="off">
                        <label class="btn btn-outline-secondary border-light-subtle" for="Days">Дни</label>

                        <input type="radio" class="btn-check" name="options-base" id="Weeks" autocomplete="off">
                        <label class="btn btn-outline-secondary border-light-subtle" for="Weeks">Недели</label>

                        <input type="radio" class="btn-check" name="options-base" id="Months" autocomplete="off">
                        <label class="btn btn-outline-secondary border-light-subtle" for="Months">Месяцы</label>

                    </div>

                    <div class="btn btn-sm btn-outline-warning">Сброс</div> -->

            <!-- </div> -->
            <!-- preset filter -->
            <!-- <div class="col">
                    <div class="input-group mb-2">
                        <button class="btn btn-outline-secondary border-light-subtle" type="button"
                            id="button-addon1">Неделя</button>
                        <button class="btn btn-outline-secondary border-light-subtle" type="button"
                            id="button-addon1">Месяц</button>
                    </div>
                </div> -->
            <!-- </div> -->

            <!-- chart -->
            <div class="py-1 mb-1" style="max-height: 90%; overflow-y: scroll;">
                <div class="charts-container">
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
                    <div class="time-range-container">

                        <div v-for="(item, index) in statisticStore.timeSplits" :key="index"
                            class="time-range d-flex justify-content-around align-items-center mb-1">
                            <div class="time-range-control">
                                <button @click="toggleTimeInterval(index)"
                                    :disabled="statisticStore.timeSplits.length == 1"
                                    class="btn btn-sm btn-light border-info-subtle me-1"
                                    :class="{ 'bg-primary-subtle': item.active }">
                                    <IconCheckLg />
                                </button>
                            </div>

                            <div class="time-from me-1">
                                <!-- <TimePicker v-model="item.from" label="от" :is-readonly="!item.active" /> -->
                                <VueTimePickerExtended v-model="item.from" label="от" :max-time="item.to"
                                    :readonly="!item.active">
                                </VueTimePickerExtended>
                            </div>
                            <div class="time-to me-1">
                                <!-- <TimePicker v-model="item.to" label="до" :is-readonly="!item.active" /> -->
                                <VueTimePickerExtended v-model="item.to" label="до" :min-time="item.from"
                                    :readonly="!item.active">
                                </VueTimePickerExtended>
                            </div>

                            <div class="time-range-control">
                                <button :disabled="statisticStore.timeSplits.length == 1"
                                    @click="removeTimeInterval(index)"
                                    class="btn btn-sm btn-light border-info-subtle me-1">
                                    <IconDashLg />
                                </button>
                            </div>

                        </div>

                        <div class="time-range-control d-flex gap-1 justify-content-center">
                            <button :class="{ 'disabled': statisticStore.timeSplits.length >= 5 }" @click="addTimeRange"
                                class="btn btn-sm btn-outline-primary ">
                                <IconPlusLg /> Добавить интервал
                            </button>
                            <button @click="getStatisticSplittedByTime"
                                class="btn btn-sm btn-outline-success">Применить</button>
                        </div>
                    </div>
                    <div class="chart-container mb-1">
                        <!-- date format for chart label -->
                        <BarChart v-if="statisticStore.statisticSplitedByTime.length != 0"
                            :dataset="statisticStore.statisticToChart.split_by_time" />
                        <!-- <LineChart v-if="statisticStore.statistics.data.length > 0"
                            :dataset="statisticStore.statisticToChart.prot_carb_fats" /> -->
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
    </div>

</template>

<style lang="scss">
.ration-statistic-container {
    height: 100%;
    max-height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    // max-height: 87vh;
}

.charts-container {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
}

.chart-container {
    box-sizing: border-box;
    min-height: 30vh;
    max-height: 35vh;
}
</style>
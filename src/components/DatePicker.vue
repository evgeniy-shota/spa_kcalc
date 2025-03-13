<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { getDate, getDateYMD, getYear, getMonthName, getDateWithOffset, getDayOfWeek, dayOfWeekShortRu } from '@/resource/js/dateTime';
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';
import IconArrowRightShort from './icons/IconArrowRightShort.vue';
import IconCaretRightFill from './icons/IconCaretRightFill.vue';
import IconCaretLeftFill from './icons/IconCaretLeftFill.vue';
import IconCheckLg from './icons/IconCheckLg.vue';
import IconCloseXlg from './icons/IconCloseXlg.vue';

const props = defineProps(
    {
        date: {
            type: String
        },
        defaultDateOffsetInDays: {
            type: Number,
            default: 0,
        },
        maxDate: {
            type: Object,
            default: null,
        },
        minDate: {
            type: Object,
            default: null,
        },
        canReduced: {
            type: Boolean,
            default: true,
        },
        canIncrease: {
            type: Boolean,
            default: true,
        }
    }
);

const emit = defineEmits(
    {
        changeDate: (offset) => {
            if (offset) {
                return true;
            }
            return false;
        },
    }
);

const defineDate = defineModel();
const fullDate = ref(defineDate.value ? defineDate.value : getDate())
const selectedDate = ref(fullDate.value)
// const date = ref(fullDate.value.date);
// const dayOfWeek = ref(fullDate.value.dayOfWeekRu)
// const month = ref(fullDate.value.month);
const year = ref(fullDate.value.year);
const firstDayOfWeekInMonth = ref(getDayOfWeek(fullDate.value.year, fullDate.value.month));
const dateOffsetInDays = ref(props.defaultDateOffsetInDays);
const showControls = ref(false)

const datePikerControls = useTemplateRef('datePikerControls')
const datePikerControlsTop = ref(0)
const datePikerControlsleft = ref(0)

onMounted(() => {

});

watch(defineDate, () => {
    if (defineDate.value) {
        fullDate.value = defineDate.value
    }
});

watch(fullDate, () => {
    firstDayOfWeekInMonth.value = getDayOfWeek(fullDate.value.year, fullDate.value.month);
});

watch(showControls, () => {
    if (showControls.value == true) {
        console.log(datePikerControls.value.parentElement);
        let parentSize = getParentSize(datePikerControls.value.parentElement)
        // console.log(datePikerControls.value)
        datePikerControlsleft.value = ((parentSize.offsetWidth) - 300) / 2;
        console.log(datePikerControlsleft.value)
    }
});

function getParentSize(parent) {
    return {
        offsetTop: parent.offsetTop,
        offsetLeft: parent.offsetLeft,
        offsetWidth: parent.offsetWidth,
    }
}

function addDate() {
    defineDate.value = getDateWithOffset(defineDate.value.time, 1);
}

function desDate() {
    defineDate.value = getDateWithOffset(defineDate.value.time, -1);
}

function addMonth() {
    if (fullDate.value.month == 11) {
        fullDate.value = getDateYMD(fullDate.value.year, 0, fullDate.value.date);
        return
    }
    fullDate.value = getDateYMD(fullDate.value.year, fullDate.value.month + 1, fullDate.value.date);
}

function desMonth() {
    if (fullDate.value.month == 0) {
        fullDate.value = getDateYMD(fullDate.value.year, 11, fullDate.value.date);
        return
    }
    fullDate.value = getDateYMD(fullDate.value.year, fullDate.value.month - 1, fullDate.value.date);
}

function addYear() {
    yearOffset.value += 1;
    year.value = getYear(yearOffset.value, year.value);

}

function desYear() {
    yearOffset.value -= 1;
    year.value = getYear(yearOffset.value, year.value);
}

function selectDate(dateYMDData) {
    selectedDate.value = getDateYMD(dateYMDData.year, dateYMDData.month, dateYMDData.date)
}

function applyDate() {
    // defineDate.value = date.value
    showControls.value = false
    fullDate.value = selectedDate.value
    defineDate.value = fullDate.value
}

function clearDate() {
    fullDate.value = defineDate.value ? defineDate.value : getDate()
    selectedDate.value = fullDate.value
}

function hideControls() {
    clearDate()
    showControls.value = false
}

function changeDate(offset) {
    emit('changeDate', props.defaultDateOffsetInDays + offset);
}

const currentDate = computed(() => {
    return fullDate.value.date + ' ' + getMonthName(fullDate.value.month, 'ru', true) + ' ' + fullDate.value.year
})

function dateInLimit(date, minLimit = null, maxLimit = null) {
    if (minLimit && date.time < minLimit.time) {
        return false
    }

    if (maxLimit && date.time > maxLimit.time) {
        return false
    }

    // if (minLimit && (date.date < minLimit.date || date.month < minLimit.month || date.year < minLimit.year)) {
    //     return false
    // }

    // if (maxLimit && (date.date > maxLimit.date || date.month > maxLimit.month || date.year > maxLimit.year)) {
    //     return false
    // }

    return true
}

function dayControlAttribute(dayData, currentDateData) {
    let attributes = {}

    if (!dateInLimit(dayData, props.minDate, props.maxDate)) {
        attributes.disabled = ''
    }

    return attributes
}

function dayControlClass(dayData, currentDateData, selectedDateData) {
    let styleClasses = 'btn'

    if (!dateInLimit(dayData, props.minDate, props.maxDate)) {
        styleClasses += ' bg-secondary-subtle'
        styleClasses += ' border-light'
        return styleClasses
    }

    if (dayData.month == currentDateData.month) {
        styleClasses += ' btn-outline-dark'
        if (dayData.date === currentDateData.date) {
            styleClasses += ' active'
        }
    } else {
        styleClasses += ' btn-outline-secondary'
    }

    if (dayData.date == selectedDateData.date && dayData.month == selectedDateData.month) {
        styleClasses += ' text-warning'
    }

    return styleClasses
}

function getDateData(day) {
    let data = new Date(fullDate.value.year, fullDate.value.month, day)
    return { date: data.getDate(), month: data.getMonth(), year: data.getFullYear(), time: data.getTime() }
}

const datePickerControlsStyle = computed(() => {
    return {
        // top: datePikerControlsTop.value,
        // left: datePikerControlsleft.value,
        transform: 'translateX(' + datePikerControlsleft.value + 'px)',

    }
});

</script>

<template>
    <div class="input-group mb-2">
        <button @click="desDate()" :disabled="!props.canReduced" class="btn btn-outline-secondary border-light-subtle"
            type="button" id="button-addon1">
            <IconArrowLeftShort :size="24" />
        </button>

        <div @click="showControls = !showControls" class="form-control text-center">
            {{ currentDate }}
        </div>

        <!-- <span class="input-group-text" id="inputGroup-sizing-default">14.02 - 21.02</span> -->
        <button @click="addDate()" :disabled="!props.canIncrease" class="btn btn-outline-secondary  border-light-subtle"
            type="button" id="button-addon1">
            <IconArrowRightShort :size="24" />
        </button>
    </div>

    <div class="position-relative mb-1 w-100">
        <div ref="datePikerControls" v-show="showControls" :style="datePickerControlsStyle"
            class="card p-2 date-piker-controls">

            <div class="d-flex justify-content-around align-items-center">
                <div @click="applyDate" class="btn"
                    :class="{ 'btn-outline-success': fullDate.ymd != selectedDate.ymd }">
                    <IconCheckLg />
                </div>
                <div @click="hideControls" class="btn"
                    :class="{ 'btn-outline-danger': fullDate.ymd != selectedDate.ymd }">
                    <IconCloseXlg />
                </div>
            </div>

            <div class="d-flex justify-content-between align-items-center">
                <div class="mounth-container p-2">
                    <div class="input-group mb-1">
                        <button @click="desMonth" class="btn btn-outline-secondary border-light-subtle px-1">
                            <IconCaretLeftFill :size="16" />
                        </button>
                        <input type="text" :value="getMonthName(fullDate.month)" class="form-control text-center"
                            readonly>
                        <button @click="addMonth" class="btn btn-outline-secondary border-light-subtle px-1">
                            <IconCaretRightFill :size="16" />
                        </button>
                    </div>
                </div>

                <div class="years-container p-2">
                    <div class="input-group mb-1">
                        <button @click="desYear" class="btn btn-outline-secondary border-light-subtle px-1">
                            <IconCaretLeftFill :size="16" />
                        </button>
                        <input type="text" :value="year" class="form-control text-center" readonly>
                        <button @click="addYear" class="btn btn-outline-secondary border-light-subtle px-1">
                            <IconCaretRightFill :size="16" />
                        </button>
                    </div>
                </div>
            </div>


            <div class="days-container p-2">
                <div class="d-flex justify-content-between gap-2 mb-1">
                    <div class="day-container p-1"><small>{{ dayOfWeekShortRu[0] }}</small></div>
                    <div class="day-container p-1"><small>{{ dayOfWeekShortRu[1] }}</small></div>
                    <div class="day-container p-1"><small>{{ dayOfWeekShortRu[2] }}</small></div>
                    <div class="day-container p-1"><small>{{ dayOfWeekShortRu[3] }}</small></div>
                    <div class="day-container p-1"><small>{{ dayOfWeekShortRu[4] }}</small></div>
                    <div class="day-container p-1"><small>{{ dayOfWeekShortRu[5] }}</small></div>
                    <div class="day-container p-1"><small>{{ dayOfWeekShortRu[6] }}</small></div>

                </div>

                <div v-for="i in [0, 7, 14, 21, 28, 35]" class="d-flex justify-content-between gap-1 mb-1">

                    <!-- <div class="day-container p-1"><small>{{ dayOfWeekShortRu[0] }}</small></div> -->


                    <button @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 1))"
                        :class="dayControlClass(getDateData((i - firstDayOfWeekInMonth) + 1), fullDate, selectedDate)"
                        class="day-container p-1"
                        v-bind="dayControlAttribute(getDateData((i - firstDayOfWeekInMonth) + 1), fullDate)">
                        {{ getDateData((i - firstDayOfWeekInMonth) + 1).date }}
                    </button>

                    <!-- :disabled="dateInLimit(getDateData((i - firstDayOfWeekInMonth) + 1), props.minDate, props.maxDate)" -->

                    <button @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 2))"
                        :class="dayControlClass(getDateData((i - firstDayOfWeekInMonth) + 2), fullDate, selectedDate)"
                        class="day-container p-1"
                        v-bind="dayControlAttribute(getDateData((i - firstDayOfWeekInMonth) + 2), fullDate)">
                        {{ getDateData((i - firstDayOfWeekInMonth) + 2).date }}
                    </button>

                    <button @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 3))"
                        :class="dayControlClass(getDateData((i - firstDayOfWeekInMonth) + 3), fullDate, selectedDate)"
                        class="day-container p-1"
                        v-bind="dayControlAttribute(getDateData((i - firstDayOfWeekInMonth) + 3), fullDate)">
                        {{ getDateData((i - firstDayOfWeekInMonth) + 3).date }}
                    </button>

                    <button @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 4))"
                        :class="dayControlClass(getDateData((i - firstDayOfWeekInMonth) + 4), fullDate, selectedDate)"
                        class="day-container p-1"
                        v-bind="dayControlAttribute(getDateData((i - firstDayOfWeekInMonth) + 4), fullDate)">
                        {{ getDateData((i - firstDayOfWeekInMonth) + 4).date }}
                    </button>

                    <button @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 5))"
                        :class="dayControlClass(getDateData((i - firstDayOfWeekInMonth) + 5), fullDate, selectedDate)"
                        class="day-container p-1"
                        v-bind="dayControlAttribute(getDateData((i - firstDayOfWeekInMonth) + 5), fullDate)">
                        {{ getDateData((i - firstDayOfWeekInMonth) + 5).date }}
                    </button>

                    <button @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 6))"
                        :class="dayControlClass(getDateData((i - firstDayOfWeekInMonth) + 6), fullDate, selectedDate)"
                        class="day-container p-1"
                        v-bind="dayControlAttribute(getDateData((i - firstDayOfWeekInMonth) + 6), fullDate)">
                        {{ getDateData((i - firstDayOfWeekInMonth) + 6).date }}
                    </button>

                    <button @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 7))"
                        :class="dayControlClass(getDateData((i - firstDayOfWeekInMonth) + 7), fullDate, selectedDate)"
                        class="day-container p-1"
                        v-bind="dayControlAttribute(getDateData((i - firstDayOfWeekInMonth) + 7), fullDate)">
                        {{ getDateData((i - firstDayOfWeekInMonth) + 7).date }}
                    </button>

                    <!-- <div @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 7))"
                            :class="dayControlClass(getDateData((i - firstDayOfWeekInMonth) + 7), fullDate, selectedDate)"
                            class="day-container  p-1">
                            {{ getDateData((i - firstDayOfWeekInMonth) + 7).date }}
                        </div> -->

                </div>
            </div>
        </div>

    </div>


</template>

<style lang="scss">
// .showControls {
//     z-index: 3;
// }
.date-piker-controls {
    position: absolute;
    z-index: 9;
    // width: 24vw;
    width: 300px;
    top: 0;
    left: 0;

}

@media (max-width: 576px) {
    .date-piker-controls {
        width: 300px;
    }

    .day-container {
        width: 2em;
        height: 2em;
    }
}

.week-container {
    padding: 5px;
}

.day-container {
    box-sizing: border-box;
    width: 2em;
    height: 2em;
    text-align: center;
}
</style>
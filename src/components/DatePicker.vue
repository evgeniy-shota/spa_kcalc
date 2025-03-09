<script setup>
import { computed, ref } from 'vue';
import { getDate, getYear, monthShortNameRu, monthNameRu } from '@/resource/js/dateTime';
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';
import IconArrowRightShort from './icons/IconArrowRightShort.vue';
import IconCaretRightFill from './icons/IconCaretRightFill .vue';
import IconCaretLeftFill from './icons/IconCaretLeftFill .vue';
import IconCheckLg from './icons/IconCheckLg.vue';
import IconCloseXlg from './icons/IconCloseXlg.vue';
import { mount } from '@vue/test-utils';

const defineDate = defineModel();
const date = ref(defineDate.value ? defineDate.value : getDate(0, '', 'd', true))
const day = ref(date.value.day);
const month = ref(date.value.month);
const year = ref(date.value.year);
const yearOffset = ref(0);
const showControls = ref(false)

const props = defineProps(
    {
        defaultOffset: {
            type: Number,
            default: 0,
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

function getMonthName(monthNum, lang = 'ru', sort = true) {
    if (lang == 'ru') {
        if (sort) {
            return monthShortNameRu[monthNum]
        }
        return monthNameRu[monthNum]
    }
}

function addMonth() {
    if (month.value == 11) {
        month.value = 0
        return
    }
    month.value += 1;

}

function desMonth() {
    if (month.value == 0) {
        month.value = 11
        return
    }
    month.value -= 1;
}

function addYear() {
    yearOffset.value += 1;
    year.value = getYear(yearOffset.value, year.value);

}

function desYear() {
    yearOffset.value -= 1;
    year.value = getYear(yearOffset.value, year.value);
}

function applyDate() {
    // defineDate.value = date.value
    showControls.value = false
}

function clearDate() {

}

function hideControls() {
    showControls.value = false
}

function changeDate(offset) {
    emit('changeDate', props.defaultOffset + offset);
}

const currentDate = computed(() => {
    return date.value.day + ' ' + getMonthName(date.value.month) + ' ' + date.value.year
})

</script>

<template>

    <div class="input-group mb-2">
        <button @click="changeDate(-1)" :disabled="!props.canReduced"
            class="btn btn-outline-secondary border-light-subtle" type="button" id="button-addon1">
            <IconArrowLeftShort :size="24" />
        </button>
        <input @click="showControls = !showControls" type="text" readonly class="form-control text-center"
            :value="currentDate" placeholder="дата" aria-label="Username" aria-describedby="basic-addon1">

        <div v-show="showControls" class="position-absolute card p-2 date-piker-controls">

            <div class="d-flex justify-content-around align-items-center">
                <div @click="applyDate" class="btn">
                    <IconCheckLg />
                </div>
                <div @click="hideControls" class="btn">
                    <IconCloseXlg />
                </div>
            </div>

            <div class="d-flex justify-content-between align-items-center">
                <div class="mounth-container p-2">
                    <div class="input-group mb-1">
                        <button @click="desMonth" class="btn btn-outline-secondary border-light-subtle">
                            <IconCaretLeftFill :size="16" />
                        </button>
                        <input type="text" :value="getMonthName(month)" class="form-control text-center" readonly>
                        <button @click="addMonth" class="btn btn-outline-secondary border-light-subtle">
                            <IconCaretRightFill :size="16" />
                        </button>
                    </div>
                </div>
                <div class="years-container p-2">
                    <div class="input-group mb-1">
                        <button @click="desYear" class="btn btn-outline-secondary border-light-subtle">
                            <IconCaretLeftFill :size="16" />
                        </button>
                        <input type="text" :value="year" class="form-control text-center" readonly>
                        <button @click="addYear" class="btn btn-outline-secondary border-light-subtle">
                            <IconCaretRightFill :size="16" />
                        </button>
                    </div>
                </div>
            </div>


            <div class="days-container p-2">

                <!-- btn btn-sm btn-outline-secondary -->
                <div class="d-flex justify-content-between gap-2 mb-2">
                    <div class="week-number-container p-1">
                        <small>12</small>
                    </div>
                    <div class="day-container border rounded p-1">1</div>
                    <div class="day-container border rounded p-1">2</div>
                    <div class="day-container border rounded p-1">3</div>
                    <div class="day-container border rounded p-1">4</div>
                    <div class="day-container border rounded p-1">5</div>
                    <div class="day-container border rounded p-1">6</div>
                    <div class="day-container border rounded p-1">7</div>
                </div>

                <div class="d-flex justify-content-between gap-2">
                    <div class="week-number-container p-1">
                        <small>12</small>
                    </div>
                    <div class="day-container border rounded p-1">8</div>
                    <div class="day-container border rounded p-1">9</div>
                    <div class="day-container border rounded p-1">10</div>
                    <div class="day-container border rounded p-1">11</div>
                    <div class="day-container border rounded p-1">12</div>
                    <div class="day-container border rounded p-1">13</div>
                    <div class="day-container border rounded p-1">14</div>
                </div>
            </div>
        </div>
        <!-- <span class="input-group-text" id="inputGroup-sizing-default">14.02 - 21.02</span> -->
        <button @click="changeDate(1)" :disabled="!props.canIncrease"
            class="btn btn-outline-secondary  border-light-subtle" type="button" id="button-addon1">
            <IconArrowRightShort :size="24" />
        </button>
    </div>

</template>

<style lang="scss">
// .showControls {
//     z-index: 3;
// }

.date-piker-controls {
    z-index: 3;
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
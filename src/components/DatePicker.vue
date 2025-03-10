<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { getDate, getDateYMD, getYear, getMonthName, getDateWithOffset, getDayOfWeek, dayOfWeekShortRu } from '@/resource/js/dateTime';
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';
import IconArrowRightShort from './icons/IconArrowRightShort.vue';
import IconCaretRightFill from './icons/IconCaretRightFill .vue';
import IconCaretLeftFill from './icons/IconCaretLeftFill .vue';
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
            type: Number,
            default: null,
        },
        minDate: {
            type: Number,
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
const date = ref(fullDate.value.date);
const dayOfWeek = ref(fullDate.value.dayOfWeekRu)
const month = ref(fullDate.value.month);
const year = ref(fullDate.value.year);
const firstDayOfWeekInMonth = ref(getDayOfWeek(fullDate.value.year, fullDate.value.month));
const dateOffsetInDays = ref(props.defaultDateOffsetInDays);
const showControls = ref(false)

const daysGroup1 = useTemplateRef('daysGroup1')
const daysGroup2 = useTemplateRef('daysGroup2')
const daysGroup3 = useTemplateRef('daysGroup3')
const daysGroup4 = useTemplateRef('daysGroup4')
const daysGroup5 = useTemplateRef('daysGroup5')
const daysGroup6 = useTemplateRef('daysGroup6')

onMounted(() => {
    // setDaysControls([
    //     daysGroup1,
    //     daysGroup2,
    //     daysGroup3,
    //     daysGroup4,
    //     daysGroup5,
    //     daysGroup6,], fullDate.value)
});

watch(defineDate, () => {
    if (defineDate.value) {
        fullDate.value = defineDate.value
    }
});

watch(fullDate, () => {
    firstDayOfWeekInMonth.value = getDayOfWeek(fullDate.value.year, fullDate.value.month);
});

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

function selectDate(year, month, date) {
    console.log(`${year}:${month}:${date}`)
    fullDate.value = getDateYMD(year, month, date)
}

function applyDate() {
    // defineDate.value = date.value
    showControls.value = false
    defineDate.value = fullDate.value
}

function clearDate() {
    fullDate.value = defineDate.value ? defineDate.value : getDate()
}

function hideControls() {
    showControls.value = false
}

function changeDate(offset) {
    emit('changeDate', props.defaultDateOffsetInDays + offset);
}

const currentDate = computed(() => {
    return fullDate.value.date + ' ' + getMonthName(fullDate.value.month, 'ru', true) + ' ' + fullDate.value.year
})

function getDateData(day) {
    // let dayControl = `<div class="day-container border rounded p-1">${day}</div>`
    // let dayControl = document.createElement('div');
    let data = new Date(fullDate.value.year, fullDate.value.month, day)
    // getDateData.innerText = data
    // dayControl.innerText = getDateWithOffset(fullDate.value.time, day).date
    // dayControl.setAttribute(':class', "{'active':date.value==" + date + '}');
    // dayControl.classList.add('day-container', 'btn', 'btn-outline-dark', 'p-1', isActive ? 'active' : null)
    return { date: data.getDate(), month: data.getMonth(), year: data.getFullYear() }
}

// function setDaysControls(daysContainers, fullDate) {
//     let firstDayOfWeekInMonth = getDayOfWeek(fullDate.year, fullDate.month)
//     // let offset = getDate(0, currentDate, 'd', true);
//     for (let i = 1; i < 8; i++) {
//         // console.log(daysContainers[0].value);
//         daysContainers[0].value.appendChild(dayControl((i - firstDayOfWeekInMonth)));
//         daysContainers[1].value.appendChild(dayControl((i - firstDayOfWeekInMonth) + 7));
//         daysContainers[2].value.appendChild(dayControl((i - firstDayOfWeekInMonth) + 14));
//         daysContainers[3].value.appendChild(dayControl((i - firstDayOfWeekInMonth) + 21));
//         daysContainers[4].value.appendChild(dayControl((i - firstDayOfWeekInMonth) + 28));
//         daysContainers[5].value.appendChild(dayControl((i - firstDayOfWeekInMonth) + 35));
//     }
// }

</script>

<template>
    <div class="input-group mb-2">
        <button @click="desDate()" :disabled="!props.canReduced" class="btn btn-outline-secondary border-light-subtle"
            type="button" id="button-addon1">
            <IconArrowLeftShort :size="24" />
        </button>
        <div>

            <div @click="showControls = !showControls" class="form-control text-center">
                {{ currentDate }}
            </div>

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
                            <input type="text" :value="getMonthName(fullDate.month)" class="form-control text-center"
                                readonly>
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
                    <div class="d-flex justify-content-between gap-2 mb-1">
                        <div class="day-container p-1"><small>{{ dayOfWeekShortRu[0] }}</small></div>
                        <div class="day-container p-1"><small>{{ dayOfWeekShortRu[1] }}</small></div>
                        <div class="day-container p-1"><small>{{ dayOfWeekShortRu[2] }}</small></div>
                        <div class="day-container p-1"><small>{{ dayOfWeekShortRu[3] }}</small></div>
                        <div class="day-container p-1"><small>{{ dayOfWeekShortRu[4] }}</small></div>
                        <div class="day-container p-1"><small>{{ dayOfWeekShortRu[5] }}</small></div>
                        <div class="day-container p-1"><small>{{ dayOfWeekShortRu[6] }}</small></div>

                    </div>

                    <div v-for="i in [0, 7, 14, 21, 28, 35]" class="d-flex justify-content-between gap-2 mb-2">

                        <div @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 1))"
                            :class="{ 'active': fullDate.date == getDateData((i - firstDayOfWeekInMonth) + 1).date && fullDate.month == getDateData((i - firstDayOfWeekInMonth) + 1).month }"
                            class="day-container btn btn-outline-secondary p-1">
                            {{ getDateData((i - firstDayOfWeekInMonth) + 1).date }}
                        </div>

                        <div @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 2))"
                            :class="{ 'active': fullDate.date == getDateData((i - firstDayOfWeekInMonth) + 2).date && fullDate.month == getDateData((i - firstDayOfWeekInMonth) + 2).month }"
                            class="day-container btn btn-outline-secondary p-1">
                            {{ getDateData((i - firstDayOfWeekInMonth) + 2).date }}
                        </div>

                        <div @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 3))"
                            :class="{ 'active': fullDate.date == getDateData((i - firstDayOfWeekInMonth) + 3).date && fullDate.month == getDateData((i - firstDayOfWeekInMonth) + 3).month }"
                            class="day-container btn btn-outline-secondary p-1">
                            {{ getDateData((i - firstDayOfWeekInMonth) + 3).date }}
                        </div>

                        <div @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 4))"
                            :class="{ 'active': fullDate.date == getDateData((i - firstDayOfWeekInMonth) + 4).date && fullDate.month == getDateData((i - firstDayOfWeekInMonth) + 4).month }"
                            class="day-container btn btn-outline-secondary p-1">
                            {{ getDateData((i - firstDayOfWeekInMonth) + 4).date }}
                        </div>

                        <div @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 5))"
                            :class="{ 'active': fullDate.date == getDateData((i - firstDayOfWeekInMonth) + 5).date && fullDate.month == getDateData((i - firstDayOfWeekInMonth) + 5).month }"
                            class="day-container btn btn-outline-secondary p-1">
                            {{ getDateData((i - firstDayOfWeekInMonth) + 5).date }}
                        </div>

                        <div @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 6))"
                            :class="{ 'active': fullDate.date == getDateData((i - firstDayOfWeekInMonth) + 6).date && fullDate.month == getDateData((i - firstDayOfWeekInMonth) + 6).month }"
                            class="day-container btn btn-outline-secondary p-1">
                            {{ getDateData((i - firstDayOfWeekInMonth) + 6).date }}
                        </div>

                        <div @click="selectDate(getDateData((i - firstDayOfWeekInMonth) + 7))"
                            :class="{ 'active': fullDate.date == getDateData((i - firstDayOfWeekInMonth) + 7).date && fullDate.month == getDateData((i - firstDayOfWeekInMonth) + 7).month }"
                            class="day-container btn btn-outline-secondary p-1">
                            {{ getDateData((i - firstDayOfWeekInMonth) + 7).date }}
                        </div>

                    </div>


                    <!-- btn btn-sm btn-outline-secondary -->
                    <!-- <div ref="daysGroup1" class="d-flex justify-content-between gap-2 mb-2"> -->
                    <!-- <div class="day-container border rounded p-1">1</div>
                        <div class="day-container border rounded p-1">2</div>
                        <div class="day-container border rounded p-1">3</div>
                        <div class="day-container border rounded p-1">4</div>
                        <div class="day-container border rounded p-1">5</div>
                        <div class="day-container border rounded p-1">6</div>
                        <div class="day-container border rounded p-1">7</div> -->
                    <!-- </div> -->

                    <!-- 
                    <div ref="daysGroup2" class="d-flex justify-content-between gap-2"></div>
                    <div ref="daysGroup3" class="d-flex justify-content-between gap-2"></div>
                    <div ref="daysGroup4" class="d-flex justify-content-between gap-2"></div>
                    <div ref="daysGroup5" class="d-flex justify-content-between gap-2"></div>
                    <div ref="daysGroup6" class="d-flex justify-content-between gap-2"></div> -->


                </div>
            </div>

        </div>


        <!-- <span class="input-group-text" id="inputGroup-sizing-default">14.02 - 21.02</span> -->
        <button @click="addDate()" :disabled="!props.canIncrease" class="btn btn-outline-secondary  border-light-subtle"
            type="button" id="button-addon1">
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
<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getDate, getTimeWithOffset, getMonthName } from '@/resource/js/dateTime';
import IconCheckLg from './icons/IconCheckLg.vue';
import IconCaretLeftFill from './icons/IconCaretLeftFill.vue';
import IconCaretRightFill from './icons/IconCaretRightFill.vue';
import IconCalendar from './icons/IconCalendar.vue';

const defineDate = defineModel();

const props = defineProps({
    maxDate: {
        type: [String, Date],
        default: null,
    },
    minDate: {
        type: [String, Date],
        default: null,
    },
    clearable: {
        type: Boolean,
        default: false
    },
    locale: {
        type: String,
        default: 'ru',
    },
    format: {
        type: Function,
        default: (date) => {
            const day = date.getDate();
            const month = getMonthName(date.getMonth());
            const year = date.getFullYear();

            return `${day} ${month}. ${year}`
        }
    },
    readonly: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits({
    readonlyTrigger: () => {
        return true
    }
});

function desDate(date) {
    console.log(date)
    if (props.readonly) {
        emit('readonlyTrigger');
        return
    }

    if (props.minDate) {
        if (date.getTime() > getTimeWithOffset(props.minDate.getTime(), 1)) {
            defineDate.value = new Date(getTimeWithOffset(date.getTime(), -1))
        }
        return
    }
    defineDate.value = new Date(getTimeWithOffset(date.getTime(), -1))
}

function addDate(date) {

    if (props.readonly) {
        emit('readonlyTrigger');
        return
    }

    if (props.maxDate) {
        if (date.getTime() < getTimeWithOffset(props.maxDate.getTime(), -1)) {
            defineDate.value = new Date(getTimeWithOffset(date.getTime(), 1))
        }
        return
    }
    defineDate.value = new Date(getTimeWithOffset(date.getTime(), 1))
}

function datePickerOutputClick() {
    if (props.readonly) {
        emit('readonlyTrigger');
        return
    }
}

</script>

<template>
    <div class="d-flex align-items-center">
        <button @click="desDate(defineDate)"
            class="btn btn-outline-dark border-end-0 rounded-end-0 border-secondary-subtle px-1">
            <IconCaretLeftFill :size="16" />
        </button>

        <VueDatePicker :enable-time-picker="false" v-model="defineDate" :clearable="props.clearable"
            :readonly="props.readonly" :max-date="props.maxDate" :min-date="props.minDate" :format="props.format"
            :locale="props.locale">
            <template #action-row="{ selectDate }">
                <div @click="selectDate" class="btn btn-sm btn-outline-primary mx-auto">
                    <IconCheckLg /> Подтвердить
                </div>
            </template>

            <template #dp-input="{ value, onInput, onEnter, onTab, onClear, onBlur, onKeypress, onPaste, isMenuOpen }">
                <div @click="datePickerOutputClick"
                    class="date-picker-output btn btn-outline-dark rounded-start-0 rounded-end-0 border-secondary-subtle d-flex justify-content-around align-items-center">
                    <IconCalendar />
                    <div>
                        {{ value }}
                    </div>
                </div>
            </template>

        </VueDatePicker>

        <button @click="addDate(defineDate)"
            class="btn btn-outline-dark border-start-0 rounded-start-0 border-secondary-subtle  px-1">
            <IconCaretRightFill :size="16" />
        </button>
    </div>

</template>

<style lang="scss">
.date-picker-output {
    width: 100%;
    min-width: 10rem;
}
</style>
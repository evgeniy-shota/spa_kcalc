<script setup>
import { computed, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import IconCheckLg from './icons/IconCheckLg.vue';
import IconCloseX from './icons/IconCloseX.vue';
import IconClock from './icons/IconClock.vue';

const props = defineProps({
    maxTime: {
        type: Object,
        default: null,
    },
    minTime: {
        type: Object,
        default: null,
    },
    startTime: {
        type: Object,
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
            const hours = date.getHours();
            const minutes = date.getMinutes();

            return `${hours} : ${minutes}`
        }
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: null,
    },
    smallSize: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits({
    readonlyTrigger: () => {
        return true
    }
});

const defineTime = defineModel();

const dpInputClasses = computed(() => {
    let classes = ''

    if (props.label.length > 0) {
        classes += 'rounded-start-0 '
    }

    if (props.smallSize) {
        classes += 'btn-sm '
    }

    return classes
});

</script>

<template>
    <div class="d-flex rounded justify-content-around align-items-center"
        :class="{ 'bg-secondary-subtle': props.readonly }">
        <span v-if="props.label" class="btn border rounded rounded-end-0 text-bg-light px-2"
            :class="{ 'btn-sm': props.smallSize == true }">{{ props.label }}</span>

        <VueDatePicker time-picker v-model="defineTime" :clearable="props.clearable" :readonly="props.readonly"
            :max-time="props.maxTime" :min-time="props.minTime" :format="props.format" :locale="props.locale">
            <template #action-row="{ selectDate, closePicker }">
                <div @click="selectDate" class="btn btn-sm btn-outline-primary mx-auto">
                    <IconCheckLg /> Подтвердить
                </div>
                <div @click="closePicker" class="btn btn-sm btn-outline-secondary mx-auto">
                    <IconCloseX />Закрыть
                </div>
            </template>

            <template #dp-input="{ value, onInput, onEnter, onTab, onClear, onBlur, onKeypress, onPaste, isMenuOpen }">
                <div @click="datePickerOutputClick"
                    class="btn border rounded d-flex gap-1 justify-content-around align-items-center p-1 px-2"
                    :class="[dpInputClasses, { 'border-primary-subtle': isMenuOpen }]">
                    <IconClock :class="{ 'text-info-emphasis': isMenuOpen }" />
                    <div>
                        {{ value }}
                    </div>
                </div>
            </template>


        </VueDatePicker>
    </div>
</template>

<style lang=" scss"></style>
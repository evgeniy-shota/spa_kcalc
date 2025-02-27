<script setup>
import { ref } from 'vue';
import IconCheckLg from './icons/IconCheckLg.vue';

const props = defineProps({
    label: {
        type: String,
        default: 'Календарь',
    },
    defaultDate: {
        type: Object,
        default: {}
    },
    minDate: {
        type: Object,
        default: {},
    },
    maxDate: {
        type: Object,
        default: {},
    }
});

const emit = defineEmits();

</script>

<template>
    <label for="calendar" class="form-label mb-1">{{ props.label }}</label>
    <div class="calendar">
        <div class="calendar-controls d-flex justify-content-around align-items-center gap-2">
            <div class="days-control">
                <div class="control-before">11</div>
                <div class="control">22</div>
                <div class="control-after">33</div>
            </div>
            <div class="mounth-control">
                <div class="control-before">01</div>
                <div class="control">02</div>
                <div class="control-after">03</div>
            </div>
            <div class="year-control">
                <div class="control-before">1111</div>
                <div class="control">2222</div>
                <div class="control-after">3333</div>
            </div>
            <div class="control">
                <div class="btn bnt-sm">
                    <IconCheckLg :size="20" />
                </div>
                <div class="btn btn-close"></div>
            </div>
        </div>
    </div>
    <input type="text" readonly name="calendar-input" id="calendarInput" class="form-control">
</template>

<style lang="scss">
// .calendar {}

.days-control>div,
.mounth-control>div,
.year-control>div {
    // background-color: red;
    border: 1px solid black;
    // padding: 2px;
    margin-bottom: 1vh;
}

.control-before,
.control-after {
    padding: 2px;
    text-align: center;
}

.control {
    padding: 4px;
    text-align: center;
}
</style>
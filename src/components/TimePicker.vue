<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { getTime, formatFullTime } from '@/resource/js/dateTime';
import IconCaretUpFill from './icons/IconCaretUpFill.vue';
import IconCaretDownFill from './icons/IconCaretDownFill.vue';
import IconCloseXlg from './icons/IconCloseXlg.vue';
import IconCheckLg from './icons/IconCheckLg.vue';
// import IconCalendar from './icons/IconCalendar.vue';
import IconClock from './icons/IconClock.vue';

const props = defineProps({
    time: {
        type: Object,
        default: getTime(false, true),
    },
    isReadonly: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: null,
    },
    smallSize: {
        type: Boolean,
        default: true
    },
});

const emit = defineEmits({
    applyTime: (time) => {
        if (time) {
            return true
        }
        return false
    },
    readonlyTrigger: () => {
        return true
    },
});

// onMounted(() => {
//     if(props)time.value = getTime(false, true);
//     defaultTime.value = time.value;
// });
onBeforeMount(() => {
    // Object.assign(time.value, defineTime.value)
    // time.value = defineTime.value ? defineTime.value : getTime()
})

const defineTime = defineModel()
// defineTime.value ? defineTime.value : 
const time = ref({});
// const defaultTime = ref({})
const isShowControls = ref(false)

function applyTime() {
    emit('applyTime', time.value)
    Object.assign(defineTime.value, time.value)
    // defineTime.value = time.value;
    isShowControls.value = false;
}

function hideControls(defaulTime = true) {
    if (defaulTime) {
        setTime(false);
    }
    isShowControls.value = false;
}

function setTime(currentTime = true) {
    if (currentTime) {
        time.value = getTime(false, true);
        defineTime.value = time.value;
        Object.assign(defineTime.value, time.value)
    } else {
        // time.value = defaultTime.value
        // defineTime.value = time.value
    }
}

function addHour() {
    if (time.value.hours >= 23) {
        time.value.hours = 0
        return
    }
    time.value.hours++;
}

function decHour() {
    if (time.value.hours <= 0) {
        time.value.hours = 23
        return
    }
    time.value.hours--;
}

function addMinutes() {
    if (time.value.minutes >= 59) {
        time.value.minutes = 0
        return
    }
    time.value.minutes++;
}

function decMinutes() {
    if (time.value.minutes <= 0) {
        time.value.minutes = 59
        return
    }
    time.value.minutes--;
}

function showControls() {
    if (props.isReadonly) {
        emit('readonlyTrigger');
        return
    }
    console.log('show time');
    Object.assign(time.value, defineTime.value)
    // time.value=defineTime.value
    isShowControls.value = !isShowControls.value
}

const currentTime = computed(() => {
    let hours = String(defineTime.value.hours);
    let minutes = String(defineTime.value.minutes);

    return `${hours.length == 1 ? '0' + hours : hours} : ${minutes.length == 1 ? '0' + minutes : minutes}`;
});

</script>

<template>
    <div class="input-group" :class="{ 'input-group-sm': props.smallSize }">
        <span v-if="props.label" class="input-group-text">{{ props.label }}</span>
        <div @click="showControls" style="cursor: pointer; max-width: rem;"
            class="form-control d-flex justify-content-around align-items-center px-1"
            :class="{ 'form-control-sm': props.smallSize }">
            <div class="ps-1">
                <IconClock :size="16" />
            </div>

            <div class="px-2">
                <!-- {{ String(time.hours).length == 1 ? '0' + time.hours : time.hours }} : {{
                    String(time.minutes).length == 1 ? '0' + time.minutes : time.minutes }} -->
                {{ currentTime }}
            </div>

            <!-- <div class="btn btn-sm">
                <IconCloseXlg />
            </div> -->
        </div>

        <!-- <input class="form-control" readonly type="text" name="timePicker" id="timePicker"> -->

        <div v-show="isShowControls" class="position-absolute card time-piker-controls">
            <div class="d-flex justify-content-between">

                <div class="d-flex flex-column justify-content-between align-items-center">
                    <div> </div>
                    <div @click="applyTime" class="btn p-2">
                        <IconCheckLg :size="20" />
                    </div>
                    <div> </div>
                </div>

                <div class="d-flex flex-column justify-content-between align-items-center">
                    <div @click="addHour" class="p-2 btn btn-sm">
                        <IconCaretUpFill :size="20" />
                    </div>
                    <div class="p-2">
                        {{ String(time.hours).length == 1 ? '0' + time.hours :
                            time.hours }}
                    </div>
                    <div @click="decHour" class="p-2 btn btn-sm">
                        <IconCaretDownFill :size="20" />
                    </div>
                </div>

                <div class="d-flex flex-column justify-content-between align-items-center">
                    <div>
                        <small> + </small>
                    </div>
                    <div class="p-2">:</div>
                    <div>
                        <small> - </small>
                    </div>
                </div>

                <div class="d-flex flex-column justify-content-between align-items-center">
                    <div @click="addMinutes" class="p-2 btn btn-sm">
                        <IconCaretUpFill :size="20" />
                    </div>
                    <div class="p-2">
                        {{ String(time.minutes).length == 1 ? '0' + time.minutes :
                            time.minutes }}
                    </div>
                    <div @click="decMinutes" class="p-2 btn btn-sm">
                        <IconCaretDownFill :size="20" />
                    </div>
                </div>

                <div class="d-flex flex-column justify-content-between align-items-center">
                    <div> </div>
                    <div class="btn p-2" @click="hideControls(true)">
                        <IconCloseXlg :size="20" />
                    </div>
                    <div> </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
.time-piker-controls {
    top: 4vh;
    left: 0;
    z-index: 15;
}
</style>
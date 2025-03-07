<script setup>
import { computed, onMounted, ref } from 'vue';
import { getTime } from '@/resource/js/dateTime';
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
    isEnable: {
        type: Boolean,
        default: true,
    }
});

const emit = defineEmits({
    applyTime: (time) => {
        if (time) {
            return true
        }
        return false
    },
});

// onMounted(() => {
//     if(props)time.value = getTime(false, true);
//     defaultTime.value = time.value;
// });

const defineTime = defineModel()
const time = ref(props.time);
const defaultTime = ref(props.time)
const showControls = ref(false)

function applyTime() {
    emit('applyTime', time.value.hours + ':' + time.value.minutes)
    defineTime.value = time.value.hours + ':' + time.value.minutes;
    showControls.value = false;
}

function hideControls(defaulTime = true) {
    if (defaulTime) {
        setTime();
    }
    showControls.value = false;
}

function setTime(currentTime = true) {
    if (currentTime) {
        time.value = getTime(false, true);
        defineTime.value = time.value.hours + ':' + time.value.minutes
    } else {
        time.value = defaultTime.value
        defineTime.value = defaultTime.value.hours + ':' + defaultTime.value.minutes
    }
}

function addHour() {
    if (time.value.hours == 23) {
        time.value.hours = 0
        return
    }
    time.value.hours++;
}

function decHour() {
    if (time.value.hours == 0) {
        time.value.hours = 23
        return
    }
    time.value.hours--;
}

function addMinutes() {
    if (time.value.minutes == 59) {
        time.value.minutes = 0
        return
    }
    time.value.minutes++;
}

function decMinutes() {
    if (time.value.minutes == 0) {
        time.value.minutes = 59
        return
    }
    time.value.minutes -= 1;
}

const currentTime = computed(() => {
    let time = defineTime.value.split(':');

    return time[0] + ' : ' + time[1];
});

</script>

<template>
    <div>
        <div @click="() => showControls = !showControls"
            class="form-control form-control-sm d-flex gap-2 justify-content-between align-items-center px-2">
            <div>
                <IconClock :size="20" />
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

        <div v-show="showControls" class="position-absolute card p-2 time-piker-controls">
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
                        {{ String(time.hours).length == 1 ? '0' + time.hours : time.hours }}
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
                        {{ String(time.minutes).length == 1 ? '0' + time.minutes : time.minutes }}
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
    z-index: 5;
}
</style>
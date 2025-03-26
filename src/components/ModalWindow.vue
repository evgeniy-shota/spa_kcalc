<script setup>

import { computed, ref, useTemplateRef, watch } from 'vue';
import IconCloseXlg from './icons/IconCloseXlg.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Новое окно'
    },
    showWindow: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: null,
    },
    widthVh: {
        type: Number,
        default: 60,
    },
    heightVh: {
        type: Number,
        default: 70
    },
    headerHeightProcent: {
        type: Number,
        default: 8
    },
    footerHeightProcent: {
        type: Number,
        default: 8
    },
    propsForSlots: {
        type: Object,
        default: {},
    }
});

const modalMainSlot = useTemplateRef('modalMainSlot');

watch(() => props.showWindow, () => {
    if (!modalMainSlot) {
        return
    }
    modalMainSlot.value.scrollTop = 0
    // let element = document.getElementById('modalMainSlot');
    console.log(modalMainSlot.value)
    // element.scrollTop = 0
});

const emit = defineEmits({
    closeWindow: () => { return true },
});

function closeWindow(event,) {
    if (event.target.hasAttribute('closeModalWindow')) {
        emit('closeWindow');
    }
}

const modalWindowSize = computed(() => {
    const appWigth = document.getElementById('app').clientWidth;
    let adaptiveWidth = appWigth < 550 ? 100 : props.widthVh;
    let adaptiveHeight = appWigth < 550 ? 90 : props.heightVh;
    let adaptiveLeftOffset = appWigth < 550 ? 0 : (100 - props.widthVh) / 2;

    return {
        height: adaptiveHeight + 'vh',
        width: adaptiveWidth + 'vw',
        top: (100 - adaptiveHeight) / 2 + 'vh',
        left: adaptiveLeftOffset + 'vw',
    }
});

function mainSlotSize(slotHeader, slotFooter) {
    let height = 95;
    // console.log('main slot size');
    // console.log(slotHeader);
    // console.log(slotFooter);
    if (slotHeader) {
        height -= props.header;
    }

    if (slotFooter) {
        height -= props.footer;
    }

    return {
        height: height + '%',
        'max-height': height + '%'
    }
}

</script>

<template>
    <div @click="closeWindow($event)" :hidden="!props.showWindow" closeModalWindow class="modal-window-container">
        <div class="card modal-window" :style="modalWindowSize">
            <div class="card-header">
                <div class="hstack">
                    <div class="me-auto">
                        <h5>{{ props.title }}</h5>
                    </div>
                    <button closeModalWindow id="closeModalWindow" class="btn btn-light">
                        <IconCloseXlg :size="16" />
                    </button>
                </div>
            </div>

            <div class="card-body modal-window-body pt-1 pb-1 px-1">
                <div v-if="$slots.header" class="modal-header" :style="{ 'height': props.headerHeightProcent + '%' }">
                    <slot name="header" v-bind="props.propsForSlots"></slot>
                </div>

                <!-- <slot name="main" :propsForSlot=props.propsForSlots></slot> -->
                <div ref="modalMainSlot" v-if="$slots.main" :style="mainSlotSize($slots.header, $slots.footer)"
                    class="modal-main rounded">
                    <slot name="main" v-bind=props.propsForSlots></slot>
                </div>

                <div v-if="$slots.footer" class="modal-footer border-top border-light-subtle py-2"
                    :style="{ 'height': props.footerHeightProcent + '%' }">
                    <slot name="footer" v-bind="props.propsForSlots"></slot>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
.modal-window-container {
    position: absolute;
    padding: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(32, 32, 32, 0.842);
    background-image: url('/4rect2.png');
    // opacity: 0.8;
    z-index: 4;
}

.modal-window {
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
}

// .modal-window-body {
//     overflow-y: scroll;
// }
.modal-window-body {
    height: 100%;
}

.modal-header,
.modal-footer {
    height: 8%;
    width: 100%;
}

.modal-main {
    height: 83%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fffffa;

}
</style>
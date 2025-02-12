<script setup>

import { computed, ref } from 'vue';
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
    widthVh: {
        type: Number,
        default: 60,
    },
    heightVh: {
        type: Number,
        default: 70
    },
    propsForSlots: {
        type: Object,
        default: {},
    }
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
    let adaptiveLeftOffset = appWigth < 550 ? 0 : (100 - props.widthVh) / 2;

    return {
        height: props.heightVh + 'vh',
        width: adaptiveWidth + 'vw',
        top: (100 - props.heightVh) / 2 + 'vh',
        left: adaptiveLeftOffset + 'vw',
    }
});

</script>

<template>
    <div @click="closeWindow($event)" :hidden="!props.showWindow" closeModalWindow class="modal-window-container">
        <div class="card modal-window" :style="modalWindowSize">
            <div class="card-header">
                <div class="hstack">
                    <div class="me-auto">
                        {{ props.title }}
                    </div>
                    <button closeModalWindow id="closeModalWindow" class="btn btn-light">
                        <IconCloseXlg :size="16" />
                    </button>
                </div>
            </div>

            <div class="card-body">

                <slot name="header"></slot>
                <slot name="main" :propsForSlot=props.propsForSlots></slot>
                <slot name="footer"></slot>

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
    overflow-y: scroll;
}
</style>
<script setup>
import { bottom } from '@popperjs/core';
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
    return {
        height: props.heightVh + 'vh',
        width: props.widthVh + 'vw',
        top: (100 - props.heightVh) / 2 + 'vh',
        left: (100 - props.widthVh) / 2 + 'vw',
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
                <slot name="main"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
    </div>



</template>

<style lang="scss">
.modal-window-container {

    position: absolute;
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
}
</style>
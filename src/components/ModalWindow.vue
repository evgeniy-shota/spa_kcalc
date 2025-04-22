<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { Modal } from 'bootstrap';
import IconCloseXlg from './icons/IconCloseXlg.vue';

const props = defineProps({
    modalId: {
        type: String,
        default: null,
    },
    title: {
        type: String,
        default: 'Новое окно',
    },
    showWindow: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: null,
    },
    // headerHeightProcent: {
    //     type: Number,
    //     default: 8
    // },
    // footerHeightProcent: {
    //     type: Number,
    //     default: 8
    // },
    propsForSlots: {
        type: Object,
        default: {},
    }
});

onMounted(() => {
    document.getElementById(props.modalId).addEventListener('hidden.bs.modal', event => {
        emit('closeWindow');
    })
});

watch(() => props.showWindow, (value) => {
    if (value === true) {
        showWindow(props.modalId)
    }
})

// const modalMainSlot = useTemplateRef('modalMainSlot');

// watch(() => props.showWindow, () => {
//     if (!modalMainSlot) {
//         return
//     }
//     modalMainSlot.value.scrollTop = 0
//     // let element = document.getElementById('modalMainSlot');
//     // console.log(modalMainSlot.value)
//     // element.scrollTop = 0
// });

const emit = defineEmits({
    closeWindow: () => { return true },
});

function showWindow(modalId) {
    const myModal = new Modal('#' + modalId)
    myModal.show()
}

function closeWindow(event,) {
    if (event.target.hasAttribute('closeModalWindow')) {
        emit('closeWindow');
    }
}

</script>

<template>

    <div class="modal" tabindex="-1" :id="props.modalId">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ props.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div v-if="$slots.header" class="modal-header">
                    <slot name="header" v-bind="props.propsForSlots"></slot>
                </div>
                <div class="modal-body">
                    <slot name="main" v-bind=props.propsForSlots></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer" v-bind="props.propsForSlots"></slot>
                </div>
            </div>
        </div>
    </div>

    <!-- <div @click="closeWindow($event)" :hidden="!props.showWindow" closeModalWindow class="modal" role="dialog"
        style="z-index: 3;"> -->
    <!-- <div class="modal" tabindex="-1"> -->

    <!-- <div class="modal-dialog modal-lg modal-dialog-scrollable" style="z-index: 4; background-color: #fffffa;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ props.title }}</h5>
                    <button type="button" closeModalWindow class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                    <slot name="main" v-bind=props.propsForSlots></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer" v-bind="props.propsForSlots"></slot>

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div> -->


    <!-- <div class="card modal-window" :style="modalWindowSize">
            <div class="card-header p-1">
                <div class="hstack">
                    <div class="me-auto px-2">
                        <h5 class="m-0">{{ props.title }}</h5>
                    </div>
                    <button closeModalWindow id="closeModalWindow" class="btn btn-light">
                        <IconCloseXlg :size="16" />
                    </button>
                </div>
            </div>

            <div class="card-body modal-window-body py-1 px-1">
                <div v-if="$slots.header" class="modal-header" :style="{ 'height': props.headerHeightProcent + '%' }">
                    <slot name="header" v-bind="props.propsForSlots"></slot>
                </div> -->

    <!-- <slot name="main" :propsForSlot=props.propsForSlots></slot> -->
    <!-- <div ref="modalMainSlot" v-if="$slots.main" :style="mainSlotSize($slots.header, $slots.footer)"
                    class="modal-main rounded">
                    <slot name="main" v-bind=props.propsForSlots></slot>
                </div>

                <div v-if="$slots.footer" class="position-absolute bottom-0 end-0 modal-footer border-top p-1"
                    :style="{ 'height': props.footerHeightProcent + '%' }">
                    <slot name="footer" v-bind="props.propsForSlots"></slot>
                </div>
            </div>
        </div> -->
    <!-- </div> -->

</template>

<style lang="scss">
.modal {
    background-image: url('/4rect2.png');

}

// .modal-window-container {
//     position: absolute;
//     padding: 0;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     background-color: rgba(32, 32, 32, 0.842);
//     background-image: url('/4rect2.png');
//     // opacity: 0.8;
//     z-index: 3;
// }

// .modal-window {
//     position: relative;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     z-index: 4;
// }

// // .modal-window-body {
// //     overflow-y: scroll;
// // }
// .modal-window-body {
//     height: 100%;
// }

// // .modal-header,
// // .modal-footer {
// //     min-height: 8%;
// //     width: 100%;
// // }

// .modal-main {
//     height: 90%;
//     overflow-y: auto;
//     overflow-x: hidden;
//     // background-color: #e4e484;
//     background-color: #fffffa;
// }</style>
<script setup>
import { ref } from 'vue';

const WINDOW_CONTAINERS_ID = ['modalSearchWindow', 'modalSearchWindowContainer', 'closeWindowBtn']

const props = defineProps({
    windowTitle: {
        type: String,
        default: "Поиск"
    },
    showWindow: {
        type: Boolean,
        default: false
    },
    forSlots: {
        type: Object,
        default: {
            searchLabel: 'Поиск',
            timeDelayMs: 2000,
            searchInProgress: false,
            searchSuccessful: false,
        },
    }
});

const emits = defineEmits({
    hideWindow() {
        return true;
    }
});

function hideWindow(event) {
    console.log(event.target.id);
    if (WINDOW_CONTAINERS_ID.includes(event.target.id)) {
        emits('hideWindow');
    }
}
</script>

<template>
    <div v-show="showWindow" @click="hideWindow" id="modalSearchWindow"
        class="position-absolute modal-window-search-background">

    </div>

    <div v-show="showWindow" @click="hideWindow" id="modalSearchWindowContainer"
        class="position-absolute modal-window-search-container">
        <div class="row">
            <div class="col"></div>
            <div class="col-6 card">
                <div class="row">
                    <div class="hstack p-2">
                        <h5>{{ props.windowTitle }}</h5>
                        <button type="button" id="closeWindowBtn" class="btn-close ms-auto" aria-label="Close"></button>
                    </div>
                </div>

                <div class="row">
                    <slot name="searchInput" v-bind:propsForSlot="props.forSlots"></slot>
                </div>

                <div class="row">
                    <slot name="searchOutput" :propsForSlot="props.forSlots"></slot>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>

</template>

<style lang="scss">
.modal-window-search-background {
    background-color: rgba(0, 0, 0);
    opacity: 0.5;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    overflow: hidden;
}

.modal-window-search-container {
    left: 0;
    right: 0;
    top: 10vh;
    bottom: 0;
    z-index: 4;

    // .card {
    //     height: 0vh;
    // }
}

// .search-output-container {
//     max-height: 70vh;
// }</style>
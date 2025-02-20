<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    hidden: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits({
    hide: () => { return true; },
});

function closeWindow() {
    emit("hide");
}

const offcanvSize = computed(() => {
    const appContainerOffsetLeft = document.getElementById('appContainer').offsetLeft;
    const appContainerWigth = document.getElementById('appContainer').clientWidth;
    console.log(appContainer);

    return {
        width: appContainerWigth - appContainerOffsetLeft + 'px',
        height: '86vh',
    }
});

</script>

<template>
    <div class="offcanv rounded" :style="offcanvSize" :class="{ 'hidden': props.hidden }">
        <div class="offcanv-header border-bottom px-2 py-2">
            <div class="offcanv-title">
                {{ props.title }}
            </div>
            <div class="offcanv-control ">
                <div class="btn btn-close" @click="closeWindow"></div>
            </div>
        </div>

        <div class="offcanv-body px-2 py-1">
            <slot name="main"></slot>
        </div>

        <div class="offcanv-footer px-2 py-1">
            <slot name="footer"></slot>
        </div>

    </div>
</template>

<style lang="scss">
.offcanv {
    position: fixed;
    z-index: 4;
    // top: 0;
    right: 0;
    bottom: 1vh;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    // padding-left: 1vw;
    // padding-right: 1vw;
    // padding-top: 1vh;
    // padding-bottom: 1vh;
    background-color: aliceblue;

    transition: transform 0.5s;
}

.hidden {
    transform: translateY(100vh);
}

.offcanv-header {
    justify-content: space-between;
    display: flex;
}

.offcanv-title,
.offcanv-control {
    display: inline-block;
}

// .offcanv-body {
//     overflow-y: scroll;
//     height: 100%;
// }</style>
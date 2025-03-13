<script setup>
import { computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: '10vh',
    },
    width: {
        type: String,
        default: '100%',
    },
})

const preloaderStyle = computed(() => {
    return {
        height: props.height,
        width: props.width,
    }
});

</script>

<template>
    <div class="preloader border rounded border-white px-1 d-flex justify-content-center align-items-center"
        :style="preloaderStyle">
        <div class="p-1 text-body-secondary">
            {{ props.text }}
        </div>
    </div>
</template>

<style lang="scss">
.preloader {
    background-color: #e9ecef;
    animation-name: preloadBg;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;

    @keyframes preloadBg {
        from {
            background-color: #e9ecef;
        }

        50% {
            background-color: #d5f8ff;
        }

        to {
            background-color: #e9ecef;
        }
    }
}
</style>
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    placement: {
        type: String,
        default: null,
    },
    title: {
        type: String,
        default: "",
    },
    propsForSlot: {
        type: Object,
        default: null,
    },
});

const offcanvasPlacement = computed(() => {

    if (props.placement == 'start') {
        return 'offcanvas-start';
    }

    if (props.placement == 'end') {
        return 'offcanvas-end';
    }

    if (props.placement == 'top') {
        return 'offcanvas-top';
    }
    return 'offcanvas-bottom';
});

</script>

<template>
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
        aria-controls="offcanvasTop">Toggle top offcanvas</button>

    <div class="offcanvas" :class="offcanvasPlacement" tabindex="-1" id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">{{ props.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <slot name="header" :propsForSlot="props.propsForSlot"></slot>
            <slot name="main" :propsForSlot="props.propsForSlot"></slot>
            <slot name="footer" :propsForSlot="props.propsForSlot"></slot>
        </div>
    </div>
</template>

<style lang="scss"></style>
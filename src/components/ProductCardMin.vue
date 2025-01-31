<script setup>
import { computed, ref } from 'vue';
import IconCloseXlg from './icons/IconCloseXlg.vue';

const props = defineProps({
    product: {
        type: Object,
        default: null,
    },
    isEditable: {
        type: Boolean,
        default: true
    },
    index: {
        type: Number,
        default: null
    }
});

const productId = computed(() => {
    if (props.index !== null) {
        return props.index;
    }
    return 'dRI' + props.product.daily_ration_id + "pI" + props.product.product_id;
});

const emit = defineEmits({

    onClickCloseBtn: (id) => {
        if (id !== null && id !== undefined) {
            return true;
        }
        return false;
    },

});

</script>

<template>
    <div class="row">
        <div class="col-11 px-1">
            <div class="row">
                <div class="col mb-1">
                    <div :title="product.name" class="daily-ration-element-name">
                        {{ product.name }}
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-3 pe-1">
                    <div class="input-group input-group-sm">
                        <span class="input-group-text">Вес (гр)</span>
                        <input type="text" class="form-control px-1" aria-label="Text input with radio button"
                            :value="product.quantity">
                    </div>
                </div>

                <div class="col ps-1">

                    <div class="input-group input-group-sm">
                        <span :title='"Калории: " + product.kcalory + " ккал"' class="input-group-text">К: {{
                            product.kcalory
                        }}</span>
                        <span class="input-group-text">Б: {{ product.proteins }} гр.</span>
                        <span class="input-group-text">Ж: {{ product.fats }} гр.</span>
                        <span class="input-group-text">У: {{ product.carbohydrates }} гр.</span>
                    </div>
                </div>
                <!-- <div class="col">
                    <div class="hstack gap-1">
                        <small class="">К: {{ product.kcalory }} ккал</small>
                        <small class="">Б: {{ product.proteins }} гр.</small>
                        <small class="">Ж: {{ product.fats }} гр.</small>
                        <small class="">У: {{ product.carbohydrates }} гр.</small>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="col px-0 my-auto">
            <!-- <button type="button" class="btn-close" aria-label="Close"></button> -->
            <!-- <div class="d-flex align-item-center justify-content-center"> -->

            <button type="button" class="btn btn-sm btn-light" @click="emit('onClickCloseBtn', productId)">
                <IconCloseXlg />
            </button>
            <!-- </div> -->
        </div>
    </div>
</template>

<style lang="scss"></style>
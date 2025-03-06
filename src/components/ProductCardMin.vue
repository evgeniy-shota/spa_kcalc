<script setup>
import { computed, ref } from 'vue';
import IconCloseXlg from './icons/IconCloseXlg.vue';
import router from '@/router';
import roundTo from '@/resource/js/mathFunctions';

let timerId = null;

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
    },
    timerDelayMs: {
        type: Number,
        default: 300,
    },
    time: {
        type: String,
        default: null,
    }
});

const productEnergyValue = computed(() => {
    return {
        kcalory: roundTo(props.product.kcalory_per_unit * props.product.quantity),
        proteins: roundTo(props.product.proteins_per_unit * props.product.quantity),
        carbohydrates: roundTo(props.product.carbohydrates_per_unit * props.product.quantity),
        fats: roundTo(props.product.fats_per_unit * props.product.quantity),
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
    onCangeQuantity: (id, quantity) => {
        if (id !== null && id !== undefined && quantity >= 0) {
            return true;
        }
        return false;
    },
    onInputQuantity: (id, quantity) => {
        if (id !== null && id !== undefined && quantity >= 0) {
            return true;
        }
        return false;
    },

});

function inputQuantity(event, productId) {

    let quantity = event.target.value.length == 0 ? 0 : event.target.value;

    if (timerId != null) {
        clearTimeout(timerId);
        timerId = null;
    }

    timerId = setTimeout(() => emit('onInputQuantity', productId, quantity), props.timerDelayMs);

}

</script>

<template>

    <div class="mb-2">
        <div :title="product.name" class="daily-ration-element-name">
            {{ product.name }}
        </div>
    </div>

    <div class="row mb-2">
        <div class="col">
            <div class="input-group input-group-sm">
                <span class="input-group-text">Вес (гр)</span>
                <input type="number" min="0" max="1000" onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                    @change="emit('onCangeQuantity', productId, $event.target.value)"
                    @input="inputQuantity($event, productId)" class="form-control px-1"
                    aria-label="Text input with radio button" :value="product.quantity">
            </div>
        </div>
        <div class="col">
            <div class="input-group input-group-sm">
                <span class="input-group-text">Время</span>
                <input type="time" class="form-control form-control-sm" name="dailyProductTime" id="dailyProductTime">
            </div>
        </div>
    </div>


    <div class="d-flex justify-content-between  input-group-sm">
        <span :title='"Калории: " + productEnergyValue.kcalory + " ккал"' class="input-group-text">К: {{
            productEnergyValue.kcalory
            }} ккал</span>
        <span class="input-group-text">Б: {{ productEnergyValue.proteins }} гр.</span>
        <span class="input-group-text">Ж: {{ productEnergyValue.fats }} гр.</span>
        <span class="input-group-text">У: {{ productEnergyValue.carbohydrates }} гр.</span>
    </div>

    <div class="d-flex justify-content-end align-items-center">
        <a @click="emit('onClickCloseBtn', productId)" class="link-danger link-offset-2 deleteDailyProductLink">Удалить
            продукт</a>
    </div>

    <!-- <div class="row">
        <div class="col-11 px-1">
            <div class="row">
                <div class="col mb-2">
                    <div :title="product.name" class="daily-ration-element-name">
                        {{ product.name }}
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-3 pe-1">
                    <div class="input-group input-group-sm">
                        <span class="input-group-text">Вес (гр)</span>
                        <input type="number" min="0" max="1000"
                            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                            @change="emit('onCangeQuantity', productId, $event.target.value)"
                            @input="inputQuantity($event, productId)" class="form-control px-1"
                            aria-label="Text input with radio button" :value="product.quantity">
                    </div>
                </div>

                <div class="col-12 col-md ps-1">

                    <div class="input-group input-group-sm">
                        <span :title='"Калории: " + productEnergyValue.kcalory + " ккал"' class="input-group-text">К: {{
                            productEnergyValue.kcalory
                        }}</span>
                        <span class="input-group-text">Б: {{ productEnergyValue.proteins }} гр.</span>
                        <span class="input-group-text">Ж: {{ productEnergyValue.fats }} гр.</span>
                        <span class="input-group-text">У: {{ productEnergyValue.carbohydrates }} гр.</span>
                    </div>
                </div>

            </div>
        </div>

        <div class="col px-0 my-auto">

            <button type="button" class="btn btn-sm btn-light" @click="emit('onClickCloseBtn', productId)">
                <IconCloseXlg />
            </button>
        </div>
    </div> -->

</template>

<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}

.deleteDailyProductLink {
    cursor: pointer;
}
</style>
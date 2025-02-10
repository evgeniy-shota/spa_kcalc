<script setup>
import { ref } from 'vue';
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';
import IconArrowRightShort from './icons/IconArrowRightShort.vue';

const date = ref('');

const props = defineProps(
    {
        date: {
            type: String,
            default: null,
        },
        defaultOffset: {
            type: Number,
            default: 0,
        },
        canReduced: {
            type: Boolean,
            default: true,
        },
        canIncrease: {
            type: Boolean,
            default: true,
        }
    }
);

const emit = defineEmits(
    {
        changeDate: (offset) => {
            if (offset) {
                return true;
            }
            return false;
        },
    }
);

function changeDate(offset) {
    emit('changeDate', props.defaultOffset + offset);
}
</script>

<template>

    <div class="input-group mb-2">
        <button @click="changeDate(-1)" :disabled="!props.canReduced"
            class="btn btn-outline-secondary border-light-subtle" type="button" id="button-addon1">
            <IconArrowLeftShort :size="24" />
        </button>
        <input type="text" readonly class="form-control text-center" :value="props.date" placeholder="дата"
            aria-label="Username" aria-describedby="basic-addon1">
        <!-- <span class="input-group-text" id="inputGroup-sizing-default">14.02 - 21.02</span> -->
        <button @click="changeDate(1)" :disabled="!props.canIncrease"
            class="btn btn-outline-secondary  border-light-subtle" type="button" id="button-addon1">
            <IconArrowRightShort :size="24" />
        </button>
    </div>

</template>

<style lang="scss"></style>
<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    resourceType: {
        type: String,
        default: null,
    },
    applyBtnName: {
        type: String,
        default: 'Сохранить',
    },
    cancelBtnName: {
        type: String,
        default: 'Отменить',
    },
    deleteBtnName: {
        type: String,
        default: 'Удалить',
    },
    applyBtnStyle: {
        type: Object,
        default: null,
    },
    cancelBtnStyle: {
        type: Object,
        default: null,
    },
    deleteBtnStyle: {
        type: Object,
        default: null,
    },
    hideDelete: {
        type: Boolean,
        default: false,
    },
    hideApply: {
        type: Boolean,
        default: false,
    },
    hideCancel: {
        type: Boolean,
        default: false,
    },
    showDeleteConfirmation: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits({
    applyAction: () => {
        return true;
    },
    cancelAction: () => {
        return true;
    },
    deleteAction: () => {
        return true;
    },
});

const deleteConfirmation = ref(false);
const showSpinner = ref(false)

const deleteConfirmationAttention = computed(() => {
    let classes = '';

    if (deleteConfirmation) {
        classes += 'delete-attention '
    }
    return classes;
});

function applyBtn() {
    console.log('apply');
    emit('applyAction');
}

function cancelBtn() {
    console.log('cancel');
    emit('cancelAction');
}

function deleteBtn() {
    if (props.showDeleteConfirmation) {
        deleteConfirmation.value = true
    } else {
        emit('deleteAction');
    }
}

function confirm() {
    console.log('delete');
    deleteConfirmation.value = false
    emit('deleteAction');
}

function decline() {
    deleteConfirmation.value = false
}
</script>

<template>
    <div v-show="showSpinner">
        <div class="spinner-border me-2" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <div v-show="deleteConfirmation">
        <div class="d-flex justify-content-center align-items-center">
            <div :class="deleteConfirmationAttention" class="me-2 p-2 rounded">Удалить {{
                props.resourceType }} ?</div>
            <button @click="confirm" class="btn btn-warning me-2">Подтвердить</button>
            <button @click="decline" class="btn btn-secondary me-2">Отклонить</button>
        </div>
    </div>

    <div v-show="deleteConfirmation === false">
        <div class="d-flex justify-content-center align-items-center">
            <!-- Apply btn -->
            <button v-show="!props.hideApply" @click="applyBtn" type="button" class="btn btn-primary me-2">
                {{ props.applyBtnName }}
            </button>

            <!-- Cancel btn -->
            <button v-show="!props.hideCancel" @click="cancelBtn" type="button" class="btn btn-outline-secondary me-2">
                {{ props.cancelBtnName }}
            </button>

            <!-- Delete btn -->
            <button v-show="!props.hideDelete" @click="deleteBtn" type="button" class="btn btn-outline-danger me-2">
                {{ props.deleteBtnName }}
            </button>
        </div>
    </div>

</template>

<style lang="scss">
.delete-attention {
    animation-name: color-changed;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@keyframes color-changed {
    from {
        color: rgb(34, 34, 34);
    }

    50% {
        color: orangered;
    }

    to {
        color: rgb(34, 34, 34);

    }

}
</style>
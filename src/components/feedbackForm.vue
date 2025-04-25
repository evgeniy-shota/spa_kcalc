<script setup>
import { ref, watch } from 'vue';
import axios_instance from '@/resource/js/axiosInstance';
import { useNotificationStore } from '@/stores/notificationStore';
import { notificationPriority } from '@/resource/js/notificationPriority';

const URL_FEEDBACK = 'api/feedback'

const notificationStore = useNotificationStore()

const props = defineProps({
    source: {
        type: String,
        default: null,
    },
    sender: {
        type: Object,
        default: null,
    },
    triggerSubmitForm: {
        type: Boolean,
        default: false,
    },
    triggerCancelForm: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits({
    submitForm: () => { },

    cancelForm: () => { },
})

watch(() => props.triggerSubmitForm, (value) => {
    if (value == true) {
        submitForm()
    }
})

watch(() => props.triggerCancelForm, (value) => {
    if (value == true) {
        cancelForm()
    }
})

const senderEmail = ref(null)
const message = ref(null)
const source = ref(null)

async function submitForm() {
    let response = null
    let data = {}

    try {
        response = await axios_instance.post(URL_FEEDBACK, {

        })
    } catch (error) {
        console.warn('Send feedback fail')
        console.warn(error)
    }

    if (response) {
        notificationStore.addNotification(
            notificationPriority.Default.value,
            {
                priority: notificationPriority.Default.value,
                title: 'Отзыв отправлен. Спасибо!',
                message: '',
            })
        emit('submitForm')
    }
}

function cancelForm() {
    senderEmail.value = null
    source.value = null
    message.value = null
    emit('cancelForm')
}

</script>

<template>
    <form action="">
        <div v-if="props.sender !== null" class="mb-3">
            <h5>{{ props.sender.name }}</h5>
        </div>
        <div v-else class="mb-3">
            <label for="feedbackEmail" class="form-label">Email</label>
            <input type="email" v-model="senderEmail" class="form-control" id="feedbackEmail"
                placeholder="name@example.com">
        </div>
        <div class="mb-3">
            <label for="feedbackSource">Раздел/тема</label>
            <select id="feedbackSource" v-model="source" class="form-select" aria-label="Default select example">
                <option selected>Выберите раздел/тему</option>
                <option value="1">Продукты</option>
                <option value="2">Ежедневник</option>
                <option value="3">Диета</option>
                <option value="4">Активности</option>
                <option value="5">Статистика</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="feedbackMessage" class="form-label">Сообщение</label>
            <textarea class="form-control" v-model="message" id="feedbackMessage" rows="3"></textarea>
        </div>
    </form>


</template>

<style lang="scss"></style>
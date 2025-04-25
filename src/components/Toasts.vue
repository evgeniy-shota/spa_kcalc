<script setup>
import { computed, onMounted, ref, watch } from 'vue';
// import '../../node_modules/bootstrap/dist/js/bootstrap'
import { useNotificationStore } from '@/stores/notificationStore';
import { Toast } from 'bootstrap';
import { notificationPriority } from '@/resource/js/notificationPriority';
import { notificationType } from '@/resource/js/notificationType';

const notificationStore = useNotificationStore()
const minToast = ref(false)
const nfTitle = ref('')
const nfMessage = ref('')
const nfType = ref(notificationType.Default.value)

onMounted(() => {

})

watch(notificationStore.notifications, () => {
    console.log('watch')
    showToast(notificationStore.notificationToShow)
})

function showToast(data = null) {
    console.log('toast show')
    let toastId = 'notificationToast'

    if (data !== null) {
        if (data.title) {
            minToast.value = false
            nfTitle.value = data.title
        } else {
            minToast.value = true
            toastId = 'notificationMinToast'
        }
        // title.value = data.title

        nfMessage.value = data.message
        nfType.value = data.type
        const toastElement = document.getElementById(toastId)
        const toastBootstrap = Toast.getOrCreateInstance(toastElement)
        toastBootstrap.show()
    }
}

const notificationClasses = computed(() => {
    let classes = ''

    if (nfType.value == notificationType.Success.value) {
        // classes += 'border-success '
        classes += 'border-0 '
        classes += 'bg-success-subtle '
        classes += 'text-success-emphasis '
        // classes += 'text-bg-primary'
    }

    return classes
});

</script>

<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="notificationToast" class="toast" :class="notificationClasses" role="alert" aria-live="assertive"
            aria-atomic="true">
            <div v-show="nfTitle !== null" class="toast-header">
                <!-- <img src="..." class="rounded me-2" alt="..."> -->
                <strong class="me-auto">{{ nfTitle }}</strong>
                <small>11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ nfMessage }}
            </div>
        </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="notificationMinToast" class="toast" :class="notificationClasses" role="alert" aria-live="assertive"
            aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    {{ nfMessage }}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
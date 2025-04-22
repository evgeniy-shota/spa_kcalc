<script setup>
import { onMounted, ref } from 'vue';
// import '../../node_modules/bootstrap/dist/js/bootstrap'
import { useNotificationStore } from '@/stores/notificationStore';
import { Toast } from 'bootstrap';

const notificationStore = useNotificationStore()

onMounted(() => {
    showToast()
})

function showToast() {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}

</script>

<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <!-- <img src="..." class="rounded me-2" alt="..."> -->
                <strong class="me-auto">KcalC</strong>
                <small>11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Hello, world! This is a toast message.
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
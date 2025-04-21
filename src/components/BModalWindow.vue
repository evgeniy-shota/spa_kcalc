<script setup>
import { ref } from 'vue';

const props = defineProps({
    id: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null,
    },
})

function showWindow() {
    // const bModal = mew bootstrap.Modal('');
    const mw = document.getElementById(props.id)
    mw.Show()
}

function hideWindow() {

}
</script>

<template>

    <div class="modal" tabindex="-1">
        <div class="modal-dialog modal-lg" :id="props.id">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ props.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss"></style>
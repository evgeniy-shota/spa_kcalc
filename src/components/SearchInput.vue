<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
    searchSuccessful: {
        type: Boolean,
        default: false
    },
    timeDelayMs: {
        type: Number,
        default: 2000
    },
    searchLabel: {
        type: String,
        default: 'Поиск'
    }
});

const searchInputText = ref("");

const searchInProgress = computed(() => {
    return props.searchSuccessful ? true : false;
});

let searchTimerId = null;

// add showing small search result when no match found

watch(searchInputText, () => {
    if (searchTimerId != null) {
        clearTimeout(searchTimerId);
    }
    searchTimerId = setTimeout(search, props.timeDelayMs);
});

function search() {
    if (searchInputText.value.length > 2) {
        // console.log(searchInputText.value);
        emit('searchEvent', searchInputText.value);
        searchInProgress.value = true;
    }
}


</script>

<template>
    <div class="mb-2">
        <div>
            <input type="text" v-model="searchInputText" class="form-control"
                :class="{ 'search-in-progress': searchInProgress }" v-bind:placeholder="props.searchLabel" aria-label=""
                aria-describedby="button-addon2">
        </div>
    </div>
</template>

<style>
.search-in-progress {
    /* transition: background 0.5s; */
    background: linear-gradient(to right, white 2%, #47bae76e, white 80%);
    background-size: 200%;
    animation-name: search-animation-gradient;
    animation-duration: 4s;
    animation-iteration-count: infinite;
}

@keyframes search-animation-gradient {
    from {
        background-position: 0% 0%;
    }

    50% {

        background-position: 100% 0%;
    }

    to {

        background-position: 0% 0%;
    }
}
</style>
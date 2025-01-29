<script setup>
import { computed, ref, watch } from 'vue';
import { useSearchesStore } from '@/stores/SearchesStore';


const searchStore = useSearchesStore();
const props = defineProps({
    timeDelayMs: {
        type: Number,
        default: 2000
    },
    searchLabel: {
        type: String,
        default: 'Поиск'
    }
});

// const emit = defineEmits({
//     searchEvent(searchQuery) {
//         if (searchQuery) {
//             return true;
//         }
//         return false;
//     }
// });

const searchInputText = ref("");
const searchInProgress = ref(false);
const searchIsComplete = ref(false);

let searchTimerId = null;

// add showing small search result when no match found

watch(searchInputText, () => {
    if (searchTimerId != null) {
        clearTimeout(searchTimerId);
        searchTimerId = null;
    }

    if (searchInputText.value.length > 2) {
        searchTimerId = setTimeout(search, props.timeDelayMs);
    }

});


async function search() {

    searchInProgress.value = true;
    searchIsComplete.value = await searchStore.searchProducts(searchInputText.value);

    if (searchIsComplete.value) {
        searchInProgress.value = false;
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
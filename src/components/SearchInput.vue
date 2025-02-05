<script setup>
import { computed, ref, watch } from 'vue';
import { useSearchesStore } from '@/stores/SearchesStore';
import IconSearch from './icons/IconSearch.vue';

const searchStore = useSearchesStore();
const props = defineProps({
    timeDelayMs: {
        type: Number,
        default: 1500
    },
    searchLabel: {
        type: String,
        default: ''
    },
    searchPlaseholder: {
        type: String,
        default: 'Для начала поиска введите не менее 3х символов',
    },
    searchedResource: {
        type: String,
        default: "products",
    },

});

const searchInputText = ref("");
const searchInProgress = ref(false);
const searchIsComplete = ref(false);

let searchTimerId = null;

// нужно сделать очистку поисковой строки 

// searchStore.$subscribe((searchHistory) => {
//     searchInputText.value = 0;
// });

watch(searchStore.searchHistory, () => {
    searchInputText.value = ''
})


watch(searchInputText, () => {
    if (searchTimerId != null) {
        clearTimeout(searchTimerId);
        searchTimerId = null;
    }

    if (searchInputText.value.length > 2) {
        searchTimerId = setTimeout(search, props.timeDelayMs);
    }

});

const searchHistory = computed(() => {
    let history = searchStore.getSearchHistory(props.searchedResource);

    if (history.length > 4) {
        return history.slice(0, 4)
    }

    return history;
});

function setSearchRequeest(text) {
    searchInputText.value = text
}

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
        <div class="mb-1">
            <label for="inputSearch" v-show="props.searchLabel.length != 0"> {{ props.searchLabel }}</label>
            <input type="text" id="inputSearch" v-model="searchInputText" class="form-control"
                :class="{ 'search-in-progress': searchInProgress }" v-bind:placeholder="props.searchPlaseholder"
                aria-label="" aria-describedby="button-addon2">
        </div>
        <div> История поиска:
            <a v-for="elem in searchHistory" @click="setSearchRequeest(elem.request)" class="link-offset-2 me-2">{{
                elem.request }}</a>
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
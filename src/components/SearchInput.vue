<script setup>
import { computed, ref, watch } from 'vue';
import { useSearchesStore } from '@/stores/SearchesStore';
import IconSearch from './icons/IconSearch.vue';

const searchStore = useSearchesStore();
const props = defineProps({
    searchRequest: {
        type: String,
        default: '',
    },
    searchIsComplete: {
        type: Boolean,
        default: false,
    },
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
    searchHistory: {
        type: Array,
        default: [],
    }

});

const emit = defineEmits({
    search: (request) => {
        if (request) {
            return true;
        }
        return false;
    },
    getSearchHistory: (searchedResource) => {
        if (searchedResource) {
            return true
        }
        return false
    }
});

const searchInputText = ref("");
const searchInProgress = ref(false);
// const searchIsComplete = ref(false);

let searchTimerId = null;

// нужно сделать очистку поисковой строки 

// searchStore.$subscribe((searchHistory) => {
//     searchInputText.value = 0;
// });

watch(() => props.searchHistory.length, () => {
    console.log('history!');
    searchInputText.value = "";
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

watch(() => props.searchIsComplete, () => {
    if (props.searchIsComplete) {
        searchInProgress.value = false;
    }
});

const searchHistory = computed(() => {
    // let history = searchStore.getSearchHistory(props.searchedResource);

    if (props.searchHistory.length > 4) {
        return props.searchHistory.slice(0, 4)
    }

    return props.searchHistory;
});

function setSearchRequeest(text) {
    searchInputText.value = text
}

async function search() {

    searchInProgress.value = true;
    // searchIsComplete.value = await searchStore.searchProducts(searchInputText.value);
    emit('search', searchInputText.value);

}

</script>

<template>
    <div class="mb-2 w-100">
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
#inputSearch {
    width: 100%;
}

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
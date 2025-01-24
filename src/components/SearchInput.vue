<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    searchResult: {
        type: Object,
        default: {}
    },
    timeDelayMs: {
        type: Number,
        default: 2000
    },
    searchLabel: {
        type: String,
        default: 'Поиск'
    },
    searchResultLabel: {
        type: String,
        default: "Результаты поиска"
    }

});

const emit = defineEmits({
    selectSearchResultEvent: (searchResultType, searchResultId) => {
        if (searchResultType && searchResultId) {
            return true;
        }
        console.warn('SearchInput: searchCallback validation fail');
        return false;
    },
    searchEvent: (searchQuery) => {
        if (searchQuery) {
            return true;
        }
        return false;
    }
});

const searchInputText = ref("");
const searchInProgress = ref(false);
const searchIsCompleted = ref(false);
const selectedSearchResult = ref({
    type: '',
    id: 0
});

let searchTimerId = null;

// add showing small search result when no match found
watch(() => props.searchResult, () => {
    if (Object.keys(props.searchResult).length != 0) {
        searchIsCompleted.value = true;
    }
    searchInProgress.value = false;
});

watch(searchInputText, () => {
    if (searchTimerId != null) {
        clearTimeout(searchTimerId);
        searchIsCompleted.value = false;
    }
    searchTimerId = setTimeout(search, props.timeDelayMs);
});

function clearSearchResult() {
    searchInputText.value = "";
    searchInProgress.value = false;
    selectedSearchResult.value.type = '';
    selectedSearchResult.value.id = 0;

    // need check
    clearTimeout(searchTimerId);
}

function selectElement(resultType = 'activity', resultId = 0) {
    selectedSearchResult.value.type = resultType;
    selectedSearchResult.value.id = resultId;
    searchIsCompleted.value = false;
    searchInProgress.value = false;
    searchInputText.value = '';
    emit('selectSearchResultEvent', resultType, resultId);

}

function search() {
    if (searchInputText.value.length > 2) {
        // console.log(searchInputText.value);
        emit('searchEvent', searchInputText.value);
        searchInProgress.value = true;
        // searchIsCompleted.value = true;
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
        <div class="search-result border rounded-bottom border-top-0 position-absolute ms-2 me-2 p-2 pt-1"
            v-show="searchIsCompleted">
            <div>{{ props.searchResultLabel }} </div>
            <ul class="list-group list-group-flush">
                <!-- need to change key, can't be unique -->
                <li v-for="item in searchResult" :key="item.type + 'i' + item.id"
                    @click="selectElement(item.type, item.id)" class="list-group-item">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style>
.search-result {
    height: 33vh;
    overflow-y: scroll;
    background-color: rgb(255, 255, 255);
    z-index: 10;
    left: 0;
    right: 0;
    cursor: pointer;
    scrollbar-color: red;
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
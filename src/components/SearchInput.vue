<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    searchResult: {
        type: Array,
        default: []
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
const searchCompleted = ref(false);
const selectedSearchResult = ref({
    type: '',
    id: 0
});

let searchTimerId = null;

function clearSearchResult() {
    searchCompleted.value = false;
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
    emit('selectSearchResultEvent', resultType, resultId);
}

function search() {
    if (searchInputText.value.length > 2) {
        console.log(searchInputText.value);
        emit('searchEvent', searchInputText.value);
        searchCompleted.value = true;
    }
}

watch(searchInputText, () => {
    if (searchTimerId != null) {
        clearTimeout(searchTimerId);
        searchCompleted.value = false;
    }
    searchTimerId = setTimeout(search, props.timeDelayMs);
});

</script>

<template>
    <div class="mb-2">
        <input type="text" v-model="searchInputText" class="form-control" v-bind:placeholder="props.searchLabel"
            aria-label="" aria-describedby="button-addon2">
        <div class="search-result border rounded-bottom border-top-0 position-absolute ms-2 me-2 p-2 pt-1"
            v-show="searchCompleted">
            <div>{{ props.searchResultLabel }}: </div>
            <ul class="list-group list-group-flush">
                <!-- need to change key, can't be unique -->
                <li v-for="item in searchResult" :key="item.type + item.id" @click="selectElement(item.type, item.id)"
                    class="list-group-item">{{ item.name }}</li>
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
}
</style>
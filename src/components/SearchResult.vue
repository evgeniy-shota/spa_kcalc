<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
    searchResult: {
        type: Object,
        default: null,
    },
    searchResultLabel: {
        type: String,
        default: "Результаты поиска"
    }
});

const searchIsComplete = ref(false);

watch(() => props.searchResult, () => {
    if (props.searchResult == null) {
        searchIsComplete.value = false;
    }
    else {
        searchIsComplete.value = true;
    }
});

const emit = defineEmits({
    selectSearchResultEvent: (selectedElement) => {
        if (selectedElement) {
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

function closeSearchResult() {
    searchIsComplete.value = false;
}

</script>

<template>
    <div v-show="searchIsComplete" class="position-absolute search-result-background">
    </div>

    <div v-show="searchIsComplete" @click="closeSearchResult()" class="position-absolute search-result-container">
        mode window
        <div class="row">
            <div class="col"></div>
            <div class="col-6 card">
                <div class="card-body">
                    <h5 class="border-bottom border-primary-subtle pb-2">{{ props.searchResultLabel }}</h5>
                    <div>
                        <ul v-for="resuultGroup in props.searchResult" class="list-group list-group-flush">
                            <h6>{{ resuultGroup.label }} - {{ resuultGroup.count }} результатов: </h6>
                            <li v-for="item in resuultGroup.data" :key="item.type + 'i' + item.id"
                                @click="selectElement(item)" class="list-group-item">{{ item.name }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<style lang="scss">
.search-result-background {
    background-color: rgba(0, 0, 0);
    opacity: 0.45;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
}

.search-result-container {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 4;
}
</style>
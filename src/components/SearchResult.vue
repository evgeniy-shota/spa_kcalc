<script setup>
import { computed, ref, watch } from 'vue';
import { useSearchesStore } from '@/stores/SearchesStore';

const searchStore = useSearchesStore();

const props = defineProps({
    searchResult: {
        type: Object
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
});


</script>

<template>

    <div class="search-result-container pb-1">
        <h6 class="border-bottom border-primary-subtle pb-2">{{ props.searchResultLabel }}</h6>
        <div class="search-result-output-container">
            <ul v-for="resuultGroup in props.searchResult" class="list-group list-group-flush">
                <h6>{{ resuultGroup.label }} - {{ resuultGroup.count }} результатов: </h6>
                <li v-for="item in resuultGroup.data" :key="item.type + 'i' + item.id" @click="selectElement(item)"
                    class="list-group-item">{{ item.name }}</li>
            </ul>
        </div>
    </div>


</template>

<style lang="scss">
.search-result-container {
    max-height: 70vh;

    // max-height: 70vh;
}

.search-result-output-container {
    overflow-y: scroll;

    max-height: 65vh;

    li {
        cursor: pointer;
        scrollbar-width: thin;
    }
}
</style>
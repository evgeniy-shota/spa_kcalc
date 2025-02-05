<script setup>
import { computed, ref, watch } from 'vue';
// import { useSearchesStore } from '@/stores/SearchesStore';

// const searchStore = useSearchesStore();

const props = defineProps({
    searchResult: {
        type: Object
    },
    isNothingFound: {
        type: Boolean,
        default: false
    },
    searchResultLabel: {
        type: String,
        default: "Результаты поиска"
    },
    isNothingFoundLable: {
        type: String,
        default: 'ничего не найдено',
    }
});

const emit = defineEmits({
    selectSearchResult: (selectedElement) => {
        if (selectedElement) {
            return true;
        }
        console.warn('SearchInput: searchCallback validation fail');
        return false;
    },
});

// const searchIsComplete = ref(false);

// watch(() => props.searchResult, () => {
//     if (props.searchResult == null) {
//         searchIsComplete.value = false;
//     }
//     else {
//         searchIsComplete.value = true;
//     }
// });

const resultLabel = computed(() => {
    if (props.isNothingFound) {
        return 'ничего не найдено';
    }
});

function selectElement(item) {
    emit('selectSearchResult', item);
}

</script>

<template>

    <div class="search-result-container pb-1">

        <div class="border-bottom border-primary-subtle pb-2"
            :class="{ 'border-warning-subtle': props.isNothingFound }">
            <div class="hstack">
                <div class="pe-2">{{ props.searchResultLabel }}</div>
                <div class="pe-2">{{ resultLabel }}</div>
            </div>
        </div>

        <div class="search-result-output-container">
            <ul v-for="resuultGroup in props.searchResult" class="list-group list-group-flush">
                <h6>{{ resuultGroup.label }} ({{ resuultGroup.count }}): </h6>
                <li v-for="item in resuultGroup.data" :key="item.type + 'i' + item.id" @click="selectElement(item)"
                    class="list-group-item">
                    <div>
                        <div>
                            {{ item.name }}
                        </div>
                        <div class="hstack">

                            <small class="ps-1 pe-1">К: {{ item.kcalory }} ккал.</small>
                            <small class="ps-1 pe-1">Б: {{ item.proteins }} гр.</small>
                            <small class="ps-1 pe-1">Ж: {{ item.fats }} гр.</small>
                            <small class="ps-1 pe-1">У: {{ item.carbohydrates }} гр.</small>

                        </div>
                        <div>
                            <!-- {{ item.trademark }} -->
                        </div>
                    </div>
                </li>
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
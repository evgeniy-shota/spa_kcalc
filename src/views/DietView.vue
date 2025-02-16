<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useDietsStore } from '@/stores/dietsStore';
import { useSearchesStore } from '@/stores/SearchesStore';
import ModalWindow from '@/components/ModalWindow.vue';
import SearchInput from '@/components/SearchInput.vue';
import SearchResult from '@/components/SearchResult.vue';
import DietList from '@/components/DietList.vue';
import DietFrom from '@/components/DietFrom.vue';


const idTheLastSelectedDiet = ref(0);
const isShowSearchWindow = ref(false);
const dietsStore = useDietsStore();
const searchStore = useDietsStore();


function selectDiet(diet_id) {
    if (diet_id == idTheLastSelectedDiet.value) {
        return 0;
    }

    console.log('select diet');

    dietsStore.getDiet(diet_id);
    idTheLastSelectedDiet.value = diet_id;
}

function saveDiet(diet) {
    console.log('save diet: ');
    console.log(diet);
}

function showSearchWindow() {
    isShowSearchWindow.value = true;
}

function hideSearchWindow() {
    isShowSearchWindow.value = false;
};

onMounted(() => {
    dietsStore.getDiets();
});

</script>

<template>

    <ModalWindow title="Поиск продуктов" :show-window="isShowSearchWindow" @close-window="hideSearchWindow">
        <template #header>
            <SearchInput />
        </template>
        <template #main>
            <SearchResult />
        </template>
    </ModalWindow>

    <!-- diets list -->
    <div class="col">
        <DietList :diets="dietsStore.diets" @select-item="selectDiet" />
    </div>

    <!-- diet info -->
    <div class="col">
        <DietFrom @save-diet="saveDiet" @add-product="showSearchWindow" />
    </div>

</template>

<style>
.list-height-limit {
    cursor: pointer;
    max-height: 85vh;
    overflow-y: scroll;
}
</style>
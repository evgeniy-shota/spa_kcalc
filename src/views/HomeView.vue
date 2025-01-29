<script setup>
import { computed, ref } from 'vue';
import DailyProductFrom from '@/components/DailyProductFrom.vue';
import DailyActivityFrom from '@/components/DailyActivityFrom.vue';
import SearchResult from '@/components/SearchResult.vue';
import SearchModalWindow from '@/components/SearchModalWindow.vue';
import SearchInput from '@/components/SearchInput.vue';
import { useSearchesStore } from '@/stores/SearchesStore';
import { Title } from 'chart.js';
import { compile } from 'sass';

const searchStore = useSearchesStore();
const searchTitle = ref("");
const searchInputLabel = ref("");
const searchedResource = ref("");

const searchInputProps = computed(() => {
  return {
    searchLabel: searchInputLabel.value,
    timeDelayMs: 2000,
  }
});

const searchResultProps = computed(() => {
  return {
    searchResult: searchStore.searchResult,
    searchResponse: searchStore.searchResponse,
    searchResultLabel: 'Результаты поиска:'
  }
});

const searchResult = computed(() => {
  return
});

const showSearchWindow = ref(false);

function showSearch(windowTitle, searchLabel, searchedRes) {

  // reset searcheStore if current search resource differs from previously
  if (searchedRes != searchStore.searchedResource) {
    searchStore.$reset();
  }

  searchTitle.value = windowTitle;
  searchInputLabel.value = searchLabel;
  showSearchWindow.value = true;
  searchedResource.value = searchedRes;
}

function hideSearch() {
  showSearchWindow.value = false;

}
</script>

<template>

  <!-- <SearchInput @search-event="searchProducts" @select-search-result-event="selectSearchResult"
    :search-result="searchResult" search-label="Поиск продукта\диеты" :search-result-label="searchResultLabel"
    :time-delay-ms="productSearchTimerDelayMs" /> -->


  <SearchModalWindow :for-slots="{ ...searchInputProps, ...searchResultProps }" :show-window="showSearchWindow"
    v-on:hide-window="hideSearch" :window-title="searchTitle">

    <template #searchInput="{ propsForSlot }">
      <SearchInput :search-label="propsForSlot.searchLabel" :time-delay-ms="propsForSlot.timeDelayMs" />
    </template>

    <template #searchOutput="{ propsForSlot }">
      <SearchResult :search-result-label="propsForSlot.searchResultLabel"
        :search-result="propsForSlot.searchResponse" />
    </template>

  </SearchModalWindow>

  <!-- daily diet -->
  <div class="col">
    <DailyProductFrom v-on:show-search="showSearch" />
  </div>

  <!-- daily activity -->
  <div class="col">
    <DailyActivityFrom />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import DailyProductFrom from '@/components/DailyProductFrom.vue';
import DailyActivityFrom from '@/components/DailyActivityFrom.vue';
import SearchResult from '@/components/SearchResult.vue';
import SearchModalWindow from '@/components/SearchModalWindow.vue';
import SearchInput from '@/components/SearchInput.vue';
import { useSearchesStore } from '@/stores/SearchesStore';
import { useDailyRationsStore } from '@/stores/dailyRationsStore';
// import { Title } from 'chart.js';
// import { compile } from 'sass';

const searchStore = useSearchesStore();
const dailyRationStore = useDailyRationsStore();

const searchTitle = ref("");
const searchText = ref(null);
const searchInputLabel = ref("");
const searchedResource = ref("");

const searchInputProps = computed(() => {
  return {
    searchText: searchText.value,
    searchLabel: searchInputLabel.value,
    timeDelayMs: 1000,
  }
});

const searchResultProps = computed(() => {
  console.log(searchStore.searchResponseTotalCount == 0 ? true : false);
  return {
    searchResult: searchStore.searchResult,
    searchResponse: searchStore.searchResponse,
    isNothingFound: searchStore.searchResponseTotalCount == 0 && searchStore.searchResult ? true : false,
    searchResultLabel: 'Результаты поиска:',
    selectSearchResult: selectElement,
  }
});

const showSearchWindow = ref(false);

function showSearch(windowTitle, searchLabel, searchedRes) {

  // reset searcheStore if current search resource differs from previously
  if (searchedRes != searchStore.searchedResourse) {
    searchStore.$reset();
  }

  searchText.value = "";
  searchTitle.value = windowTitle;
  searchInputLabel.value = searchLabel;
  showSearchWindow.value = true;
  searchedResource.value = searchedRes;
}

function hideSearch() {
  showSearchWindow.value = false;
}

function selectElement(element) {

  dailyRationStore.addProduct(element);
  searchStore.saveRequestToHistory();
  searchStore.clearSearchRes();
  hideSearch();

}

</script>

<template>

  <!-- <SearchInput @search-event="searchProducts" @select-search-result-event="selectSearchResult"
    :search-result="searchResult" search-label="Поиск продукта\диеты" :search-result-label="searchResultLabel"
    :time-delay-ms="productSearchTimerDelayMs" /> -->


  <SearchModalWindow :for-slots="{ ...searchInputProps, ...searchResultProps }" :show-window="showSearchWindow"
    v-on:hide-window="hideSearch" :window-title="searchTitle">

    <template #searchInput="{ propsForSlot }">
      <SearchInput :search-label="propsForSlot.searchLabel" :time-delay-ms="propsForSlot.timeDelayMs"
        :search-text="propsForSlot.searchText" />
    </template>

    <template #searchOutput="{ propsForSlot }">
      <SearchResult :search-result-label="propsForSlot.searchResultLabel" :search-result="propsForSlot.searchResponse"
        :is-nothing-found="propsForSlot.isNothingFound" @select-search-result="propsForSlot.selectSearchResult" />
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

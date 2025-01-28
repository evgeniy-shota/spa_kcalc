<script setup>
import DailyProductFrom from '@/components/DailyProductFrom.vue';
import DailyActivityFrom from '@/components/DailyActivityFrom.vue';
import SearchResult from '@/components/SearchResult.vue';
import { useSearchesStore } from '@/stores/SearchesStore';

const searchStore = useSearchesStore();
</script>

<template>

  <!-- daily product and activity form search result -->
  <SearchResult :search-result="searchStore.searchRationResponse" />

  <!-- daily diet -->
  <div class="col">
    <DailyProductFrom />
  </div>

  <!-- daily activity -->
  <div class="col">
    <DailyActivityFrom />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RationStatistic from '@/components/RationStatistic.vue';
import ActivityStatistic from '@/components/ActivityStatistic.vue';
</script>

<template>
    <div class="col" style="max-height: 100%;">
        <RationStatistic />
    </div>
    <div class="col" style="max-height: 100%;">
        <ActivityStatistic />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import RationStatistic from '@/components/RationStatistic.vue';
import ActivityStatistic from '@/components/ActivityStatistic.vue';
</script>

<template>
    <div class="col">
        <RationStatistic />
    </div>
    <div class="col">
        <ActivityStatistic />
    </div>
</template>
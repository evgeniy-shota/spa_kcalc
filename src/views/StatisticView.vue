<script setup>
import { ref } from 'vue';
import RationStatistic from '@/components/RationStatistic.vue';
import ActivityStatistic from '@/components/ActivityStatistic.vue';
</script>

<template>
    <div class="col-12 col-mb-6 col-lg-6" style="max-height: 100%; max-width: 100%; overflow: hidden;">
        <RationStatistic />
    </div>
    <div class="col-12 col-mb-6 col-lg-6" style="max-height: 100%; max-width: 100%; overflow: hidden;">
        <ActivityStatistic />
    </div>
</template>
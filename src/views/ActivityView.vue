<script setup>
import axios from 'axios';
import { useActivitiesStore } from '@/stores/activitiesStore';

const activitiesStore = useActivitiesStore();

activitiesStore.getActivities();

function getActivityInfo(id) {
    activitiesStore.getActivity(id);
}

</script>

<template>
    <div class="col">
        <div class="card border-light p-3">
            В разработке
        </div>
    </div>
    <!-- <div class="col-7">
        <div class="card border border-light">
            <div class="list-group list-height-limit">
                <a v-for="activity in activitiesStore.activities" :key="activity.id"
                    class="list-group-item list-group-item-action" style="cursor: pointer;" aria-current="true"
                    v-on:click="getProductInfo(activity.id)">
                    <p class="mb-1">{{ activity.name }}</p>
                    <small>Энергозатраты: {{ activity.energy_cost }}</small>
                </a>

            </div>
        </div>
    </div>
    <div class="col">
        <div class="card border border-light">
            <p>Информация об актичности, затраты относительно дневной нормы</p>

        </div>
    </div> -->
</template>
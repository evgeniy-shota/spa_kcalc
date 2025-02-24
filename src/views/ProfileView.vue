<script setup>
import UserInfo from '@/components/UserInfo.vue';
import UserPersonalData from '@/components/UserPersonalData.vue';
import { useUsersStore } from '@/stores/usersStore';

const usersStore = useUsersStore();

</script>

<template>
    <!-- <div class="row"> -->
    <div class="col-12 col-md-6 mb-2" style="height: 100%;">
        <UserInfo :name="usersStore.userName" />
    </div>
    <div class="col-12 col-md-6" style="max-height: 100%;">
        <UserPersonalData />
    </div>
    <!-- </div> -->
</template>

<style lang="scss"></style>
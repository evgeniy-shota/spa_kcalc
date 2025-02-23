<script setup>
import UserInfo from '@/components/UserInfo.vue';
import UserPersonalData from '@/components/UserPersonalData.vue';
import { useUsersStore } from '@/stores/usersStore';

</script>

<template>
    <!-- <div class="row"> -->
    <div class="col" style="height: 100%;">
        <UserInfo />
    </div>
    <div class="col" style="max-height: 100%;">
        <UserPersonalData />
    </div>
    <!-- </div> -->
</template>

<style lang="scss"></style>
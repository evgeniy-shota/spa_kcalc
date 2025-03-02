<script setup>
import UserInfo from '@/components/UserInfo.vue';
import UserPersonalData from '@/components/UserPersonalData.vue';
import { useProductsStore } from '@/stores/productsStore';
import { useUsersStore } from '@/stores/usersStore';
import { computed, onMounted } from 'vue';

const productStore = useProductsStore();
const usersStore = useUsersStore();

onMounted(() => {
    productStore.productsFilter.is_personal = false;
    productStore.getFilteredProducts();
});

const currentWeight = computed(() => {
    console.log('curr weight: ')
    return usersStore.currentWeight;
});

const userGender = computed(() => {
    return usersStore.gender
});

function updateUserInfo(info) {
    console.log('user info update');
    usersStore.updateUserInfo(info);
}

</script>

<template>
    <!-- <div class="row"> -->
    <div class="col-12 col-md-6 mb-2" style="height: 100%;">
        <UserInfo :name="usersStore.userName" :email="usersStore.userEmail"
            :date-of-registration="usersStore.dateOfRegistration" :gender="userGender"
            :date-of-birth="usersStore.dateOfBirth" :training-level="usersStore.trainingLevel"
            :activity-level="usersStore.activityLevel" :height="usersStore.height"
            :target-weight="usersStore.targetWeight" :current-weight="currentWeight" :weight="usersStore.weight"
            @save-info="updateUserInfo" />
    </div>

    <div class="col-12 col-md-6" style="height: 100%;">
        <UserPersonalData :products="productStore.products" :is-products-found="productStore.isProductsFound"
            :categories="productStore.categories" :is-categories-found="productStore.isCategoriesFound" />
    </div>
    <!-- </div> -->
</template>

<style lang="scss"></style>
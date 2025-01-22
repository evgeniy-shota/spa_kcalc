<script setup>
import { useDietsStore } from '@/stores/dietsStore';
import { useUsersStore } from '@/stores/usersStore';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUsersStore();
const dietStore = useDietsStore();

const timeInMs = 2500;
const routerPathToRedirect = "/";


async function logout() {
    let logoutResponce = await userStore.logout();
    if (logoutResponce.result) {

        userStore.$reset();
        dietStore.$reset();
        setTimeout(redirectToRouterPath, timeInMs, routerPathToRedirect);
    }
}

function redirectToRouterPath(path) {
    router.push(path);
}


onBeforeMount(() => {
});

onMounted(() => {
    logout();
});

</script>


<!-- change input form, replace floating lables -->
<template>
    <div class="col"></div>
    <div class="col">
        <div class="card top-50">
            <h4 class="card-header">Вы вышли из аккаунта</h4>
            <div class="card-body">
                <h5>Вы будете перенаправлены на "Главную" страницу</h5>
            </div>
        </div>
    </div>
    <div class="col"></div>

</template>
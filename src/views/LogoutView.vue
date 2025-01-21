<script setup>
import { useUsersStore } from '@/stores/usersStore';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUsersStore();

const timeInMs = 3000;
const routerPathToRedirect = "/"


function logout() {
    userStore.logout();
}

function redirectToRouterPath(path) {
    router.push(path);
}


onBeforeMount(() => {
});

onMounted(() => {
    logout();
    setTimeout(redirectToRouterPath, timeInMs, routerPathToRedirect)
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
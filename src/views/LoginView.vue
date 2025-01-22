<script setup>
import { useUsersStore } from '@/stores/usersStore';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUsersStore();
const router = useRouter();

const email = ref("user2@mail.com");
const password = ref("user2");
const loginResult = ref({ result: false, response: {} });

// need add validation

async function login(userEmail, userPassword) {
    loginResult.value = await userStore.login(userEmail, userPassword);
}

function redirectToRoute(path = 'home') {
    router.push(path);
}

watch(loginResult, () => {
    if (loginResult.value.result) {
        console.log('Login successful');
        redirectToRoute('/');
    }
});

</script>


<!-- change input form, replace floating lables -->
<template>
    <div class="col"></div>
    <div class="col">
        <div class="card top-50">
            <h4 class="card-header">Войти</h4>
            <div class="card-body">

                <form action="">
                    <div class="form-floating mb-2">
                        <input type="text" v-model="email" class="form-control" id="loginInput"
                            placeholder="name@example.com">
                        <label for="loginInput">Email address {{ email }}</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" v-model="password" class="form-control" id="passwordInput"
                            placeholder="Password">
                        <label for="passwordInput">Password {{ password }}</label>
                    </div>

                    <div class="d-grid">
                        <button class="btn btn-primary" v-on:click="login(email, password)" type="button">Войти</button>
                    </div>
                    <a href="" class="link">Забыли пароль?</a>
                </form>
            </div>
        </div>
    </div>
    <div class="col"></div>

</template>
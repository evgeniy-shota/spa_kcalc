<script setup>
import { ref, watch } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { useRouter } from 'vue-router';

import { validateFormData } from '@/resource/js/dataValidation';

const userStore = useUsersStore();
const router = useRouter();

const name = ref('Ёuser11');
const email = ref("user11@mail.com");
const password = ref("user11");
const conf_password = ref("user111");
// const validationError = ref({
//     nameInput: [],
//     emailInput: [],
//     passwordInput: [],
//     passwordConfInput: [],
// })
const registerResult = ref({ result: false, response: {} })
// { result: false, error: null, user: null }

async function registrate(userEmail, userName, userPassword) {

    let { dataIsValid, validationError } = validateFormData(name.value, email.value, password.value, conf_password.value);
    if (!dataIsValid) {
        console.log('Form data is invalid: ' + dataIsValid);
        console.log(validationError);

        return 0;
    }

    registerResult.value = await userStore.register(userName, userEmail, userPassword);
}

function redirectToRoute(path = 'home') {
    router.push(path);
}

watch(registerResult, () => {
    console.log(registerResult.value);
    if (registerResult.value.result) {
        setTimeout(redirectToRoute, 3000, 'login');
    }
});
</script>


<!-- replace floating labels -->
<template>
    <div class="col-12 col-sm-2 col-md-3 col-lg"></div>
    <div class="col-12 col-sm col-md col-lg">
        <div id="registrationFormCard" v-show="!registerResult.result" class="card">
            <h4 class="card-header">Регистрация</h4>
            <div class="card-body">
                <form action="">
                    <div class="form-floating mb-2">
                        <input type="text" v-model="name" class="form-control" id="nameInput" placeholder="Ivan">
                        <label for="nameInput">Name</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="email" v-model="email" class="form-control" id="emailInput"
                            placeholder="name@example.com">
                        <label for="emailInput">Email address</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" v-model="password" class="form-control" id="passwordInput"
                            placeholder="Password">
                        <label for="passwordInput">Password</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" v-model="conf_password" class="form-control" id="passwordConfirm"
                            placeholder="Password confirm">
                        <label for="passwordConfirm">Password confirm</label>
                    </div>

                    <div class="d-grid">
                        <button @click="registrate(email, name, password)" class="btn btn-primary"
                            type="button">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-show="registerResult.result" class="card top-50">
            <div class="card-header">Регистрация прошла успешно
            </div>
            <div class="card-body">
                <h6>Вы будете перенаправлены на страницу входа </h6>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-2 col-md-3 col-lg"></div>
</template>

<style lang="scss">
// @media (max-width: 768px) {
//     #registrationFormCard {
//         top: 15%;
//     }
// }

#registrationFormCard {
    top: 15%;
}
</style>
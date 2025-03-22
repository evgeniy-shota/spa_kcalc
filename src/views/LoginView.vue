<script setup>
import { useUsersStore } from '@/stores/usersStore';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { validateLogin, validateEmail, validatePassword } from '@/resource/js/dataValidation';
import IconBoxArrowInRight from '@/components/icons/IconBoxArrowInRight.vue';

const userStore = useUsersStore();
const router = useRouter();

const loginUser = ref(null);
const passwordUser = ref(null);
const loginResult = ref({ result: false, response: {} });

const formInputInfo = ref({
    login: {
        info: '',
        error: [],
    },
    password: {
        info: '',
        error: [],
    },
});

async function login(userLogin, userPassword) {

    if (!validateFormData(userLogin, userPassword)) {
        return
    }

    loginResult.value = await userStore.login(userLogin, userPassword);
    if (!loginResult.value.result) {
        console.log(loginResult.value);
        formInputInfo.value.login.error = 'name' in loginResult.value.response ? loginResult.value.response.name : [];
        formInputInfo.value.password.error = 'password' in loginResult.value.response ? loginResult.value.response.password : [];
    } else {
        redirectToRoute('/');
    }
}

function validateFormData(login, password) {
    let validationLogin = validateLogin(login);
    let validationPassword = validatePassword(password);

    let errorCount = 0;
    // let validCount = 0;
    if (!validationLogin.isValid) {
        formInputInfo.value.login.error = validationLogin.errors;
        errorCount += 1;
    }

    if (!validationPassword.isValid) {
        formInputInfo.value.password.error = validationPassword.errors;
        errorCount += 1;
    }

    return errorCount == 0 ? true : false;
}

function redirectToRoute(path = 'home') {
    router.push(path);
}

function formInputHelperClasses(isValid = true) {
    let classes = '';
    if (!isValid) {
        classes += 'text-danger ';
    }

    return classes
}

function formInputClasses(isValid = true) {
    let classes = '';
    if (!isValid) {
        classes += 'border-danger-subtle ';
    }

    return classes
}

// watch(loginResult, () => {
//     if (loginResult.value.result) {
//         console.log('Login successful');
//         redirectToRoute('/');
//     }
// });

</script>


<!-- change input form, replace floating lables -->
<template>
    <div class="col-12 col-sm-2 col-md-3 col-lg"></div>
    <div class="col-12 col-sm col-md col-lg">
        <div id="lofinFormCard" class="card border-light">
            <h4 class="card-header border-light">Вход</h4>
            <div class="card-body">
                <form action="">
                    <div class="mb-2">
                        <label for="loginInput" class="form-label mb-1">Логин</label>
                        <input type="text" v-model="loginUser" class="form-control"
                            :class="formInputClasses(formInputInfo.login.error.length == 0)" id="loginInput"
                            placeholder="">
                        <div class="form-text" :class="formInputHelperClasses(formInputInfo.login.error.length == 0)">{{
                            formInputInfo.login.error.length == 0 ? formInputInfo.login.info :
                                formInputInfo.login.error[0] }}</div>
                    </div>
                    <div class="mb-2">
                        <label for="passwordInput" class="form-label mb-1">Пароль</label>
                        <input type="password" v-model="passwordUser" class="form-control"
                            :class="formInputClasses(formInputInfo.password.error.length == 0)" id="passwordInput"
                            placeholder="">
                        <div class="form-text"
                            :class="formInputHelperClasses(formInputInfo.password.error.length == 0)">{{
                                formInputInfo.password.error.length == 0 ? formInputInfo.password.info
                                    :
                                    formInputInfo.password.error[0] }}</div>
                    </div>

                    <div class="d-grid">
                        <button class="btn btn-primary" v-on:click="login(loginUser, passwordUser)" type="button">
                            <IconBoxArrowInRight />
                            Войти
                        </button>
                    </div>
                    <!-- <a href="" class="link">Забыли пароль?</a> -->
                </form>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-2 col-md-3 col-lg"></div>

</template>

<style lang="scss">
@media (max-width: 768px) {
    #lofinFormCard {
        top: 15%;
    }
}

#lofinFormCard {
    top: 25%;
}
</style>
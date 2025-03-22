<script setup>
import { ref, watch } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { useRouter } from 'vue-router';

import { validateFormData, validateLogin, validateEmail, validatePassword } from '@/resource/js/dataValidation';

const userStore = useUsersStore();
const router = useRouter();

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confPassword = ref(null);
const formInputsRestrictions = {
    login: {
        minLen: 3,
        maxLen: 24,
    },
    email: {
        minLen: 8,
        maxLen: 100,
    },
    password: {
        minLen: 8,
        maxLen: 24,
    }
};

const formInputsHelpers = ref({
    login: {
        info: `От ${formInputsRestrictions.login.minLen} до ${formInputsRestrictions.login.maxLen} латинских букв и цифр`,
        errors: [],
    },
    email: {
        info: `От ${formInputsRestrictions.email.minLen} до ${formInputsRestrictions.email.maxLen} латинских букв и цифр`,
        errors: [],
    },
    password: {
        info: `От ${formInputsRestrictions.email.minLen} до ${formInputsRestrictions.email.maxLen} латинских букв, цифр, символов !-_?`,
        errors: [],
    },
    confPassword: {
        info: 'Пароли должны совпадать',
        errors: [],
    },
});
// const validationError = ref({
//     nameInput: [],
//     emailInput: [],
//     passwordInput: [],
//     passwordConfInput: [],
// })
const registerResult = ref({ result: false, response: {} })
// { result: false, error: null, user: null }

async function registrate(userEmail, userLogin, userPassword, confPassword) {

    // let { dataIsValid, validationError } = validateFormData(name.value, email.value, password.value, conf_password.value);
    if (!validateForm(userEmail, userLogin, userPassword, confPassword)) {
        console.log('Form data is invalid:');

        return 0;
    }

    registerResult.value = await userStore.register(userLogin, userEmail, userPassword);

    if (!registerResult.value.result) {
        console.log(registerResult.value)
        formInputsHelpers.value.login.errors = 'name' in registerResult.value.response ? registerResult.value.response.name : []
        formInputsHelpers.value.email.errors = 'email' in registerResult.value.response ? registerResult.value.response.email : []
        formInputsHelpers.value.password.errors = 'password' in registerResult.value.response ? registerResult.value.response.password : []
    }

    console.log('reg res');
    console.log(registerResult.value)
}

function validateForm(userEmail, userLogin, userPassword, confPassword) {

    let loginValidate = validateLogin(userLogin, 3, 24);
    let emailValidate = validateEmail(userEmail, 8, 100);
    let passwordValidate = validatePassword(userPassword, 8, 24);

    if (!loginValidate.isValid) {
        formInputsHelpers.value.login.errors = loginValidate.errors;
    } else {
        formInputsHelpers.value.login.errors.length = 0;
    }

    if (!emailValidate.isValid) {
        formInputsHelpers.value.email.errors = emailValidate.errors;
    } else {
        formInputsHelpers.value.email.errors.length = 0;
    }

    if (!passwordValidate.isValid) {
        formInputsHelpers.value.password.errors = passwordValidate.errors;
    } else {
        formInputsHelpers.value.password.errors.length = 0;
    }


    if (loginValidate.isValid && emailValidate.isValid && passwordValidate.isValid) {
        if (userPassword !== confPassword) {
            formInputsHelpers.value.confPassword.errors = ['Пароли не совпадают'];
            return false
        }
        // check unique email and login
        return true
    }

    return false
}

function formInputClasses(isValid = true) {
    let classes = '';
    if (!isValid) {
        classes += 'text-danger ';
    }

    return classes
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
        <div id="registrationFormCard" v-show="!registerResult.result" class="card border-light">
            <h4 class="card-header border-light">Регистрация</h4>
            <div class="card-body">
                <form action="">
                    <div class="mb-2">
                        <label class="form-label mb-1" for="loginInput">Логин</label>
                        <input type="text" v-model="name" class="form-control" id="loginInput" placeholder="">
                        <div id="" class="form-text"
                            :class="formInputClasses(formInputsHelpers.login.errors.length == 0)">{{
                                formInputsHelpers.login.errors.length == 0 ?
                                    formInputsHelpers.login.info : formInputsHelpers.login.errors[0] }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label mb-1" for="emailInput">Email</label>
                        <input type="email" v-model="email" class="form-control" id="emailInput" placeholder="">
                        <div class="form-text" :class="formInputClasses(formInputsHelpers.email.errors.length == 0)">{{
                            formInputsHelpers.email.errors.length == 0 ?
                                formInputsHelpers.email.info : formInputsHelpers.email.errors[0] }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label mb-1" for="passwordInput">Пароль</label>
                        <input type="password" v-model="password" :min="formInputsRestrictions.password.minLen"
                            :max="formInputsRestrictions.password.maxLen" class="form-control" id="passwordInput"
                            placeholder="">
                        <div class="form-text" :class="formInputClasses(formInputsHelpers.password.errors.length == 0)">
                            {{ formInputsHelpers.password.errors.length == 0 ?
                                formInputsHelpers.password.info : formInputsHelpers.password.errors[0] }}</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label mb-1" for="passwordConfirm">Повторите пароль </label>
                        <input type="password" v-model="confPassword" class="form-control" id="passwordConfirm"
                            placeholder="">
                        <div class="form-text"
                            :class="formInputClasses(formInputsHelpers.confPassword.errors.length == 0)">{{
                                formInputsHelpers.confPassword.errors.length == 0 ?
                                    formInputsHelpers.confPassword.info : formInputsHelpers.confPassword.errors[0] }}</div>
                    </div>

                    <div class="d-grid">
                        <button @click="registrate(email, name, password, confPassword)" class="btn btn-primary"
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
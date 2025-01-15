<script setup>
import axios from 'axios';
import { ref } from 'vue';

const email = ref("ttuser@mail.com");
const password = ref("qwerty");



function login(userEmail, userPassword) {

    axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")
        .then((response) => {
            console.log("Get csrf");
            console.log(response.headers);
            // console.log(response);
            // axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    // axios.post("http://127.0.0.1:8000/api/login", {
    //     email: userEmail,
    //     password: userPassword
    // })
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((error) => {
    //         console.log('We hawe a problem....');
    //         console.log(error);
    //     });
}

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
                        <input type="text" :value="email" class="form-control" id="loginInput"
                            placeholder="name@example.com">
                        <label for="loginInput">Email address {{ email }}</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" :value="password" class="form-control" id="passwordInput"
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
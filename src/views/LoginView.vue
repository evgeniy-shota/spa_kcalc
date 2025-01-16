<script setup>
import axios from 'axios';
import { ref } from 'vue';

const email = ref("");
const password = ref("");



function login(userEmail, userPassword) {

    axios.defaults.withXSRFToken = true;
    axios.defaults.withCredentials = true;

    axios.get("http://localhost:8000/sanctum/csrf-cookie")
        .then((response) => {
            console.log("Get csrf");

            axios.post("http://localhost:8000/api/login", {
                email: userEmail,
                password: userPassword
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log('Login problem....');
                    console.log(error);
                });

        })
        .catch((error) => {
            console.log('CSRF-Login problem');

            console.log(error);
        });


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
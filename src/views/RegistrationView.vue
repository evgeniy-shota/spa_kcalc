<script setup>
import { ref } from 'vue';
import axios from 'axios';

const name = ref('someName');
const email = ref("anotherSome@email.com");
const password = ref("qwerty");

function registrate(userEmail, userName, userPassword) {
    axios.defaults.withXSRFToken = true;
    axios.defaults.withCredentials = true;

    axios.get("http://localhost:8000/sanctum/csrf-cookie")
        .then((response) => {
            console.log("Get csrf");

            axios.post("http://localhost:8000/api/registration", {
                email: userEmail,
                name: userName,
                password: userPassword,
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log("Trouble with registration...");

                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });


}
</script>


<!-- replace floating labels -->
<template>
    <div class="col"></div>
    <div class="col">
        <div class="card top-50">
            <h4 class="card-header">Регистрация</h4>
            <div class="card-body">
                <form action="">
                    <div class="form-floating mb-2">
                        <input type="text" :value="name" class="form-control" id="nameInput" placeholder="Ivan">
                        <label for="nameInput">Name</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="email" :value="email" class="form-control" id="emailInput"
                            placeholder="name@example.com">
                        <label for="emailInput">Email address</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" :value="password" class="form-control" id="passwordInput"
                            placeholder="Password">
                        <label for="passwordInput">Password</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" class="form-control" id="passwordConfirm" placeholder="Password confirm">
                        <label for="passwordConfirm">Password confirm</label>
                    </div>

                    <div class="d-grid">
                        <button @click="registrate(email, name, password)" class="btn btn-primary"
                            type="button">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col"></div>
</template>
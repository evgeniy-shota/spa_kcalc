<script setup>
import { ref } from 'vue';
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
                        <input type="text" class="form-control" id="loginInput" placeholder="name@example.com">
                        <label for="loginInput">Email address</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" class="form-control" id="passwordInput" placeholder="Password">
                        <label for="passwordInput">Password</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" class="form-control" id="passwordConfirm" placeholder="Password confirm">
                        <label for="passwordConfirm">Password confirm</label>
                    </div>

                    <div class="d-grid">
                        <button class="btn btn-primary" type="button">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col"></div>
</template>
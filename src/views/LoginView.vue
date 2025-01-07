<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="col"></div>
    <div class="col">
        <div class="card top-50 p-2">
            <form action="">
                <h6>Войти</h6>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="loginInput" placeholder="name@example.com">
                    <label for="loginInput">Email address</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="password" class="form-control" id="passwordInput" placeholder="Password">
                    <label for="passwordInput">Password</label>
                </div>

                <div class="d-grid">
                    <button class="btn btn-primary" type="button">Войти</button>
                </div>
            </form>
        </div>
    </div>
    <div class="col"></div>

</template>
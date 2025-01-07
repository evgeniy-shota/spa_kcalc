<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary border rounded-bottom-2">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <a class="navbar-brand" href="#">Kcalc</a>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink class="nav-link active" aria-current="page" to="/">Главная</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/products">Продукты</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link disabled" to="/diet">Диета</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link disabled" to="/activity">Активности</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link disabled" to="/statistic">Статистика</RouterLink>
                        </li>
                    </ul>

                    <form class="d-flex" role="search">
                        <RouterLink class="btn btn-outline-success" to="/login">Войти</RouterLink>

                        <RouterLink class="btn btn-outline-success" to="/registration">Регистрация</RouterLink>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import IconPersonFill from './icons/IconPersonFill.vue';
import IconBoxArrowRight from './icons/IconBoxArrowRight.vue';
import IconBoxArrowInRight from './icons/IconBoxArrowInRight.vue';

const route = useRoute();

const props = defineProps({
    userIsAuthorized: { type: Boolean, required: true, default: false },
    userName: { type: String, default: "TestName" }
});
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-light-subtle border border-light  rounded-bottom-2">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <RouterLink class="navbar-brand" to="/">Kcalc</RouterLink>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink class="nav-link px-3" :class="{ 'active': route.name == 'home' }"
                                aria-current="page" to="/">Главная</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link px-3" :class="{ 'active': route.name == 'products' }"
                                to="/products">Продукты</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link px-3" :class="{ 'active': route.name == 'diets' }" to="/diets">
                                Диета
                            </RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link px-3" :class="{ 'active': route.name == 'activities' }"
                                to="/activities">Активности</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link px-3" :class="{ 'active': route.name == 'statistic' }"
                                to="/statistic">Статистика</RouterLink>
                        </li>
                    </ul>

                    <form class="d-flex">
                        <div v-if="props.userIsAuthorized">
                            <div class="btn btn-outline-primary me-2">
                                <RouterLink class="nav-link px-3" to="/profile">
                                    <IconPersonFill />
                                    {{ props.userName }}
                                </RouterLink>
                            </div>
                            <RouterLink class="btn btn-outline-dark" to="/logout">
                                <IconBoxArrowRight />
                                Выйти
                            </RouterLink>
                        </div>
                        <div v-else>
                            <RouterLink class="btn btn-outline-success me-2" to="/login">
                                <IconBoxArrowInRight />
                                Войти
                            </RouterLink>
                            <RouterLink class="btn btn-outline-success" to="/registration">Зарегистрироваться
                            </RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss"></style>
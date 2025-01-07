<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="card ps-2 pe-2 pt-2">
        <h6>Дневная активность</h6>
        <form action="" method="">

            <div class="input-group mb-2">
                <input type="text" class="form-control" placeholder="Recipient's username"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
            </div>

            <div class="row">
                <div class="col">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input name="radiogr1" class="form-check-input mt-0" type="radio" value=""
                                aria-label="Radio button for following text input">
                        </div>
                        <input type="text" class="form-control" aria-label="Text input with radio button">
                        <span class="input-group-text">мин.</span>
                    </div>
                </div>

                <div class="col">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input name="radiogr1" class="form-check-input mt-0" type="radio" value=""
                                aria-label="Radio button for following text input">
                        </div>
                        <input type="text" class="form-control" aria-label="Text input with radio button">
                        <span class="input-group-text">раз</span>
                    </div>
                </div>
            </div>

            <ul class="list-group mb-2">
                <li class="list-group-item">
                    <div class="hstack gap-5">
                        <div class="">Активность 1</div>
                        <a class=" btn btn-outline-warning btn-sm ms-auto">del</a>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="hstack gap-5">
                        <div class="">Активность 1</div>
                        <a class=" btn btn-outline-warning btn-sm ms-auto">del</a>
                    </div>
                </li>
            </ul>

            <!-- общее значение активностей -->
            <div class="mb-2">
                <span class="border rounded ps-2 pe-2 me-2">Primary</span>
                <span class="border rounded ps-2 pe-2 me-2">Primary</span>
                <span class="border rounded ps-2 pe-2 me-2">Primary</span>
            </div>

            <div class="d-grid gap-2 mb-2">
                <button class="btn btn-primary" type="button">Добавить</button>
            </div>
        </form>
    </div>
</template>
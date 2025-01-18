<script setup>
import { ref } from 'vue';
import { useDietsStore } from '@/stores/dietsStore';
import axios from 'axios';

const selected_products = [];

const dietsStore = useDietsStore();
</script>

<template>
    <div class="col-5">
        <div class="card pt-2 ps-2 pe-2">
            <div class="d-flex flex-row mb-2">
                <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm"
                    aria-label=".form-control-sm example">

                <button type="button" class="btn btn-light">Поиск</button>
                <button type="button" class="btn btn-light">Фильтр</button>
                <button type="button" class="btn btn-light">Очистить</button>

            </div>

            <div class="list-group list-height-limit mb-2">
                <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">List group item heading</h6>
                        <small>Delete</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small>Calory, carb, prot, fats</small>
                </a>
                <!-- <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">List group item heading</h5>
                        <small class="text-body-secondary">3 days ago</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small class="text-body-secondary">And some muted small print.</small>
                </a> -->
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card pt-2 ps-2 pe-2">
            <form action="">
                <ul class="list-group mb-2">
                    <li class="list-group-item">
                        <div class="d-flex flex-row">
                            <div class="p-1 flex-grow-1">Продукт</div>
                            <div class="p-1">
                                <input type="number" name="productNumber" id="productNumber">
                            </div>

                            <button type="button" class="btn p-1" aria-label="Remove">X</button>

                        </div>
                    </li>

                </ul>

                <h6>Общая калорийность
                    <span class="badge text-bg-secondary">ккал</span>
                    <span class="badge text-bg-secondary">гр</span>
                    <span class="badge text-bg-secondary">гр</span>
                    <span class="badge text-bg-secondary">гр</span>
                </h6>
                <div class="d-grid gap-2 mb-2">
                    <button class="btn btn-primary" type="button">Сохранить</button>
                    <button class="btn btn-outline-warning" type="button">Очистить</button>
                </div>
            </form>
        </div>
    </div>
</template>
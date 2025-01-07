<script setup>
import { ref } from 'vue';
import PieChart from './PieChart.vue';
</script>

<template>
    <div class="card ps-2 pe-2 pt-2">
        <div class="hstack gap-1 mb-2">
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>
            </div>
        </div>

        <div class="container mb-2">
            <PieChart />
        </div>

        <!-- форма продукта -->
        <div class="container">
            <form action="" method="">
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="product-title" placeholder="Наименование продукта">
                    <label for="product-title">Наименование продукта</label>
                </div>

                <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="product-val-cal"
                            placeholder="Наименование продукта">
                        <label for="product-val-cal">Калории</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="product-val-carb"
                            placeholder="Наименование продукта">
                        <label for="product-val-carb">Углеводы</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="product-val-prot"
                            placeholder="Наименование продукта">
                        <label for="product-val-prot">Белки</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="product-val-fat"
                            placeholder="Наименование продукта">
                        <label for="product-val-fat">Жиры</label>
                    </div>
                </div>

                <div class="form-floating mb-2">
                    <textarea class="form-control" placeholder="Описание" id="floatingTextarea2"
                        style="height: 100px"></textarea>
                    <label for="floatingTextarea2">Описание</label>
                </div>

                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Тип</th>
                            <th>Значение</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Пищевые волокна</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Магний</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Кальций</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-grid gap-2 mb-2">
                    <button class="btn btn-primary" type="button">Сохранить</button>
                </div>

            </form>
        </div>
    </div>

</template>

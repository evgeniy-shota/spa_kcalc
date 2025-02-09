<script setup>
import { ref, computed } from 'vue';
import PieChart from './PieChart.vue';
import { useProductsStore } from '@/stores/productsStore';

const productsStore = useProductsStore();

const productNutrAndVitArray = computed(() => {
    if ('empty' in productsStore.product.nutrients_and_vitamins) {
        return [];
    }
    // JSON.stringify(
    return Object.entries(productsStore.product.nutrients_and_vitamins);
});

</script>

<template>
    <div class="card ps-2 pe-2 pt-2 pr-info-container border border-light">
        <div class="hstack gap-1 mb-2">
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>
            </div>
        </div>

        <div class="container mb-2">
            <PieChart :kcal="productsStore.product.calory" :carbohydrates="productsStore.product.carbohydrates"
                :proteins="productsStore.product.proteins" :fats="productsStore.product.fats" />
        </div>

        <!-- форма продукта -->
        <div class="container">
            <form action="" method="">
                <div class="form-floating mb-2">
                    <input type="text" :value="productsStore.product.name" class="form-control" id="product-title"
                        placeholder="Наименование продукта">
                    <label for="product-title">Наименование продукта</label>
                </div>

                <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" :value="productsStore.product.calory" class="form-control"
                            id="product-val-cal" placeholder="Наименование продукта">
                        <label for="product-val-cal">Калории</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" :value="productsStore.product.carbohydrates" class="form-control"
                            id="product-val-carb" placeholder="Наименование продукта">
                        <label for="product-val-carb">Углеводы</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" :value="productsStore.product.proteins" class="form-control"
                            id="product-val-prot" placeholder="Наименование продукта">
                        <label for="product-val-prot">Белки</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" :value="productsStore.product.fats" class="form-control" id="product-val-fat"
                            placeholder="Наименование продукта">
                        <label for="product-val-fat">Жиры</label>
                    </div>
                </div>

                <div class="form-floating mb-2">
                    <textarea class="form-control" placeholder="Состав" id="productComposition"
                        style="height: 100px">{{ productsStore.product.description }}</textarea>
                    <label for="productComposition">Состав</label>
                </div>

                <div class="form-floating mb-2">
                    <textarea class="form-control" placeholder="Описание" id="productDescription"
                        style="height: 100px">{{ productsStore.product.description }}</textarea>
                    <label for="productDescription">Описание</label>
                </div>

                <div class="card mb-2">
                    <div class="card-header">Нутриенты и витамины</div>
                    <div class="card-body pt-1 pb-1">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Элемент</th>
                                    <th>Количество</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="val in productNutrAndVitArray">
                                    <td>{{ val[0] }}</td>
                                    <td>{{ val[1] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="d-grid gap-2 mb-2">
                    <button class="btn btn-primary" type="button">Сохранить</button>
                </div>

            </form>
        </div>
    </div>

</template>

<style>
.pr-info-container {
    max-height: 85vh;
    overflow-y: scroll;
}
</style>
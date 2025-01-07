<script setup>
import { ref } from 'vue';

</script>

<template>


    <div class="col-3">
        <div class="card progress-bar ">
            <h6 class="card-header">Калории</h6>
        </div>
    </div>

    <div class="col-3">
        <div class="card progress-bar">
            <h6 class="card-header">Углеводы</h6>
        </div>
    </div>
    <div class="col-3">
        <div class="card progress-bar">
            <h6 class="card-header">Белки</h6>
        </div>
    </div>
    <div class="col-3">
        <div class="card progress-bar">
            <h6 class="card-header">Жиры</h6>
        </div>
    </div>


</template>

<style>
.progress-bar {
    background: linear-gradient(to right,
            rgb(171, 218, 252) 25%,
            white 25% 100%);

}
</style>
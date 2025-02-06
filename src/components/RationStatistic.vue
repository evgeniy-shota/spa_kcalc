<script setup>
import IconArrowLeftShort from './icons/IconArrowLeftShort.vue';
import IconArrowRightShort from './icons/IconArrowRightShort.vue';
import IconCloseX from './icons/IconCloseX.vue';
import LineChart from './LineChart.vue';
</script>

<template>

    <div class="card">
        <div class="card-header">Статистика питания</div>
        <div class="card-body">

            <!-- filter -->
            <div class="row">
                <div class="col me-1">
                    <!-- input-group-sm -->
                    <div class="input-group mb-2">
                        <span class="input-group-text" id="inputGroup-sizing-default">Период</span>
                        <select class="form-select" aria-label="Default select example">
                            <option selected value="1">День</option>
                            <option value="2">Неделя</option>
                            <option value="3">Месяц</option>
                        </select>
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">
                            <IconCloseX :size="24" />
                        </button>
                    </div>
                </div>
                <div class="col">
                    <!-- input-group-sm -->
                    <div class="input-group mb-2">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">
                            <IconArrowLeftShort :size="24" />
                        </button>
                        <input type="text" readonly class="form-control" value="14.02 - 21.02" placeholder="Username"
                            aria-label="Username" aria-describedby="basic-addon1">
                        <!-- <span class="input-group-text" id="inputGroup-sizing-default">14.02 - 21.02</span> -->
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">
                            <IconArrowRightShort :size="24" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- chart -->
            <div class="row">
                <div class="col">
                    <div class="chart-container">
                        <LineChart />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
.chart-container {
    min-height: 25vh;
    max-height: 30vh;
}
</style>
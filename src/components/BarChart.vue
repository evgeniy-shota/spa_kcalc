<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs';
import { computed, onBeforeMount, ref } from 'vue';

const COLORS = ref([
    '#6A994E',
    '#A7C957',
    '#F2E8CF',
    '#BC4749',
    '#386641',
    '#001524',
    '#15616D',
    '#FFECD1',
    '#FF7D00',
    '#78290F',
    '#EF476F',
    '#FFD166',
    '#06D6A0',
    '#118AB2',
    '#073B4C',
])


const props = defineProps({
    dataset: {
        type: Object,
        default: {
            labels: ['some', 'some', 'some'],
            datasets: [{
                data: [40, 39, 10],
                label: 'label-1',
            }],
        },
    },
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true
        }
    }
})

const chartData = computed(() => {
    console.log('chartDate');

    if (!props.dataset || props.dataset.datasets.length == 0) {
        return {
            labels: '',
            datasets: []
        }
    }

    if (props.dataset.datasets.length > 0) {

        // let data = {
        //     labels: props.dataset.labels,
        //     datasets: [
        //     ],
        // };

        // for (let i = 0; i < props.dataset.datasets.length; i++) {
        //     data.datasets.push(
        //         {
        //             label: props.dataset.datasets[i].label,
        //             data: props.dataset.datasets[i].data,
        //             backgroundColor: COLORS.value[i],
        //             borderColor: COLORS.value[i],
        //         },
        //     );
        // }

        return props.dataset;
    }

    return {
        labels: '',
        datasets: []
    }
});


onBeforeMount(() => {
    ChartJS.register(
        CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
});

</script>

<template>
    <div v-show="!props.dataset">Нет данных</div>
    <Bar v-show="props.dataset" :data="chartData" :options="chartOptions" />
</template>

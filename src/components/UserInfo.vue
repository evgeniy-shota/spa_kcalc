<script setup>
import { computed } from 'vue';
import LineChart from './LineChart.vue';
import IconPersonFill from './icons/IconPersonFill.vue';
import IconCloseX from './icons/IconCloseX.vue';
import IconClipboardPlus from './icons/IconClipboardPlus.vue';
import IconEnvelope from './icons/IconEnvelope.vue';
import IconEnvelopeCheck from './icons/IconEnvelopeCheck.vue';

const props = defineProps({
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    dateOfRegistration: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: null,
    },
    dateOfBirth: {
        type: String,
        default: null,
    },
    trainingLevel: {
        type: String,
        default: null,
    },
    activityLevel: {
        type: String,
        default: null,
    },
    height: {
        type: Number,
        default: null,
    },
    weight: {
        type: Number,
        default: null,
    },
    targetWeight: {
        type: Number,
        default: null,
    },
});

const emit = defineEmits({
    updateInfo: () => { },
});

const dateOfBirth = computed(() => {
    return props.data
});

</script>

<template>
    <div class="card border-light" style="height: 100%; overflow-y: scroll;">
        <div class="card-body">
            <div class="mb-1 border-bottom pb-1">
                <div class="d-flex justify-content-between">
                    <div>
                        <IconPersonFill :size="20" class="me-1" />Логин: {{ props.name }}
                        <div>
                            <IconEnvelopeCheck v-if="props.isVerified" class="me-1" :size="20" />
                            <IconEnvelope v-else :size="20" />
                            <span>email: {{ props.email }}</span>
                        </div>
                    </div>

                    <div>
                        <div>Дата регистрации:</div>
                        <div>{{ props.dateOfRegistration }}</div>
                    </div>
                </div>
            </div>

            <!-- <div class="mb-2">
                <label for="userName" class="form-label mb-1">Логин</label>
                <input type="text" name="userName" id="userName" class="form-control">
            </div>
            <div class="mb-2">
                <label for="userEmail" class="form-label mb-1">Почта</label>
                <input type="email" name="userEmail" id="userEmail" class="form-control">
            </div>
             -->
            <div class="mb-2">
                <label for="userGender" class="form-label mb-1">Пол</label>
                <select name="userGender" id="userGender" class="form-select">
                    <option value="man">Мужской</option>
                    <option value="woman">Женкий</option>
                    <option selected value="unknow">Не указан</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="userDateOfBirth" class="form-label mb-1">Дата рождения</label>
                <input type="date" name="userDateOfBirth" id="userDateOfBirth" class="form-control">
            </div>
            <div class="mb-2">
                <label for="userTrainingLevel" class="form-label mb-1">Уровень тренированости</label>
                <select name="userTrainingLevel" id="userTrainingLevel" class="form-select">
                    <option value="low">Низкий</option>
                    <option select value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="veryHigh">Очень высокий</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="userActivityLevel" class="form-label mb-1">Уровень дневной активности</label>
                <select name="userActivityLevel" id="userActivityLevel" class="form-select">
                    <option value="low">Низкий</option>
                    <option select value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="veryHigh">Очень высокий</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="userHeight" class="form-label mb-1">Рост</label>
                <input type="number" name="userHeight" id="userHeight" class="form-control">
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="mb-2">
                        <label for="userWeight" class="form-label mb-1 me-1">Текущий вес {date}</label>
                        <div class="d-flex justify-content-between gap-1">
                            <input type="number" name="userWeight" id="userWeight" class="form-control">
                            <div class="btn btn-sm btn-light">
                                <IconClipboardPlus :size="20" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="mb-2">
                        <label for="userTargetWeight" class="form-label mb-1">Целевой вес</label>
                        <input type="number" name="userTargetWeight" id="userTargetWeight" class="form-control">
                    </div>
                </div>
            </div>

            <div>
                Динамика веса:
                <div class="weight-chart-container">
                    <span v-if="!props.weight"> Нет данных...</span>
                    <LineChart v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* .verified::after {
} */
</style>
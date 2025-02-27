<script setup>
import { computed, watch, ref } from 'vue';
import { getDate } from '@/resource/js/dateTime';
import { validateDate } from '@/resource/js/dataValidation';
import LineChart from './LineChart.vue';
import Calendar from './Calendar.vue';
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
        default: false,
    },
    dateOfRegistration: {
        type: String,
        default: null,
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
    currentWeight: {
        type: Object,
        default: null,
    },
    weight: {
        type: Array,
        default: () => [],
    },
    targetWeight: {
        type: Number,
        default: null,
    },
});

const weight = ref(props.weight);
const currentWeight = ref(props.currentWeight ? props.currentWeight.value : null);
const currentWeightDate = ref(props.currentWeight ? props.currentWeight.date : '');
const targetWeight = ref(props.targetWeight)
const height = ref(props.height)
const gender = ref(props.gender);
const dateOfBirth = ref(props.dateOfBirth);
const trainingLevel = ref(props.trainingLevel);
const activityLevel = ref(props.activityLevel);

const validationResult = ref({
    userGender: {
        isChanged: false,
        isValid: true,
    },
    userTrainingLevel: {
        isChanged: false,
        isValid: true,
    },
    userActivityLevel: {
        isChanged: false,
        isValid: true,
    },
    userDateOfBirth: {
        isChanged: false,
        isValid: true,
    },
    userHeight: {
        isChanged: false,
        isValid: true,
    },
    userWeight: {
        isChanged: false,
        isValid: true,
    },
    userTargetWeight: {
        isChanged: false,
        isValid: true,
    },
})

function dataIsValid(inputId) {
    if (!validationResult.value[inputId].isValid) {
        return 'border-danger'
    }
    if (validationResult.value[inputId].isChanged) {
        return 'border-info'
    }
    return ''
}

watch([
    () => props.gender,
    () => props.dateOfBirth,
    () => props.trainingLevel,
    () => props.activityLevel,
    () => props.height,
    () => props.weight,
    () => props.currentWeight,
    () => props.targetWeight
], () => {
    console.log('watch');

    if (props.gender !== null) {
        gender.value = props.gender;
    }

    if (props.dateOfBirth !== null) {
        dateOfBirth.value = props.dateOfBirth;
    }

    if (props.trainingLevel !== null) {
        trainingLevel.value = props.trainingLevel;
    }

    if (props.activityLevel !== null) {
        activityLevel.value = props.activityLevel;
    }

    if (props.height !== null) {
        height.value = props.height;
    }

    if (props.weight !== null) {
        weight.value = props.weight;
    }

    if (props.currentWeight !== null) {
        currentWeight.value = props.currentWeight.value;
        currentWeightDate.value = props.currentWeight.date
    }

    if (props.targetWeight !== null) {
        targetWeight.value = props.targetWeight;
    }

});

watch(gender, () => {
    if (gender.value !== props.gender) {
        validationResult.value.userGender.isChanged = true
    } else {
        validationResult.value.userGender.isChanged = false
    }
});

watch(dateOfBirth, () => {
    if (dateOfBirth.value !== props.dateOfBirth) {
        validationResult.value.userDateOfBirth.isChanged = true

        if (validateDate(dateOfBirth.value, 'yyyy-mm-dd').isValid) {
            validationResult.value.userDateOfBirth.isValid = true
        } else {
            validationResult.value.userDateOfBirth.isValid = false
        }

    } else {
        validationResult.value.userDateOfBirth.isChanged = false
        validationResult.value.userDateOfBirth.isValid = true

    }
});

watch(trainingLevel, () => {
    if (trainingLevel.value !== props.trainingLevel) {
        validationResult.value.userTrainingLevel.isChanged = true
    } else {
        validationResult.value.userTrainingLevel.isChanged = false
    }
});

watch(activityLevel, () => {
    if (activityLevel.value !== props.activityLevel) {
        validationResult.value.userActivityLevel.isChanged = true
    } else {
        validationResult.value.userActivityLevel.isChanged = false
    }
});

watch(height, () => {
    if (height.value !== props.height) {
        validationResult.value.userHeight.isChanged = true

        if (height.value < 100 || height.value > 250) {
            validationResult.value.userHeight.isValid = false
        } else {
            validationResult.value.userHeight.isValid = true
        }

    } else {
        validationResult.value.userHeight.isChanged = false
        validationResult.value.userHeight.isValid = true
    }
});

watch(currentWeight, () => {
    if (currentWeight.value !== props.currentWeight.value) {
        validationResult.value.userWeight.isChanged = true

        if (currentWeight.value < 35 || currentWeight.value > 200) {
            validationResult.value.userWeight.isValid = false

        } else {
            validationResult.value.userWeight.isValid = true
        }

    } else {
        validationResult.value.userWeight.isChanged = false
        validationResult.value.userWeight.isValid = true

    }
});

watch(targetWeight, () => {
    if (targetWeight.value !== props.targetWeight) {
        validationResult.value.userTargetWeight.isChanged = true

        if (targetWeight.value < 35 || targetWeight.value > 200) {
            validationResult.value.userTargetWeight.isValid = false
        } else {
            validationResult.value.userTargetWeight.isValid = true
        }

    } else {
        validationResult.value.userTargetWeight.isChanged = false
        validationResult.value.userTargetWeight.isValid = true

    }
});

const emit = defineEmits({
    saveInfo: () => { },
});

const dataIsModified = computed(() => {
    console.log('modifaed');

    if (validationResult.value.userTargetWeight.isChanged && validationResult.value.userTargetWeight.isValid) {
        return true
    }

    if (validationResult.value.userGender.isChanged && validationResult.value.userGender.isValid) {
        return true
    }

    if (validationResult.value.userDateOfBirth.isChanged && validationResult.value.userDateOfBirth.isValid) {
        return true
    }

    if (validationResult.value.userTrainingLevel.isChanged && validationResult.value.userTrainingLevel.isValid) {
        return true
    }

    if (validationResult.value.userActivityLevel.isChanged && validationResult.value.userActivityLevel.isValid) {
        return true
    }

    if (validationResult.value.userWeight.isChanged && validationResult.value.userWeight.isValid) {
        return true
    }

    if (validationResult.value.userHeight.isChanged && validationResult.value.userHeight.isValid) {
        return true
    }

    return false
});

const datasetChartWeight = computed(() => {

    return {
        labels: ['2025-02-20', '2025-02-21', '2025-02-22'],
        datasets: [{
            data: [117, 115, 114],
            label: 'Вес, кг'
        }]
    };
});

function saveInfo() {
    let info = {
        gender: gender.value,
        dateOfBirth: dateOfBirth.value,
        level_of_training: trainingLevel.value,
        level_of_activity: activityLevel.value,
        height: height.value,
        updatedWeight: currentWeight.value,
        // dateUpdatedWeight: currentWeightDate.value,
        dateUpdatedWeight: getDate(),
        targetWeight: targetWeight.value
    };

    emit('saveInfo', info);
}

</script>

<template>
    <div class="card border-light" style="height: 100%; overflow-y: scroll;">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <div>
                    <h5>Профиль</h5>
                </div>

                <div @click="saveInfo" :class="{ 'disabled': !dataIsModified }" class="btn btn-primary">Сохранить</div>
            </div>

            <div class="mb-1 border-bottom pb-1">
                <div class="d-flex justify-content-between">
                    <div>
                        <IconPersonFill :size="20" class="me-1" />{{ props.name }}
                        <div>
                            <IconEnvelopeCheck v-if="props.isVerified" class="me-1" :size="20" />
                            <IconEnvelope class="me-1" :size="20" />
                            <span>email: {{ props.email }}</span>
                        </div>
                    </div>

                    <div>
                        <div>Дата регистрации:</div>
                        <div>{{ props.dateOfRegistration }}</div>
                    </div>
                </div>
            </div>

            <div class="mb-2">
                <label for="userGender" class="form-label mb-1">Пол</label>
                <select name="userGender" v-model="gender" id="userGender" class="form-select"
                    :class="dataIsValid('userGender')">
                    <option selected value="unknow">Не указан</option>
                    <option value="man">Мужской</option>
                    <option value="woman">Женкий</option>
                </select>
            </div>
            <!-- <div class="mb-2">
                <Calendar />
            </div> -->
            <div class="mb-2">
                <label for="userDateOfBirth" class="form-label mb-1">Дата рождения</label>
                <input type="text" v-model="dateOfBirth" onekeyup="" name="userDateOfBirth" id="userDateOfBirth"
                    class="form-control" :class="dataIsValid('userDateOfBirth')" placeholder="гггг-мм-дд">
            </div>

            <div class="mb-2">
                <label for="userTrainingLevel" class="form-label mb-1">Уровень тренированости</label>
                <select name="userTrainingLevel" v-model="trainingLevel" id="userTrainingLevel" class="form-select"
                    :class="dataIsValid('userTrainingLevel')">
                    <option select value="unknow">Неизвестно</option>
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="veryHigh">Очень высокий</option>
                </select>
            </div>

            <div class="mb-2">
                <label for="userActivityLevel" class="form-label mb-1">Уровень дневной активности</label>
                <select name="userActivityLevel" v-model="activityLevel" id="userActivityLevel" class="form-select"
                    :class="dataIsValid('userActivityLevel')">
                    <option select value="unknow">Неизвестно</option>
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="veryHigh">Очень высокий</option>
                </select>
            </div>

            <div class="mb-2">
                <label for="userHeight" class="form-label mb-1">Рост, см</label>
                <input type="number" onkeypress='return event.charCode >= 48 && event.charCode <= 57' min="100"
                    max="250" v-model="height" name="userHeight" id="userHeight" class="form-control"
                    :class="dataIsValid('userHeight')">
            </div>

            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="mb-2">
                        <label for="userWeight" class="form-label mb-1 me-1">Вес от {{ currentWeightDate }}, кг</label>
                        <div class="d-flex justify-content-between gap-1">
                            <input type="number" onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                                v-model="currentWeight" name="userWeight" id="userWeight" class="form-control"
                                :class="dataIsValid('userWeight')">
                            <!-- <div class="btn btn-sm btn-light">
                                <IconClipboardPlus :size="20" />
                            </div> -->
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="mb-2">
                        <label for="userTargetWeight" class="form-label mb-1">Целевой вес, кг</label>
                        <input type="number" onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                            v-model="targetWeight" name="userTargetWeight" id="userTargetWeight" class="form-control"
                            :class="dataIsValid('userTargetWeight')">
                    </div>
                </div>
            </div>

            <div>
                Динамика веса:
                <div class="weight-chart-container">
                    <span v-if="!props.weight"> Нет данных...</span>
                    <LineChart v-else :dataset="datasetChartWeight" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* .verified::after {
} */
.weight-chart-container {
    height: 20vh;
    /* overflow-y: scroll; */
}
</style>
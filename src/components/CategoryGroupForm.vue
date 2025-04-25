<script setup>
import { computed, ref, watch } from 'vue';
import IconInfoCircle from './icons/IconInfoCircle.vue';
import { useCategoryGroupsStore } from '@/stores/categoryGroupsStore';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useAdditionalProductData } from '@/stores/additionProductData';
import { useNotificationStore } from '@/stores/notificationStore';
import { notificationPriority } from '@/resource/js/notificationPriority';
import { notificationType } from '@/resource/js/notificationType';

const categoryGroupsStore = useCategoryGroupsStore()
const notificationStore = useNotificationStore()

const props = defineProps({
    triggerApplyCategoryGroupChanges: {
        type: Boolean,
        default: false,
    },
    triggerCancelCategoryGroupForm: {
        type: Boolean,
        default: false,
    },
    triggerClearCategoryGroupForm: {
        type: Boolean,
        default: false,
    },
    triggerDeleteCategoryGroup: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits({
    submitedForm: () => {
        return true
    },
    cancel: () => {
        return true
    },
    clearEvent: () => {
        return true
    },
    deleteEvent: () => {
        return true
    },
});

watch(() => props.triggerApplyCategoryGroupChanges, (value) => {
    if (value === true) {
        submitForm();
    }
});

watch(() => props.triggerDeleteCategoryGroup, (value) => {
    console.log('cat group watch delete')

    if (value) {
        deleteCategoryGroup();
    }
});

watch(() => props.triggerCancelCategoryGroupForm, (value) => {
    console.log('cat group watch cancel')

    if (value) {
        cancel()
    }
})

watch(() => props.triggerClearCategoryGroupForm, (value) => {
    console.log('cat group watch clear')

    if (value) {
        clearForm()
    }
})

watch(() => categoryGroupsStore.categoryGroup, (value) => {
    console.log('cat group watch')
    formActionSuccessful.value = null
    validationSuccessful.value = null

    if (value.id === null) {
        categoryGroupName.value = null
        categoryGroupDescription.value = null
        return
    }

    categoryGroupName.value = value.name;
    categoryGroupDescription.value = value.description;
});

const formNotificationStyle = computed(() => {
    let classes = '';

    if (formActionSuccessful.value === false || validationSuccessful.value === false) {
        classes += 'border-danger bg-danger-subtle text-danger-emphasis '
    } else if (formActionSuccessful.value === true) {
        classes += 'border-success bg-success-subtle text-success-emphasis '
    } else {
        classes += 'border-info bg-info-subtle text-info-emphasis'
    }
    return classes
});

const formNotificationContent = computed(() => {
    let content = '';
    if (validationSuccessful.value === false) {
        content += 'Убедитесь в корректности введенных данных!';
    } else if (formActionSuccessful.value === false) {
        content += 'Что-то пошло не так...'
    } else if (formActionSuccessful.value === true) {
        content += 'Действие выполнено успешно! '
        setTimeout(() => {
            validationSuccessful.value = null
            formActionSuccessful.value = null
        }, 3000)
    } else {
        content += 'Поля помеченные * обязательны к заполнению';
    }
    return content
});

const categoryGroupName = ref(null);
const categoryGroupDescription = ref(null);

const formActionSuccessful = ref(null);
const validationSuccessful = ref(null);
const formInputsHelps = ref({
    name: {
        info: 'От 2 до 100 символов',
        errors: [],
    },
    description: {
        info: 'До 400 символов',
        errors: [],
    },
})

function getCategoryGroupIndexByID(id) {
    for (let i = 0; i < categoryGroupsStore.categoryGroups.length; i++) {
        if (categoryGroupsStore.categoryGroups[i].id === id) {
            return i;
        }
    }
    return null
}

async function submitForm() {
    console.log('submit From')
    validationSuccessful.value = validateForm()

    if (validationSuccessful.value === false) {
        emit('submitedForm');
        return
    }

    let data = {
        id: categoryGroupsStore.categoryGroup.id,
        name: categoryGroupName.value,
        description: categoryGroupDescription.value,
    }
    console.log(data)
    let response = null

    if (categoryGroupsStore.categoryGroup.id !== null) {

        response = await categoryGroupsStore.changeCategoryGroup(
            data.id,
            data,
            getCategoryGroupIndexByID(categoryGroupsStore.categoryGroup.id));

    } else {
        response = await categoryGroupsStore.createCategoryGroup(data);
    }

    if (response) {
        formActionSuccessful.value = true
        // emit('cancel');
    } else {
        formActionSuccessful.value = false
    }
    emit('submitedForm');
}

async function deleteCategoryGroup() {
    let catGroupName = categoryGroupsStore.categoryGroup.name.length > 15
        ? categoryGroupsStore.categoryGroup.name.slice(0, 12) + '...'
        : categoryGroupsStore.categoryGroup.name;
    let response = await categoryGroupsStore.deleteCategoryGroup(
        categoryGroupsStore.categoryGroup.id,
        getCategoryGroupIndexByID(categoryGroupsStore.categoryGroup.id));

    if (response) {
        formActionSuccessful.value = true
        notificationStore.addNotification(
            notificationPriority.Default.value,
            {
                type: notificationType.Success.value,
                priority: notificationPriority.Default.value,
                title: null,
                message: `Группа "${catGroupName}" удалена`
            })
        cancel();
        emit('deleteEvent');
    } else {
        formActionSuccessful.value = false
    }
}

function cancel(sendEmitEvent = true) {
    clearForm(false)

    if (sendEmitEvent) {
        emit('cancel');
    }
}

function clearForm(sendEmitEvent = true) {
    categoryGroupsStore.resetCategoryGroup()

    if (sendEmitEvent) {
        emit('clearEvent')
    }
}

function validateForm() {
    let validationErrorsCount = 0;

    formInputsHelps.value.name.errors.length = 0

    if (!categoryGroupName.value || categoryGroupName.value.length === 0) {
        formInputsHelps.value.name.errors.push('Поле обязательно к заполнению!');
        validationErrorsCount += 1;
    }

    return validationErrorsCount === 0
}

</script>

<template>
    <div class="px-2 py-0">
        <form action="">

            <div :class="formNotificationStyle" class="d-flex gap-1 align-items-center mb-2 p-1 p-2 border rounded ">
                <IconInfoCircle />
                {{ formNotificationContent }}
            </div>

            <div class="mb-2">
                <label for="categoryGroupName" class="form-label mb-1 required-input">Название</label>
                <input v-model="categoryGroupName" maxlength="100" type="text" name="categoryGroupName"
                    id="categoryGroupName" class="form-control"
                    :class="{ 'border-danger': formInputsHelps.name.errors.length > 0 }">
                <div class="form-text text-danger">{{ formInputsHelps.name.errors[0] }}</div>
                <div class="form-text">{{ formInputsHelps.name.info }}</div>
            </div>

            <div class="mb-2">
                <label for="categoryGroupDescription" class="form-label mb-1">Описание</label>
                <textarea v-model="categoryGroupDescription" name="categoryGroupDescription"
                    id="categoryGroupDescription" class="form-control" rows="6" style="resize: none;"
                    maxlength="400"></textarea>
                <div class="form-text">{{ formInputsHelps.description.info }}</div>
            </div>

        </form>
    </div>
</template>

<style lang="scss"></style>
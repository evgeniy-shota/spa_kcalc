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
const categoriesStore = useCategoriesStore()
const notificationStore = useNotificationStore()
const additionalProductDataStore = useAdditionalProductData()

const props = defineProps({
    triggerApplyCategoryChanges: {
        type: Boolean,
        default: false,
    },
    triggerCancelCategoryForm: {
        type: Boolean,
        default: false,
    },
    triggerClearCategoryForm: {
        type: Boolean,
        default: false,
    },
    triggerDeleteCategory: {
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

watch(() => props.triggerApplyCategoryChanges, (value) => {
    if (value === true) {
        submitForm();
    }
});

watch(() => props.triggerDeleteCategory, (value) => {
    if (value) {
        deleteCategory();
    }
});

watch(() => props.triggerCancelCategoryForm, (value) => {
    if (value) {
        cancel()
    }
})

watch(() => props.triggerClearCategoryForm, (value) => {
    if (value) {
        clearForm()
    }
})

watch(() => categoryGroupsStore.currentCategoryGroup, (value) => {
    selectedCategoriesGroup.value = value !== null ? value : null;
})

watch(() => categoriesStore.category, (value) => {

    formActionSuccessful.value = null
    validationSuccessful.value = null

    if (value.id === null) {
        categoryName.value = null
        categoryDescription.value = null
        selectedCategoriesGroup.value = categoryGroupsStore.currentCategoryGroup !== null ? categoryGroupsStore.currentCategoryGroup : null
        return
    }

    categoryName.value = value.name;
    categoryDescription.value = value.description;
    selectedCategoriesGroup.value = value.category_group_id;

    // const categoryGroupId = additionalProductDataStore.categoriesIdCategoryGroupsIdMap.get(category.id)
    // categoryName.value = category.name;
    // categoryDescription.value = category.description;
    // selectedCategoriesGroup.value = category.category_group_id;
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

const editableCategoryIndex = ref(null)
const categoryName = ref(null);
const categoryDescription = ref(null);
const selectedCategoriesGroup = ref(null);

const formActionSuccessful = ref(null);
const validationSuccessful = ref(null);
const formInputsHelps = ref({
    categoriesGroupSelect: {
        info: 'Группа в которую включена категория',
        errors: [],
    },
    name: {
        info: 'От 2 до 100 символов',
        errors: [],
    },
    description: {
        info: 'До 400 символов',
        errors: [],
    },
})

function getCategoryIndexByID(id) {
    for (let i = 0; i < categoriesStore.categories.length; i++) {
        if (categoriesStore.categories[i].id === id) {
            return i;
        }
    }
    return null
}

async function submitForm() {

    validationSuccessful.value = validateForm()

    if (validationSuccessful.value === false) {
        emit('submitedForm');
        return
    }

    let data = {
        id: categoriesStore.category.id,
        name: categoryName.value,
        description: categoryDescription.value,
        categoryGroupsId: selectedCategoriesGroup.value,
    }
    console.log(data)
    let response = null

    if (categoriesStore.category.id !== null) {

        response = await categoriesStore.changeCategory(
            data.id,
            data,
            getCategoryIndexByID(categoriesStore.category.id));

    } else {
        response = await categoriesStore.createCategory(data);
    }

    if (response) {
        formActionSuccessful.value = true
        // emit('cancel');
    } else {
        formActionSuccessful.value = false
    }
    emit('submitedForm');
    // clearForm()
    // emit('submitForm', data, productStore.editableCategory);
}

async function deleteCategory() {
    let catName = categoriesStore.category.name.length > 15
        ? categoriesStore.category.name.slice(0, 12) + '...'
        : categoriesStore.category.name;
    let response = await categoriesStore.deleteCategory(
        categoriesStore.category.id,
        getCategoryIndexByID(categoriesStore.category.id));

    if (response) {
        formActionSuccessful.value = true
        notificationStore.addNotification(
            notificationPriority.Default.value,
            {
                type: notificationType.Success.value,
                priority: notificationPriority.Default.value,
                title: null,
                message: `Категория "${catName}" удалена`
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
    categoriesStore.resetCategory()

    if (sendEmitEvent) {
        emit('clearEvent')
    }
}

function validateForm() {
    let validationErrorsCount = 0;

    formInputsHelps.value.categoriesGroupSelect.errors.length = 0
    formInputsHelps.value.name.errors.length = 0

    if (selectedCategoriesGroup.value === null) {
        formInputsHelps.value.categoriesGroupSelect.errors.push('Выберите группу для категории');
        validationErrorsCount += 1;
    }

    if (!categoryName.value || categoryName.value.length === 0) {
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
                <label for="categoriesGroup" class="form-label mb-1 required-input">Группа категории</label>
                <select v-model="selectedCategoriesGroup" name="categoriesGroup" id="categoriesGroup"
                    class="form-select"
                    :class="{ 'border-danger': formInputsHelps.categoriesGroupSelect.errors.length > 0 }">
                    <option v-for="item in categoryGroupsStore.categoryGroupsList" :key="item.id" :value="item.id">{{
                        item.name }}
                    </option>
                </select>
                <div class="form-text text-danger">{{ formInputsHelps.categoriesGroupSelect.errors[0] }}</div>
                <div class="form-text">{{ formInputsHelps.categoriesGroupSelect.info }}</div>
            </div>

            <div class="mb-2">
                <label for="categroyName" class="form-label mb-1 required-input">Название</label>
                <input v-model="categoryName" maxlength="100" type="text" name="categroyName" id="categroyName"
                    class="form-control" :class="{ 'border-danger': formInputsHelps.name.errors.length > 0 }">
                <div class="form-text text-danger">{{ formInputsHelps.name.errors[0] }}</div>
                <div class="form-text">{{ formInputsHelps.name.info }}</div>
            </div>

            <div class="mb-2">
                <label for="categoryDescription" class="form-label mb-1">Описание</label>
                <textarea v-model="categoryDescription" name="categoryDescription" id="categoryDescription"
                    class="form-control" rows="6" style="resize: none;" maxlength="400"></textarea>
                <div class="form-text">{{ formInputsHelps.description.info }}</div>
            </div>

        </form>
    </div>
</template>

<style lang="scss"></style>
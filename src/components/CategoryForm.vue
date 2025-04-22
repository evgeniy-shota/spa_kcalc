<script setup>
import { computed, ref, watch } from 'vue';
import IconInfoCircle from './icons/IconInfoCircle.vue';
import { useCategoryGroupsStore } from '@/stores/categoryGroupsStore';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useAdditionalProductData } from '@/stores/additionProductData';

const categoryGroupsStore = useCategoryGroupsStore()
const categoriesStore = useCategoriesStore()
const additionalProductDataStore = useAdditionalProductData()

const props = defineProps({
    id: {
        type: Number,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },
    description: {
        typr: String,
        default: null,
    },
    categoriesGroup: {
        type: Number,
        default: null,
    },
    categoriesGroups: {
        type: Array,
        default: () => [],
    },
    isApplyCategoryChanges: {
        type: Boolean,
        default: false,
    },
    isCancelCategoryForm: {
        type: Boolean,
        default: false,
    },
    isDeleteCategory: {
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
});

watch(() => props.isApplyCategoryChanges, (value) => {
    if (value === true) {
        submitForm();
    }
});

watch(() => props.isDeleteCategory, (value) => {
    if (value) {
        deleteCategory();
    }
});

watch(() => categoriesStore.editableCategory, (value) => {
    console.log(value)
    formActionSuccessful.value = null
    validationSuccessful.value = null

    if (value === null || value.id === null) {
        categoryName.value = null
        categoryDescription.value = null
        selectedCategoriesGroup.value = categoryGroupsStore.currentCategoryGroup !== null ? categoryGroupsStore.currentCategoryGroup : null
        return
    }

    const categoryGroupId = additionalProductDataStore.categoriesIdCategoryGroupsIdMap.get(value.id)

    if (categoryGroupId !== categoryGroupsStore.currentCategoryGroup) {
        const category = additionalProductDataStore.allCategories.forEach(element => {
            if (element.id === value.id) {
                return element;
            }
        });
        console.log('category: ')
        console.log(category)
        categoryName.value = category.name;
        categoryDescription.value = category.description;
        selectedCategoriesGroup.value = category.category_group_id

        // categoryName.value = productStore.categoriesGroup[value.groupIndex].categories.data[value.index].name;
        // categoryDescription.value = productStore.categoriesGroup[value.groupIndex].categories.data[value.index].description;
        // selectedCategoriesGroup.value = productStore.categoriesGroup[value.groupIndex].categories.data[value.index].category_group_id
    } else {
        categoryName.value = categoriesStore.categories[value.index].name;
        categoryDescription.value = categoriesStore.categories[value.index].description;
        selectedCategoriesGroup.value = categoriesStore.categories[value.index].category_group_id
    }

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

    if (formActionSuccessful.value === false || validationSuccessful.value === false) {
        content += 'Что-то пошло не так...'
    } else if (formActionSuccessful.value === true) {
        content += 'Действие выполнено успешно! '
    } else {
        content += 'Поля помеченные * обязательны к заполнению';
    }
    return content
});

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

async function submitForm() {

    validationSuccessful.value = validateForm()

    if (validationSuccessful.value === false) {
        emit('submitedForm');
        return
    }

    let data = {
        id: categoriesStore.editableCategory.id,
        name: categoryName.value,
        description: categoryDescription.value,
        categoryGroupsId: selectedCategoriesGroup.value,
    }

    console.log(data)

    let response = await categoriesStore.editableCategory.id !== null ?
        categoriesStore.changeCategory(data.id, data, categoriesStore.editableCategory.index) :
        categoriesStore.createCategory(data);

    if (response) {
        console.log('category updated')
        if (categoriesStore.editableCategory.id === null) {
            categoriesStore.editableCategory = {
                id: categoriesStore.categories[categoriesStore.categories.length - 1].id,
                index: categoriesStore.categories.length - 1,
            }
        }
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
    console.log('cat form delete')
    let response = await categoriesStore.deleteCategory(categoriesStore.editableCategory.id, categoriesStore.editableCategory.index);

    if (response) {
        categoriesStore.editableCategory = { index: null, id: null }
        formActionSuccessful.value = true
        clearForm()
    } else {
        formActionSuccessful.value = false
    }
    cancel();
    // emit('submitForm');
}

function cancel() {
    clearForm()
    emit('cat form cancel');
}

function clearForm() {
    formActionSuccessful.value = null
    validationSuccessful.value = null
    categoryName.value = null;
    categoryDescription.value = null;
    selectedCategoriesGroup.value = null;
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
                <input v-model="categoryName" type="text" name="categroyName" id="categroyName" class="form-control"
                    :class="{ 'border-danger': formInputsHelps.name.errors.length > 0 }">
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
<script setup>
import { useProductsStore } from '@/stores/productsStore';
import { computed, ref, watch } from 'vue';
import IconInfoCircle from './icons/IconInfoCircle.vue';

const productStore = useProductsStore();

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
    submitForm: () => {
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
})

watch(() => props.isDeleteCategory, (value) => {
    if (value) {
        deleteCategory();
    }
});

watch(() => productStore.indexOfEditableCategory, (value) => {
    if (value === null) {
        categoryName.value = null
        categoryDescription.value = null
        selectedCategoriesGroup.value = null
        return
    }
    categoryName.value = productStore.categories[value].name;
    categoryDescription.value = productStore.categories[value].description;
    selectedCategoriesGroup.value = productStore.categories[value].category_group_id
});

const formNotificationStyle = computed(() => {
    let classes = '';

    if (formActionSuccessful.value === false || validationSuccessful.value === false) {
        classes += 'border-danger bg-danger-subtle '
    } else if (formActionSuccessful.value === true) {
        classes += 'border-success bg-success-subtle '
    } else {
        classes += 'border-info bg-info-subtle '
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

async function submitForm() {
    let data = {
        id: productStore.indexOfEditableCategory !== null ? productStore.categories[productStore.indexOfEditableCategory].id : null,
        name: categoryName.value,
        description: categoryDescription.value,
        category_group_id: selectedCategoriesGroup.value,
    }
    let response;

    if (productStore.indexOfEditableCategory !== null) {
        response = await productStore.changeCategory(data.id, data, productStore.indexOfEditableCategory);
    } else {
        response = await productStore.addCategory(data);
    }

    emit('submitForm');

    if (response) {
        console.log('category updated')
        emit('cancel');
    }
    // emit('submitForm', data, productStore.editableCategory);
}

async function deleteCategory() {
    console.log('cat form delete')
    let response = await productStore.deleteCategory(productStore.categories[productStore.indexOfEditableCategory].id, productStore.indexOfEditableCategory);

    if (response) {
        productStore.indexOfEditableCategory = null
        clearForm()
    }

    emit('submitForm');
}

function cancel() {
    clearForm()
    emit('cancel');
}

function clearForm() {
    categoryName.value = null;
    categoryDescription.value = null;
    selectedCategoriesGroup.value = null;
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
                    class="form-select">
                    <option v-for="item in productStore.categoriesGroupList" :key="item.id" :value="item.id">{{
                        item.name }}
                    </option>
                </select>
                <div class="form-text">Группа в которую включена категория</div>
            </div>

            <div class="mb-2">
                <label for="categroyName" class="form-label mb-1 required-input">Название</label>
                <input v-model="categoryName" type="text" name="categroyName" id="categroyName" class="form-control">
                <div class="form-text">От 2 до 100 символов</div>
            </div>

            <div class="mb-2">
                <label for="categoryDescription" class="form-label mb-1">Описание</label>
                <textarea v-model="categoryDescription" name="categoryDescription" id="categoryDescription"
                    class="form-control" rows="6" style="resize: none;" maxlength="400"></textarea>
                <div class="form-text">От 2 до 400 символов</div>
            </div>

        </form>
    </div>
</template>

<style lang="scss"></style>
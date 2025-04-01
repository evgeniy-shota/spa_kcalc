<script setup>
import { useProductsStore } from '@/stores/productsStore';
import { ref, watch } from 'vue';

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
    }
});

const emit = defineEmits({
    submitForm: (category, index) => {
        if (category && index !== null) {
            return true
        }
        return false
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

watch(() => productStore.editableCategory, (value) => {
    if (value === null) {
        return
    }
    categoryName.value = productStore.categories[value].name;
    categoryDescription.value = productStore.categories[value].description;
    selectedCategoriesGroup.value = productStore.categories[value].category_group_id
});

const categoryName = ref(null);
const categoryDescription = ref(null);
const selectedCategoriesGroup = ref(null);

async function submitForm() {
    let data = {
        id: productStore.editableCategory ? productStore.categories[productStore.editableCategory].id : null,
        name: categoryName.value,
        description: categoryDescription.value,
        category_group_id: selectedCategoriesGroup.value,
    }

    let response;

    if (productStore.editableCategory !== null) {
        response = await productStore.changeCategory(data.id, data, productStore.editableCategory);
    } else {
        response = await productStore.addCategory(data);
    }

    if (response) {
        console.log('category updated')
        emit('cancel');
    }

    // emit('submitForm', data, productStore.editableCategory);
}

function cancel() {
    emit('cancel');
}

function clearForm() { }

</script>

<template>
    <div class="p-2">
        <form action="">

            <div class="mb-2 border-bottom border-info-subtle">Поля помеченные * обязательны к заполнению</div>

            <div class="mb-2">
                <label for="categoriesGroup" class="form-label required-input">Группа категории</label>
                <select v-model="selectedCategoriesGroup" name="categoriesGroup" id="categoriesGroup"
                    class="form-select">
                    <option v-for="item in productStore.categoriesGroupList" :key="item.id" :value="item.id">{{
                        item.name }}
                    </option>
                </select>
                <div class="form-text">Группа в которую включена категория</div>
            </div>

            <div class="mb-2">
                <label for="categroyName" class="form-label required-input">Название</label>
                <input v-model="categoryName" type="text" name="categroyName" id="categroyName" class="form-control">
                <div class="form-text">От 2 до 100 символов</div>
            </div>

            <div class="mb-2">
                <label for="categoryDescription" class="form-label">Описание</label>
                <textarea v-model="categoryDescription" name="categoryDescription" id="categoryDescription"
                    class="form-control"></textarea>
                <div class="form-text">От 2 до 400 символов</div>
            </div>

            <div class="mb-2"></div>
        </form>
    </div>
</template>

<style lang="scss"></style>
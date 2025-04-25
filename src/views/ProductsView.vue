<script setup>
import { computed, onBeforeMount, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue';
// import '../../node_modules/bootstrap/dist/js/bootstrap'
// import ProductsList from '@/components/ProductsList.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import ProductForm from '@/components/ProductForm.vue';
import CategoryForm from '@/components/CategoryForm.vue';
import FormControls from '@/components/FormControls.vue';
import { useProductsStore } from '@/stores/productsStore';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useCategoryGroupsStore } from '@/stores/categoryGroupsStore';
import { useUsersStore } from '@/stores/usersStore';
import Offcanv from '@/components/Offcanv.vue';
import CategoryAndProductList from '@/components/CategoryAndProductList.vue';
import { useAdditionalProductData } from '@/stores/additionProductData';
import { useFiltersStore } from '@/stores/filtersStore';
import { Slides } from '@/resource/js/CategoryAndProductListSlides';
import CategoryGroupForm from '@/components/CategoryGroupForm.vue';

onBeforeUnmount(() => {
    productsStore.$reset();
});

const userStore = useUsersStore();
const filtersStore = useFiltersStore();
const categoryGroupsStore = useCategoryGroupsStore();
const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const additionalProductDataStore = useAdditionalProductData();
// const userStore = useUsersStore();

// settings for desplaing two columm (1 -product list and 2 - product info) 
// or 1 column (product list) with offset canvas (product info)
const showTwoCol = ref(true);

onMounted(() => {
    // productsStore.getCategories();
    // console.log(productsStore.categories);
    additionalProductDataStore.getData();
});

const categoryGroupFormTitle = ref('')
const isApplyCategoryGroupForm = ref(false)
const isClearCategoryGroupForm = ref(false)
const isDeleteCategoryGroupForm = ref(false)
const isShowCategoryGroupFormWindow = ref(false);

const categoryFormTitle = ref('')
const isApplyCategoryForm = ref(false)
const isClearCategoryForm = ref(false)
const isDeleteCategoryForm = ref(false)
const isShowCategoryFormWindow = ref(false);

const isShowProductFilter = ref(false)
const isShowFilteredProducts = ref(false)
const isApplyFilter = ref(false)
const isClearFilter = ref(false)

const isShowNewProductWindow = ref(false);
const isShowProductInfoWindow = ref(false);
const saveNewProductResult = ref(false);
const eventSourceToFilter = ref(null);
const slideForCategoryAndCategoryGroupList = ref(null)

const propsForModalCategoryGroupForm = computed(() => {
    return {
        title: categoryGroupFormTitle.value,
        submitedForm: categoryGroupFormSubmited,
        // deleteCategory: deleteCategoryGroup,
        cancel: hideCategoryGroupFormWindow,
        applyCategoryGroupForm: () => isApplyCategoryGroupForm.value = true,
        deleteCategoryGroupForm: () => isDeleteCategoryGroupForm.value = true,
        isApplyCategoryGroupForm: isApplyCategoryGroupForm.value,
        isClearCategoryGroupForm: isClearCategoryGroupForm.value,
        isDeleteCategoryGroupForm: isDeleteCategoryGroupForm.value,
        deleteHideConditions: categoryGroupsStore.categoryGroup.id === null
    }
});

const propsForModalCategoryForm = computed(() => {
    return {
        title: categoryFormTitle.value,
        submitedForm: categoryFormSubmited,
        // deleteCategory: deleteCategory,
        cancel: hideCategoryFormWindow,
        applyCategoryForm: () => isApplyCategoryForm.value = true,
        deleteCategoryForm: () => isDeleteCategoryForm.value = true,
        isApplyCategoryForm: isApplyCategoryForm.value,
        // isCancelCategoryForm: isClearCategoryForm.value,
        isClearCategoryForm: isClearCategoryForm.value,
        isDeleteCategoryForm: isDeleteCategoryForm.value,
        deleteHideConditions: categoriesStore.category.id === null
    }
});

const propsForModalFilter = computed(() => {
    return {
        isFilterShowed: isShowProductFilter.value,
        isApplyFilter: isApplyFilter.value,
        isClearFilter: isClearFilter.value,
        // currentCategoryId: productsStore.currentCategory.id,
        userIsAuthorized: userStore.userIsAuthorized,
        applyFilter: applyFilter,
        clearFilter: clearFilter,
        clickApplyFilter: clickApplyFilter,
        clickClearFilter: clickClearFilter,
    }
});

const propsForModalWindowSlots = computed(() => {
    return {
        saveNewProduct: saveNewProduct,
        // product: {
        //     name: 'some product',
        //     description: 'description some product',
        //     kcalory: 200,
        //     proteins: 14,
        //     carbohydrates: 47,
        //     fats: 18,
        // },
        saveNewProductResult: saveNewProductResult.value,
        isReadonly: false,
    }

});

function showNewProductWindow() {
    saveNewProductResult.value = false;
    isShowNewProductWindow.value = true;
}

function hideNewProductWindow() {
    isShowNewProductWindow.value = false;
}

function showProductInfoWindow() {
    isShowProductInfoWindow.value = true;
}

function hideProductInfoWindow() {
    isShowProductInfoWindow.value = false;
}

function showProductFilter(eventSource) {
    eventSourceToFilter.value = eventSource;
    isShowProductFilter.value = true;
}

function hideProductFilter() {
    isShowProductFilter.value = false;
}

function getProducts(id, cursor = null) {
    if (!cursor) {
        productsStore.products.length = 0
    }
    // productsStore.
    productsStore.getProducts(id, cursor);
}

function getProduct(id) {
    productsStore.getProduct(id);
}

function clickApplyFilter() {
    isApplyFilter.value = true
}

function clickClearFilter() {
    isClearFilter.value = true
}

async function applyFilter(filters) {

    isApplyFilter.value = false
    isShowProductFilter.value = false
    filtersStore.setCategoryGroupsFilter(filters.categoryGroupsFilter, true);
    filtersStore.setCategoriesFilter(filters.categoriesFilter, true);
    filtersStore.setProductsFilter(filters.productsFilter, true);

    filtersStore.groupFilterResults = filters.groupFilterResults;
    console.log(eventSourceToFilter.value);

    if (filters.groupFilterResults) {
        if (filters.groupFilterResults && eventSourceToFilter.value === Slides.CategoryGroups.value) {
            categoryGroupsStore.getCategoryGroups(filtersStore.actualCategoryGroupsFilter);
        } else if (filters.groupFilterResults && eventSourceToFilter.value === Slides.Categories.value) {
            // categoriesStore.getCategories(filtersStore.actualCategoriesFilter);
            categoriesStore.getCategories(filtersStore.actualCategoriesFilter);
        } else {
            // productsStore.getProducts(filtersStore.actualProductsFilter);
            productsStore.getProducts({
                ...filtersStore.actualProductsFilter,
                categoriesId: filtersStore.categoriesFilter.categoriesId
            });
        }
    } else {
        // if (filters.categoriesFilter.categoriesId === null
        //     || (filters.categoriesFilter.categoriesId.length !== 1
        //         || filters.categoriesFilter.categoriesId[0] !== categoriesStore.currentCategory.id)) {
        // }
        isShowFilteredProducts.value = true
        productsStore.getProducts({
            ...filtersStore.actualProductsFilter,
            categoriesId: filtersStore.actualCategoriesFilter.categoriesId
        });
    }
    // isShowFilteredProducts.value = true
}

async function clearFilter() {
    const prevGroupResultVal = filtersStore.groupFilterResults;
    filtersStore.$reset()

    if (prevGroupResultVal === false) {
        categoryGroupsStore.getCategoryGroups(filtersStore.actualCategoryGroupsFilter);
        slideForCategoryAndCategoryGroupList.value = Slides.CategoryGroups.value
    }

    if (prevGroupResultVal === false || eventSourceToFilter.value === Slides.CategoryGroups.value) {
        categoryGroupsStore.getCategoryGroups(filtersStore.actualCategoryGroupsFilter);
    } else if (eventSourceToFilter.value === Slides.Categories.value) {
        filtersStore.addElementToCategoryGroupsId(categoryGroupsStore.currentCategoryGroup)
        additionalProductDataStore.categoryGroupsIdCategoriesIdMap
            .get(categoryGroupsStore.currentCategoryGroup).forEach(category =>
                filtersStore.addElementToCategoriesId(category)
            );
        categoriesStore.getCategories({
            categoryGroupsId: filtersStore.actualCategoryGroupsFilter.categoryGroupsId,
            ...filtersStore.categoriesFilter
        });
    } else {
        filtersStore.addElementToCategoryGroupsId(categoryGroupsStore.currentCategoryGroup)
        filtersStore.addElementToCategoriesId(categoriesStore.currentCategory)
        productsStore.getProducts({
            categoriesId: filtersStore.categoriesFilter.categoriesId,
            ...filtersStore.actualProductsFilter
        });
    }

    isClearFilter.value = false
    isShowProductFilter.value = false
}

function hideFilteredProducts() {
    console.log('hideFilteredProducts')
    isShowFilteredProducts.value = false
}

function editCategory(id = null) {
    let modalWinowTitle = 'Добавление категории'
    if (id !== null) {
        categoriesStore.getCategory(id)
        modalWinowTitle = "Редактирование категории"
    }
    showCategoryFormWindow(modalWinowTitle)
}

function editProduct(id, index) {
    console.log('ProductView - editProduct: ' + id)
}

function addCategory() {
    const title = 'Добавление категории'
    showCategoryFormWindow(title)
}

function showCategoryFormWindow(title = null) {
    console.log('show cat form');
    categoryFormTitle.value = title ?? 'Добавление категории'
    isClearCategoryForm.value = false;
    isDeleteCategoryForm.value = false;
    isShowCategoryFormWindow.value = true
}

function hideCategoryFormWindow() {
    console.log('hide cat form');
    isClearCategoryForm.value = true;
    isApplyCategoryForm.value = false
    isDeleteCategoryForm.value = false
    isShowCategoryFormWindow.value = false
}

function addCategoryGroup() {
    const title = 'Добавление группы'
    showCategoryGroupFormWindow(title)
}

function editCategoryGroup(id = null) {
    let modalWinowTitle = 'Добавление группы'
    if (id !== null) {
        categoryGroupsStore.getCategoryGroup(id)
        modalWinowTitle = "Редактирование группы"
    }
    showCategoryGroupFormWindow(modalWinowTitle)
}

function showCategoryGroupFormWindow(title = null) {
    console.log('show cat group form');
    categoryGroupFormTitle.value = title ?? 'Добавление группы категорий'
    isClearCategoryGroupForm.value = false;
    isDeleteCategoryGroupForm.value = false;
    isShowCategoryGroupFormWindow.value = true
}

function hideCategoryGroupFormWindow() {
    console.log('hide cat group form');
    isClearCategoryGroupForm.value = true;
    isApplyCategoryGroupForm.value = false
    isDeleteCategoryGroupForm.value = false
    isShowCategoryGroupFormWindow.value = false
}

function categoryFormSubmited() {
    isApplyCategoryForm.value = false
    isDeleteCategoryForm.value = false
}

function categoryGroupFormSubmited() {
    isApplyCategoryGroupForm.value = false
    isDeleteCategoryGroupForm.value = false
}

function categoryFormDelete() {
    isShowCategoryFormWindow.value = false
}

function categoryGroupFormDelete() {
    isShowCategoryGroupFormWindow.value = false
}


async function saveNewProduct(product, category) {
    console.log('save new product');
    const response = await productsStore.addNewProduct(product, category);

    console.log(response);
    if (response) {
        saveNewProductResult.value = true;
        hideNewProductWindow();
    }
}

</script>

<template>

    <!-- CategoryGroup form -->
    <ModalWindow modal-id="modalWindowCategoryGroup" :show-window="isShowCategoryGroupFormWindow"
        :hide-window="!isShowCategoryGroupFormWindow" :title="categoryGroupFormTitle"
        @close-window="hideCategoryGroupFormWindow" :props-for-slots="propsForModalCategoryGroupForm">
        <template
            #main="{ submitedForm, cancel, isApplyCategoryGroupForm, isDeleteCategoryGroupForm, isClearCategoryGroupForm }">
            <CategoryGroupForm @submited-form="submitedForm" @cancel="cancel" @delete-event="categoryGroupFormDelete"
                :trigger-apply-category-group-changes="isApplyCategoryGroupForm"
                :trigger-delete-category-group="isDeleteCategoryGroupForm"
                :trigger-clear-category-group-form="isClearCategoryGroupForm" />
        </template>

        <template #footer="{ applyCategoryGroupForm, deleteCategoryGroupForm, cancel, deleteHideConditions }">
            <FormControls @apply-action="applyCategoryGroupForm" @delete-action="deleteCategoryGroupForm"
                @cancel-action="cancel" :hide-delete="deleteHideConditions" cancel-btn-name="Закрыть" />
        </template>
    </ModalWindow>

    <!-- Category form -->
    <ModalWindow modal-id="modalWindowCategory" :show-window="isShowCategoryFormWindow"
        :hide-window="!isShowCategoryFormWindow" :title="categoryFormTitle" @close-window="hideCategoryFormWindow"
        :props-for-slots="propsForModalCategoryForm">
        <template
            #main="{ name, description, categoriesGroups, categoriesGroup, submitedForm, cancel, isApplyCategoryForm, isDeleteCategoryForm, isClearCategoryForm }">
            <CategoryForm :name="name" :description="description" :categories-group="categoriesGroup"
                :categories-groups="categoriesGroups" @submited-form="submitedForm" @cancel="cancel"
                @delete-event="categoryFormDelete" :triggerApplyCategoryChanges="isApplyCategoryForm"
                :triggerDeleteCategory="isDeleteCategoryForm" :trigger-clear-category-form="isClearCategoryForm" />
        </template>

        <template #footer="{ applyCategoryForm, deleteCategoryForm, cancel, deleteHideConditions }">
            <FormControls @apply-action="applyCategoryForm" @delete-action="deleteCategoryForm" @cancel-action="cancel"
                :hide-delete="deleteHideConditions" cancel-btn-name="Закрыть" />
        </template>
    </ModalWindow>

    <!-- product form -->
    <ModalWindow modal-id="modalWindowProduct" :show-window="isShowNewProductWindow" title="Добавление нового продукта"
        @close-window="hideNewProductWindow" :props-for-slots="propsForModalWindowSlots">
        <!-- <template #main="{ propsForSlot }">
            <ProductForm @submit-form="propsForSlot.saveNewProduct" :product="propsForSlot.product"
                :product-saved-successful="propsForSlot.saveNewProductResult" :categories="propsForSlot.categories"
                :is-readonly="propsForSlot.isReadonly" />
        </template> -->
        <template #main="{ saveNewProduct, product, categories, saveNewProductResult, isReadonly }">
            <ProductForm @submit-form="saveNewProduct" :product="product"
                :product-saved-successful="saveNewProductResult" :categories="categories" :is-readonly="isReadonly" />
        </template>
    </ModalWindow>

    <ModalWindow modal-id="moddalWindowFilter" :show-window="isShowProductFilter" title="Расширенный фильтр"
        @close-window="hideProductFilter" :props-for-slots="propsForModalFilter">

        <template #main="{ isFilterShowed, isApplyFilter, isClearFilter, applyFilter, clearFilter, userIsAuthorized, }">
            <ProductFilter :user-is-authorized="userIsAuthorized" @apply-filter="applyFilter"
                :is-filter-showed="isFilterShowed" @clear-filter="clearFilter" :is-apply-filter="isApplyFilter"
                :is-clear-filter="isClearFilter" />
        </template>

        <template #footer="{ clickClearFilter, clickApplyFilter }">
            <div @click="clickApplyFilter" class="btn btn-primary me-2">Применить</div>
            <div @click="clickClearFilter" class="btn btn-secondary me-2">Отменить</div>
        </template>

    </ModalWindow>

    <!-- <Offcanvas title="test offcanvas" /> -->

    <div class="col" style="max-height: 100%; max-height: 100%;">

        <CategoryAndProductList :user-is-authorized="userStore.userIsAuthorized"
            :slide-num="slideForCategoryAndCategoryGroupList" :show-filtered-products="isShowFilteredProducts"
            :next-page-cursor="productsStore.productsNextCursor" @hide-filtered-product="hideFilteredProducts"
            @show-filter="showProductFilter" @edit-categories-group="editCategoryGroup"
            @add-category-group="addCategoryGroup" @edit-category="editCategory" @edit-product="editProduct"
            @add-category="addCategory" @add-product="" @slided="() => slideForCategoryAndCategoryGroupList = null">
        </CategoryAndProductList>

        <!-- <ProductsList @on-click-add-new-product="showNewProductWindow" @show-product-info="showProductInfoWindow"
            :user-is-authorized="userStore.userIsAuthorized" /> -->

        <Offcanv v-if="!showTwoCol" title="Информация о продукте" :hidden="!isShowProductInfoWindow"
            @hide="hideProductInfoWindow">
            <template #main>
                <ProductInfo />
            </template>
        </Offcanv>
    </div>

    <!-- <ModalWindow title="Информаация о продукте" :show-window="isShowProductInfoWindow"
        @close-window="hideProductInfoWindow">
        <template #main>
            <ProductInfo />
        </template>
    </ModalWindow> -->

    <!-- small col -->

    <div v-if="showTwoCol" style="max-height: 100%;" class="col">
        <ProductInfo :user-is-authorized="userStore.userIsAuthorized" @submit-product-form="saveNewProduct"
            @show-category-form-window="editCategory" />
    </div>

</template>

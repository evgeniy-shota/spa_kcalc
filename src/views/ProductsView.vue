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

const categoryFormTitle = ref('')
const isShowProductFilter = ref(false)
const isShowFilteredProducts = ref(false)
const isApplyFilter = ref(false)
const isClearFilter = ref(false)
const isApplyCategoryForm = ref(false)
const isClearCategoryForm = ref(false)
const isDeleteCategoryForm = ref(false)
const isApplyCategoriesGroupForm = ref(false)
const isClearCategoriesGroupForm = ref(false)
const isShowNewProductWindow = ref(false);
const isShowCategoryFormWindow = ref(false);
const isShowProductInfoWindow = ref(false);
const saveNewProductResult = ref(false);
const eventSourceToFilter = ref(null);
const slideForCategoryAndCategoryGroupList = ref(null)

const propsForModalCategoryForm = computed(() => {
    return {
        title: categoryFormTitle.value,
        submitedForm: categoryFormSubmited,
        // deleteCategory: deleteCategory,
        cancel: hideCategoryFormWindow,
        applyCategoryForm: () => isApplyCategoryForm.value = true,
        deleteCategoryForm: () => isDeleteCategoryForm.value = true,
        // deleteHideConditions: productsStore.editableCategory.id === null,
        isApplyCategoryForm: isApplyCategoryForm.value,
        isCancelCategoryForm: isClearCategoryForm.value,
        isDeleteCategoryForm: isDeleteCategoryForm.value,
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

function editCategory(id = null, index = null) {
    console.log('ProductView - editCategory: ' + id + '-' + index)
    let modalWinowTitle = null
    if (index !== null) {
        categoriesStore.editableCategory = {
            index: index,
            id: id,
            // groupId: categoryGroupsStore.currentCategoryGroup,
            // change setting currentCategoryGroup - need setup index in categoriesGroup
            // groupIndex: categoryGroupsStore.categoryGroups.findIndex(
            //     (item) => item.id === categoryGroupsStore.currentCategoryGroup
            // )
        }
        modalWinowTitle = "Редактирование категории"
    } else {
        categoriesStore.editableCategory = { index: null, id: null, groupId: null, groupIndex: null }
        modalWinowTitle = 'Добавление категории'
    }
    showCategoryFormWindow(modalWinowTitle)
}

function editProduct(id, index) {
    console.log('ProductView - editProduct: ' + id)
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

function showCategoryFormWindow(title = null) {
    console.log('show cat form');
    categoryFormTitle.value = title ?? 'Добавление категории'
    isClearCategoryForm.value = false;
    isShowCategoryFormWindow.value = true
}

function hideCategoryFormWindow() {
    console.log('hide cat form');
    productsStore.editableCategory = { index: null, id: null, groupId: null, groupIndex: null }
    isClearCategoryForm.value = true;
    isApplyCategoryForm.value = false
    isDeleteCategoryForm.value = false
    isShowCategoryFormWindow.value = false
}

// async function saveCategory(category, index) {
//     // console.log('save category')
//     // console.log(category)
//     isApplyCategoryForm.value = false
//     if (index === -1) {
//         productsStore.addCategory(category)
//     } else {
//         productsStore.changeCategory(category.id, category, index);
//     }
// }

// async function deleteCategory(id) {
//     console.log('delete category')
// }

function categoryFormSubmited() {
    isApplyCategoryForm.value = false
    isDeleteCategoryForm.value = false
}

function showCategoriesGroupFormWindow() { }

</script>

<template>

    <!-- Category form -->
    <ModalWindow modal-id="modalWindowCategory" :show-window="isShowCategoryFormWindow" :title="categoryFormTitle"
        @close-window="hideCategoryFormWindow" :props-for-slots="propsForModalCategoryForm">
        <template
            #main="{ name, description, categoriesGroups, categoriesGroup, submitedForm, cancel, isApplyCategoryForm, isDeleteCategoryForm }">
            <CategoryForm :name="name" :description="description" :categories-group="categoriesGroup"
                :categories-groups="categoriesGroups" @submited-form="submitedForm" @cancel="cancel"
                :is-apply-category-changes="isApplyCategoryForm" :is-delete-category="isDeleteCategoryForm" />
        </template>

        <template #footer="{ applyCategoryForm, deleteCategoryForm, cancel, deleteHideConditions }">
            <FormControls @apply-action="applyCategoryForm" @delete-action="deleteCategoryForm" @cancel-action="cancel"
                :hide-delete="deleteHideConditions" />
            <!-- <div class=""> -->
            <!-- <button @click="applyCategoryForm" class="btn btn-primary me-2" type="button">Добавить</button>
            <button class="btn btn-danger me-2">Удалить</button>
            <button @click="cancel" class="btn btn-secondary me-2">Отменить</button> -->
            <!-- </div> -->
        </template>
    </ModalWindow>

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

    <div class="col" style="max-height: 100%;">

        <CategoryAndProductList :user-is-authorized="userStore.userIsAuthorized"
            :slide-num="slideForCategoryAndCategoryGroupList" :show-filtered-products="isShowFilteredProducts"
            :next-page-cursor="productsStore.productsNextCursor" @hide-filtered-product="hideFilteredProducts"
            @show-filter="showProductFilter" @edit-category="editCategory" @edit-product="editProduct"
            @add-category-group="showCategoriesGroupFormWindow" @add-category="showCategoryFormWindow" @add-product=""
            @slided="() => slideForCategoryAndCategoryGroupList = null">
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

<script setup>
import { computed, onBeforeMount, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue';
import ProductsList from '@/components/ProductsList.vue';
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

onBeforeUnmount(() => {
    productsStore.$reset();
});

const userStore = useUsersStore();
const productsStore = useProductsStore();
const filtersStore = useFiltersStore();
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

const propsForModalCategoryForm = computed(() => {
    return {
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
        categoriesGroup: additionalProductDataStore.allCategoriesGroup,
        categories: additionalProductDataStore.allCategories,
        dataSource: additionalProductDataStore.dataSource,
        countries: additionalProductDataStore.countriesOfManufacture,
        caloryLimits: additionalProductDataStore.caloryLimits,
        proteinsLimits: additionalProductDataStore.proteinsLimits,
        carbohydratesLimits: additionalProductDataStore.carbohydratesLimits,
        fatsLimits: additionalProductDataStore.fatsLimits,
        isApplyFilter: isApplyFilter.value,
        isClearFilter: isClearFilter.value,
        groupFilterResults: filtersStore.groupFilterResults,
        categoryGroupsFilterDefaultVal: filtersStore.categoryGroupsFilter,
        categoriesFilterDefaultVal: filtersStore.categoriesFilter,
        productsFilterDefaultVal: filtersStore.productsFilter,
        // currentCategoryId: productsStore.currentCategory.id,
        userIsAuthorized: userStore.userIsAuthorized,
        applyFilter: applyFilter,
        clearFilter: clearFilter,
        clickApplyFilter: clickApplyFilter,
        clickClearFilter: clickClearFilter,
        applyCategoriesGroupSort: applyCategoriesGroupSort,
        applyCategoriesSort: applyCategoriesSort,
        applyProductsSort: applyProductsSort,
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
        categories: productsStore.categories,
        saveNewProductResult: saveNewProductResult.value,
        isReadonly: false,
    }

});

const categoriesGroup = computed(() => {
    if (productsStore.categoriesGroup) {
        // return productsStore.categoriesGroup
        return productsStore.categoriesGroupList
    }
    return [];
});

const isCategoryGroupsFound = computed(() => {
    return productsStore.isCategoriesGroupFound;
});

const categories = computed(() => {
    if (productsStore.categories) {
        return productsStore.categoriesList
        // return productsStore.categories
    }
    return []
});

const isCategoriesFound = computed(() => {
    return productsStore.isCategoriesFound;
});

const products = computed(() => {
    if (productsStore.products) {
        return productsStore.productsList;
        // return productsStore.products
    }
    return []
});

const isProductsFound = computed(() => {
    return productsStore.isProductsFound;
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

async function getCategories(categoryGroupId) {
    productsStore.categoriesFilter.categoryGroupId.length = 0;
    productsStore.categoriesFilter.categoryGroupId.push(categoryGroupId);
    productsStore.categories.length = 0
    productsStore.getCategories(categoryGroupId);
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
    console.log(filters);
    isApplyFilter.value = false
    isShowProductFilter.value = false
    productsStore.categoryGroupsFilter = { ...productsStore.categoryGroupsFilter, ...filters.categoryGroupsFilter };
    productsStore.categoriesFilter = { ...productsStore.categoriesFilter, ...filters.categoriesFilter };
    productsStore.productsFilter = { ...productsStore.productsFilter, ...filters.productsFilter };
    productsStore.groupFilterResults = filters.groupFilterResults;
    // productsStore.getProducts();
    console.log(eventSourceToFilter.value);

    if (filters.groupFilterResults && eventSourceToFilter.value === 1) {
        productsStore.getCategoryGroups();
    } else if (filters.groupFilterResults && eventSourceToFilter.value === 2) {
        productsStore.getCategories();
    } else {
        productsStore.getProducts();

    }
    if (!filters.groupFilterResults
        && (filters.categoriesFilter.categoryId === null
            || (filters.categoriesFilter.categoryId.length !== 1
                || filters.categoriesFilter.categoryId[0] !== productsStore.currentCategory.id))) {
        isShowFilteredProducts.value = true
    }
    // isShowFilteredProducts.value = true
}

async function clearFilter() {
    console.log('cleaFilter');
    productsStore.clearProductFilter();
    isClearFilter.value = false
}

function applyCategoriesGroupSort(sortParams) {
    console.log('sort params: ' + sortParams)
    productsStore.categoriesGroupSortParams = sortParams;
}

function applyCategoriesSort(sortParams) {
    productsStore.categoriesSortParams = sortParams
}

function applyProductsSort(sortParams) {
    productsStore.productsSortParams = sortParams
}

function hideFilteredProducts() {
    productsStore.clearProductFilter();
    isShowFilteredProducts.value = false
}

function changeCategoryGroupFavoriteStatus(id, status, index) {
    productsStore.changeCategoryGroup(id, {
        id: id,
        is_favorite: status
    }, index);
}

function changeCategoryGroupHiddenStatus(id, status, index) {
    productsStore.changeCategoryGroup(id, {
        id: id,
        is_hidden: status
    }, index);
}

function changeCategoryFavoriteStatus(id, status, index) {
    productsStore.changeCategory(id, {
        id: id,
        is_favorite: status
    }, index);
}

function changeCategoryHiddenStatus(id, status, index) {
    productsStore.changeCategory(id, {
        id: id,
        is_hidden: status
    }, index);
}

function changeProductFavoriteStatus(id, status, index) {
    productsStore.changeProduct(id, {
        id: id,
        is_favorite: status
    }, index);
}

function changeProductHiddenStatus(id, status, index) {
    productsStore.changeProduct(id, {
        id: id,
        is_hidden: status
    }, index);
}

function editCategory(id = null, index = null) {
    console.log('ProductView - editCategory: ' + id + '-' + index)
    if (index !== null) {
        productsStore.editableCategory = {
            index: index,
            id: id,
            groupId: productsStore.currentCategoryGroup.id,
            // change setting currentCategoryGroup - need setup index in categoriesGroup
            groupIndex: productsStore.categoriesGroup.findIndex(
                (item) => item.id === productsStore.currentCategoryGroup.id
            )
        }
    } else {
        productsStore.editableCategory = { index: null, id: null, groupId: null, groupIndex: null }
    }
    showCategoryFormWindow()
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

function showCategoryFormWindow() {
    console.log('show cat form');
    isClearCategoryForm.value = false;
    isShowCategoryFormWindow.value = true
}

function hideCategoryFormWindow() {
    console.log('hide');
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
    <ModalWindow :show-window="isShowCategoryFormWindow" title="Добавление новой категории" :height-vh="60"
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

    <ModalWindow :show-window="isShowNewProductWindow" title="Добавление нового продукта"
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

    <ModalWindow :show-window="isShowProductFilter" title="Расширенный фильтр" @close-window="hideProductFilter"
        :props-for-slots="propsForModalFilter">

        <template
            #main="{ categories, dataSource, countries, isApplyFilter, isClearFilter, applyFilter, clearFilter,
                caloryLimits, proteinsLimits, carbohydratesLimits, fatsLimits, groupFilterResults, productsFilterDefaultVal,
                categoryGroupsFilterDefaultVal, categoriesFilterDefaultVal, currentCategoryId, userIsAuthorized, categoriesGroup }">
            <ProductFilter :products-filter-default-val="productsFilterDefaultVal" :categories-group="categoriesGroup"
                :user-is-authorized="userIsAuthorized" :currentCategoryId="currentCategoryId" :categories="categories"
                :data-source="dataSource" :countries="countries" @apply-filter="applyFilter" @clear-filter="clearFilter"
                :is-apply-filter="isApplyFilter" :is-clear-filter="isClearFilter" :calory-limit="caloryLimits"
                :proteins-limit="proteinsLimits" :carbohydrates-limit="carbohydratesLimits" :fats-limit="fatsLimits"
                :category-groups-filter-default-val="categoryGroupsFilterDefaultVal"
                :categories-filter-default-val="categoriesFilterDefaultVal" :group-filter-result="groupFilterResults" />
        </template>

        <template #footer="{ clickClearFilter, clickApplyFilter }">
            <div @click="clickApplyFilter" class="btn btn-primary me-2">Применить</div>
            <div @click="clickClearFilter" class="btn btn-secondary me-2">Очистить</div>
        </template>

    </ModalWindow>

    <!-- <Offcanvas title="test offcanvas" /> -->

    <div class="col" style="max-height: 100%;">

        <CategoryAndProductList :user-is-authorized="userStore.userIsAuthorized"
            :show-filtered-products="isShowFilteredProducts" :next-page-cursor="productsStore.productsNextCursor"
            @hide-filtered-product="hideFilteredProducts" @get-categories="getCategories" @get-products="getProducts"
            @get-product="getProduct" @show-filter="showProductFilter"
            @change-category-group-favorite-status="changeCategoryGroupFavoriteStatus"
            @change-category-group-hidden-status="changeCategoryGroupHiddenStatus"
            @change-category-favorite-status="changeCategoryFavoriteStatus"
            @change-category-hidden-status="changeCategoryHiddenStatus"
            @change-product-favorite-status="changeProductFavoriteStatus"
            @change-product-hidden-status="changeProductHiddenStatus" @edit-category="editCategory"
            @edit-product="editProduct" @apply-categories-group-sort="applyCategoriesGroupSort"
            @apply-categories-sort="applyCategoriesSort" @apply-products-sort="applyProductsSort"
            @add-category-group="showCategoriesGroupFormWindow" @add-category="showCategoryFormWindow" @add-product="">
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

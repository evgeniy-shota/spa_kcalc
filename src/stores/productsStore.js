import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios_instance from '@/resource/js/axiosInstance'
import { useUsersStore } from './usersStore'
import { CategoryGroupParams, CategoryParams, ProductParams } from '@/resource/js/sortParams'
import { useFiltersStore } from './filtersStore'
import { useCategoriesStore } from './categoriesStore'

const initialStateProduct = {
  id: null,
  category_id: null,
  name: null,
  composition: null,
  description: null,
  quantity: 0,
  quantityType: 'weight',
  manufacturer: null,
  countryOfManufacture: null,
  kcalory: 0,
  proteins: 0,
  carbohydrates: 0,
  fats: 0,
  nutrientAndVitamines: {},
  is_visible: true,
}

// const FAKE_API = 'https://jsonplaceholder.typicode.com/todos'
// const URL_API_CATEGORY_GROUPS = 'api/category-groups/'
// const URL_API_CATEGORIES = 'api/categories/'
const URL_API_PRODUCTS = 'api/products/'
const URL_API_PRODUCT = 'api/products/'

export const useProductsStore = defineStore('products', () => {
  const filtersStore = useFiltersStore()
  const sortType = ref(ProductParams.default.key)
  const products = ref([])
  const product = ref({ ...initialStateProduct })
  const currentProduct = ref(null)
  const prevCursor = ref(null)
  const nextCursor = ref(null)
  const isProductsFound = ref(true)
  const isProductFound = ref(true)

  const editableProduct = ref({ index: null, id: null })
  const editableCategory = ref({ index: null, id: null, groupId: null, groupIndex: null })
  // const editableCategoriesGroup = ref({ index: null, id: null })

  function $reset() {
    editableProduct.value = { index: null, id: null }
    // editableCategory.value = { index: null, id: null, groupId: null, groupIndex: null }
    // editableCategoriesGroup.value = { index: null, id: null }
    sortType.value = ProductParams.default.key
    products.value.length = 0
    product.value = { ...initialStateProduct }
    currentProduct.value = null
    prevCursor.value = null
    nextCursor.value = null
    isProductsFound.value = true
    isProductFound.value = true
  }

  const productsList = computed(() => {
    return products.value
  })

  watch(sortType, () => {
    // const categoriesStore = useCategoriesStore()
    getProducts({
      categoriesId: filtersStore.categoriesFilter.categoriesId,
      ...filtersStore.actualProductsFilter,
    })
  })

  // async function getCategories(id) {
  //   isCategoriesFound.value = true
  //   console.log(categoriesFilter.value)
  //   try {
  //     const response = await axios_instance.get(URL_API_CATEGORIES, {
  //       params: {
  //         categoryGroupId: categoriesFilter.value.categoryGroupId.join(','),
  //         categoryId: categoriesFilter.value.categoryId,
  //         isPersonal: categoriesFilter.value.isPersonal,
  //         isFavorite: categoriesFilter.value.isFavorite,
  //         isHidden: categoriesFilter.value.isHidden,
  //       },
  //     })

  //     if (response) {
  //       // console.log(response.data.data.categories.data)
  //       currentCategoryGroup.value = {
  //         id:
  //           categoriesFilter.value.categoryGroupId.length == 1
  //             ? categoriesFilter.value.categoryGroupId[0]
  //             : null,
  //         name: response.data.data.name,
  //         categoriesCount: response.data.count,
  //       }

  //       currentCategory.value = {
  //         id: null,
  //         name: null,
  //         productsCount: null,
  //       }
  //       isCategoriesFound.value = response.data.count > 0 ? true : false
  //       categories.value = response.data.data
  //     }
  //   } catch (error) {
  //     console.log('Get categories if fail')
  //     console.log(error)
  //     isCategoriesFound.value = false
  //   }
  // }

  // get list of products in category
  async function getProducts(filter, cursor = null) {
    isProductsFound.value = true
    let filterParams =
      filter !== null
        ? filter
        : Object.assign(
            {
              categoriesId: filtersStore.categoriesFilter.categoriesId,
              // categoriesId: filtersStore.actualCategoriesFilter.categoriesId,
            },
            // filtersStore.productsFilter,
            filtersStore.actualProductsFilter,
          )
    let queryParams = Object.assign({ sort: sortType.value }, filterParams)

    if (cursor !== null) {
      queryParams = Object.assign(queryParams, {
        cursor: cursor !== null ? cursor : '',
      })
    }

    // let queryParams = {
    // isPersonal: filtersStore.productsFilter.isPersonal,
    // isAbstract: filtersStore.productsFilter.isAbstract,
    // isFavorite: filtersStore.productsFilter.isFavorite,
    // isHidden: filtersStore.productsFilter.isHidden,
    // name: filtersStore.productsFilter.name,
    // manufacturer: filtersStore.productsFilter.manufacturer,
    // countryOfManufacture: filtersStore.productsFilter.countryOfManufacture,
    // quantity: filtersStore.productsFilter.quantity,
    // kcalory: filtersStore.productsFilter.kcalory,
    // proteins: filtersStore.productsFilter.proteins,
    // carbohydrates: filtersStore.productsFilter.carbohydrates,
    // fats: filtersStore.productsFilter.fats,
    // }

    try {
      const response = await axios_instance.get(URL_API_PRODUCTS, {
        params: queryParams,
      })

      if (response) {
        isProductsFound.value = response.data.count > 0 ? true : false

        if (cursor) {
          let tempArray = [].concat(products.value, response.data.data)
          products.value = tempArray
        } else {
          products.value = response.data.data
        }
        prevCursor.value = response.data.meta.prev_cursor
        nextCursor.value = response.data.meta.next_cursor
      }
    } catch (error) {
      console.log(error)
      isProductsFound.value = false
    }
  }

  async function getProduct(productId = 0) {
    isProductFound.value = true
    try {
      const response = await axios_instance.get(URL_API_PRODUCT + productId)
      if (response) {
        isProductFound.value = true
        product.value = response.data.data
      } else {
        isProductFound.value = false
      }
    } catch (error) {
      console.log(error)
      isProductFound.value = false
    }
  }

  // async function changeCategory(id, data, index) {
  //   console.log('id: ' + id + ', index: ' + index)
  //   let prevCategoryData =
  //     categoriesGroup.value[editableCategory.value.groupIndex].categories.data[index]
  //   try {
  //     const response = await axios_instance.patch(URL_API_CATEGORIES + id, {
  //       category_group_id: data.category_group_id,
  //       name: data.name,
  //       description: data.description,
  //       is_personal: data.is_personal,
  //       is_enabled: data.is_enabled,
  //       icon_path: data.icon_path,
  //       is_favorite: data.is_favorite,
  //       is_hidden: data.is_hidden,
  //       thumbnail_image_path: data.thumbnail_image_path,
  //     })
  //     if (response) {
  //       console.log(response.data)

  //       if (response.data.data.category_group_id === prevCategoryData.category_group_id) {
  //         categories.value[index] = response.data.data
  //       } else {
  //         console.log('splice cat')
  //         categories.value.splice(index, 1)
  //       }

  //       let indexPrevCatGroup = categoriesGroup.value.findIndex(
  //         (item) => item.id === prevCategoryData.category_group_id,
  //       )

  //       if (indexPrevCatGroup !== -1) {
  //         categoriesGroup.value[indexPrevCatGroup].categories.data.splice(index, 1)
  //       }

  //       let indexCatGroup = categoriesGroup.value.findIndex(
  //         (item) => item.id === response.data.data.category_group_id,
  //       )
  //       if (indexCatGroup !== -1) {
  //         categoriesGroup.value[indexCatGroup].categories.data.push(response.data.data)
  //       }

  //       editableCategory.value = {
  //         id: response.data.data.id,
  //         index: categoriesGroup.value[indexCatGroup].categories.data.length - 1,
  //         groupId: response.data.data.category_group_id,
  //         groupIndex: indexCatGroup,
  //       }
  //       return true
  //     }
  //   } catch (error) {
  //     console.log('changeCategory fail')
  //     console.log(error)
  //     return false
  //   }
  // }

  async function addCategory(data) {
    let newData = data
    try {
      const response = await axios_instance.post(URL_API_CATEGORIES, newData)
      if (response) {
        let indexCatGroup = categoriesGroup.value.findIndex(
          (item) => item.id === response.data.category_group_id,
        )

        if (indexCatGroup !== -1) {
          categoriesGroup.value[indexCatGroup].categories.data.push(response.data)
          categoriesGroup.value[indexCatGroup].categories.count += 1

          if (response.data.category_group_id === currentCategoryGroup.value.id) {
            categories.value.push(response.data)
          }
        }
        editableCategory.value = {
          index: categoriesGroup.value[indexCatGroup].categories.data.length - 1,
          id: response.data.id,
          groupId: indexCatGroup !== -1 ? categoriesGroup.value[indexCatGroup].id : null,
          groupIndex: indexCatGroup !== -1 ? indexCatGroup : null,
        }
      }
    } catch (error) {
      console.warn('Add category fail...')
      console.warn(error)
    }
  }

  async function deleteCategory(id, index) {
    try {
      const response = await axios_instance.delete(URL_API_CATEGORIES + id)

      if (response) {
        if (currentCategoryGroup.value.id !== null) {
          let indexCatGroup = categoriesGroup.value.findIndex(
            (item) => item.id === currentCategoryGroup.value.id,
          )
          categoriesGroup.value[indexCatGroup].categories.data.splice(index, 1)
        }
        categories.value.splice(index, 1)
        return true
      }
    } catch (error) {
      console.warn('Category delete fail')
      console.warn(error)
      return false
    }
  }

  async function changeProduct(id, data, index) {
    try {
      const response = await axios_instance.put(URL_API_PRODUCTS + id, {
        // user_id: '',
        category_id: data.category_id,
        type_id: data.type_id,
        is_personal: data.is_personal,
        is_enabled: data.is_enabled,
        is_abstract: data.is_abstract,
        name: data.name,
        thumbnail_image_name: data.thumbnail_image_name,
        manufacturer: data.manufacturer,
        country_of_manufacture: data.country_of_manufacture,
        trademark_id: data.trademark_id,
        description: data.description,
        units: data.units,
        condition: data.condition,
        state: data.state,
        quantity_to_calculate: data.quantity_to_calculate,
        quantity: data.quantity,
        composition: data.composition,
        kcalory: data.kcalory,
        proteins: data.proteins,
        carbohydrates: data.carbohydrates,
        fats: data.fats,
        kcalory_per_unit: data.kcalory_per_unit,
        proteins_per_unit: data.proteins_per_unit,
        carbohydrates_per_unit: data.carbohydrates_per_unit,
        fats_per_unit: data.fats_per_unit,
        nutrients_and_vitamins: data.nutrients_and_vitamins,
        data_source: data.data_source,
        is_favorite: data.isFavorite,
        is_hidden: data.isHidden,
      })

      if (response) {
        products.value[index] = response.data.data
      }
    } catch (error) {
      console.log('changeProduct fail')
      console.log(error)
    }
  }

  async function addNewProduct(product, category) {
    try {
      const response = await axios_instance.post(URL_API_PRODUCT_CREATE, {
        product: product,
        category: category,
      })

      if (response.status == 201) {
        console.log('New product addeded')
        console.log(response)
        return true
      }
      return false
    } catch (error) {
      console.log('Add new product fail')
      console.log(error)
      return false
    }
  }

  return {
    sortType,
    products,
    product,
    isProductsFound,
    isProductFound,
    editableProduct,
    prevCursor,
    nextCursor,
    getProducts,
    getProduct,
    addNewProduct,
    changeProduct,
    productsList,
    $reset,
  }
})

import { computed, ref } from 'vue'
import axios_instance from '@/resource/js/axiosInstance'
import { defineStore } from 'pinia'
import { CategoryParams } from '@/resource/js/sortParams'
import { useFiltersStore } from './filtersStore'

const URL_API = 'api/categories/'
const initialStateCategory = {
  id: null,
  name: null,
  description: null,
  is_personal: null,
  is_favorite: null,
  is_hidden: null,
}

export const useCategoriesStore = defineStore('categories', () => {
  const filtersStore = useFiltersStore()
  const sortType = ref(CategoryParams.default.key)
  const categories = ref([])
  const category = ref({ ...initialStateCategory })
  const currentCategory = ref()
  const isCategoriesFound = ref(null)
  const isCategoryFound = ref(null)
  const editableCategory = ref({ index: null, id: null })

  function $reset() {
    sortType.value = CategoryParams.default.key
    categories.value = []
    category.value = { ...initialStateCategory }
    isCategoriesFound.value = null
    isCategoryFound.value = null
  }

  async function getCategories(filter) {
    isCategoriesFound.value = null
    let filterParams =
      filter !== null
        ? filter
        : {
            categoryGroupsId: filtersStore.categoryGroupsFilter.categoryGroupsId,
            ...filtersStore.categoriesFilter,
          }

    console.log(filterParams)
    try {
      const response = await axios_instance.get(URL_API, {
        params: filterParams,
      })

      if (response) {
        isCategoriesFound.value = true
        categories.value = response.data.data
        currentCategory.value = { id: null, name: null }
      }
    } catch (error) {
      isCategoriesFound.value = false
      console.warn('Get Categories')
      console.warn(error)
    }
  }

  async function getCategory(id) {
    isCategoryFound.value = null
    try {
      const response = await axios_instance.get(URL_API + id)

      if (response) {
        isCategoryFound.value = true
        category.value = response.data.data
      }
    } catch (error) {
      isCategoryFound.value = false
      console.warn('Get Category')
      console.warn(error)
    }
  }

  async function createCategory(data) {
    try {
      const response = await axios_instance.post(URL_API, {
        ...data,
      })

      if (response) {
        categories.value.push(response.data.data)
        return true
      }
    } catch (error) {
      console.warn('Create Category fail...')
      console.warn(error)
      return false
    }
  }

  async function changeCategory(id, data, index) {
    const filtersStore = useFiltersStore()
    let requestBody = {
      category_group_id: data.categoryGroupsId,
      name: data.name,
      description: data.description,
      is_personal: data.isPersonal,
      is_enabled: data.isEnabled,
      is_favorite: data.isFavorite,
      is_hidden: data.isHidden,
      iconPath: data.iconPath,
      thumbnailImagePath: data.thumbnailImagePath,
    }
    let previouslyVal = index
      ? categories.value[index]
      : categories.value[editableCategory.value.index]
    try {
      const response = await axios_instance.put(URL_API + id, {
        ...requestBody,
      })

      if (response) {
        if (
          response.data.data.category_group_id !== previouslyVal.category_group_id ||
          (filtersStore.categoriesFilter.isHidden === false &&
            response.data.data.is_hidden === true)
        ) {
          categories.value.splice(index, 1)
        } else {
          categories.value[index] = response.data.data
        }

        return true
      }
    } catch (error) {
      console.warn('Change Category fail...')
      console.warn(error)
      return false
    }
  }

  async function deleteCategory(id, index) {
    try {
      const response = await axios_instance.delete(URL_API + id)

      if (response) {
        categories.value.splice(index, 1)
        return true
      }
    } catch (error) {
      console.warn('Delete Category fail...')
      console.warn(error)
      return false
    }
  }

  const categoriesList = computed(() => {
    if (sortType.value == CategoryParams.nameAsc.key) {
      return categories.value.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sortType.value == CategoryParams.nameDesc.key) {
      return categories.value.sort((a, b) => b.name.localeCompare(a.name))
    }

    if (sortType.value == CategoryParams.default.key) {
      return categories.value.sort((a, b) => a.id - b.id)
    }

    if (sortType.value == CategoryParams.favoriteAsc.key) {
      return categories.value.sort((a, b) => b.is_favorite - a.is_favorite)
    }

    if (sortType.value == CategoryParams.favoriteDesc.key) {
      return categories.value.sort((a, b) => a.is_favorite - b.is_favorite)
    }

    if (sortType.value == CategoryParams.personalAsc.key) {
      return categories.value.sort((a, b) => b.is_personal - a.is_personal)
    }

    if (sortType.value == CategoryParams.personalDesc.key) {
      return categories.value.sort((a, b) => a.is_personal - b.is_personal)
    }

    return categories.value
  })

  return {
    sortType,
    categories,
    category,
    isCategoriesFound,
    isCategoryFound,
    currentCategory,
    editableCategory,
    getCategories,
    getCategory,
    createCategory,
    changeCategory,
    deleteCategory,
    categoriesList,
    $reset,
  }
})

import axios_instance from '@/resource/js/axiosInstance'
import { CategoryGroupParams } from '@/resource/js/sortParams'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFiltersStore } from './filtersStore'

const URL_API = 'api/category-groups/'
const initialStateCategoryGroup = {
  id: null,
  name: null,
  description: null,
  is_personal: null,
  is_favorite: null,
  is_hidden: null,
}

export const useCategoryGroupsStore = defineStore('categoryGroups', () => {
  const sortType = ref(CategoryGroupParams.default.key)
  const categoryGroups = ref([])
  const categoryGroup = ref({ ...initialStateCategoryGroup })
  const currnetCategoryGroup = ref()
  const isCategoryGroupsFound = ref(null)
  const isCategoryGroupFound = ref(null)
  const editableCategoryGroup = ref({ index: null, id: null })

  function $reset() {
    categoryGroup.value = { ...initialStateCategoryGroup }
  }

  async function getCategoryGroups() {
    const filterStore = useFiltersStore()
    console.log('new cat-group')
    try {
      const response = await axios_instance.get(URL_API, {
        params: filterStore.categoryGroupsFilter.value,
      })

      if (response) {
        isCategoryGroupsFound.value = true
        categoryGroups.value = response.data.data
      }
    } catch (error) {
      isCategoryGroupsFound.value = false
      console.warn('Get categoryGroups fail...')
      console.warn(error)
    }
  }

  async function getCategoryGroup(id) {
    try {
      const response = await axios_instance.get(URL_API + id)

      if (response.code == 200) {
        isCategoryGroupsFound.value = true
        categoryGroup.value = response.data.data
      }
    } catch (error) {
      console.warn('Get categoryGroup fail...')
      console.warn(error)
    }
  }

  async function createCategoryGroup() {
    try {
      const response = await axios_instance.post(URL_API, {})
    } catch (error) {
      console.warn('Create category group fail...')
      console.warn(error)
    }
  }

  async function changeCategoryGroup(id, data, index) {
    const filtersStore = useFiltersStore()
    try {
      const response = await axios_instance.put(URL_API + id, {
        id: 'id' in data ? data.id : null,
        name: 'name' in data ? data.name : null,
        description: 'description' in data ? data.description : null,
        is_enabled: 'isEnabled' in data ? data.isEnabled : null,
        is_favorite: 'isFavorite' in data ? data.isFavorite : null,
        is_hidden: 'isHidden' in data ? data.isHidden : null,
      })
      if (response) {
        console.log(response.data.data)
        if (
          response.data.data.is_hidden === true &&
          filtersStore.categoryGroupsFilter.isHidden === false
        ) {
          categoryGroups.value.splice(index, 1)
        } else {
          categoryGroups.value[index] = response.data.data
        }
      }
    } catch (error) {
      console.warn('changeCategoryGroup fail')
      console.warn(error)
    }
  }

  async function deleteCategoryGroup(id) {
    try {
      const response = await axios_instance.delete(URL_API + id)
    } catch (error) {
      console.warn('Delete category group fail...')
      console.warn(error)
    }
  }

  const categoryGroupsList = computed(() => {
    if (sortType.value == CategoryGroupParams.nameAsc.key) {
      return categoryGroups.value.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sortType.value == CategoryGroupParams.nameDesc.key) {
      return categoryGroups.value.sort((a, b) => b.name.localeCompare(a.name))
    }

    if (sortType.value == CategoryGroupParams.default.key) {
      return categoryGroups.value.sort((a, b) => a.id - b.id)
    }

    if (sortType.value == CategoryGroupParams.favoriteAsc.key) {
      return categoryGroups.value.sort((a, b) => b.is_favorite - a.is_favorite)
    }

    if (sortType.value == CategoryGroupParams.favoriteDesc.key) {
      return categoryGroups.value.sort((a, b) => a.is_favorite - b.is_favorite)
    }

    if (sortType.value == CategoryGroupParams.personalAsc.key) {
      return categoryGroups.value.sort((a, b) => b.is_personal - a.is_personal)
    }

    if (sortType.value == CategoryGroupParams.personalDesc.key) {
      return categoryGroups.value.sort((a, b) => a.is_personal - b.is_personal)
    }

    return categoryGroups.value
  })

  return {
    sortType,
    categoryGroups,
    categoryGroup,
    isCategoryGroupsFound,
    isCategoryGroupFound,
    currnetCategoryGroup,
    editableCategoryGroup,
    getCategoryGroups,
    getCategoryGroup,
    createCategoryGroup,
    changeCategoryGroup,
    deleteCategoryGroup,
    categoryGroupsList,
    $reset,
  }
})

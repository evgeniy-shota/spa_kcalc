import axios_instance from '@/resource/js/axiosInstance'
import { CategoryGroupParams } from '@/resource/js/sortParams'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const URL_API = 'api/category-groups/'
const initialStateCategoryGroup = {
  id: null,
  name: null,
  is_personal: null,
  is_favorite: null,
  is_hidden: null,
}
const initialStateCategoryGroupsFilter = {
  categoryGroupsId: [],
  isPersonal: null,
  isFavorite: null,
  isHidden: null,
}

export const useCategoryGroupsStore = defineStore('categoryGroups', () => {
  const sortType = ref(CategoryGroupParams.default.key)
  const categoryGroups = ref([])
  const categoryGroup = ref({ ...initialStateCategoryGroup })
  const currnetCategoryGroup = ref()
  const isCategoryGroupsFound = ref(true)
  const isCategoryGroupFound = ref(true)
  const categoryGroupsFilter = ref({ ...initialStateCategoryGroupsFilter })

  function $reset() {
    categoryGroup.value = { ...initialStateCategoryGroup }
  }

  async function getCategoryGroups() {}

  async function getCategoryGroup() {}

  const categoryGroupsList = computed(() => {
    return categoryGroups.value
  })

  return {
    sortType,
    categoryGroups,
    categoryGroup,
    isCategoryGroupsFound,
    isCategoryGroupFound,
    categoryGroupsFilter,
    getCategoryGroups,
    getCategoryGroup,
    categoryGroupsList,
    $reset,
  }
})

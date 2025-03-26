<script setup>
import { onUnmounted, onUpdated, ref } from 'vue'
import IconThreeDotsVertical from './icons/IconThreeDotsVertical.vue'
import IconStar from './icons/IconStar.vue'
import IconStarFill from './icons/IconStarFill.vue'
import IconBookmarkStarFill from './icons/IconBookmarkStarFill.vue'
import IconBookmarkStar from './icons/IconBookmarkStar.vue'

import ListItem from './ListItem.vue'

const lastSelectedProduct = ref(-1)

const props = defineProps({
  data: {
    type: Array,
    default: () => [{}, {}, {}],
  },
  dataType: {
    type: String,
    default: null,
  },
  isDataFound: {
    type: Boolean,
    default: false,
  },
  showControls: {
    type: Boolean,
    default: true,
  },
  userIsAuthorized: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  selectElement: (id) => {
    if (id) {
      return true
    }
    return false
  },
  control: () => {
    return true
  },
  changeFavoriteStatus: (id, status, index) => {
    if (id && status !== null && index) {
      return true
    }
    return false
  },
  changeHiddenStatus: (id, status, index) => {
    if (id && status !== null && index) {
      return true
    }
    return false
  },
  editElemet: (id, index) => {
    if (id && index) {
      return true
    }
    return false
  },
})

function changeFavoriteStatus(id, status, index) {
  emit('changeFavoriteStatus', id, status, index);
}
function changeHiddenStatus(id, status, index) {
  emit('changeHiddenStatus', id, status, index);
}
function editElemet(id, index) {
  emit('editElemet', id, index);
}

function selectElement(id) {
  // let targetAttributeControll = event.target.getAttribute('data-btn-controll')

  // if (targetAttributeControll !== 'item') {
  //   return
  // }

  console.log('select element is: ' + id)
  lastSelectedProduct.value = id
  emit('selectElement', id)
}

// function addElementToHidden(id) {
//   console.log('Added to hidden list :' + id)
// }

// function addElementToFavorite(id) {
//   console.log('add to favorite list: ' + id)
// }


</script>

<template>
  <!-- <div class="data-list-container" @scroll="scrollList($event)"> -->

  <div class="data-list">
    <div class="preloader p-1" v-show="props.data.length == 0 && props.isDataFound">Загрузка ...</div>
    <div class="preloader p-1" v-show="!props.isDataFound">Информация не найдена ...</div>

    <ListItem v-for="(item, index) in props.data" :key="item.id" :user-is-authorized="props.userIsAuthorized"
      :index="index" :id="item.id" :name="item.name"
      :elementData="{ type: props.dataType, kcalory: item.kcalory, proteins: item.proteins, carbohydrates: item.carbohydrates, fats: item.fats }"
      :description="item.description" :is-abstract="item.is_abstract" :is-personal="item.is_personal"
      :is-favorite="item.is_favorite" :is-hidden="item.is_hidden" @select-element="selectElement"
      @change-favorite-status="changeFavoriteStatus" @change-hidden-status="changeHiddenStatus"
      @edit-element="editElemet">

      <template v-if="props.dataType === 'product'" #elementData="{ kcalory, proteins, carbohydrates, fats }">
        <div class="d-flex gap-2 mb-1">
          <small class="border-bottom border-primary-subtle">К {{ kcalory }} ккал</small>
          <small class="border-bottom border-success-subtle">Б {{ proteins }} гр</small>
          <small class="border-bottom border-warning-subtle">Ж {{ fats }} гр</small>
          <small class="border-bottom border-info-subtle">У {{ carbohydrates }} гр</small>
        </div>
      </template>

    </ListItem>

  </div>
  <!-- </div> -->

</template>

<style lang="scss">
.data-list-container {
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  // overflow-y: hidden;
  background-color: white;
  overflow-y: hidden;
}

.data-list {
  height: 100%;
  width: 100%;
  // overflow-y: auto;
}
</style>

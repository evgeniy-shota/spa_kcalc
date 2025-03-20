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
  isDataFound: {
    type: Boolean,
    default: false,
  },
  showControls: {
    type: Boolean,
    default: true,
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
  changeFavoriteStatus: (id, status) => {
    if (id && status) {
      return true
    }
    return false
  },
  changeHiddenStatus: (id, status) => {
    if (id && status) {
      return true
    }
    return false
  },
})

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

    <ListItem v-for="item in props.data" :key="item.id" :id="item.id" :name="item.name" :description="item.description"
      :is-personal="item.is_personal" :is-favorite="item.is_favorite" @select-element="selectElement"
      @change-favorite-status="emit('changeFavoriteStatus', id, status)"
      @change-hidden-status="emit('changeHiddenStatus', id, status)" />

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

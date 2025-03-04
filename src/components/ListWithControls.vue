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
  <div class="categories-list">
    <div class="preloader p-1" v-show="props.data.length == 0 && props.isDataFound">Загрузка ...</div>
    <div class="preloader p-1" v-show="!props.isDataFound">Информация не найдена ...</div>

    <ListItem v-for="item in props.data" :key="item.id" :id="item.id" :name="item.name" :description="item.description"
      :is-personal="item.is_personal" :is-favorite="item.is_favorite" @select-element="selectElement" />

    <!-- <div v-for="item in props.data" :key="item.id" @click="selectElement($event, item.id)" data-btn-controll="item"
      class="lits-item d-flex align-items-center border-bottom mb-1">

      <div class="item-info me-auto ps-1 pb-1">
        <div class="item-name" data-btn-controll="item">{{ item.name }}</div>
        <div class="item-additional-info d-flex gap-2">
          <div class="item-marks">
            <div v-if="item.is_personal">
              <IconBookmarkStarFill :size="20" style="color: orange" v-if="item.is_favorite" />
              <IconBookmarkStar :size="20" v-else />
            </div>
            <div v-else>
              <IconStarFill :size="20" v-if="item.is_favorite" style="color: orange" />
              <IconStar :size="20" v-else />
            </div>
          </div>
          <div class="description">
            {{ item.description }}
          </div>
        </div>
      </div>

      <div v-if="props.showControls" class="item-control" data-btn-controll="controll-menu">
        <div class="dropdown">
          <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <IconThreeDotsVertical :size="24" />
          </button>
          <ul class="dropdown-menu">
            <li>
              <a @click="addElementToFavorite(item.id)" class="dropdown-item" href="#">Добавить в избранное</a>
            </li>
            <li>
              <a @click="addElementToHidden(item.id)" class="dropdown-item" href="#">Скрыть</a>
            </li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </div> -->

  </div>
</template>

<style lang="scss">
.categories-list {
  max-width: 100%;
  height: 100%;
  // max-height: 100%;
  background-color: white;
  // overflow-x: scroll;
}
</style>

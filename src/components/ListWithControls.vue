<script setup>
import { ref } from 'vue';
import IconThreeDotsVertical from './icons/IconThreeDotsVertical.vue';
import IconStar from './icons/IconStar.vue';
import IconStarFill from './icons/IconStarFill.vue';
import IconBookmarkStarFill from './icons/IconBookmarkStarFill.vue';
import IconBookmarkStar from './icons/IconBookmarkStar.vue';

const props = defineProps({
    data: {
        type: Array,
        default: [],
    },
    showControls: {
        type: Boolean,
        default: true,
    },
    showAdditionalInfo: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits({
    selectElement: (id) => {
        if (id) {
            return true
        }
        return false;
    },
    control: () => {
        return true;
    },
});

function selectElement(event, id) {
    let targetAttributeControll = event.target.getAttribute('data-btn-controll');

    if (targetAttributeControll !== 'item') {
        return;
    }

    console.log(targetAttributeControll + id);
    emit('selectElement', id);
}

function addElementToHidden(id) {
    console.log('Added to hidden list :' + id);
}

function addElementToFavorite(id) {
    console.log('add to favorite list: ' + id);

}

</script>

<template>
    <div class="categories-list">

        <div v-for="item in props.data" :key="item.id" @click="selectElement($event, item.id)" data-btn-controll="item"
            class="lits-item d-flex align-items-center border-bottom mb-1">
            <div class="category-info me-auto ps-1 pb-1">
                <div class="category-name" data-btn-controll="item">{{ item.name }}</div>
                <div class="category-additional-info d-flex gap-2">
                    <div class="category-marks">
                        <div v-if="item.is_personal">
                            <IconBookmarkStarFill :size="20" style="color:orange" v-if="item.is_favorite" />
                            <IconBookmarkStar :size="20" v-else />
                        </div>
                        <div v-else>
                            <IconStarFill :size="20" v-if="item.is_favorite" style="color: orange;" />
                            <IconStar :size="20" v-else />
                        </div>
                    </div>
                    <div class="description">
                        {{ item.description }}
                    </div>
                </div>
            </div>

            <div v-if="props.showControls" class="category-control" data-btn-controll="controll-menu">
                <div class="dropdown">
                    <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <IconThreeDotsVertical :size=24 />
                    </button>
                    <ul class="dropdown-menu">
                        <li><a @click="addElementToFavorite(item.id)" class="dropdown-item" href="#">Добавить в
                                избранное</a>
                        </li>
                        <li><a @click="addElementToHidden(item.id)" class="dropdown-item" href="#">Скрыть</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss">
.categories-list {
    height: 100%;
    max-height: 100%;
    background-color: white;
    // overflow-x: scroll;
}

.lits-item:hover {
    background-color: antiquewhite;
}

.category-info {
    box-sizing: border-box;
}
</style>
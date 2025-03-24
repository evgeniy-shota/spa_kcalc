<script setup>
import IconThreeDotsVertical from './icons/IconThreeDotsVertical.vue'
import IconStar from './icons/IconStar.vue'
import IconStarFill from './icons/IconStarFill.vue'
import IconBookmarkStarFill from './icons/IconBookmarkStarFill.vue'
import IconBookmarkStar from './icons/IconBookmarkStar.vue'
import IconAbstractEgg from './icons/IconAbstract-egg.vue'

const props = defineProps({
    id: {
        type: Number,
        default: null
    },
    index: {
        type: Number,
        default: null,
    },
    name: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    isAbstract: {
        type: Boolean,
        default: false,
    },
    isPersonal: {
        type: Boolean,
        default: false,
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    isHidden: {
        type: Boolean,
        default: false,
    },
    showControls: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits({
    selectElement: (id) => {
        if (id) {
            return true
        }
        return false
    },
    changeFavoriteStatus: (id, status, index) => {
        if (id && status && index) {
            return true
        }
        return false
    },
    changeHiddenStatus: (id, status, index) => {
        if (id && status && index) {
            return true
        }
        return false
    },

});

function selectElement(event, id) {
    let targetAttributeControll = event.target.getAttribute('data-btn-controll')

    if (targetAttributeControll !== 'item') {
        return
    }

    console.log(targetAttributeControll + " " + id)
    emit('selectElement', id)
}

function changeElementHiddenStatus(id, status, index) {
    console.log('Added to hidden list :' + id)
    emit('changeHiddenStatus', id, status, index);
}

function changeElementFavoriteStatus(id, status, index) {
    console.log('add to favorite list: ' + id)
    emit('changeFavoriteStatus', id, status, index);
}


</script>

<template>
    <div @click="selectElement($event, props.id)" data-btn-controll="item"
        class="list-item d-flex align-items-center border-bottom mb-1">

        <div class="item-info me-auto ps-1 pb-1">
            <div class="item-name" data-btn-controll="item">{{ props.name }}</div>
            <div class="item-additional-info d-flex gap-2">
                <div class="d-flex gap-1 item-marks">
                    <div v-if="props.isPersonal">
                        <IconBookmarkStarFill :size="20" style="color: orange" v-if="props.isFavorite" />
                        <IconBookmarkStar :size="20" class="text-secondary" v-else />
                    </div>
                    <div v-else>
                        <IconStarFill :size="20" v-if="props.isFavorite" style="color: orange" />
                        <IconStar :size="20" class="text-secondary" v-else />
                    </div>
                    <div v-if="props.isAbstract" class="abstract-product-icon">
                        <IconAbstractEgg :size="20" />
                    </div>
                </div>
                <div class="description">
                    {{ props.description }}
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
                        <a @click="changeElementFavoriteStatus(props.id, !props.isFavorite, props.index)"
                            class="dropdown-item" href="#">
                            {{ props.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное' }}
                        </a>
                    </li>
                    <li>
                        <a @click="changeElementHiddenStatus(props.id, !props.isHidden, props.index)"
                            class="dropdown-item" href="#">
                            {{ props.isHidden ? 'Удалить из скрытого' : 'Скрыть' }}
                        </a>
                    </li>
                    <!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
                </ul>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
.list-item {
    min-width: 100%;
    max-width: 100%;
}

.lits-item:hover {
    background-color: #f8f9fa;
}

.item-name {
    cursor: pointer;
}

.item-info {
    box-sizing: border-box;
}

.abstract-product-icon {
    display: inline;
}
</style>
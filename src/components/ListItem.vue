<script setup>
import IconThreeDotsVertical from './icons/IconThreeDotsVertical.vue'
import IconStar from './icons/IconStar.vue'
import IconStarFill from './icons/IconStarFill.vue'
import IconBookmarkStarFill from './icons/IconBookmarkStarFill.vue'
import IconBookmarkStar from './icons/IconBookmarkStar.vue'
import IconAbstractEgg from './icons/IconAbstract-egg.vue'
import IconEyeSlash from './icons/IconEyeSlash.vue'
import { computed } from 'vue'

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
    elementData: {
        type: Object,
        default: null,
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
    },
    userIsAuthorized: {
        type: Boolean,
        default: false,
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
        if (id !== null && status !== null && index !== null) {
            return true
        }
        return false
    },
    changeHiddenStatus: (id, status, index) => {
        if (id !== null && status !== null && index !== null) {
            return true
        }
        return false
    },
    editElement: (id, index) => {
        if (id !== null && index !== null) {
            return true
        }
        return false
    },
});

function colorIndicationOfElemetnType(elementType, isAbstract, isPersonal) {

    const abstractIndication = 'border-dark-subtle';
    const personalIndication = 'border-primary-subtle';

    if (isPersonal) { return personalIndication }

    if (elementType == 'categoryGroup' || elementType == 'category') {
        return abstractIndication;
    }

    if (isAbstract) { return abstractIndication }

    return 'border-success-subtle'
}

function selectElement(event, id) {
    let targetAttributeControll = event.target.getAttribute('data-btn-controll')

    if (targetAttributeControll !== 'item') {
        return
    }

    emit('selectElement', id)
}

function changeElementHiddenStatus(id, status, index) {
    emit('changeHiddenStatus', id, status, index);
}

function changeElementFavoriteStatus(id, status, index) {
    emit('changeFavoriteStatus', id, status, index);
}

function editElement(id, index) {
    emit('editElement', id, index);
}

</script>

<template>
    <div @click="selectElement($event, props.id)" data-btn-controll="item"
        class="list-item d-flex align-items-center border-bottom mb-1">

        <div class="item-info me-auto ps-1 pb-1">
            <div class="item-name mb-1" data-btn-controll="item">{{ props.name }}</div>
            <slot v-if="$slots.elementData" name="elementData" v-bind="props.elementData">

            </slot>

            <div class="item-additional-info d-flex gap-2">
                <div class="d-flex gap-2 item-marks">
                    <div v-if="props.isPersonal">
                        <IconBookmarkStarFill :size="20" style="color: orange" v-if="props.isFavorite" />
                        <IconBookmarkStar :size="20" class="text-secondary" v-else />
                    </div>
                    <div v-else>
                        <IconStarFill :size="20" v-if="props.isFavorite" style="color: orange" />
                        <IconStar :size="20" class="text-secondary" v-else />
                    </div>
                    <!-- <div v-if="props.isAbstract" class="abstract-product-icon">
                        <IconAbstractEgg :size="20" />
                    </div> -->
                    <div v-if="props.isHidden">
                        <IconEyeSlash :size="20" />
                    </div>
                </div>
                <div class="description">
                    {{ props.description }}
                </div>
            </div>
        </div>

        <div v-if="props.showControls" class="item-control" data-btn-controll="controll-menu">
            <div class="dropdown">
                <button class="btn p-2"
                    :class="colorIndicationOfElemetnType(props.elementData.type, props.isAbstract, props.isPersonal)"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <IconThreeDotsVertical :size="24" />
                </button>
                <ul class="dropdown-menu">
                    <li>
                        <button @click="changeElementFavoriteStatus(props.id, !props.isFavorite, props.index)"
                            class="dropdown-item" :disabled="!props.userIsAuthorized">
                            {{ props.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное' }}
                        </button>
                    </li>
                    <li>
                        <button @click="changeElementHiddenStatus(props.id, !props.isHidden, props.index)"
                            class="dropdown-item" :disabled="!props.userIsAuthorized">
                            {{ props.isHidden ? 'Удалить из скрытого' : 'Скрыть' }}
                        </button>
                    </li>
                    <li>
                        <button @click="editElement(props.id, props.index)" :disabled="!props.isPersonal"
                            class="dropdown-item" href="#">
                            Редактировать
                        </button>
                    </li>
                    <li>
                        <button @click="" class="dropdown-item" href="#">
                            Сообщить об ошибке
                        </button>
                    </li>
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
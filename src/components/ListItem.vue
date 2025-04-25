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
    openFeedbackForm: (data) => {
        if (data !== null) {
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

function openFeedbackForm(data) {
    console.log('feedback')
    emit('openFeedbackForm', data)
}

function setTooltip(text, maxlength) {
    let attrib = null
    if (text.length > maxlength) {
        attrib = {
            "data-bs-toggle": "tooltip",
            "data-bs-title": text,
        }
    }
    return attrib
}

function getParentInfo() {

    console.log()
}

</script>

<template>
    <div @click="selectElement($event, props.id)" data-btn-controll="item"
        class="list-item d-flex align-items-center border-bottom mb-1" style="cursor: pointer;">

        <div class="item-info me-auto ps-1 pb-1">
            <div class="item-name mb-1 d-inline-block text-truncate" data-btn-controll="item"
                v-bind="setTooltip(props.name, 25)">
                {{ props.name }}
            </div>
            <slot v-if="$slots.elementData" name="elementData" v-bind="props.elementData">

            </slot>

            <div class="item-additional-info d-flex gap-2">
                <div class="d-flex gap-2 item-marks">
                    <div v-if="props.isPersonal">
                        <IconBookmarkStarFill v-if="props.isFavorite" :size="20" class="favorite-icon"
                            style="color: orange" />
                        <IconBookmarkStar :size="20" class="favorite-icon text-secondary" v-else />
                    </div>
                    <div v-else>
                        <IconStarFill v-if="props.isFavorite" :size="20" class="favorite-icon" style="color: orange" />
                        <IconStar :size="20" class="favorite-icon text-secondary" v-else />
                    </div>
                    <!-- <div v-if="props.isAbstract" class="abstract-product-icon">
                        <IconAbstractEgg :size="20" />
                    </div> -->
                    <div v-if="props.isHidden">
                        <IconEyeSlash :size="20" />
                    </div>
                </div>
                <div class="item-description d-inline-block text-truncate" style="cursor: pointer;">
                    <small data-btn-controll="item">{{ props.description }}</small>
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
                        <button @click="openFeedbackForm({ id: props.id, name: props.name })" class="dropdown-item"
                            href="#">
                            Сообщить об ошибке
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
@media (max-width: 1300px) {
    .item-name {
        max-width: 25rem;
    }

    .item-description {
        max-width: 20rem;
    }
}

@media (max-width: 660px) {
    .item-name {
        max-width: 20rem;
    }

    .item-description {
        max-width: 15rem;
    }
}

@media (max-width: 460px) {
    .item-name {
        max-width: 15rem;
    }

    .item-description {
        max-width: 10rem;
    }
}

.list-item {
    min-width: 100%;
    max-width: 100%;
}

.list-item:hover {
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

.favorite-icon:hover {
    fill: rgba($color: #E85D04, $alpha: .6)
}
</style>
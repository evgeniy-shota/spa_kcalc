<script setup>
const props = defineProps({
    diets: {
        type: Array,
        default: [],
    },
});

const emit = defineEmits({
    selectItem: (id) => {
        if (id) {
            return true;
        }
        return false
    },
});

function selectItem(id) {
    console.log('diet selected ' + id);
}

</script>

<template>
    <div class="card ps-2 pe-2 pt-2 border border-light diets-list-container">
        <!-- <div class="card-header"></div> -->

        <div class="d-flex flex-row mb-2">
            <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm"
                aria-label=".form-control-sm example">

            <button type="button" class="btn btn-light">Поиск</button>
            <button type="button" class="btn btn-light">Фильтр</button>
            <button type="button" class="btn btn-light">Очистить</button>

        </div>

        <div class="list-group list-height-limit mb-2">
            <a v-for="diet in props.diets" :key="diet.id" @click="selectItem(diet.id)"
                class="list-group-item list-group-item-action" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">{{ diet.name }}</h6>
                    <small>Delete</small>
                </div>
                <p class="mb-1">{{ diet.description }}</p>
                <small>Calory, carb, prot, fats</small>
            </a>
            <!-- <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">List group item heading</h5>
                        <small class="text-body-secondary">3 days ago</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small class="text-body-secondary">And some muted small print.</small>
                </a> -->
        </div>


    </div>
</template>

<style lang="scss">
.diets-list-container {
    height: 86vh;
}

.list-height-limit {
    height: 100%;
}
</style>
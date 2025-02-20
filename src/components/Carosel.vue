<script setup>
import { computed, ref } from 'vue';


const caruselOffsset = ref(0);
const currentSlide = ref(0);
const slideLimit = 2;

const currentOffset = computed(() => {
    return { transform: 'translateX(' + caruselOffsset.value + 'px)' };
});

function slideToLeft() {
    if (currentSlide.value >= slideLimit) {
        return;
    }
    currentSlide.value += 1;

    let container = document.getElementById('productsCarosel');
    // console.log(container);
    let containerWidth = container.clientWidth;
    caruselOffsset.value -= containerWidth;
}

function slideToRight() {

    if (currentSlide.value <= 0) {
        return;
    }

    currentSlide.value -= 1;
    let containerWidth = document.getElementById('productsCarosel').clientWidth;
    caruselOffsset.value += containerWidth;
}

function slideTo(slideNum) {

    if (slideNum > slideLimit) {
        return;
    }

    if (slideNum < 0) {
        return;
    }

    let containerWidth = document.getElementById('productsCarosel').clientWidth;
    caruselOffsset.value += containerWidth * (currentSlide.value - slideNum);
    currentSlide.value = slideNum;
}

</script>

<template>
    <div id="" class="card py-2 border border-light carusel-container">
        <div class="elements ps-2 pe-2">
            <div class="btn" @click="slideToLeft"> back </div>
            <div class="btn" @click="slideToRight"> front </div>
            <div class="btn" @click="slideTo(0)">1</div>
            <div class="btn" @click="slideTo(1)">2</div>
            <div class="btn" @click="slideTo(2)">3</div>
        </div>

        <div id="productsCarosel" class="carusel ">
            <div class="slides active-slide" :style="currentOffset">
                <div id="groupsSlide" class="slide ps-2 pe-2">Groups</div>
                <div id="categoriesSlide" class="slide ps-2 pe-2">Categories</div>
                <div id="productsSlide" class="slide ps-2 pe-2">Products</div>
            </div>

        </div>

    </div>
</template>

<style lang="scss">
.carusel-container {
    height: 100%;
}

.carusel {
    display: block;
    overflow: hidden;
    height: 100%;
}

.slides {
    position: relative;
    display: flex;
    // flex-wrap: nowrap;
    // align-items: stretch;
    overflow: visible;
    // flex-shrink: 0;
    width: auto;
    height: 100%;
    transition: transform .5s;
}

.slide {
    // position: relative;
    // display: block;
    // float: left;
    // margin-right: 1vw;
    // display: none;
    background-color: aquamarine;
    height: 100%;
    min-width: 100%;
}

.active-slide {
    // display: inline-block;
    transform: translateX(0px);
}
</style>
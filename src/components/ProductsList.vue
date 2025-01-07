<script setup>
import { ref } from 'vue';

</script>

<template>
    <div class="card ps-2 pe-2 pt-2">
        <div class="hstack gap-2 mb-2">

            <div class="input-group input-group-sm">
                <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon"
                    aria-describedby="button-addon1">
                <button class="btn btn-sm btn-outline-secondary" type="button" id="button-addon1">Поиск</button>
            </div>

            <div class="vr"></div>

            <button type="button" class="btn btn-sm btn-secondary">Фильтр</button>
            <button type="button" class="btn btn-sm btn-secondary">Избранное</button>
            <button type="button" class="btn btn-sm btn-outline-danger ">Сбросить</button>
        </div>
        <div class="list-group cat-list-height-limit">

            <div class="accordion" id="accordionExample">

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">

                            <div class="list-group list-height-limit">

                                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small>And some small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small>And some small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small>And some small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small>And some small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small>And some small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                                    <small class="text-body-secondary">And some muted small print.</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                            the collapse
                            plugin adds the appropriate classes that we use to style each element. These classes control
                            the
                            overall appearance, as well as the showing and hiding via CSS transitions. You can modify
                            any of this
                            with custom CSS or overriding our default variables. It's also worth noting that just about
                            any HTML
                            can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
.cat-list-height-limit {
    max-height: 85vh;
    overflow-y: scroll;
}

.cat-list-height-limit .list-height-limit {
    max-height: 55vh;
    overflow-y: scroll;
}
</style>

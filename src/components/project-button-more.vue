<template>
  <div class="project-button-more" :class="{'project-button-more--active': currentAimingNumber}">
    <p class="button-more__text" v-show="currentAimingNumber">{{ filtredProjects[index].name }}</p>
    <div class="button-more__icon-area" :class="{'button-more__icon-area--active': currentAimingNumber}">
      <slider-icon-right />
    </div>
  </div>
</template>

<script>
import sliderIconRight from './icons/slider-icon-right.vue';

// [x] Переименовать классы

export default {
  components: {
    sliderIconRight: sliderIconRight
  },
  props: {
    index: {
      type: Number,
      required: false
    },
    filtredProjects: {
      type: Array,
      required: false
    },
    isAiming: {
      type: Number,
      required: false
    }
  },
  computed: {
    currentAimingNumber() {
      return this.isAiming === this.index;
    }
  }
}
</script>

<style>

  .project-button-more {
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 247px;
    height: 71px;

    text-align: left;
    color: #000;
    background-color: inherit;
  }

  .button-more__text {
    width: 134px;
    padding-left: 42px;

    font-size: 12px;
    font-weight: 800;
  }

  .button-more__icon-area {
    width: 71px;
    height: 71px;
    padding-top: 25px;
    padding-left: 25px;
    box-sizing: border-box;

    background-color: #E2E2E2;
  }

  .project-button-more--active {
    background-color: #fff;
  }

  .button-more__icon-area--active {
    background-color: #FFC500;
  }

</style>

<template>
  <div class="project__toggler-wrapper" v-show="windowWidth < 1080">
    <button
      class="project__slider__button--left"
      :class="[buttonClass[0], buttonClass[1]]"
      @click.stop="$emit('slideMoveLeft')"
      v-show="currentSlide != 0"
    >
      <slider-icon-left />
    </button>
    <button
      class="project__slider__button--right"
      :class="[buttonClass[0], buttonClass[2]]"
      @click.stop="$emit('slideMoveRight')"
      v-show="currentSlide < numberOfToggle"
    >
      <slider-icon-right />
    </button>
  </div>
</template>

<script>
import sliderIconLeft from '../components/icons/slider-icon-left.vue';
import sliderIconRight from '../components/icons/slider-icon-right.vue';

export default {
  components: {
    sliderIconLeft: sliderIconLeft,
    sliderIconRight: sliderIconRight
  },
  props: {
    currentSlide: {
      type: Number,
      required: false
    },
    buttonClass: {
      type: Array,
      required: false
    },
    numberOfSlides: {
      type: Number,
      required: false
    },
    slideListLength: {
      type: Number,
      required: false
    }
  },
  computed: {
    numberOfToggle() {
      if(this.numberOfSlides == 1) {
        return Math.ceil(this.slideListLength / this.numberOfSlides) - 1;
      }
      return Math.ceil(this.slideListLength / this.numberOfSlides);
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  methods: {
    emitNumberOfToggle() {
      this.$emit('togglerEmit', this.numberOfToggle);
    }
  },
  mounted() {
    setTimeout(()=> {
      this.emitNumberOfToggle();
    },100)

    window.addEventListener("resize", ()=> {
      this.emitNumberOfToggle();
    });
  },
  boforeDestroyed() {
    window.removeEventListener("resize", ()=> {
      this.emitNumberOfToggle();
    });
  }
}
</script>

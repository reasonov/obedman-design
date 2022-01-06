<template>
  <div class="projects__slider">
    <div class="projects__slider__wrapper" ref="projectsSlider">
      <div
        class="projects__slider__list"
        :class="{'scrollActive': isScrollActive}"
        :style="{left: sliderPosition + 'px'}"
      >

        <article
          class="projects__slider__item"
          :class="sliderItemClass(i)"
          v-for="i in slideList"
          :key="i"
          ref="projectsSlide"
          @mouseenter="slideAim(i)"
          @mouseleave="slideAim(-1)"
          @touchmove="touchSlideMove($event)"
          @touchend="touchSlideMoveEnd()"
        >
          <span class="projects__slider__item__caption" :class="{'caption--active': activeSlide.slideNumber == i}">Квартира <br> на Ленинградской{{i}}</span>

          <transition name="slideContentAm">
            <div class="slider__item__bottom" v-show="itemBottomVisible(i)">
              <p class="projects__slider__item__text">Классная новомодная квартира в стиле лофт. Сделана в стиле гранж по всем канонам русского стиля</p>
              <button class="projects__slider__item__button" @click.stop>
                Смотреть проект
                <slide-more-icon />
              </button>
            </div>
          </transition>

        </article>

      </div>

      <ul class="projects__ecplipse__list">
        <li
          class="project__slider__eclipse"
          :class="{'eclipse--active' : index == (roundCurrentSlide || calculatedCurrentSlide)}"
          v-for="(item, index) in numberOfEclipce"
          :key="item"
        ></li>
      </ul>

    </div>

    <slide-toggler
      @slideMoveLeft="sliderMove('left')"
      @slideMoveRight="sliderMove('right')"
      @togglerEmit="reciveToggleData"
      :currentSlide="calculatedCurrentSlide"
      :buttonClass="['project__slider__button']"
      :numberOfSlides="numberOfSlides"
      :slideListLength="5"
    />

  </div>
</template>

<script>
// [] Убрать точнsе число из v-for
import slideToggler from '../components/slide-toggler.vue';
import slideMoreIcon from '../components/icons/slide-more-icon.vue';

export default {
  components: {
    slideToggler: slideToggler,
    slideMoreIcon: slideMoreIcon
  },
  data() {
    return {
      sliderPosition: 0,
      slideWidth: 320,
      scrollArr: [],
      roundCurrentSlide: 0,
      isScrollActive: false,
      sliderWidth: 1,
      numberOfEclipce: 3,
      slideList: [
        '1',
        '2',
        '3',
        '4',
        '5'
      ],
      activeSlide: {
        slideNumber: -1,
        slideContent: false
      }
    }
  },
  methods: {
    sliderMove(side) {
      if(side === 'left') {
        this.sliderPosition += this.slideWidth;
      }
      else {
        this.sliderPosition -= this.slideWidth;
      }
    },
    computeSlideWidth() {
      const margin = 32;
      this.slideWidth = this.$refs.projectsSlide[0].offsetWidth + margin;
    },
    slideAim(i) {

      if(i == -1) {
        this.activeSlide.slideContent = false;
      }
      else {
        setTimeout(()=> {
          this.activeSlide.slideContent = true;
        }, 500)
      }

      this.activeSlide.slideNumber = i;
    },

    sliderItemClass(i) {
      return {
        'projects__slider__item--last': i == this.slideList.length,
        'slider-item--active': this.activeSlide.slideNumber == i
      }
    },

    itemBottomVisible(i) {
      return this.activeSlide.slideContent == true && this.activeSlide.slideNumber == i;
    },

    touchSlideMove(event) {
      let p = event.touches[0].clientX;

      this.scrollArr.push(p);

      this.isScrollActive = true;

      this.sliderPosition = -(this.roundCurrentSlide * this.slideWidth) +  p - this.scrollArr[0];
    },

    touchSlideMoveEnd() {

      this.isScrollActive = false;

      this.roundingCurrentSlide();

      this.sliderPosition = -(this.slideWidth * this.roundCurrentSlide);

      this.scrollArr = [];
    },

    roundingCurrentSlide() {
      if(this.scrollSide == 'right') {
        if(this.calculatedCurrentSlide >= this.slideList.length - 1) {
          this.roundCurrentSlide = this.slideList.length - 1;
        }
        else {
          this.roundCurrentSlide = Math.ceil(this.calculatedCurrentSlide);
        }
      }
      else {
        if(this.calculatedCurrentSlide < 0) {
          this.roundCurrentSlide = 0;
        }
        else {
          this.roundCurrentSlide = Math.floor(this.calculatedCurrentSlide);
        }
      }
    },
    calculateSliderWidth() {
      if(this.$refs.projectsSlider) {
        this.sliderWidth = this.$refs.projectsSlider.offsetWidth;
      }
      else {
        return;
      }
    },
    reciveToggleData(data) {
      this.numberOfEclipce = data + 1;
    }

  },
  computed: {
    calculatedCurrentSlide() {
      return -this.sliderPosition / this.slideWidth;
    },

    scrollSide() {
      if(this.scrollArr[0] > this.scrollArr[this.scrollArr.length -1]) {
        return 'right';
      }
      return 'left';
    },

    numberOfSlides() {
      if(this.sliderWidth && this.slideWidth) {
        return Math.round(this.sliderWidth / this.slideWidth);
      }
      return 1;
    }
  },
  mounted() {
    window.addEventListener("resize", this.calculateSliderWidth);
    this.calculateSliderWidth();
    this.computeSlideWidth();
  },
  beforeDestroyed() {
    window.removeEventListener("resize", this.calculateSliderWidth);
  }
}
</script>

<style media="screen">
  .slideContentAm-enter-active {
    transition: opacity 1s;
  }

  .slideContentAm-leave-active {
    transition: opacity .5s;
  }

  .slideContentAm-enter, .slideContentAm-leave-to {
    opacity: 0;
  }
</style>

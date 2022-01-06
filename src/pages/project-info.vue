<template>
  <div class="project-info">
    <h3 class="section__caption projects-page__caption">{{ dataProjectName }}</h3>

    <section class="projects-page__slider">
      <div class="projects-page__slider__list">
        <article class="projects-page__slider__item">
          <img :src="dataProjectImage('mainImage')" alt="">
        </article>
      </div>
    </section>

    <section class="project-info__main">

      <div class="wrapper">

        <div class="project-info__concept">
          <div class="concept__image">
            <img :src="dataProjectImage('conceptImage')" alt="image">
          </div>
        </div>

        <div class="project-info__layout">
          <h3 class="section__caption">Планировка</h3>
          <div class="layout__image">
            <img :src="dataProjectImage('layoutImage')" alt="image">
          </div>
        </div>

        <div class="project-info__materials" ref="materialsSection">
          <span class="materials__caption section__caption">Материалы</span><br>
          <span class="materials__text">использованные в проекте</span>
          <div class="materials__slider" :style="{width: sliderWidth + 'px'}">
            <div class="materials__list" :style="{left: sliderPosition + 'px'}">

              <article
                class="materials__item"
                v-for="(item, index) in 3"
                :key="item"
                ref="materialsSlide"
              >
                <img :src="dataProjectImage(index)" alt="image">
              </article>

            </div>
          </div>

          <slide-toggler
            :currentSlide="currentSlide"
            :buttonClass="['project-info__button', 'project-info__button__left', 'project-info__button__right']"
            :numberOfSlides="numberOfSlides"
            :slideListLength="3"
            :windowWidth="windowWidth"
            @slideMoveLeft="sliderMove('left')"
            @slideMoveRight="sliderMove('right')"
          />

        </div>

      </div>

      <button class="project-info__request" @click.stop="toggleRequest">Отправить заявку</button>

    </section>
  </div>
</template>

<script>
import dataProject from "../data-projects.json";
import slideToggler from '../components/slide-toggler.vue';

export default {
  components: {
    slideToggler: slideToggler
  },
  data() {
    return {
      id: this.$route.params['id'],
      numberOfSlides: 1,
      sliderPosition: 0,
      slideWidth: 0
    }
  },
  methods: {
    dataProjectImage(item) {

      if(typeof(item) == 'number') {
        return require('../assets/images/' + dataProject.projectsList[this.id].materialsImages[item]);
      }

      return require('../assets/images/' + dataProject.projectsList[this.id].[item]);
    },

    toggleRequest(data) {
      this.$store.commit('toggleRequest', data);
    },

    sliderMove(side) {
      if(side === 'left') {
        this.sliderPosition += this.slideWidth;
      }
      else {
        this.sliderPosition -= this.slideWidth;
      }
    },
    computeSlideWidth() {
      const margin = 30;
      if(this.$refs.materialsSlide[0]) {
        this.slideWidth = this.$refs.materialsSlide[0].offsetWidth + margin;
      }
      else {
        return;
      }
    },
    numberOfSlidesCalc() {
      if(this.$refs.materialsSection != undefined) {
        this.numberOfSlides = Math.floor(this.$refs.materialsSection.clientWidth / 320);
      }
      else {
        this.numberOfSlides = 1;
      }
    }
  },
  computed: {
    dataProjectName() {
      return dataProject.projectsList[this.id].name;
    },
    currentSlide() {
      return -this.sliderPosition / this.slideWidth;
    },
    sliderWidth() {
      if(this.windowWidth > 450) {
        return this.numberOfSlides * 350;
      }
      return 350;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },

  mounted() {
    this.computeSlideWidth();
    this.numberOfSlidesCalc();
    window.addEventListener("resize", ()=> {
      this.numberOfSlidesCalc();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", ()=> {
      this.numberOfSlidesCalc();
    });
  }
}
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
  }

  .request--active {
    position: absolute;
    z-index: 3;
    left: 345px;
    bottom: -150px;
  }
</style>

<style src="../assets/css/project-info-page.css"></style>
<style src="../assets/css/project-info-page-mobile.css"></style>
<style src="../assets/css/project-info-page-middle.css"></style>

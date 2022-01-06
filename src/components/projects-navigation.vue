<template>
  <div class="all-projects__navigation" :style="{width: navWidth}">
    <button class="all-projects__navigation__button navigation__button-left" @click="selectPage('left')">
      <slider-icon-left />
    </button>

    <ul class="navigation__page-numbers">
      <li v-for="i in numberOfPages" :key="i" v-show="i >= firstPage && i <= lastPage">
        <button
          class="navigation__page__item"
          :class="{'navigation__page__item--active': i == currentPage}"
          @click.stop="selectPage(i)"
        >{{ i }}</button>
      </li>
    </ul>

    <button class="all-projects__navigation__button navigation__button-right" @click="selectPage('right')">
      <slider-icon-right />
    </button>

  </div>
</template>

<script>
import sliderIconLeft from '../components/icons/slider-icon-left.vue';
import sliderIconRight from '../components/icons/slider-icon-right.vue';

// [x] Определиться с кнопками влево, вправо и дописать их

export default {
  components: {
    sliderIconLeft: sliderIconLeft,
    sliderIconRight: sliderIconRight
  },
  props: {
    filtredProjects: {
      type: Array,
      required: false
    },
    receivedPage: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      currentPage: 1,
      firstPage: 1
    }
  },
  computed: {

    windowWidth() {
      return this.$store.state.windowWidth;
    },

    numberOfPages() {
      return Math.ceil(this.filtredProjects.length / 9);
    },

    lastPage() {
      if(this.numberOfPages >= 5) {
        return 4 + this.firstPage;
      }
      else {
        return this.numberOfPages;
      }
    },

    navWidth() {
      let numberOfPages = 5;
      let itemWidth = 54;

      if(this.windowWidth < 1150) {
        itemWidth = 33;
      }

      if(this.numberOfPages < 5) {
        numberOfPages = this.numberOfPages;
      }

      return numberOfPages * itemWidth + 187 + 'px';
    },

    hasNextPage() {
      return this.currentPage == this.lastPage && this.lastPage < this.numberOfPages;
    },

    hasPreviousPage() {
      return this.currentPage == this.firstPage && this.firstPage > 1;
    }

  },
  methods: {
    selectPage(index) {
      if(index == 'left' && this.currentPage > 1) {
        this.currentPage -= 1;
      }
      else if(index == 'right' && this.currentPage < this.numberOfPages) {
        this.currentPage += 1;
      }
      else if (typeof(index) == 'number'){
        this.currentPage = index;
      }
      else {
        this.currentPage += 0;
      }

      this.$emit('emitCurrentPage', this.currentPage);
    }
  },
  watch: {
    currentPage() {
      if(this.hasNextPage) {
        this.firstPage += 1;
      }
      else if(this.hasPreviousPage) {
        this.firstPage -= 1;
      }
    },
    filtredProjects() {
      this.selectPage(1);
      this.firstPage = 1;
    }
  }
}
</script>

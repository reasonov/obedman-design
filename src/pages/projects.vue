<template>
  <div class="projects-page">

    <h3 class="projects-page__caption">Проекты</h3>

    <section class="projects-page__slider">
      <div class="projects-page__slider__list">
        <article class="projects-page__slider__item">

        </article>
      </div>
    </section>

    <section class="all-projects">

      <projects-filters  @emitFilterId="reciveFilter" @emitChangePage="reciveCurrentPage" />

      <div class="all-projects__list" ref="projectsList">

        <article
          class="all-projects__item"
          v-for="(item, index) in filtredProjects"
          :key="index"
          @mouseover="aimProject(index)"
          @mouseout="aimProject(-1)"
          v-show="currentPageProjects(index)"
        >

          <router-link
            class="all-projects__item__button"
            :to="`/project-info/${index}`"
          >

            <project-button-more :index="index" :isAiming="isAiming" :filtredProjects="filtredProjects" />

          </router-link>
        </article>

      </div>

      <projects-navigation
        :filtredProjects="filtredProjects"
        @emitCurrentPage="reciveCurrentPage"
      />

    </section>

  </div>
</template>

<script>

// [x] Нужно узнать маргин в numberProjectsStroke (?) сделать маргин 30 для обеих сторон

import projectsFilters from '../components/projects-filters.vue';
import projectsNavigation from '../components/projects-navigation.vue';
import projectButtonMore from '../components/project-button-more.vue';

export default {
  components: {
    projectsFilters: projectsFilters,
    projectsNavigation: projectsNavigation,
    projectButtonMore: projectButtonMore
  },
  data() {
    return {
      projectName: [
        'Квартира на Ленинградской1',
        'Квартира на Ленинградской2',
        'Квартира на Ленинградской3',
        'Квартира на Ленинградской4',
        'Квартира на Ленинградской5',
        'Квартира на Ленинградской6',
        'Квартира на Ленинградской7',
        'Квартира на Ленинградской8',
        'Квартира на Ленинградской9',
      ],
      isAiming: -1,
      filtredProjects: [],
      listWidth: 0,
      receivedPage: 1
    }
  },
  methods: {
    aimProject(projectNumber) {
      this.isAiming = projectNumber;
    },
    reciveFilter(data) {
      this.filtredProjects = data;
    },
    reciveCurrentPage(page) {
      this.receivedPage = page;
    },
    currentPageProjects(index) {
      return index < 9 * this.receivedPage && index >= 9 * (this.receivedPage - 1);
    }
  }
}
</script>

<style src="../assets/css/projects-page.css"></style>
<style src="../assets/css/projects-page-mobile.css"></style>
<style src="../assets/css/projects-page-middle.css"></style>

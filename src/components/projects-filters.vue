<template>
  <ul class="projects__filters">
    <li
      v-for="(item, index) in projectsFiltersList"
      :key="item"
    >

      <button
        class="projects__filters__item"
        :class="{'projects__filters__item--active': index == currentFilterId}"
        @click.stop="selectFilter(index)"
      >{{ projectsFiltersList[index] }}</button>

    </li>
  </ul>
</template>

<script>
import dataProjects from '../data-projects.json';

export default {
  data() {
    return {
      projectsFiltersList: [
        'Все',
        'Кухня',
        'Детская',
        'Ванная',
        'Гостинная'
      ],
      currentFilterId: 0
    }
  },
  methods: {
    selectFilter(index) {
      if(index != null) {
        this.currentFilterId = index;
      }
      this.$emit('emitFilterId', this.filteredProjects);
    },

  },

  computed: {
    allProjectsList() {
      return dataProjects.projectsList;
    },

    filteredProjects() {
      if(this.currentFilterId == 0) {
        return this.allProjectsList.filter(project => project.id[0].includes(0));
      }
      else {
        return this.allProjectsList.filter(project => project.id[1].includes(this.currentFilterId));
      }
    }
  },
  watch: {
    currentFilterId() {
      this.$emit('emitChangePage', 1);
    }
  },

  mounted() {
    this.selectFilter();
  }
}
</script>

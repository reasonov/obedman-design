<template>
  <div id="app" @click="toggleRequest(false)">
    <header class="header__main">
      <div class="header__container">
        <button class="header__open-menu" @click.stop="openMenu">
          <menu-line v-for="i in 3" :key="i" :index="i - 1" />
        </button>
        <router-link class="header__logo" to="/" @click.stop>
          <span class="header__logo__word header__logo--black">Обедман</span>
          <span class="header__logo__word header__logo--yellow">Дизайн</span>
        </router-link>

        <header-navigation v-show="menuToggler || windowWidth > 1150" />

        <img class="image__phone" src="./assets/images/Phone.png" @click.stop>
      </div>
    </header>

    <main>

      <request-block class="request-popup" v-if="requestState" @click.stop />

      <router-view />

    </main>

    <footer class="main-footer">
      <div class="main-footer__wrapper">

        <div class="main-footer__left-side">
          <div class="footer__content">
            <h5 class="footer__caption">Желаете узнать больше информации?</h5>
            <p class="footer__text">
              <span class="footer__text__underline">Свяжитесь с нами</span> для получения дополнительной информации.
            </p>
          </div>

          <contacts-table area="footer" />

        </div>

        <div class="main-footer__site-maker">
          <span class="site-maker__hello">Hello</span>
          <span class="site-maker__world">World</span>
        </div>

      </div>
    </footer>

  </div>
</template>

<script>
// [] Сделать обработку ошибки при открытии не существующей страницы через роутер
// [x] Разбить App.vue на компоненты
// [x] Разбить home.vue на компонеты
// [x] Разбить project-info.vue на компоненты
// [x] Разбить projects.vue на компоненты
// [] Сделать список в header-navigation через v-for

import menuLine from './components/icons/menu-line-icon.vue';
import headerNavigation from './components/header-navigation.vue';
import contactsTable from './components/contacts-table.vue';
import requestBlock from './components/request-block.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    menuLine: menuLine,
    headerNavigation: headerNavigation,
    contactsTable: contactsTable,
    requestBlock: requestBlock
  },
  data() {
    return {
      menuToggler: false
    }
  },
  methods: {
    openMenu() {
      this.menuToggler = !this.menuToggler;
    },

    toggleRequest(data) {
      this.$store.commit('toggleRequest', data);
    },

    handleKeyDown(e) {
      if(e.key == "Escape" && this.requestIsOpen == true) {
        this.toggleRequest(false);
      }
    }
  },
  computed: {
    ...mapState([
      'windowWidth',
      'requestState'
    ])
  },
  mounted() {
    this.$store.commit('resizeWindowWidth', document.documentElement.clientWidth);
    
    window.addEventListener("resize", ()=>{
      this.$store.commit('resizeWindowWidth', document.documentElement.clientWidth);
    });

    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener("resize", ()=>{
      this.$store.commit('resizeWindowWidth', document.documentElement.clientWidth);
    });
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}
</script>

<style src="./assets/css/app-vue.css"></style>
<style src="./assets/css/app-vue-mobile.css"></style>
<style src="./assets/css/app-vue-middle.css"></style>
<style src="./assets/fonts/fonts.css"></style>

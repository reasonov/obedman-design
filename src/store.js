import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: 0,
    requestState: false
  },
  mutations: {
    resizeWindowWidth(state, data) {
      state.windowWidth = data;
    },
    toggleRequest(state, data) {
      state.requestState = data;
    }
  }
})

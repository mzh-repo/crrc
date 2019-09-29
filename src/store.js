import Vue from 'vue';
import Vuex from 'vuex';
import axios from './libs/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    importData: {
      sql: '',
      file: [],
      sqlSettings: [],
      options: [],
      settingsComplete: false,
      sqlName: '',
      model: '',
      id: '',
      total: '',
      size: '',
    },
    modelSelected: '',
    dataSelected: '',
    exampleSelected: '',
    publishActive: '',
    newModel: {},
  },
  mutations: {
    updateImportData(state, payload) {
      state.importData = payload;
    },
    selectModel(state, value) {
      state.modelSelected = value;
    },
    selectData(state, value) {
      state.dataSelected = value;
    },
    selectExample(state, value) {
      state.exampleSelected = value;
    },
    setPublishActive(state, value) {
      state.publishActive = value;
    },
  },
  actions: {
    setImportData({ commit, state }, payload) {
      let newData = payload;
      newData = Object.assign(state.importData, payload);
      commit('updateImportData', newData);
    },
    importComplete({ commit }) {
      const data = {
        name: this.state.importData.sqlName,
        dataset_id: this.state.importData.id,
        database_id: this.state.importData.sql,
      };
      axios.post('/dataset', data).then(res => res);
      commit('updateImportData', {
        sql: '',
        file: [],
        sqlSettings: [],
        options: [],
        settingsComplete: false,
        sqlName: '',
        model: '',
        id: '',
        total: '',
        size: '',
      });
    },
  },
});

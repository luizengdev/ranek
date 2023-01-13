import { api } from "@/services";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
  },
  actions: {
    getUsuario(context, payload) {
      return api.get(`/usuario/${payload}`).then((r) => {
        context.commit("UPDATE_USUARIO", r.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return api.post("/usuario", payload);
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      context.commit("UPDATE_LOGIN", false);
    },
  },
  getters: {},
  modules: {},
});

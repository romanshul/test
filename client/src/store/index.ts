import { createStore } from 'vuex'
import { logOut, logIn, isLoggedIn } from "@/utils/auth";
import axios from "axios";
import localStorageService from "@/utils/localStorageService";

export default createStore({
  state: {
    user: {
      id: null
    },
    isLoggedIn: false,
    error: {
      code: 404,
      message: 'Page not found'
    }
  },
  getters: {
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
    setError(state, payload) {
      state.error = payload
    }
  },
  actions: {
    setUser({commit, state}, user) {
      commit('setUser', user)
      commit('setLoggedIn', true)
      logIn()
      localStorageService.setToken(user.token)
    },
    async loadUser({commit, dispatch}) {
      if (isLoggedIn()) {
        try {
          const user = (await axios.get(process.env.VUE_APP_SERVER_URL + "/user/", {
            headers: {
              authorization: "Bearer " + localStorageService.getToken()
            }
          })).data
          dispatch('setUser', user)
        } catch (err) {
          dispatch('logOut')
        }
      }
    },
    logOut({commit}) {
      commit('setUser', {})
      commit('setLoggedIn', false)
      logOut()
      localStorageService.clearToken()
    }
  },
  modules: {
  }
})

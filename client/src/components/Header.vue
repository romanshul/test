<template>
  <div class="container-fluid w-100 m-0 p-0">
    <div class="header d-flex flex-wrap align-items-center justify-content-between">
      <span class="logo">
        <img class="logo" :src="logo" alt="Logo" @click="goToMainPage">
      </span>
      <div class="d-flex justify-content-between align-items-center">
        <input
            type="search"
            class="form-control form-control-dark search"
            placeholder="Search..."
            aria-label="Search"
            v-on:keyup.enter.prevent="searchColor"
        >
        <div class="text-end mx-3" v-if="!isLoggedIn">
          <router-link type="button" class="btn btn-outline-light me-2" :to="{name: 'login'}">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logo from "../assets/logo.png"
export default {
  name: "Header",
  props: {"isLoggedIn": Boolean},
  data() {
    return {
      logo: logo
    }
  },
  methods: {
    goToMainPage() {
      this.$router.push({name: 'home'})
    },
    async searchColor(event) {
      try {
        this.$emit('loading', true)
        let color = (await axios.post(`${process.env.VUE_APP_SERVER_URL}/search-color`, {
          keyWord: event.target.value
        })).data
        if (!color.data) {
          this.$store.commit('setError', {
            code: 404,
            message: `${event.target.value} color not found`
          })
          this.$router.push({ name: 'pageNotFound' })
        } else {
          this.$router.push({ name: 'colorPage', params: { id: color.data.id} })
        }
      } catch (e) {
        if (401 === e.response.status) {
          this.$store.commit('setError', {
            code: 401,
            message: "You are not authorized"
          })
          this.$router.push({ name: 'pageNotFound' })
        }
        console.log(e.code)
      }
      this.$emit('loading', false)
    }
  }
}
</script>

<style scoped>
  .header {
    background-color: #363c3c;
    box-shadow: #a2a1a1 0px 1px 8px;
    min-height: 80px;
  }

  .logo {
    cursor: pointer;
  }

  .form-control.search {
    width: 340px;
    padding: 0.375rem 1.45rem;
    border-radius: 0.6rem;
    font-weight: 600;
    line-height: 2.3;
    font-size: 1.1rem;
  }

  input::-webkit-input-placeholder,
  input:-moz-placeholder {
    color: grey;
    opacity: 0.5;
    font-weight: bold;
  }
</style>
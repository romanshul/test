<template>
  <div>
    <header-bar
        class="row flex-nowrap"
        @notFound="showNotFound"
        @loading="updateLoading"
        :is-logged-in="isLoggedIn"
    ></header-bar>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <left-sidebar></left-sidebar>
        <div class="col content">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "@/components/Header";
import leftSidebar from "@/components/Sidebar";
import {isLoggedIn} from "@/utils/auth";
export default {
  name: "App",
  components: {
    headerBar,
    leftSidebar
  },
  data() {
    return {
      errorMessage: 'Not Found',
      isLoggedIn: false
    }
  },
  created() {
    this.isLoggedIn = isLoggedIn()
    this.$store.dispatch('loadUser')
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.isLoggedIn = isLoggedIn()
      }
    }
  },
  methods: {
    updateLoading(event) {
      this.loading = event
    },
    showNotFound(data) {
      this.$router.push({ name: 'pageNotFound', props: { "errorMessage": data.message }})
      this.errorPage = true
      this.errorMessage = data.message
    },
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

  .content {
    padding-top: 60px;
  }

  nav .pagination a {
    border: none;
    color: #393f3f;
    font-weight: normal;
    padding-bottom: 1px;
  }

  nav .pagination li.active {
    border-bottom: 2px solid;
  }

  nav .pagination li:hover {
    border-bottom: 2px solid;
  }

  nav .pagination li:hover a {
    background: none;
    color: #393f3f;
    font-weight: bolder;
    font-size: 16px;
  }

  nav .pagination li.active {
    padding-bottom: 1px;
  }

  nav .pagination li.active span {
    background: none;
    color: black;
    border: none;
    font-weight: bolder;
    font-size: 16px;
    padding-bottom: 0;
  }
</style>

<template>
  <div class="w-50 m-auto">
    <div class="card card-body">
      <form action="">
        <div class="mb-3 d-flex justify-content-around align-items-center">
          <label for="email">Email</label>
          <input
              type="text"
              name="email"
              placeholder="Enter your email"
              class="form-control"
              v-model="email"
          >
        </div>
        <div class="mb-3 d-flex justify-content-around align-items-center">
          <label for="password">Password</label>
          <input
              type="password"
              name="password"
              placeholder="Enter your password"
              class="form-control"
              v-model="password"
          >
        </div>
        <button type="submit" class="mb-3 btn btn-secondary btn-lg btn-block w-100" :class="{'disabled': loading}" @click.prevent="login">
          Log-in
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      loading: false
    }
  },
  methods: {
    async login() {
      if (this.loading) {
        return
      }

      this.loading = true
      this.errors = null

      try {
        const response = await axios.post(process.env.VUE_APP_SERVER_URL + "/login", {
          email: this.email,
          password: this.password,
        })

        this.$store.dispatch('setUser', response.data)
        this.$router.push({name: 'home'})
      } catch (err) {
        this.errors = err.response && err.response.data.errors
        console.log(this.errors)
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>
  label {
    width: 7rem;
    font-weight: bold;
    text-align: left;
  }
</style>
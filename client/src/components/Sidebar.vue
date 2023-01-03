<template>
  <div class="sidebar col-auto col-md-3 col-xl-2 px-sm-2 px-0">
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <button class="btn bg-light form-control random" @click.prevent="getRandomColor">Random Color</button>
      <span v-if="groupsLoading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </span>
      <span v-else>
              <ul class="nav flex-column">
                <li v-for="(item, index) in groups" :key="'item' + index" class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#" @click.prevent="showColor(item.id)">{{ item.name }}</a>
                </li>
              </ul>
            </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Sidebar",
  data() {
    return {
      groupsLoading: false,
      groups: []
    }
  },
  created() {
    this.loadGroups()
  },
  methods: {
    async getRandomColor() {
      try {
        const response = await axios.get('https://colors.local/get-random-color')
        this.$router.push({ name: 'colorPage', params: {id: response.data.data.id}})

      } catch (e) {
        console.log(e)
      }
    },
    async loadGroups() {
      this.groupsLoading = true
      try {
        const response = await axios.get('https://colors.local/get-groups')
        this.groups = response.data.data
      } catch (e) {
        console.log(e)
      }
      this.groupsLoading = false
    },
    async showColor(id) {
      this.$router.push({name: 'colorGroup', params: {id: id}})
    }
  }
}
</script>

<style scoped>
  .sidebar {
    background-color: #d6d8d8;
    padding-top: 60px;
    box-shadow: #a2a1a1 1px 1px 8px;
  }
  .btn.random {
    border: 1px solid #5e6363;
    border-radius: 5px;
    color: #363c3c;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .sidebar ul.nav {
    --bs-nav-link-padding-x: 0;
    --bs-nav-link-padding-y: 0.2rem
  }

  .sidebar a.nav-link {
    text-align: left;
    font-size: 1.3rem;
    font-weight: bold;
    color: #363c3cd4;
  }
</style>
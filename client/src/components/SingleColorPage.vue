<template>
  <div v-if="loading">
    <spinner-content></spinner-content>
  </div>
  <div v-else class="container-fluid">
      <div class="row">
        <div class="card px-0 main-color">
          <div class="card-body" :style="{ background: colorCode }"></div>
          <div class="card-footer">{{ colorCode }}</div>
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <color-item
            :sub-item="true"
            v-for="(code, index) in colorVersions"
            :key="'colorItem' + index"
            :color-code="code"
        ></color-item>
      </div>
    <button type="button" class="btn btn-outline-dark clear" @click.prevent="toMainPage">Clear</button>
  </div>
</template>

<script>
import Color from "color"
import ColorItem from "@/components/ColorItem.vue";
import SpinnerContent from "@/components/SpinnerContent.vue";
import axios from "axios";
export default {
  name: "SingleColorPage",
  components: {SpinnerContent, ColorItem},
  watch: {
    $route(from, to) {
      this.loadColor()
    }
  },
  data() {
    return {
      colorVersions: [],
      id: 0,
      colorCode: '',
      loading: false
    }
  },
  created() {
    this.loadColor()
  },
  methods: {
    async loadColor() {
      this.id = this.$route.params.id
      this.loading = true
      try {
        let response = (await axios.get(process.env.VUE_APP_SERVER_URL + `/get-color/${this.id}`)).data
        this.colorCode = response.data.code
        this.createColorsVersions()
      } catch (e) {
        console.log(e)
      }

      this.loading = false
    },
    createColorsVersions() {
      this.colorVersions = []
      const lighten = [0.1, 0.2, 0.3, 0.4, 0.5]
      lighten.reverse().forEach((k) => {
        this.colorVersions.push(Color(this.colorCode).darken(k).fade(1).hex())
      })
    },
    toMainPage() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding: 0 40px;
  }
  .row {
    margin-bottom: 40px;
  }

  .card {
    max-width: 200px;
    height: 200px;
  }

  .card.main-color {
    height: 600px;
    max-width: 100%;
  }

  .card-body {
    border-radius: 5px 5px 0 0;
  }

  .btn.clear {
    margin-bottom: 50px;
    padding: 10px 80px;
    font-size: 20px;
    font-weight: bold;
  }
</style>
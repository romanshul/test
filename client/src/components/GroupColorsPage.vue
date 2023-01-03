<template>
  <spinner-content v-if="loading"></spinner-content>
  <span v-else>
    <div class="container-fluid">
      <div class="row justify-content-evenly" v-for="row in rows" :key="'row' + row">
        <color-item
            v-for="(color, index) in colorsInRow(row)"
            :key="'color' + row + index"
            :color-code="color.code"
            :id="color.id"
            @click="toSinglePage(color)"
        ></color-item>
      </div>
        <nav v-if="pageItems" aria-label="..." class="pag d-flex justify-content-center">
          <ul class="pagination pagination-sm">
            <pagination-item
                v-for="(page, pageIndex) in pageItems"
                :key="'page' + pageIndex"
                :page-number="page"
                :current="page === currentPage"
                :group-id="groupId"
                @updateColors="updateContent"
            ></pagination-item>
          </ul>
        </nav>
    </div>
  </span>
</template>

<script>
import SpinnerContent from "@/components/SpinnerContent.vue";
import PaginationItem from "@/components/PaginationItem.vue";
import ColorItem from "@/components/ColorItem.vue";
import axios from "axios";

export default {
  name: "GroupColorsPage",
  components: {
    SpinnerContent,
    PaginationItem,
    ColorItem
  },
  data() {
    return {
      groupId: 0,
      columns: 4,
      currentPage: 1,
      colors: [],
      loading: false,
      pageItems: 0
    }
  },
  computed: {
    rows() {
      return Math.ceil(this.colors.length / this.columns)
    }
  },
  created() {
    this.loadColors()
  },
  watch: {
    $route(to, from) {
      this.loadColors()
    }
  },
  methods: {
    async loadColors() {
      this.loading = true
      this.colors = []
      this.groupId = parseInt(this.$route.params.id)

      try {
        const response = (await axios.get(`https://colors.local/get-colors-group/${this.groupId}`, {
          params: {
            offset: 0
          }
        })).data

        this.colors = response.data.rows
        this.pageItems = Math.ceil(response.data.count / this.colors.length)
      } catch (e) {
        console.log(e)
      }

      this.loading = false
    },
    toSinglePage(color) {
      this.$router.push({name: "colorPage", params: {
        id: parseInt(color.id),
          colorCode: color.code
        }})
    },
    colorsInRow(row) {
      return this.colors.slice((row - 1) * this.columns, row * this.columns)
    },
    updateContent(data) {
      this.currentPage = data.currentPage
      this.colors = data.colors
      this.pageItems = process.env.VUE_APP_ITEMS_PER_PAGE < data.count
          ? Math.ceil(data.count / process.env.VUE_APP_ITEMS_PER_PAGE) : 0
    }
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 40px
  }
</style>
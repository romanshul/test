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
import axios from "axios"
import ColorItem from "@/components/ColorItem";
import PaginationItem from "@/components/PaginationItem";
import SpinnerContent from "@/components/SpinnerContent";

export default {
  name: "AllColorsPage",
  props: {"colors": Array, "loading": Boolean, "pageItems": Number, "groupId": Number},
  components: {
    SpinnerContent,
    PaginationItem,
    ColorItem
  },
  data() {
    return {
      colorCode: '#4a90e2',
      columns: 4,
      currentPage: 1
    }
  },
  computed: {
    rows() {
      return Math.ceil(this.colors.length / this.columns)
    }
  },
  methods: {
    toSinglePage(color) {
      this.$router.push({ name: 'colorPage', params: {id: color.id } })
    },
    colorsInRow(row) {
      return this.colors.slice((row - 1) * this.columns, row * this.columns)
    },
    updateContent(data) {
      this.currentPage = data.currentPage
      this.$emit('updateContent', data)
    }
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 40px
  }
</style>
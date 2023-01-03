<template>
  <span>
        <all-colors-page
            v-if="!singlePage && !errorPage"
            @updateContent="updateContent"
            :page-items="pageItems"
            :colors="colors"
            :loading="loading"
            :group-id="groupId"
        ></all-colors-page>
    </span>
</template>

<script>
import headerBar from "@/components/Header";
import leftSidebar from "@/components/Sidebar";
import axios from "axios"
import ColorItem from "@/components/ColorItem";
import PaginationItem from "@/components/PaginationItem";
import SpinnerContent from "@/components/SpinnerContent";
import AllColorsPage from "@/components/AllColorsPage.vue";
import SingleColorPage from "@/components/SingleColorPage.vue";
import SingleErrorPage from "@/components/SingleErrorPage.vue";
export default {
  name: "Main",
  components: {
    SingleErrorPage,
    SingleColorPage,
    AllColorsPage,
    SpinnerContent,
    PaginationItem,
    ColorItem,
    headerBar,
    leftSidebar
  },
  data() {
    return {
      loading: false,
      singlePage: false,
      errorPage: false,
      errorMessage: 'Not Found',
      singleColorCode: '',
      singleColorId: null,
      colors: [],
      pageItems: 0,
      offset: 0,
      groupId: null
    }
  },
  created() {
    this.loadColors()
  },
  methods: {
    updateContent(data) {
        this.colors = data.colors
        this.pageItems = process.env.VUE_APP_ITEMS_PER_PAGE < data.count
            ? Math.ceil(data.count / process.env.VUE_APP_ITEMS_PER_PAGE) : 0
    },
    async loadColors() {
      this.loading = true
      try {
        const response = (await axios.get('https://colors.local/get-colors', {
          params: {
            offset: this.offset,
            limit: process.env.VUE_APP_ITEMS_PER_PAGE
          }
        })).data
        this.colors = response.data.rows
        this.pageItems = Math.ceil(response.data.count / this.colors.length)
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>

<style>

</style>
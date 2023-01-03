<template>
    <li
        class="page-item active"
        aria-current="page"
        v-if="current"
    >
      <span class="page-link">{{ pageNumber }}</span>
    </li>
    <li v-else class="page-item">
      <a class="page-link" href="#" @click.prevent="loadColors(pageNumber)">{{ pageNumber }}</a>
    </li>
</template>

<script>
import axios from "axios"

export default {
  name: "PaginationItem",
  props: {"current": Boolean, "pageNumber": Number, "groupId": Number},
  methods: {
    async loadColors(page) {
      this.loading = true
      try {
        let offset = (page - 1) * 12
        let url = process.env.VUE_APP_SERVER_URL + '/get-colors'
        if (this.groupId) {
          url = `${process.env.VUE_APP_SERVER_URL}/get-colors-group/${this.groupId}`
        }
        const response = (await axios.get(url, {
          params: {
            offset: offset,
            limit: process.env.VUE_APP_ITEMS_PER_PAGE
          }
        })).data

        this.$emit('updateColors',{
          colors: response.data.rows,
          count: response.data.count,
          groupId: this.groupId,
          currentPage: this.pageNumber
        })
      } catch (e) {
        console.log(e)
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
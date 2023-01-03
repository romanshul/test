<template>
  <div class="text-center error">
    <i class="fa-regular fa-face-sad-sweat"></i>
    <h2>
      {{ errorMessage }}
      unfortunately
    </h2>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SingleErrorPage",
  data() {
    return {
      errorMessage: ''
    }
  },
  computed: {
    ...mapState({
      error: 'error'
    }),
  },
  created() {
    this.errorMessage = this.error.message
  }
}
</script>

<style scoped>

</style>
<template>
  <div :class="{'card col-auto col-md-3 col-xl-2 px-sm-2 px-0 color-block': !subItem, 'card px-0': subItem}">
    <div class="card-body" :style="{ background: colorCode }"></div>
    <div class="card-footer">{{ colorCode }}</div>
  </div>
</template>

<script>
export default {
  name: "ColorItem",
  props: {"colorCode": String, "id": Number, "subItem": Boolean},
}
</script>

<style scoped>
  .card {
    border-radius: 9px;
    width: 219px;
    height: 238px;
    padding: 1px !important;
    box-shadow: #93919187 0px 0px 9px 0px;
  }

  .color-block {
    cursor: pointer;
  }

  .card-body {
    background: #4a90e2;
    border-radius: 7px 7px 0 0;
    box-shadow: #00000024 0px 0px 9px 0px;
  }

  .card-footer {
    border: none;
    background: white;
  }
</style>
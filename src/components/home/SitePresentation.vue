<template>
  <div>
    <h1 class="display-4">Challenge Me</h1>

    <h2 class="display-3">Confront your ideas to better them</h2>
    <h5
      class="headline"
    >Challenge Me allows you to confront your ideas with other entrepeneurs to better them</h5>
    <v-btn color="error" dark large to="/projects">Browse Projects</v-btn>
    <v-btn color="primary" dark large to="/users">Browse Users</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SitePresentation extends Vue {}
</script>

<style lang="scss" scoped>
.el-button {
  font-size: 25px;
}

h1 {
  font-size: 50px;
}

.jumbotron {
  padding: 20px;
}
</style>
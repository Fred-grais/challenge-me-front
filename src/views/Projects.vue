<template>
  <div class="projects">
      <ProjectsList/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectsList from '@/components/projects/ProjectsList.vue'; // @ is an alias to /src

@Component({
  components: {
    ProjectsList,
  },
})
export default class Projects extends Vue {}
</script>

<style lang="scss" scoped>
</style>

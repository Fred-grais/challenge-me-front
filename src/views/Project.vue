<template>
  <v-layout fill-height>
    <ProjectProfile/>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectProfile from '@/components/project/ProjectProfile.vue'; // @ is an alias to /src

@Component({
  components: {
    ProjectProfile,
  },
})
export default class Project extends Vue {}
</script>

<style lang="scss" scoped>
</style>

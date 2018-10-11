<template>
  <div class="project">
    <ProjectProfile/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectProfile from '@/components/me/ProjectProfile.vue';

@Component({
  components: {
    ProjectProfile,
  },
})
export default class Project extends Vue {
}
</script>

<style lang="scss" scoped>
</style>

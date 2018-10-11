<template>
  <div class="projects-list">
      <div class="errors">
        <div class="error" v-for="error in errors" :key="error">
            {{ error }}
        </div>
      </div>

    <section class="features3 cid-r3ao134aCf" id="features3-z">

      <div class="container align-center">
          <!-- <h2 class="pb-3 mbr-fonts-style mbr-section-title display-2">
              OUR AWESOME TEAM
          </h2> -->
          <h3 class="pb-5 mbr-section-subtitle mbr-fonts-style mbr-light display-1">
            Projects
          </h3>
          <div v-for="(chunk, index) in chunkedProjects" :key="index" class="media-container-row">
              <PreviewCard v-for="projectPreview in chunk" :key="projectPreview.id" :projectPreview="projectPreview" />
          </div>
        </div>
    </section>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { State, Action, Getter } from 'vuex-class';

  import { ProjectPreview } from '@/store/projects/types';
  import PreviewCard from '@/components/project/PreviewCard.vue';

  import * as _ from 'lodash';

  const projectsNamespace: string = 'projectsState';

  @Component({
    components: {
      PreviewCard,
    }
  })
  export default class ProjectsList extends Vue {

    errors: string[] = [];

    @Getter('getProjects', { namespace: projectsNamespace }) projectsPreviews!: ProjectPreview[];
  	@Action('fetchData', { namespace: projectsNamespace }) fetchData!: () => Promise<any>;

    created() {
      this.fetchData().catch( (error) => {
        this.errors.push(error.message || 'An error occured, please try again later.');
      });
    }

    get chunkedProjects() {
      return _.chunk(this.projectsPreviews, 3)
    }
  }
</script>

<style lang="scss" scoped>
</style>

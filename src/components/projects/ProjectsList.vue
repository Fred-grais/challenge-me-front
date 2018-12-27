<template>
  <div class="projects-list">
    <section class="features3 cid-r3ao134aCf" id="features3-z">
      <pulse-loader :loading="isFetching"></pulse-loader>

      <div class="container align-center" v-if="!isFetching">
        <div class="errors">
          <div class="error" v-for="error in errors" :key="error">{{ error }}</div>
        </div>

        <h3 class="pb-5 mbr-section-subtitle mbr-fonts-style mbr-light display-1">Projects</h3>
        <div v-for="(chunk, index) in chunkedProjects" :key="index" class="media-container-row">
          <PreviewCard
            v-for="projectPreview in chunk"
            :key="projectPreview.id"
            :projectPreview="projectPreview"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { ProjectPreview } from '@/store/projects/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';

import PreviewCard from '@/components/project/PreviewCard.vue';

import * as _ from 'lodash';

const projectsNamespace: string = 'projectsState';

@Component({
  components: {
    PreviewCard,
    PulseLoader,
  },
})
export default class ProjectsList extends Vue {
  public errors: string[] = [];

  @Getter('getProjects', { namespace: projectsNamespace })
  public projectsPreviews!: ProjectPreview[];
  @Getter('isFetching', { namespace: projectsNamespace })
  public isFetching!: boolean;
  @Action('fetchData', { namespace: projectsNamespace })
  public fetchData!: () => Promise<any>;

  public created() {
    this.fetchData().catch((error) => {
      this.errors.push(
        error.message || 'An error occured, please try again later.',
      );
    });
  }

  get chunkedProjects() {
    return _.chunk(this.projectsPreviews, 3);
  }
}
</script>

<style lang="scss" scoped>
</style>
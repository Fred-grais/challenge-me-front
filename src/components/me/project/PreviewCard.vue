<template>

  <div class="card p-3 col-12 col-md-6 col-lg-4">
      <div class="card-wrapper">
          <div class="card-img">
              <img src="assets/images/01.jpg" alt="Mobirise">
          </div>
          <div class="card-box">
              <h4 class="card-title mbr-fonts-style display-7">
                  {{ projectPreview.name }}
              </h4>
              <p class="mbr-text mbr-fonts-style display-7">
                <span class="from">From {{ projectPreview.ownerPreview.firstName }} {{ projectPreview.ownerPreview.lastName }} ({{ projectPreview.ownerPreview.position }})</span>

                Mobirise is an easy website builder - just drop site elements to your page, add content and style it to look the way you like.
              </p>
          </div>
          <div class="mbr-section-btn text-center">
            <router-link class="btn btn-primary display-4" :to="{ name: 'my_project', params: { id: projectPreview.id }}">See more</router-link>
          </div>
      </div>
  </div>
  <!-- <div class="project-preview-card">
    <hr/>
    <div>{{ projectPreview.id }}</div>
    <div class="from">From {{ projectPreview.ownerPreview.firstName }} {{ projectPreview.ownerPreview.lastName }} ({{ projectPreview.ownerPreview.position }})</div>

    <div><router-link :to="{ name: 'my_project', params: { id: projectPreview.id } }">{{ projectPreview.name }}</router-link></div>
    <hr/>
  </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { ProjectPreview } from '@/store/projects/types';

@Component
export default class PreviewCard extends Vue {
  @Prop() private projectPreview!: ProjectPreview;
}
</script>

<style lang="scss" scoped>
</style>

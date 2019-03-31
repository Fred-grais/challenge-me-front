<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :color="`cyan darken-${color}`"
      class="white--text"
      :to="{ name: 'project', params: { id: projectPreview.id }}"
      :class="`elevation-${hover ? 12 : 2}`"
    >
      <v-layout row>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="headline" v-text="projectPreview.name"></div>
              <div>{{ projectPreview.ownerPreview.firstName }} {{ projectPreview.ownerPreview.lastName }} ({{ projectPreview.ownerPreview.position }})</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs5 pr-5>
          <v-img :src="projectPreview.logoUrl || 'assets/images/01.jpg'" height="250px" contain>
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="cyan"></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        <v-icon @click.prevent="test()" x-large>chat_bubble_outline</v-icon>
        <v-spacer></v-spacer>
        <v-icon>star</v-icon>
        <v-icon>star_half</v-icon>
        <v-icon>star_border</v-icon>
        <v-icon>star_border</v-icon>
        <v-icon>star_border</v-icon>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { ProjectPreview } from '@/store/projects/types';

@Component
export default class PreviewCard extends Vue {
  public color!: number;

  @Prop() private projectPreview!: ProjectPreview;

  public created() {
    this.color = Math.floor(Math.random() * 4) + 1;
  }

  public test() {
    console.log('Click bubble');
  }
}
</script>

<style lang="scss" scoped>
</style>

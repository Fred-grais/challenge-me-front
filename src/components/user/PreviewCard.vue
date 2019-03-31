<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :color="`cyan accent-${color}`"
      :to="{ name: 'user', params: { id: userPreview.id } }"
      :class="`elevation-${hover ? 12 : 2}`"
    >
      <v-layout row>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="headline" v-text="userPreview.firstName"></div>
              <div>Developer</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs5>
          <v-img :src="userPreview.avatarUrl || 'assets/images/face6.jpg'" height="250px" contain>
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
        <v-btn icon>
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { UserPreview } from '@/store/users/types';

@Component
export default class PreviewCard extends Vue {
  public color!: number;

  @Prop() private userPreview!: UserPreview;

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

<template>
  <div :class="['answer', displaySide]">
    <div class="avatar">
      <img :src="user.avatarUrl" alt="User name">
      <div class="status offline"></div>
    </div>
    <div class="name">{{ user.name }}</div>
    <div class="text">
      {{ message }}
    </div>
    <div class="time">{{ formattedDate }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import moment from 'moment';

@Component
export default class InboxMessage extends Vue {
  @Prop({required: true, type: Object}) user!: {avatarUrl: string, name: string};
  @Prop({required: true}) date!: string;
  @Prop({required: true}) message!: string;

  @Prop({required: true}) displaySide!: string;

  get formattedDate() {
    return moment(this.date).format();
  }
}
</script>

<style lang="scss" scoped>
</style>

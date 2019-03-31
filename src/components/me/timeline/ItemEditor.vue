<template>
  <div class="user-timeline-item-editor">
    <datepicker v-model="updatedDate"></datepicker>
    <input type="text" v-model="item.title">
    <textarea v-model="item.description"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

import { ITimelineItem } from '@/store/common/types';

@Component({
  components: {
    Datepicker,
  },
})
export default class ItemEditor extends Vue {
  @Prop({ required: true, type: Object })
  public item!: ITimelineItem;

  get updatedDate() {
    return this.item.date.toDate();
  }

  set updatedDate(date: Date) {
    this.item.date = moment(date);
  }
}
</script>

<style lang="scss" scoped>
</style>
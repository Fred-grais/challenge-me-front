<template>
  <div class="timeline-editor">
      <timeline ref="timeline" :timeline="proxyTimeline" :editMode="true" v-on:updated-item="gatherItems"></timeline>
      <button class="btn btn-secondary btn-form display-4 submit-button submit-button" v-on:click="addTimelineItem()">Add item</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import {ITimeline, ITimelineItem} from '@/store/common/types';
import ItemEditor from '@/components/widgets/timeline-editor/ItemEditor.vue';
import Timeline from '@/components/widgets/Timeline.vue';

import * as _ from 'lodash';
import moment from 'moment';

@Component({
  components: {
    Timeline
  }
})
export default class TimelineEditor extends Vue {
  @Prop({type: Object, default: () => { return {items: []}; }}) timeline!: ITimeline;

  // Proxyfy the base timeline so changes are only local to this component and not reflected on the main data
  proxyTimeline: ITimeline = {
    items: []
  };
  updatedTimeline: ITimeline = {
    items: []
  };

  created() {
    this.proxyTimeline = _.cloneDeep(this.timeline);
  }

  addTimelineItem() {
    this.proxyTimeline.items.push(this.generateDefaultTimelineItem());
  }

  generateDefaultTimelineItem(): ITimelineItem {
    return {
      title: 'Placeholder Title',
      description: 'Placeholder Description',
      date: moment()
    }
  }

  returnUpdatedTimeline() {
    this.updatedTimeline.items = [];
    (this.$refs.timeline as Timeline).getUpdatedItems();
    this.updatedTimelineReturned(this.updatedTimeline);
  }

  gatherItems(item: ITimelineItem) {
    this.updatedTimeline.items.push(item);
  }

  @Emit()
  updatedTimelineReturned(returnedTimeline: ITimeline) {}

}
</script>
<style lang="scss" scoped>
</style>

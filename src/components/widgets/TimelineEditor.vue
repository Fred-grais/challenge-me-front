<template>
  <div class="timeline-editor">
    <timeline
      ref="timeline"
      :timeline="proxyTimeline"
      :editMode="true"
      v-on:updated-item="gatherItems"
    ></timeline>
    <button
      class="btn btn-secondary btn-form display-4 submit-button submit-button"
      v-on:click="addTimelineItem()"
    >Add item</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import { ITimeline, ITimelineItem } from '@/store/common/types';
import ItemEditor from '@/components/widgets/timeline-editor/ItemEditor.vue';
import Timeline from '@/components/widgets/Timeline.vue';

import * as _ from 'lodash';
import moment from 'moment';

@Component({
  components: {
    Timeline,
  },
})
export default class TimelineEditor extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return { items: [] };
    },
  })
  public timeline!: ITimeline;

  // Proxyfy the base timeline so changes are only local to this component and not reflected on the main data
  public proxyTimeline: ITimeline = {
    items: [],
  };
  public updatedTimeline: ITimeline = {
    items: [],
  };

  public created() {
    this.proxyTimeline = _.cloneDeep(this.timeline);
  }

  public addTimelineItem() {
    this.proxyTimeline.items.push(this.generateDefaultTimelineItem());
  }

  public generateDefaultTimelineItem(): ITimelineItem {
    return {
      title: 'Placeholder Title',
      description: 'Placeholder Description',
      date: moment(),
    };
  }

  public returnUpdatedTimeline() {
    this.updatedTimeline.items = [];
    (this.$refs.timeline as Timeline).getUpdatedItems();
    this.updatedTimelineReturned(this.updatedTimeline);
  }

  public gatherItems(item: ITimelineItem) {
    this.updatedTimeline.items.push(item);
  }

  @Emit()
  // tslint:disable-next-line:no-empty
  public updatedTimelineReturned(returnedTimeline: ITimeline) {}
}
</script>
<style lang="scss" scoped>
</style>

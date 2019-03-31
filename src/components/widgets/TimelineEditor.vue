<template>
  <v-container>
    <v-layout row fill-height justify-center align-center>
      <v-flex xs12>
        <timeline
          ref="timeline"
          :timeline="timeline"
          :editMode="true"
          v-on:updated-item="gatherItems"
        ></timeline>
      </v-flex>
    </v-layout>
    <v-layout row fill-height justify-center align-center>
      <v-flex xs12>
        <v-btn color="primary" @click="addTimelineItem()">Add item</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import { ITimeline, ITimelineItem } from '@/store/common/types';
import Timeline from '@/components/widgets/Timeline.vue';

import * as _ from 'lodash';
import moment from 'moment';
import uuid from 'uuid';

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
    this.timeline.items.push(this.generateDefaultTimelineItem());
  }

  public generateDefaultTimelineItem(): ITimelineItem {
    return {
      internalId: uuid.v4(),
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

<template>
  <div class="timeline-viewer-container">
    <timeline :timeline="timeline"></timeline>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ScrollReveal from 'scrollreveal';
import Item from '@/components/widgets/timeline/Item.vue';
import { ITimeline } from '@/store/common/types';
import Timeline from '@/components/widgets/Timeline.vue';

@Component({
  components: {
    Timeline,
  },
})
export default class TimelineViewer extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return { items: [] };
    },
  })
  public timeline!: ITimeline;

  public displayTImeline() {
    return this.timeline.items.length > 0;
  }
}
</script>

<style lang="scss">
</style>

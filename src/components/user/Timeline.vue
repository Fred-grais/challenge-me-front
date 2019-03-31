<template>
  <v-timeline>
    <item
      v-for="(item, i) in timeline.items"
      :key="item.internalId"
      :color="pickColor(i)"
      :item="item"
      :editMode="editMode"
    ></item>
    <!-- <v-timeline-item
      v-for="(item, i) in timeline.items"
      :key="item.internalId"
      :color="pickColor(i)"
      small
    >
      <span slot="opposite" :class="`headline font-weight-bold ${pickColor(i)}--text`">
        <span v-if="editMode">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="item.date"
              label="Picker without buttons"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="item.date" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </span>
        <span v-else>{{ formatDate(item.date) }}</span>
      </span>

      <div class="py-3">
        <h2 :class="`headline font-weight-light mb-3 ${pickColor(i)}--text`">
          <span v-if="editMode">
            <v-text-field v-model="item.title" label="Title"></v-text-field>
          </span>
          <span v-else>{{ item.title }}</span>
        </h2>
        <div>
          <span v-if="editMode">
            <v-textarea v-model="item.description" box name="input-7-4" label="Content"></v-textarea>
          </span>
          <span v-else>{{ item.description }}</span>
        </div>
      </div>
    </v-timeline-item>-->
  </v-timeline>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ITimeline, ITimelineItem } from '@/store/common/types';
import { Moment } from 'moment';
import Item from '@/components/user/timeline/Item.vue';

@Component({
  components: {
    Item,
  },
})
export default class Timeline extends Vue {
  @Prop({ type: Object, required: true }) public timeline!: ITimeline;
  @Prop({ type: Boolean, required: false, default: false })
  public editMode!: boolean;

  public menu2 = false;

  public availableColors = ['cyan', 'green', 'pink', 'amber', 'orange'];

  public years = [
    {
      color: 'cyan',
      year: '1960',
    },
    {
      color: 'green',
      year: '1970',
    },
    {
      color: 'pink',
      year: '1980',
    },
    {
      color: 'amber',
      year: '1990',
    },
    {
      color: 'orange',
      year: '2000',
    },
  ];

  public formatDate(date: Moment) {
    return date.format('L');
  }

  public pickColor(index: number) {
    return this.availableColors[index % this.availableColors.length];
  }

  public addItem(item: ITimelineItem) {
    this.timeline.items.push(item);
  }
}
</script>

<style lang="scss" scoped>
</style>
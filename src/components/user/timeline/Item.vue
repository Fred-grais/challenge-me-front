<template>
  <v-timeline-item :color="color" small>
    <span slot="opposite" :class="`headline font-weight-bold ${color}--text`">
      <span v-if="editMode">
        <v-menu
          v-model="menu"
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
            label="Picker without buttons"
            prepend-icon="event"
            :value="formattedDate"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
      </span>
      <span v-else>{{ formattedDate }}</span>
    </span>

    <div class="py-3">
      <h2 :class="`headline font-weight-light mb-3 ${color}--text`">
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
  </v-timeline-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ITimelineItem } from '@/store/common/types';
import moment from 'moment';

@Component
export default class Item extends Vue {
  @Prop({ required: true, type: Object })
  public item!: ITimelineItem;
  @Prop({ type: Boolean, required: false, default: false })
  public editMode!: boolean;
  @Prop({ required: false, type: String, default: 'cyan' })
  public color!: string;

  public menu = false;

  get date() {
    return this.item.date.format('YYYY-MM-DD');
  }

  set date(value: string) {
    this.item.date = moment(value);
  }

  get formattedDate() {
    return this.item.date.format('DD-MM-YYYY');
  }
}
</script>

<style lang="scss" scoped>
</style>
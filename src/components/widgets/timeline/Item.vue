<template>
  <div class="timeline-item">
    <div class="timeline-img"></div>

    <div v-bind:class="classObject">

      <div class="timeline-img-header" v-if="containImage">
        <h2>{{title}}</h2>
      </div>
      <h2 v-else>{{title}}</h2>

      <div class="date">{{formattedDate}}</div>
      <p>{{description}}</p>
      <a class="bnt-more" href="javascript:void(0)">More</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Item extends Vue {
  @Prop(String) title!: string;
  @Prop(Date) date!: Date;
  @Prop(String) description!: string;

  @Prop({type: Boolean, default: false}) fadeInLeft!: boolean;
  @Prop({type: Boolean, default: false}) containImage!: boolean;
  @Prop(String) imageUrl: string | undefined;

  get classObject() {
    return {
      'timeline-content': true,
      'js--fadeInLeft': this.fadeInLeft,
      'js--fadeInRight': !this.fadeInLeft,
      'timeline-card': this.containImage,
    }
  }

  get formattedDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return this.date.toLocaleDateString("en-US", options);
  }

}
</script>

<style lang="scss" scoped>
</style>

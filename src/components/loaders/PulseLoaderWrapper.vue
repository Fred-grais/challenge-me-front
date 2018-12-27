<template>
  <div class="loader-wrapper" v-show="loading">
    <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin" :radius="radius"></pulse-loader>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

@Component({
  components: {
    PulseLoader,
  },
})
export default class PulseLoaderWrapper extends Vue {
  @Prop({ type: Boolean, default: false }) public loading!: boolean;
  @Prop({ default: '#149dcc' }) public color!: string;
  @Prop({ default: '10px' }) public margin!: string;
  @Prop({ default: '10px' }) public radius!: string;
  @Prop({ default: '15px' }) public size!: string;
}
</script>

<style lang="scss" scoped>
.loader-wrapper {
  text-align: center;
  width: 100%;
}
</style>

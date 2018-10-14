<template>
  <div class="loader-wrapper" v-show="loading">
    <pulse-loader :loading="loading" :color="color" :size="size"  :margin="margin" :radius="radius"></pulse-loader>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

@Component({
  components: {
    PulseLoader
  }
})
export default class PulseLoaderWrapper extends Vue {
  @Prop({ type: Boolean, default: false }) loading!: boolean;
  @Prop({ default: '#149dcc' }) color!: string;
  @Prop({ default: '10px' }) margin!: string;
  @Prop({ default: '10px' }) radius!: string;
  @Prop({ default: '15px' }) size!: string;
}
</script>

<style lang="scss" scoped>
  .loader-wrapper {
    text-align: center;
    width: 100%;
  }

</style>

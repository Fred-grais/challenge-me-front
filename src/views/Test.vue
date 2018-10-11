<template>
  <div id="">
    <VideoChat/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VideoChat from '@/components/widgets/VideoChat.vue'; // @ is an alias to /src

@Component({
  components: {
    VideoChat,
  },
})
export default class Test extends Vue {}
</script>
<style lang="scss" scoped>
</style>

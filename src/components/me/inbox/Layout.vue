<template>
  <div class="inbox-layout">
    <section class="mbr-section content5 cid-r3amUe0ElS mbr-parallax-background" id="content5-t">
      <div class="container">
        <div class="media-container-row">
          <div class="title col-12 col-md-8">
            <h2 class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1">Chat</h2>
          </div>
        </div>
      </div>
    </section>

    <div class="row">
      <chat></chat>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';
import Chat from '@/components/widgets/chat/Chat.vue';

@Component({
  components: {
    PulseLoader,
    Chat,
  },
})
export default class InboxLayout extends Vue {}
</script>


<style lang="scss" scoped>
.inbox-layout {
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
}
.chat {
  width: 100%;
  flex: 1 1 auto;
}

.row {
  width: 100%;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  margin: 0;
}
</style>

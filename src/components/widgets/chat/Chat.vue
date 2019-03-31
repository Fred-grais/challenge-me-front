<template>
  <div class="chat-container">
    <pulse-loader :loading="!iframeInitialized"></pulse-loader>
    <iframe
      v-show="iframeInitialized"
      ref="iframe"
      class="chat"
      :src="rocketChatUrl"
      @load="afterChatLoaded"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';

import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';
import RocketChatIframeCommander from '@/services/rocketchat-iframe-commander';

const InboxAction = namespace('meInboxState', Action);

@Component({
  components: {
    PulseLoader,
  },
})
export default class Chat extends Vue {
  @InboxAction('createChatSession')
  public createChatSession!: () => Promise<any>;

  public rocketChatUrl = process.env.VUE_APP_ROCKET_CHAT_URL;
  public iframeInitialized = false;
  public chatIframeCommander!: RocketChatIframeCommander;

  public mounted() {
    this.chatIframeCommander = RocketChatIframeCommander.Instance;
    this.chatIframeCommander.contentWindow = (this.$refs
      .iframe as HTMLIFrameElement).contentWindow as Window;
  }

  public afterChatLoaded() {
    this.loginToChat();
  }

  public logoutFromChat() {
    this.chatIframeCommander.logoutFromChat();
  }

  public loginToChat() {
    this.chatIframeCommander.loginToChat(this.createChatSession()).then(() => {
      this.iframeInitialized = true;
    });
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  width: 100%;
  flex: 1 1 auto;
  display: flex;
}

.chat {
  width: 100%;
  flex: 1 1 auto;
}
</style>
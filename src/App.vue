<template>
  <div id="app" class="box">
    <!-- <div class="row header">
      <Header/>
    </div>

    <div class="row content">
      <div class="wrapper">
        <div class="inner-content-wrapper" v-if="authReady">
          <router-view/>

          <div class="floating-chat" v-if="$auth.check()">
            <div class="chat-wrapper" :class="{ opened: floatingChatOpen }">
              <div class="open-chat-btn" @click="floatingChatOpen = !floatingChatOpen">
                <div class="content">Open Chat</div>
              </div>

              <chat></chat>
            </div>
          </div>
        </div>
        <div v-if="!authReady" class="global-loader">
          <grid-loader :color="color" :size="size"></grid-loader>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="wrapper">
        <Footer/>
      </div>
    </div>-->
    <!-- <Header></Header>

    <div>
      <router-view/>

      <div class="floating-chat" v-if="$auth.check()">
        <div class="chat-wrapper" :class="{ opened: floatingChatOpen }">
          <div class="open-chat-btn" @click="floatingChatOpen = !floatingChatOpen">
            <div class="content">Open Chat</div>
          </div>

          <chat></chat>
        </div>
      </div>
    </div>

    <Footer></Footer>-->
    <v-app id="inspire">
      <Header></Header>
      <v-content>
        <v-container fluid fill-height pa-0>
          <v-layout>
            <v-flex text-xs-center xs12>
              <router-view/>

              <div class="floating-chat" v-if="$auth.check()">
                <div class="chat-wrapper" :class="{ opened: floatingChatOpen }">
                  <div class="open-chat-btn" @click="floatingChatOpen = !floatingChatOpen">
                    <div class="content">Open Chat</div>
                  </div>

                  <chat></chat>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import Chat from '@/components/widgets/chat/Chat.vue';
import EventBus from '@/services/global-event-bus';

@Component({
  components: {
    Header,
    Footer,
    GridLoader,
    Chat,
  },
})
export default class App extends Vue {
  public color = '#fff';
  public size = '25px';
  public floatingChatOpen = false;

  @Prop() public source!: string;

  public mounted() {
    EventBus.$on('open-chat-tab', () => {
      this.floatingChatOpen = true;
    });
  }

  get authReady(): boolean {
    return this.$auth.ready();
  }
}
</script>

<style lang="scss" scoped>
.v-content {
  padding-right: 0px !important;
}

.inner-content-wrapper {
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
}
.box {
  display: flex;
  flex-flow: column;
}

.box .row {
  border: 1px dotted grey;
  margin: 0;
}

.box .row.header {
  flex: 0 1 auto;
}

.box .row.content {
  flex: 1 1 auto;

  .wrapper {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
  }
}

.box .row.footer {
  flex: 1 1 40px;
}

.wrapper {
  width: 100%;
}

.global-loader {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.floating-chat {
  display: flex;
  $chat_headers_height_closed: 50px;
  $chat_headers_height_opened: 60vh;

  .chat-wrapper {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    height: $chat_headers_height_closed;
    width: 40%;
    display: flex;
    flex-flow: column;

    &.opened {
      height: $chat_headers_height_opened;
    }

    .open-chat-btn {
      cursor: pointer;
      color: white;
      justify-content: center;
      display: flex;
      align-content: center;
      height: $chat_headers_height_closed;
      background-color: blueviolet;
      flex: 0 0 auto;
    }
  }
}
</style>

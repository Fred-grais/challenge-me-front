<template>
  <div id>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>Video Chat
    <br>
    <button type="button" @click="revealId()">RevealID</button>
    <br>
    <div>{{this.id}}</div>
    <br>

    <div>
      <video ref="videoElement" id="their-video" autoplay playsinline></video>
      <video ref="myVideoElement" id="my-video" muted="true" autoplay playsinline></video>
    </div>

    <div>
      <h2>Connected Peer</h2>
      <ul>
        <li v-for="(peer, index) in connectedPeersList" :key="index">
          <button @click="makeCall(peer)">{{peer}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VideoChatInterface from '@/services/video-chat.ts';

@Component
export default class VideoChat extends Vue {
  public videoChatInterface!: VideoChatInterface;
  public targetPeerId: string = '';
  public calleeStreamUrl: string = '';

  public id: string = '';
  public connectedPeersList: string[] = [];

  public created() {
    this.videoChatInterface = new VideoChatInterface();
    setInterval(() => {
      this.videoChatInterface.listAllConnectedPeers((list: any) => {
        this.connectedPeersList = list;
      });
    }, 3000);

    this.videoChatInterface.peer.on('call', (call: any) => {
      call.answer(this.videoChatInterface.localStream);
      this.displayMyStream(this.videoChatInterface.localStream);

      call.on('stream', (stream: any) => {
        this.displayStream(stream);
      });

      call.on('error', (error: any) => {
        this.onCallError(error);
      });

      call.on('close', () => {
        this.onCallClosed();
      });
    });
  }

  public makeCall(peerId: string) {
    const call = this.videoChatInterface.callPeer(peerId);
    this.displayMyStream(this.videoChatInterface.localStream);
    call.on('stream', (stream: any) => {
      this.displayStream(stream);
    });

    call.on('close', () => {
      this.onCallClosed();
    });

    call.on('error', (error: any) => {
      this.onCallError(error);
    });
  }

  public revealId() {
    this.id = this.videoChatInterface.peer.id;
    alert(this.id);
  }

  public displayStream(stream: any) {
    this.videoElement.srcObject = stream;
  }

  public displayMyStream(stream: any) {
    this.myVideoElement.srcObject = stream;
  }

  public onCallError(error: any) {
    alert('Error' + ' ' + error);
  }

  public onCallClosed() {
    alert('Call Closed');
    this.videoElement.srcObject = null;
    this.myVideoElement.srcObject = null;
  }

  get videoElement(): HTMLVideoElement {
    return this.$refs.videoElement as HTMLVideoElement;
  }

  get myVideoElement(): HTMLVideoElement {
    return this.$refs.myVideoElement as HTMLVideoElement;
  }
}
</script>
<style lang="scss" scoped>
</style>

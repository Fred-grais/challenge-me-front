import Peer from 'peerjs';
import * as _ from 'lodash';

class VideoChat {
  peer: Peer = new Peer({ host: 'peerjsbackend.herokuapp.com', port: 443, secure: true, debug: 3});
  localStream: MediaStream | null = null;
  currentCall: Peer.MediaConnection | null = null;

  constructor() {
    this.activateVideoChat();
  }

  activateVideoChat(): void {
    this.acquireUserMedia().then(() => {
      this.initialize();
    });
  }

  callPeer(peerId: string): Peer.MediaConnection {
    return this.initiateCallToPeer(peerId);
  }

   listAllConnectedPeers(cb: (list: any) => void): any {
     return this.peer.listAllPeers((list: any) => {
       const listWithoutCurrentPeer = _.without(list, this.peer.id);
       cb(listWithoutCurrentPeer);
     });
   }

  private acquireUserMedia(): Promise<any> {
    return navigator.mediaDevices.getUserMedia({audio: true, video: true})
      .then((mediaStream: MediaStream) => {
        console.log('mediaStream...');
        this.localStream = mediaStream;
      })
      .catch((err: any) => {
        const errorMessage = err.name + ": " + err.message;
        alert(errorMessage)
        console.log(errorMessage);
     });
  }

  private initialize(): void {
    this.peerOnOpenAction();
    this.peerOnErrorAction();
  }

  private peerOnOpenAction(): void {
    console.log('on peer open');
    this.peer.on('open', () => {
      console.log(`Peer connected: id ${this.peer.id}`)
    });
  }

  private peerOnErrorAction(): void {
    this.peer.on('error', (err: any) => {
      alert(err.message);
    });
  }

  private initiateCallToPeer(peerId: string): Peer.MediaConnection {
    if (this.currentCall) {
      this.currentCall.close();
    }

    this.currentCall = this.peer.call(peerId, this.localStream);
    return this.currentCall;
  }
}

export default VideoChat;

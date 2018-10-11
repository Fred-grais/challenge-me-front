import VideoChatInterface from '@/services/video-chat.ts';
import Peer from 'peerjs';
import { expect } from 'chai';
import sinon from 'sinon';

describe('services/video-chat.vue', () => {

  describe('constructor', () => {

    it('should call the right methods', () => {
      const stub = sinon.stub(VideoChatInterface.prototype, 'activateVideoChat')
      const spyFunc = new VideoChatInterface();
      expect(stub.calledOnce).to.be.true;
      stub.restore();
    });
  });

  describe('activateVideoChat', () => {

    it('should call the right methods', async () => {
      const acquireUserMediaStub = sinon.stub(VideoChatInterface.prototype, <any>'acquireUserMedia');
      acquireUserMediaStub.resolves();

      const initializeStub = sinon.stub(VideoChatInterface.prototype, <any>'initialize');

      const videoChat = await new VideoChatInterface();

      acquireUserMediaStub.resetHistory();
      initializeStub.resetHistory();

      await videoChat.activateVideoChat();

      expect(acquireUserMediaStub.calledOnce).to.be.true;
      expect(initializeStub.calledOnce).to.be.true;

      acquireUserMediaStub.restore();
      initializeStub.restore();
    });
  });

  describe('callPeer', () => {
    it('should call the right methods', () => {
      const initiateCallToPeerStub = sinon.stub(VideoChatInterface.prototype, <any>'initiateCallToPeer');
      const stub = sinon.stub(VideoChatInterface.prototype, 'activateVideoChat');
      const videoChat = new VideoChatInterface();
      videoChat.callPeer('peerId');

      expect(initiateCallToPeerStub.calledOnce).to.be.true;
      expect(initiateCallToPeerStub.getCall(0).args[0]).to.equal('peerId');
      initiateCallToPeerStub.restore();
      stub.restore();
    });
  });

  describe('listAllConnectedPeers', () => {
    it('should call the right methods', () => {
      const listAllPeersStub = sinon.stub(Peer.prototype, 'listAllPeers');
      //const peerIdStub = sinon.stub(Peer.prototype, 'id').returns('id1');

      const callbackSpy = sinon.spy();
      const stub = sinon.stub(VideoChatInterface.prototype, 'activateVideoChat');
      const videoChat = new VideoChatInterface();

      videoChat.peer.id = 'id1';
      videoChat.listAllConnectedPeers(callbackSpy);
      listAllPeersStub.yield(['id1', 'id2']);

      expect(callbackSpy.called).to.be.true;
      expect(callbackSpy.getCall(0).args[0]).to.deep.equal(['id2']);

      stub.restore();
      listAllPeersStub.restore();
    });
  });

  describe('acquireUserMedia', () => {
    it('should call the right methods when success', async () => {
      const getUserMediaStub = sinon.stub();
      getUserMediaStub.resolves('mediaStream');

      const stubbedMediaDevices = {
        getUserMedia: getUserMediaStub,
        ondevicechange: null,
        enumerateDevices: sinon.stub(),
        getSupportedConstraints: sinon.stub(),
        addEventListener: sinon.stub(),
        removeEventListener: sinon.stub(),
        dispatchEvent: sinon.stub(),
      };

      navigator.mediaDevices = stubbedMediaDevices;

      const stub = sinon.stub(VideoChatInterface.prototype, 'activateVideoChat');
      const videoChat = new VideoChatInterface();

      await videoChat['acquireUserMedia']();

      expect(getUserMediaStub.calledOnce).to.be.true;
      expect(getUserMediaStub.getCall(0).args[0]).to.deep.equal({audio: true, video: true});

      expect(videoChat.localStream).to.equal('mediaStream');

      stub.restore();
    });

    // it('should call the right methods when failure', async () => {
    //   //const alertSpy = sinon.spy(alert);
    //
    //   const alertStub = sinon.stub(window, 'alert');
    //
    //   const getUserMediaStub = sinon.stub();
    //
    //   const error = {
    //     name: 'GetUserMediaError',
    //     message: 'Error Message',
    //   };
    //   getUserMediaStub.rejects(error);
    //
    //   const stubbedMediaDevices = {
    //     getUserMedia: getUserMediaStub,
    //     ondevicechange: null,
    //     enumerateDevices: sinon.stub(),
    //     getSupportedConstraints: sinon.stub(),
    //     addEventListener: sinon.stub(),
    //     removeEventListener: sinon.stub(),
    //     dispatchEvent: sinon.stub(),
    //   };
    //
    //   navigator.mediaDevices = stubbedMediaDevices;
    //
    //   const stub = sinon.stub(VideoChatInterface.prototype, 'activateVideoChat');
    //   const videoChat = new VideoChatInterface();
    //
    //   await videoChat['acquireUserMedia']();
    //
    //   expect(getUserMediaStub.calledOnce).to.be.true;
    //   expect(getUserMediaStub.getCall(0).args[0]).to.deep.equal({audio: true, video: true});
    //
    //   // expect(consoleStub.getCall(0).args[0]).to.equal(error.name + ": " + error.message);
    //
    //   stub.restore();
    // });
  });

  describe('#initialize', () => {

    it('should call the right methods', () => {
      const peerOnOpenActionStub = sinon.stub(VideoChatInterface.prototype, <any>'peerOnOpenAction');
      const peerOnErrorActionStub = sinon.stub(VideoChatInterface.prototype, <any>'peerOnErrorAction');

      const stub = sinon.stub(VideoChatInterface.prototype, 'activateVideoChat');
      const videoChat = new VideoChatInterface();

      videoChat['initialize']();

      expect(peerOnOpenActionStub.calledOnce).to.be.true;
      expect(peerOnErrorActionStub.calledOnce).to.be.true;

      stub.restore();
    });
  });

  describe('#initiateCallToPeer', () => {
      context('No current call', () => {
        it('should create a call and return it', () => {
          const targetPeerId = 'targetPeerId';
          const callPeerStub = sinon.stub(Peer.prototype, 'call');
          callPeerStub.returns('returnedCall');

          const stub = sinon.stub(VideoChatInterface.prototype, 'activateVideoChat');
          const videoChat = new VideoChatInterface();

          videoChat.localStream = 'localStream' as any;

          const returnValue = videoChat['initiateCallToPeer'](targetPeerId);

          expect(callPeerStub.calledOnce).to.be.true;
          expect(callPeerStub.calledWith(targetPeerId, 'localStream')).to.be.true;

          expect(videoChat.currentCall).to.equal('returnedCall');
          expect(returnValue).to.equal('returnedCall');

          stub.restore();
          callPeerStub.restore();
        });

      });

      context('Current call present', () => {
          it('should close the current call then create a new call and return it', () => {
            const targetPeerId = 'targetPeerId';
            const closeCallStub = sinon.stub();
            const currentCall = {
              close: closeCallStub
            };

            const callPeerStub = sinon.stub(Peer.prototype, 'call');
            callPeerStub.returns('returnedCall');

            const stub = sinon.stub(VideoChatInterface.prototype, 'activateVideoChat');
            const videoChat = new VideoChatInterface();

            videoChat.currentCall = currentCall as any;
            videoChat.localStream = 'localStream' as any;

            const returnValue = videoChat['initiateCallToPeer'](targetPeerId);

            expect(closeCallStub.calledOnce).to.be.true;

            expect(callPeerStub.calledOnce).to.be.true;
            expect(callPeerStub.calledWith(targetPeerId, 'localStream')).to.be.true;

            expect(videoChat.currentCall).to.equal('returnedCall');
            expect(returnValue).to.equal('returnedCall');

            stub.restore();
            callPeerStub.restore();
          });
      });
  });
});

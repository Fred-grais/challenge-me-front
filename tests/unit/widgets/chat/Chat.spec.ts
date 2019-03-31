import { expect } from 'chai';
import Vuex from 'vuex';

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Chat from '@/components/widgets/chat/Chat.vue';

import { meInboxState } from '@/store/me/inbox/index';

import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe.only('widgets/chat/Chat.vue', () => {
  let actions: any;
  let store: any;
  let state: any;

  beforeEach(() => {
    state = {
      conversationPreviews: [],
      currentConversation: undefined,
      fetching: false,
    };

    actions = {
      createChatSession: sinon.stub(),
    };

    store = new Vuex.Store({
      modules: {
        meInboxState: {
          namespaced: true,
          state,
          actions,
          getters: meInboxState.getters,
        },
      },
    });
  });

  it('should assign the afterChatLoaded function to the iframe onload hook', () => {
    const afterChatLoaded = sinon.stub();
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      methods: {
        afterChatLoaded,
      },
    });
    const event = document.createEvent('Event');
    event.initEvent('load', true, true); //can bubble, and is cancellable

    (wrapper.vm.$refs.iframe as HTMLIFrameElement).dispatchEvent(event);
    expect(afterChatLoaded.called).to.be.true;
  });

  describe('#afterChatLoaded', () => {
    it('should call the right methods', () => {
      const loginToChat = sinon.stub();
      const wrapper = shallowMount(Chat, {
        localVue,
        store,
        methods: {
          loginToChat,
        },
      });

      wrapper.vm.afterChatLoaded();
      expect(loginToChat.calledOnce).to.be.true;
      expect(wrapper.vm.iframeInitialized).to.be.true;
    });
  });

  describe('#loginToChat', () => {
    context('createChatSession is successfull', () => {
      it('should call the right methods', done => {
        const logoutFromChat = sinon.stub();
        const contentWindow = {
          postMessage: () => {},
        };
        const contentWindowMock = sinon.mock(contentWindow);
        const wrapper = shallowMount(Chat, {
          localVue,
          store,
          methods: {
            logoutFromChat,
          },
        });
        actions.createChatSession.resolves({ authToken: 'token' });
        wrapper.setData({ contentWindow });

        contentWindowMock
          .expects('postMessage')
          .once()
          .withArgs(
            {
              externalCommand: 'login-with-token',
              token: 'token',
            },
            '*',
          );

        wrapper.vm.loginToChat();
        expect(logoutFromChat.calledOnce).to.be.true;
        expect(actions.createChatSession.calledOnce).to.be.true;

        wrapper.vm.$nextTick(() => {
          contentWindowMock.verify();
          done();
        });
      });
    });

    context('createChatSession fails', () => {
      it('should call the right methods', done => {
        const logoutFromChat = sinon.stub();
        const contentWindow = {
          postMessage: () => {},
        };
        window.alert = sinon.spy();
        const contentWindowMock = sinon.mock(contentWindow);

        const wrapper = shallowMount(Chat, {
          localVue,
          store,
          methods: {
            logoutFromChat,
          },
        });
        actions.createChatSession.rejects(function() {
          return new Error('errorMsg');
        });
        wrapper.setData({ contentWindow });

        contentWindowMock.expects('postMessage').never();

        wrapper.vm.loginToChat();
        expect(logoutFromChat.calledOnce).to.be.true;
        expect(actions.createChatSession.calledOnce).to.be.true;

        wrapper.vm.$nextTick(() => {
          contentWindowMock.verify();
          done();
        });
      });
    });
  });

  describe('#logoutFromChat', () => {
    it('should call the fetchConversationPreviews on creation', () => {
      const contentWindow = {
        postMessage: () => {},
      };
      const contentWindowMock = sinon.mock(contentWindow);

      const wrapper = shallowMount(Chat, {
        localVue,
        store,
      });

      wrapper.setData({ contentWindow });
      contentWindowMock
        .expects('postMessage')
        .once()
        .withArgs(
          {
            externalCommand: 'logout',
          },
          '*',
        );

      wrapper.vm.logoutFromChat();

      contentWindowMock.verify();
    });
  });
});

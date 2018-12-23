import { expect } from 'chai';
import Vuex from 'vuex'

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';

import InboxChatBody from '@/components/me/inbox/components/ChatBody.vue';
import InboxMessage from '@/components/me/inbox/components/chat-body/Message.vue';

import { Conversation } from '@/store/me/inbox/types';

import { meInboxState } from '@/store/me/inbox/index';
import { meState } from '@/store/me/index';

import sinon from 'sinon';
import moment from 'moment';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('me/inbox/components/ChatBody', () => {

  let actions: any;
  let store: any;
  let state: any;
  let meCustomState: any;

  let message1CreatedAt = moment();
  let message2CreatedAt = moment();

  let currentConversation: Conversation = new Conversation({
    id: 1,
    expandedRecipients: [
      {
        id: 1,
        avatarUrl: 'avatarUrl1',
        firstName: 'firstName1',
        lastName: 'lastName1',
        mood: 'mood1',
        position: 'position1',
      },
      {
        id: 2,
        avatarUrl: 'avatarUrl2',
        firstName: 'firstName2',
        lastName: 'lastName2',
        mood: 'mood2',
        position: 'position2',
      },
    ],
    displayedMessages: [
      {
        senderId: 1,
        createdAt: message1CreatedAt,
        message: 'message1',
      },
      {
        senderId: 2,
        createdAt: message2CreatedAt,
        message: 'message2',
      },
    ],
  });

  beforeEach(() => {
    state = {
      conversationPreviews: [],
      currentConversation,
      fetching: false,
    };

    meCustomState = {
      me: {
        id: 1,
        email: 'email',
        firstName: 'firstName1',
        lastName: 'lastName1',
        position: 'position1',
      },
      fetching: false,
    };

    actions = {
      createMessage: sinon.stub(),
    };

    store = new Vuex.Store({
      modules: {
        meInboxState: {
          namespaced: true,
          state,
          actions,
          getters: meInboxState.getters,
        },
        meState: {
          namespaced: true,
          state: meCustomState,
          getters: meState.getters,
        },
      }
    });
  });

  it('should not display any message when no conversation is present', () => {
    state.currentConversation = undefined;

    const wrapper = shallowMount(InboxChatBody, {
      localVue,
      store
    });

    expect(wrapper.findAll(InboxMessage)).to.have.lengthOf(0);
  });

  it('should have 2 messages displayed', () => {
    const wrapper = shallowMount(InboxChatBody, {
      localVue,
      store
    });

    const messagesWrappers = wrapper.findAll(InboxMessage);
    expect(messagesWrappers).to.have.lengthOf(2);

    const messageWrapper1 = messagesWrappers.wrappers[0];
    const messageWrapper2 = messagesWrappers.wrappers[1];

    expect(messageWrapper1.props().user).to.deep.equal({
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'firstName1',
    });
    expect(messageWrapper1.props().date).to.equal(message1CreatedAt.format());
    expect(messageWrapper1.props().message).to.equal('message1');
    expect(messageWrapper1.props().displaySide).to.equal('right');

    expect(messageWrapper2.props().user).to.deep.equal({
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'firstName2',
    });
    expect(messageWrapper2.props().date).to.equal(message2CreatedAt.format());
    expect(messageWrapper2.props().message).to.equal('message2');
    expect(messageWrapper2.props().displaySide).to.equal('left');
  });

  it('should trigger the send message method when clicking the correct button', (done) => {
    actions.createMessage.resolves({success: true});

    const wrapper = shallowMount(InboxChatBody, {
      localVue,
      store,
    });

    wrapper.setData({
      currentMessage: 'new message',
    });

    wrapper.find('.answer-btn').trigger('click');

    expect(actions.createMessage.calledOnce).to.be.true;

    expect(actions.createMessage.getCall(0).args[1]).to.deep.equal({
      conversationId: 1,
      message: 'new message',
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentMessage).to.equal('');
      done();
    });
  });

  it('should not clear the currentMessage when the sendMessage fails', (done) => {
    actions.createMessage.resolves({success: false});

    const wrapper = shallowMount(InboxChatBody, {
      localVue,
      store,
    });

    wrapper.setData({
      currentMessage: 'new message',
    });

    wrapper.find('.answer-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentMessage).to.equal('new message');
      done();
    });

  });
});

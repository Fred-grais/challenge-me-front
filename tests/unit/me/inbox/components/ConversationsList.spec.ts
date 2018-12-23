import { expect } from 'chai';
import Vuex from 'vuex'

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';

import InboxConversationsList from '@/components/me/inbox/components/ConversationsList.vue';
import ConversationCard from '@/components/me/inbox/components/conversations-list/ConversationCard.vue';

import { ConversationPreview } from '@/store/me/inbox/types';

import { meInboxState } from '@/store/me/inbox/index';

import sinon from 'sinon';
import moment from 'moment';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('me/inbox/components/ConversationsList', () => {

  let actions: any;
  let store: any;
  let state: any;
  let meCustomState: any;

  let message1CreatedAt = moment();
  let message2CreatedAt = moment();

  let conversationPreviews: ConversationPreview[] = [
    {
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
      lastMessagePreview: 'Message preview 1',
    },
    {
      id: 2,
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
      lastMessagePreview: 'Message preview 2',
    },
  ]


  beforeEach(() => {
    state = {
      conversationPreviews,
      currentConversation: undefined,
      fetching: false,
    };

    store = new Vuex.Store({
      modules: {
        meInboxState: {
          namespaced: true,
          state,
          getters: meInboxState.getters,
        },
      }
    });
  });

  it('should render 0 conversation cards', () => {
    state.conversationPreviews = [];

    const wrapper = shallowMount(InboxConversationsList, {
      localVue,
      store,
    });

    expect(wrapper.findAll(ConversationCard)).to.have.lengthOf(0);
  });

  it('should render 2 conversation cards', () => {
    const wrapper = shallowMount(InboxConversationsList, {
      localVue,
      store,
    });

    const conversationcardsWrappers = wrapper.findAll(ConversationCard);
    expect(conversationcardsWrappers).to.have.lengthOf(2);

    expect(conversationcardsWrappers.wrappers[0].props().conversationPreview).to.deep.equal(state.conversationPreviews[0]);
    expect(conversationcardsWrappers.wrappers[1].props().conversationPreview).to.deep.equal(state.conversationPreviews[1]);
  });

  it('should listen to the conversation-selected event from conversation card', () => {
    const wrapper = shallowMount(InboxConversationsList, {
      localVue,
      store,
    });

    wrapper.find(ConversationCard).vm.$emit('conversation-selected', 1);

    expect(wrapper.emitted()['fetch-conversation-details']).to.have.lengthOf(1);
    expect(wrapper.emitted()['fetch-conversation-details'][0]).to.deep.equal([1]);
  });

});

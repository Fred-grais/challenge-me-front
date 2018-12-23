import { expect } from 'chai';
import Vuex from 'vuex'

import ConversationCard from '@/components/me/inbox/components/conversations-list/ConversationCard.vue';
import { ConversationPreview } from '@/store/me/inbox/types';

import { meState } from '@/store/me/index';

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';

import sinon from 'sinon';
import moment from 'moment';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('me/inbox/components/conversations-list/ConversationCard', () => {

  let actions: any;
  let store: any;
  let state: any;

  const conversationPreview: ConversationPreview =   {
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
    };

  beforeEach(() => {

    state = {
      me: {
        id: 1,
        email: 'email',
        firstName: 'firstName1',
        lastName: 'lastName1',
        position: 'position1',
      },
      fetching: false,
    };

    store = new Vuex.Store({
      modules: {
        meState: {
          namespaced: true,
          state,
          getters: meState.getters,
        },
      }
    });
  });

  it('should have the correct props', () => {
    const wrapper = shallowMount(ConversationCard, {
      localVue,
      store,
      computed: {
        firstRecipientWithoutCurrentUser: () => { return {}; },
        conversationPreview: () => { return {}; },
      }
    });
    const conversationPreview = (wrapper!.vm.$options.props as any).conversationPreview;

    expect(conversationPreview.required).to.be.true;
    expect(conversationPreview.type()).to.deep.equal({});
  })

  it('should have a conversationPreview property', () => {
    const wrapper = shallowMount(ConversationCard, {
      localVue,
      store,
      propsData: {
        conversationPreview,
      }
    });

    expect(wrapper.props().conversationPreview).to.deep.equal(conversationPreview);
  });

  it('should return the recipients without the current user', () => {
    const wrapper = shallowMount(ConversationCard, {
      localVue,
      store,
      propsData: {
        conversationPreview,
      }
    });

    expect(wrapper.vm.recipientsWithoutCurrentUser).to.deep.equal([{
      id: 2,
      avatarUrl: 'avatarUrl2',
      firstName: 'firstName2',
      lastName: 'lastName2',
      mood: 'mood2',
      position: 'position2',
    }]);
  });

  it('should return the first recipient without the current user', () => {
    const wrapper = shallowMount(ConversationCard, {
      localVue,
      store,
      propsData: {
        conversationPreview,
      }
    });

    expect(wrapper.vm.firstRecipientWithoutCurrentUser).to.deep.equal({
      id: 2,
      avatarUrl: 'avatarUrl2',
      firstName: 'firstName2',
      lastName: 'lastName2',
      mood: 'mood2',
      position: 'position2',
    });
  });

  it('should emit the conversation-selected event when the conversation preview is clicked', () => {
    const wrapper = shallowMount(ConversationCard, {
      localVue,
      store,
      propsData: {
        conversationPreview,
      }
    });

    wrapper.find('.user').trigger('click');

    expect(wrapper.emitted()['conversation-selected']).to.have.lengthOf(1);
    expect(wrapper.emitted()['conversation-selected'][0]).to.deep.equal([1]);
  });
});

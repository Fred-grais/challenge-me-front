import { expect } from 'chai';
import Vuex from 'vuex'

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Layout from '@/components/me/inbox/Layout.vue';
import InboxConversationsList from '@/components/me/inbox/components/ConversationsList.vue';
import InboxChatBody from '@/components/me/inbox/components/ChatBody.vue';

import { meInboxState } from '@/store/me/inbox/index';

import sinon from 'sinon';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('me/inbox/Layout.vue', () => {

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
      fetchConversationPreviews: sinon.stub(),
      fetchConversation: sinon.stub()
    };

    store = new Vuex.Store({
      modules: {
        meInboxState: {
          namespaced: true,
          state,
          actions,
          getters: meInboxState.getters
        }
      }
    });
  });

  it('should call the fetchConversationPreviews on creation', () => {
    const wrapper = shallowMount(Layout, {
      localVue,
      store
    });

    expect(actions.fetchConversationPreviews.calledOnce).to.be.true;
  });

  it('should call the fetchConversationDetails when conversationList emit the correct event', () => {
    const fetchConversationDetailsStub = sinon.stub();

    const wrapper = shallowMount(Layout, {
      localVue,
      store,
      methods: {
        fetchConversationDetails: fetchConversationDetailsStub,
      }
    });

    wrapper.find(InboxConversationsList).vm.$emit('fetch-conversation-details', 1)

    expect(fetchConversationDetailsStub.calledOnceWith(1)).to.be.true;
  });


  it('should call the right method when calling the fetchConversationDetails method', () => {

    const wrapper = shallowMount(Layout, {
      localVue,
      store,
    });

    wrapper.vm.fetchConversationDetails(1);

    expect(actions.fetchConversation.calledOnce).to.be.true;
    expect(actions.fetchConversation.getCall(0).args[1]).to.equal(1);
  });

  it('should have the correct child components', () => {

    const wrapper = shallowMount(Layout, {
      localVue,
      store,
    });

    expect(wrapper.findAll(InboxConversationsList)).to.have.lengthOf(1);
    expect(wrapper.findAll(InboxChatBody)).to.have.lengthOf(1);
  });
});

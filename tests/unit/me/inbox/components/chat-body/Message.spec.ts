import { expect } from 'chai';
import Vuex from 'vuex'

import InboxMessage from '@/components/me/inbox/components/chat-body/Message.vue';

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';

import moment from 'moment';

describe('me/inbox/components/chat-body/Message', () => {

  it('should validate the props correctly', () => {
    const wrapper = shallowMount(InboxMessage, {
      propsData: {
        user: {
          avatarUrl: 'url',
          name: 'name',
        },
        date: '2018-01-01',
        message: 'message',
        displaySide: 'right',
      }
    });

    const user = (wrapper!.vm.$options.props as any).user;
    const date = (wrapper!.vm.$options.props as any).date;
    const message = (wrapper!.vm.$options.props as any).message;
    const displaySide = (wrapper!.vm.$options.props as any).displaySide;

    expect(user.required).to.be.true;
    expect(user.type()).to.deep.equal({});

    expect(date.required).to.be.true;
    expect(message.required).to.be.true;
    expect(displaySide.required).to.be.true;

  });

  it('should format the date correctly', () => {
    const wrapper = shallowMount(InboxMessage, {
      propsData: {
        user: {
          avatarUrl: 'url',
          name: 'name',
        },
        date: '2018-01-01',
        message: 'message',
        displaySide: 'right',
      }
    });

    expect(wrapper.vm.formattedDate).to.equal(moment('2018-01-01').format());
  });

  it('should have the correct classes on the root element', () => {
    const wrapper = shallowMount(InboxMessage, {
      propsData: {
        user: {
          avatarUrl: 'url',
          name: 'name',
        },
        date: '2018-01-01',
        message: 'message',
        displaySide: 'right',
      }
    });

    expect(wrapper.find('.answer').classes()).to.contains('right');

  });

});

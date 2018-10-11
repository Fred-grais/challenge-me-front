import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, createLocalVue, RouterLinkStub  } from '@vue/test-utils';
import UsersList from '@/components/users/UsersList.vue';
import PreviewCard from '@/components/user/PreviewCard.vue';
import { UserPreview } from '@/store/users/types';
import {usersState } from '@/store/users/index';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('users/UsersList.vue', () => {

  let actions: any;
  let state: any;
  let store: any;

  let fetchDataStub: any;

  const users: UserPreview[] = [{
    id: 1,
    firstName: 'Fred',
    lastName: 'Grauis',
    position: 'CEO',
  },
  {
    id: 2,
    firstName: 'Fred2',
    lastName: 'Grauis2',
    position: 'CEO',
  }];

  beforeEach(() => {
    state = {
      users,
    };

    fetchDataStub = sinon.stub();
    actions = {
      fetchData: fetchDataStub,
    };

    store = new Vuex.Store({
      modules: {
        usersState: {
          namespaced: true,
          state,
          actions,
          getters: usersState.getters
        }
      }
    });
  })

  it('should call the fetchData method on creation', () => {
    const wrapper = shallowMount(UsersList, {
      localVue,
      store,
    });

    expect(actions.fetchData.called).to.be.true;
  });

  it('should render the correct amount of PreviewCard components with correct props', () => {
    const wrapper = shallowMount(UsersList, {
      localVue,
      store,
    });

    const previewCards: any = wrapper.findAll(PreviewCard);
    expect(previewCards).to.have.lengthOf(2);;

    previewCards.wrappers.forEach((wrapper: any, i: any) => { //
      expect(wrapper.props().userPreview).to.equal(users[i]) //
    })
  });

  it('should render errors if any', (done) => {
    const errorMessage = 'An error occurred';

    fetchDataStub.rejects({message: errorMessage});

    const wrapper = shallowMount(UsersList, {
      localVue,
      store,
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.errors').text()).to.equal(errorMessage);
      done();
    });
  });

  it('should render a default error message if no error message returned from API', (done) => {
    fetchDataStub.rejects({message: ''});

    const wrapper = shallowMount(UsersList, {
      localVue,
      store,
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.errors').text()).to.equal('An error occured, please try again later.');
      done();
    });
  });
});

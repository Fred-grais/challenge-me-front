import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, createLocalVue, RouterLinkStub  } from '@vue/test-utils';
import UsersList from '@/components/users/UsersList.vue';
import PreviewCard from '@/components/user/PreviewCard.vue';
import { UserPreview, UsersState } from '@/store/users/types';
import {usersState } from '@/store/users/index';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';

import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('users/UsersList.vue', () => {

  let actions: any;
  let state: UsersState;
  let store: any;
  let getters: any;

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

  const fetching = false;

  beforeEach(() => {
    state = {
      users,
      fetching
    };

    fetchDataStub = sinon.stub();
    actions = {
      fetchData: fetchDataStub,
    };

    getters = usersState.getters;

    store = new Vuex.Store({
      modules: {
        usersState: {
          namespaced: true,
          state,
          actions,
          getters
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

  it('should render a loader when fetching data then hidding it when fetching has completed', () => {
    const wrapper = shallowMount(UsersList, {
      localVue,
      store,
    });
    state.fetching = true;

    expect(wrapper.findAll(PulseLoader)).to.have.lengthOf(1);
    expect(wrapper.find(PulseLoader).props().loading).to.be.true;

    state.fetching = false;
    expect(wrapper.find(PulseLoader).props().loading).to.be.false;
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

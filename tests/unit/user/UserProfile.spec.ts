import { expect } from 'chai';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import UserProfile from '@/components/user/UserProfile.vue';
import { currentUserState } from '@/store/current-user/index';
import { User, CurrentUserState } from '@/store/current-user/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';

import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('user/UserProfile.vue', () => {
  let actions: any;
  let state: CurrentUserState;
  let store: any;

  let fetchDataStub: any;

  const user: User = {
    id: 1,
    firstName: 'Fred',
    lastName: 'Grauis',
    position: 'CEO',
    mobile: '0102030405',
  };

  const fetching = false;

  beforeEach(() => {
    state = {
      currentUser: user,
      fetching
    };

    fetchDataStub = sinon.stub();

    actions = {
      fetchData: fetchDataStub,
    };

    store = new Vuex.Store({
      modules: {
        currentUserState: {
          namespaced: true,
          state,
          actions,
          getters: currentUserState.getters
        }
      }
    });
  })

  it('should call the fetchUserDetails method on creation', () => {
    const $route = { path: '/', params: {id: 1} };
    const stub = sinon.stub();
    const wrapper = shallowMount(UserProfile, {
      localVue,
      store,
      methods: {
        fetchUserDetails: stub,
      },
      mocks: { $route }
    });

    expect(stub.called).to.be.true;
  });

  it('should display a loader when fetching the data and hide it when loaded', () => {
    const $route = { path: '/', params: {id: 1} };

    const wrapper = shallowMount(UserProfile, {
      localVue,
      store,
      mocks: { $route },
    });

    expect(wrapper.findAll(PulseLoader)).to.have.lengthOf(1);

    state.fetching = true;
    expect(wrapper.find(PulseLoader).props().loading).to.be.true;

    state.fetching = false;
    expect(wrapper.find(PulseLoader).props().loading).to.be.false;
  });

  describe('#fetchUserDetails', () => {

    it('should call fetchData with the correct params', () => {
      const $route = { path: '/', params: {id: 1} };

      const wrapper = shallowMount(UserProfile, {
        localVue,
        store,
        mocks: { $route },
      });

      wrapper.vm.fetchUserDetails();

      expect(actions.fetchData.called).to.be.true;
      expect(actions.fetchData.getCall(0).args[1]).to.equal($route.params.id);
    });

    it('should display an error message when fetchData fails', (done) => {
      const $route = { path: '/', params: {id: 1} };
      const errorMessage = 'An error occurred';

      fetchDataStub.rejects({message: errorMessage});
      const wrapper = shallowMount(UserProfile, {
        localVue,
        store,
        mocks: { $route }
      });

      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.errors').text()).to.equal(errorMessage);
        done();
      })

    });

    it('should display an default error message when fetchData fails without error message returned', (done) => {
      const $route = { path: '/', params: {id: 1} };
      const errorMessage = '';

      fetchDataStub.rejects({message: errorMessage})
      const wrapper = shallowMount(UserProfile, {
        localVue,
        store,
        mocks: { $route }
      });

      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.errors').text()).to.equal('An error occured, please try again later.');
        done();
      })
    });
  });

  describe('Watchers', () => {

    it('should watch the $route property', (done) => {
      const $route = { path: '/user/:id', name: 'user' };
      const router = new VueRouter({ routes: [$route] })
      const stub = sinon.stub();
      localVue.use(VueRouter)
      const wrapper = shallowMount(UserProfile, {
        localVue,
        store,
        router,
        methods: {
          fetchUserDetails: stub,
        }
      });

      stub.reset();

      router.push({ name: 'user', params: { id: '2' } });

      wrapper.vm.$nextTick(() => {
        expect(stub.called).to.be.true;
        done();
      });

    });

  });
});

import { expect } from 'chai';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import ProjectProfile from '@/components/me/ProjectProfile.vue';
import Form from '@/components/project/EditForm.vue';
import { meProjectState } from '@/store/me/project/index';
import { Project } from '@/store/current-project/types';
import { MeProjectState } from '@/store/me/project/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';

import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Me/ProjectProfile.vue', () => {
  let actions: any;
  let state: MeProjectState;
  let store: any;

  const project: Project = {
    id: 1,
    name: 'Name',
    description: 'Description',
    timeline: {items: []},
    activitySectorList: [],
    challengesNeededList: [],
    ownerFull: {
      id: 1,
      firstName: 'Fred',
      lastName: 'Grauis',
      position: 'CEO',
      mobile: '0102030405',
    },
  };

  const fetching = false;

  beforeEach(() => {
    state = {
      project,
      fetching
    };

    actions = {
      fetchData: sinon.stub()
    };

    store = new Vuex.Store({
      modules: {
        meProjectState: {
          namespaced: true,
          state,
          actions,
          getters: meProjectState.getters
        }
      }
    });
  })

  it('should have a Form component child', () => {
    const $route = { path: '/', params: {id: 1} };
    const wrapper = mount(ProjectProfile, {
      localVue,
      store,
      mocks: { $route }
    });
    //expect((wrapper.vm.$children[0]['$options'] as any)['_componentTag']).to.equal('Form');
    expect(wrapper.contains(Form)).to.be.true;
  });

  it('should call the fetchProjectDetails method on creation', () => {
    const $route = { path: '/', params: {id: 1} };
    const stub = sinon.stub();
    const wrapper = shallowMount(ProjectProfile, {
      localVue,
      store,
      methods: {
        fetchProjectDetails: stub,
      },
      mocks: { $route }
    });

    expect(stub.called).to.be.true;
  });

  it('should display a loader when fetching the data and hide it when loaded', () => {
    const $route = { path: '/', params: {id: 1} };

    const wrapper = shallowMount(ProjectProfile, {
      localVue,
      store,
      mocks: { $route },
    });

    expect(wrapper.findAll(PulseLoader)).to.have.lengthOf(3);

    state.fetching = true;
    expect(wrapper.find(PulseLoader).props().loading).to.be.true;

    state.fetching = false;
    expect(wrapper.find(PulseLoader).props().loading).to.be.false;
  });

  describe('#fetchProjectDetails', () => {

    it('should call fetchData with the correct params', () => {
      const $route = { path: '/', params: {id: 1} };
      const stub = sinon.stub();
      const wrapper = shallowMount(ProjectProfile, {
        localVue,
        store,
        mocks: { $route }
      });

      wrapper.vm.fetchProjectDetails();

      expect(actions.fetchData.called).to.be.true;
      expect(actions.fetchData.getCall(0).args[1]).to.equal($route.params.id);
    });
  });

  describe('Watchers', () => {

    it('should watch the $route property', (done) => {
      const $route = { path: '/me/project/:id', name: 'test' };
      const router = new VueRouter({ routes: [$route] })
      const stub = sinon.stub();
      localVue.use(VueRouter);
      const wrapper = shallowMount(ProjectProfile, {
        localVue,
        store,
        router,
        methods: {
          fetchProjectDetails: stub,
        }
      });

      stub.reset();

      router.push({ name: 'test', params: { id: '2' } });
      //wrapper.vm.$route = { path: '/', params: {id: '1'}, hash: 'fderfer', query: {}, fullPath: '/', matched: [] };

      wrapper.vm.$nextTick(() => {
        expect(stub.called).to.be.true;
        done()
      });

    });

  });
});

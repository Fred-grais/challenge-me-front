import { expect } from 'chai';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import ProjectProfile from '@/components/project/ProjectProfile.vue';
import { currentProjectState } from '@/store/current-project/index';
import { Project, CurrentProjectState } from '@/store/current-project/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';
import TimelineViewer from '@/components/widgets/TimelineViewer.vue';

import sinon, { SinonStub } from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('project/ProjectProfile.vue', () => {
  let actions: any;
  let state: CurrentProjectState;
  let store: any;

  let fetchDataStub: any;

  const project: Project = {
    id: 1,
    logoUrl: 'logoUrl',
    picturesUrls: ['pictureUrl1', 'pictureUrl2'],
    name: 'Name',
    description: 'Description',
    timeline: { items: [] },
    activitySectorList: [],
    challengesNeededList: [],
    ownerFull: {
      id: 1,
      firstName: 'Fred',
      lastName: 'Grauis',
      position: 'CEO',
      mobile: '0102030405',
      status: 'active',
      twitterId: 'twitterId',
      rocketChatProfile: { name: 'rocketchat_username' },
      timeline: { items: [] },
      avatarUrl: 'avatarUrl',
    },
    rocketChatProfile: { name: 'rocketchat_username' },
  };
  const fetching = false;

  beforeEach(() => {
    state = {
      currentProject: project,
      fetching,
    };

    fetchDataStub = sinon.stub();

    actions = {
      fetchData: fetchDataStub,
    };

    store = new Vuex.Store({
      modules: {
        currentProjectState: {
          namespaced: true,
          state,
          actions,
          getters: currentProjectState.getters,
        },
      },
    });
  });

  function componentShallowFactory(stub: SinonStub) {
    const $route = { path: '/', params: { id: 1 } };
    return shallowMount(ProjectProfile, {
      localVue,
      store,
      methods: {
        fetchProjectDetails: stub,
      },
      mocks: { $route },
    });
  }

  it('should call the fetchProjectDetails method on creation', () => {
    const stub = sinon.stub();
    const wrapper = componentShallowFactory(stub);

    expect(stub.called).to.be.true;
  });

  it('should display a loader when fetching the data then hide it', () => {
    const $route = { path: '/', params: { id: 1 } };

    const wrapper = shallowMount(ProjectProfile, {
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

  it('should have a timeline viewer present on the page', () => {
    const stub = sinon.stub();
    const wrapper = componentShallowFactory(stub);

    expect(wrapper.findAll(TimelineViewer)).to.have.lengthOf(1);
    expect(wrapper.find(TimelineViewer).props().timeline).to.deep.equal(
      project.timeline,
    );
  });

  describe('#fetchProjectDetails', () => {
    it('should call fetchData with the correct params', () => {
      const $route = { path: '/', params: { id: 1 } };

      const wrapper = shallowMount(ProjectProfile, {
        localVue,
        store,
        mocks: { $route },
      });

      wrapper.vm.fetchProjectDetails();

      expect(actions.fetchData.called).to.be.true;
      expect(actions.fetchData.getCall(0).args[1]).to.equal($route.params.id);
    });

    it('should display an error message when fetchData fails', (done) => {
      const $route = { path: '/', params: { id: 1 } };
      const errorMessage = 'An error occurred';

      fetchDataStub.rejects({ message: errorMessage });
      const wrapper = shallowMount(ProjectProfile, {
        localVue,
        store,
        mocks: { $route },
      });

      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.errors').text()).to.equal(errorMessage);
        done();
      });
    });

    it('should display an default error message when fetchData fails without error message returned', (done) => {
      const $route = { path: '/', params: { id: 1 } };
      const errorMessage = '';

      fetchDataStub.rejects({ message: errorMessage });
      const wrapper = shallowMount(ProjectProfile, {
        localVue,
        store,
        mocks: { $route },
      });

      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.errors').text()).to.equal(
          'An error occured, please try again later.',
        );
        done();
      });
    });
  });

  describe('Watchers', () => {
    it('should watch the $route property', (done) => {
      const $route = { path: '/project/:id', name: 'project' };
      const router = new VueRouter({ routes: [$route] });
      const stub = sinon.stub();
      localVue.use(VueRouter);
      const wrapper = shallowMount(ProjectProfile, {
        localVue,
        store,
        router,
        methods: {
          fetchProjectDetails: stub,
        },
      });

      stub.reset();

      router.push({ name: 'project', params: { id: '2' } });

      wrapper.vm.$nextTick(() => {
        expect(stub.called).to.be.true;
        done();
      });
    });
  });
});

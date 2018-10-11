import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, createLocalVue, RouterLinkStub  } from '@vue/test-utils';
import ProjectsList from '@/components/projects/ProjectsList.vue';
import PreviewCard from '@/components/project/PreviewCard.vue';
import { ProjectPreview } from '@/store/projects/types';
import { projectsState } from '@/store/projects/index';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('projects/ProjectsList.vue', () => {

  let actions: any;
  let state: any;
  let store: any;

  let fetchDataStub: any;

  const projects: ProjectPreview[] = [{
    id: 1,
    name: 'Name',
    ownerPreview: {
      id: 1,
      firstName: 'Fred',
      lastName: 'Grauis',
      position: 'CEO',
    },
  },
  {
    id: 2,
    name: 'Name2',
    ownerPreview: {
      id: 2,
      firstName: 'Fred2',
      lastName: 'Grauis2',
      position: 'CEO',
    },
  }];

  beforeEach(() => {
    state = {
      projects,
    };

    fetchDataStub = sinon.stub();
    actions = {
      fetchData: fetchDataStub,
    };

    store = new Vuex.Store({
      modules: {
        projectsState: {
          namespaced: true,
          state,
          actions,
          getters: projectsState.getters
        }
      }
    });
  })

  it('should call the fetchData method on creation', () => {
    const wrapper = shallowMount(ProjectsList, {
      localVue,
      store,
    });

    expect(actions.fetchData.called).to.be.true;
  });

  it('should render the correct amount of PreviewCard components with correct props', () => {
    const wrapper = shallowMount(ProjectsList, {
      localVue,
      store,
    });

    const previewCards: any = wrapper.findAll(PreviewCard);
    expect(previewCards).to.have.lengthOf(2);;

    previewCards.wrappers.forEach((wrapper: any, i: any) => { //
      expect(wrapper.props().projectPreview).to.equal(projects[i]) //
    })
  });

  it('should render errors if any', (done) => {
    const errorMessage = 'An error occurred';

    fetchDataStub.rejects({message: errorMessage});

    const wrapper = shallowMount(ProjectsList, {
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

    const wrapper = shallowMount(ProjectsList, {
      localVue,
      store,
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.errors').text()).to.equal('An error occured, please try again later.');
      done();
    });
  });
});

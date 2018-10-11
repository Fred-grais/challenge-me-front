import { expect } from 'chai';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import MyProjectsList from '@/components/me/MyProjectsList.vue';
import PreviewCard from '@/components/me/project/PreviewCard.vue';
import { meProjectsState } from '@/store/me/projects/index';
import { ProjectPreview } from '@/store/projects/types';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Me/MyProjectsList.vue', () => {
  let actions: any;
  let state: any;
  let store: any;

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

    actions = {
      fetchData: sinon.stub()
    };

    store = new Vuex.Store({
      modules: {
        meProjectsState: {
          namespaced: true,
          state,
          actions,
          getters: meProjectsState.getters
        }
      }
    });
  })

  it('should call the fetchDetails method on creation', () => {
    const wrapper = shallowMount(MyProjectsList, {
      localVue,
      store,
    });

    expect(actions.fetchData.called).to.be.true;
  });

  it('should have a PreviewCard component child', () => {
    const wrapper = shallowMount(MyProjectsList, {
      localVue,
      store,
    });

    expect(wrapper.contains(PreviewCard)).to.be.true;
  });

  it('should render the correct amount of PreviewCard components with correct props', () => {
    const wrapper = shallowMount(MyProjectsList, {
      localVue,
      store,
    });

    const previewCards: any = wrapper.findAll(PreviewCard);
    expect(previewCards).to.have.lengthOf(2);;

    previewCards.wrappers.forEach((wrapper: any, i: any) => { //
      expect(wrapper.props().projectPreview).to.equal(projects[i]) //
    })
  });
});

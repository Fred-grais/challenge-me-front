import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, createLocalVue, RouterLinkStub  } from '@vue/test-utils';
import EditForm from '@/components/project/EditForm.vue';
import { meProjectState } from '@/store/me/project/index';
import { Project } from '@/store/current-project/types';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('project/NewForm.vue', () => {

  let actions: any;
  let state: any;
  let store: any;

  let updateProjectStub: any;

  const project: Project = {
    id: 1,
    name: 'Name',
    description: 'Description',
    ownerFull: {
      id: 1,
      firstName: 'Fred',
      lastName: 'Grauis',
      position: 'CEO',
      mobile: '0102030405',
    },
  };

  beforeEach(() => {
    state = {
      project,
    };

    updateProjectStub = sinon.stub();

    actions = {
      update: updateProjectStub,
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

  it('should call the correct method to create a new project', function() {
    const wrapper = shallowMount(EditForm, {
      localVue,
      store,
    });

    const updatedName = 'UpdatedName';
    const updatedDescription = 'UpdatedDescription';

    wrapper.setData({project: {name: updatedName, description: updatedDescription}});

    wrapper.find('.submit-button').trigger('click');

    const projectUpdated = { ...project, ownerFull: {...project.ownerFull}};
    projectUpdated.name =  updatedName;
    projectUpdated.description =  updatedDescription;

    expect(actions.update.called).to.be.true;
    expect(actions.update.getCall(0).args[1]).to.deep.equal( projectUpdated );
  });

  context('response', function() {
    let wrapper: any;

    beforeEach(function() {
      wrapper = shallowMount(EditForm, {
        localVue,
        store,
      });

      wrapper.setData({name: 'NewName'});
      wrapper.setData({description: 'NewDescription'});
    });

    context('Successfull creation', function() {
      it('should display the correct message', (done) => {
        updateProjectStub.resolves({status: 200});

        wrapper.find('.submit-button').trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.result').text()).to.equal('Updated!');
          done();
        });
      });
    });

    context('Failure creation', function() {
      it('should display the correct message when the response status in incorrect eventhough the promise correctly resolved', (done) => {
        updateProjectStub.resolves({status: 401});

        wrapper.find('.submit-button').trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.errors').text()).to.equal('Unexpected Error');
          done();
        });
      });

      it('should display the correct message when promise rejects and the backend returns errors', (done) =>{
        updateProjectStub.rejects({
          response: {
            data: ['Backend Error 1', 'Backend Error 2']
          }
        });

        wrapper.find('.submit-button').trigger('click');

        // Needs to call nextTick twice when checking a catch clause if there is a then clause before
        wrapper.vm.$nextTick(() => {
          wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.errors').text()).to.contains('Backend Error 1');
            expect(wrapper.find('.errors').text()).to.contains('Backend Error 2');
            done();
          });
        });
      });

      it('should display the correct message when promise rejects and the backend does not returns errors', (done) => {
        updateProjectStub.rejects();

        wrapper.find('.submit-button').trigger('click');

        // Needs to call nextTick twice when checking a catch clause if there is a then clause before

        wrapper.vm.$nextTick(() => {
          wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.errors').text()).to.contains('An error occurred, please try again later.');
            done();
          });
        });
      });
    });
  });
});

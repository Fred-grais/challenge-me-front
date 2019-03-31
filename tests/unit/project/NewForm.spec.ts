import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import NewForm from '@/components/project/NewForm.vue';
import { meProjectState } from '@/store/me/project/index';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('project/NewForm.vue', () => {
  let actions: any;
  let state: any;
  let store: any;

  let createProjectStub: any;

  beforeEach(() => {
    state = {};

    createProjectStub = sinon.stub();

    actions = {
      create: createProjectStub,
    };

    store = new Vuex.Store({
      modules: {
        meProjectState: {
          namespaced: true,
          state,
          actions,
          getters: meProjectState.getters,
        },
      },
    });
  });

  it('should call the correct method to create a new project', function() {
    const wrapper = shallowMount(NewForm, {
      localVue,
      store,
    });

    wrapper.setData({ name: 'NewName' });
    wrapper.setData({ description: 'NewDescription' });

    wrapper.find('.submit-button').trigger('click');

    expect(actions.create.called).to.be.true;
    expect(actions.create.getCall(0).args[1]).to.deep.equal({
      name: 'NewName',
      description: 'NewDescription',
    });
  });

  context('response', function() {
    let wrapper: any;

    beforeEach(function() {
      wrapper = shallowMount(NewForm, {
        localVue,
        store,
      });

      wrapper.setData({ name: 'NewName' });
      wrapper.setData({ description: 'NewDescription' });
    });

    context('Successfull creation', function() {
      it('should display the correct message', done => {
        createProjectStub.resolves({ status: 201 });

        wrapper.find('.submit-button').trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.result').text()).to.equal('Created!');
          done();
        });
      });
    });

    context('Failure creation', function() {
      it('should display the correct message when the response status in incorrect eventhough the promise correctly resolved', done => {
        createProjectStub.resolves({ status: 401 });

        wrapper.find('.submit-button').trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.errors').text()).to.equal('Unexpected Error');
          done();
        });
      });

      it('should display the correct message when promise rejects and the backend returns errors', done => {
        createProjectStub.rejects({
          response: {
            data: ['Backend Error 1', 'Backend Error 2'],
          },
        });

        wrapper.find('.submit-button').trigger('click');

        // Needs to call nextTick twice when checking a catch clause if there is a then clause before
        wrapper.vm.$nextTick(() => {
          wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.errors').text()).to.contains(
              'Backend Error 1',
            );
            expect(wrapper.find('.errors').text()).to.contains(
              'Backend Error 2',
            );
            done();
          });
        });
      });

      it('should display the correct message when promise rejects and the backend does not returns errors', done => {
        createProjectStub.rejects();

        wrapper.find('.submit-button').trigger('click');

        // Needs to call nextTick twice when checking a catch clause if there is a then clause before

        wrapper.vm.$nextTick(() => {
          wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.errors').text()).to.contains(
              'An error occurred, please try again later.',
            );
            done();
          });
        });
      });
    });
  });
});

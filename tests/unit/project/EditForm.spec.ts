import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, mount, createLocalVue, RouterLinkStub  } from '@vue/test-utils';
import EditForm from '@/components/project/EditForm.vue';
import { meProjectState } from '@/store/me/project/index';
import { Project } from '@/store/current-project/types';
import TimelineEditor from '@/components/widgets/TimelineEditor.vue';
import { ITimeline } from '@/store/common/types';
import { Component } from 'vue';

import sinon from 'sinon';
import moment from 'moment';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('project/EditForm.vue', () => {

  let actions: any;
  let state: any;
  let store: any;

  let updateProjectStub: any;

  const project: Project = {
    id: 1,
    name: 'Name',
    description: 'Description',
    timeline: {items: []},
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

  it('should call the correct method to update an existing project', function() {
    const returnUpdatedTimelineStub = sinon.stub();
    const TimelineEditorStub: any = {
      render: () => {},
      methods: {
        returnUpdatedTimeline: returnUpdatedTimelineStub,
      }
    }

    const wrapper = shallowMount(EditForm, {
      localVue,
      store,
      stubs: {
        'timeline-editor': TimelineEditorStub as Component
      }
    });

    const name = 'UpdatedName';
    const description = 'UpdatedDescription';
    const id = project.id;

    // TODO: Appeler $emit sur le ref
    // (wrapper.vm.$refs.timelineEditor as TimelineEditor).$emit('checkOutChanged', date);
    wrapper.setData({project: {name: name, description: description}});

    wrapper.find('.submit-infos-button').trigger('click');

    expect(actions.update.called).to.be.true;
    expect(actions.update.getCall(0).args[1]).to.deep.equal( {id, name, description} );
  });

  it('should update the timeline', function() {
    const returnUpdatedTimelineStub = sinon.stub();
    const TimelineEditorStub: any = {
      render: () => {},
      methods: {
        returnUpdatedTimeline: returnUpdatedTimelineStub,
      }
    }

    const wrapper = shallowMount(EditForm, {
      localVue,
      store,
      stubs: {
        'timeline-editor': TimelineEditorStub as Component
      }
    });

    const item1Date: moment.Moment = moment();
    const timeline: ITimeline = {items: [{title: 'title1', description: 'description1', date: item1Date, imageUrl: 'test.jpg'}]}
    const id = project.id;

    returnUpdatedTimelineStub.callsFake(() => {
      (wrapper.vm.$refs.timelineEditor as TimelineEditor).$emit('updated-timeline-returned', timeline);
    });

    wrapper.find('.submit-timeline-button').trigger('click');

    expect(actions.update.called).to.be.true;
    expect(actions.update.getCall(0).args[1]).to.deep.equal( {id, timeline} );
    expect(returnUpdatedTimelineStub.called).to.be.true;
  });

  context('response', function() {
    let wrapper: any;

    beforeEach(function() {
      wrapper = mount(EditForm, {
        localVue,
        store,
      });

      wrapper.setData({name: 'NewName'});
      wrapper.setData({description: 'NewDescription'});
    });

    context('Successfull update', function() {
      it('should display the correct message', (done) => {
        updateProjectStub.resolves({status: 200});

        wrapper.find('.submit-button').trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.result').text()).to.equal('Updated!');
          done();
        });
      });
    });

    context('Failure update', function() {
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

import { expect } from 'chai';
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Profile from '@/components/me/Profile.vue';
import { Me } from '@/store/me/types';
import { meState } from '@/store/me/index';
import sinon from 'sinon';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Me/Profile.vue', () => {
  let actions: any;
  let state: any;
  let store: any;

  const me: Me = {
    id: 1,
    email: 'email@email.com',
    firstName: 'Fred',
    lastName: 'Dupond',
    position: "CEO"
  };

  const firstNameInputSelector = 'input[name="firstName"]';
  const lastNameInputSelector = 'input[name="lastName"]';
  const positionInputSelector = 'input[name="position"]';
  const saveBtnSelector = '#save_btn';

  beforeEach(() => {
    state = {
      me,
    };

    actions = {
      updateMe: sinon.stub()
    };

    store = new Vuex.Store({
      modules: {
        meState: {
          namespaced: true,
          state,
          actions,
          getters: meState.getters
        }
      }
    });
  })

  it('should have inputs to update the user informations', () => {
    const wrapper = shallowMount(Profile, { store, localVue });
    expect(wrapper.contains(firstNameInputSelector)).to.be.true;
    expect(wrapper.contains(lastNameInputSelector)).to.be.true;
    expect(wrapper.contains(positionInputSelector)).to.be.true;
  });

  it('should display the user informations', () => {
    const wrapper = shallowMount(Profile, { store, localVue });
    expect((<HTMLInputElement>wrapper.find(firstNameInputSelector).element).value).to.equal(me.firstName);
    expect((<HTMLInputElement>wrapper.find(lastNameInputSelector).element).value).to.equal(me.lastName);
    expect((<HTMLInputElement>wrapper.find(positionInputSelector).element).value).to.equal(me.position);;
  });

  it('should call the correct method when the save button is pressed', () => {
    const wrapper = shallowMount(Profile, { store, localVue });
    wrapper.find(saveBtnSelector).trigger('click');
    expect(actions.updateMe.called).to.be.true;
    expect(actions.updateMe.getCall(0).args[1].firstName).to.equal('Fred');
    expect(actions.updateMe.getCall(0).args[1].lastName).to.equal('Dupond');
    expect(actions.updateMe.getCall(0).args[1].position).to.equal('CEO');
  });


});

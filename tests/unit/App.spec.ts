import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import sinon from 'sinon';
import GridLoader from 'vue-spinner/src/GridLoader.vue'

describe('App.vue', () => {

  it('renders the loader when loading auth, then hide it', () => {
    let $auth: any =  {};
    const stub = sinon.stub();
    //fake.returns(false);
    $auth.ready = stub;
    const wrapper = shallowMount(App, {
      mocks: { $auth }
    });

    wrapper.setComputed({
      authReady: false
    });

    //stub.resolves(true);
    expect(wrapper.findAll(GridLoader)).to.have.lengthOf(1);
    expect(wrapper.find(GridLoader).props().color).to.equal('#fff');
    expect(wrapper.find(GridLoader).props().size).to.equal('25px');

    wrapper.setComputed({
      authReady: true
    });
//stub.returns(true);
    expect(wrapper.findAll(GridLoader)).to.have.lengthOf(0);

  });
});

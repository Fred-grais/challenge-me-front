import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Form from '@/components/register/Form.vue';
import sinon from 'sinon';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';
import nock from 'nock';

const localVue = createLocalVue();

describe('register/Form.vue', () => {

  it('renders the register form', () => {
    const wrapper = shallowMount(Form);
    expect(wrapper.contains('input[type="email"]')).to.be.true;
    expect(wrapper.contains('input[type="password"]')).to.be.true;
    expect(wrapper.contains('button.register-button')).to.be.true;
  });

  it('calls the correct method when clicking the register button', () => {
    const wrapper = shallowMount(Form);

    const spy: any = sinon.spy();

    let $auth: any =  {};
    $auth.register = spy;
    wrapper.vm.$auth = $auth;

    wrapper.setData({ email: 'email@email.com' })
    wrapper.setData({ password: 'password' })

    wrapper.find('button.register-button').trigger('click');
    expect(spy.called).to.be.true;
    expect(spy.args[0][0].params).to.deep.equal({
      email: 'email@email.com',
      password: 'password'
    });
  });

  describe('Login failure', () => {

    it('handles response object is empty', () => {
      const wrapper = shallowMount(Form);
      const response: any = {

      }
      wrapper.vm.onRegisterError(response);
      expect(wrapper.vm.errors).to.be.deep.equal(['The server seems unresponsive, please try again later.']);
    });

    it('handles response status is 422', () => {
      const wrapper = shallowMount(Form);
      const response: any = {
        response: {
          status: 422,
          data: {
            errors: {
              full_messages: ['Error from backend 1', 'Error from backend 2'],
            }
          },
        },

      }
      wrapper.vm.onRegisterError(response);
      expect(wrapper.vm.errors).to.be.deep.equal(['Error from backend 1', 'Error from backend 2']);
    });

    it('handles response status is 500', () => {
      const wrapper = shallowMount(Form);
      const response: any = {
        response: {
          status: 500
        }

      }
      wrapper.vm.onRegisterError(response);
      expect(wrapper.vm.errors).to.be.deep.equal(['Cannot process your request right now, please try again later.']);
    });

    it('handles response status is other', () => {
      const wrapper = shallowMount(Form);
      const response: any = {
        response: {
          status: 411
        }

      }
      wrapper.vm.onRegisterError(response);
      expect(wrapper.vm.errors).to.be.deep.equal(['An unexpected error happened, please try again later.']);
    });

    it('should call the correct method when the register call fail', (done) => {
      const onRegisterErrorStub = sinon.stub();
      const $route = { path: '/signup', name: 'signup' };
      const router = new VueRouter({ routes: [$route] });

      nock('http://localhost')
                .log(console.log)
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/auth/register?email=email&password=password')
                .reply(500);

      localVue.use(VueRouter);
      localVue.use(VueAxios, axios);
      localVue.axios.defaults.baseURL = 'http://localhost';

      localVue.router = router;
      localVue.use(VueAuth, {
          auth: require('@websanova/vue-auth/drivers/auth/devise.js'),
          http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
          router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
      });

      const wrapper = shallowMount(Form, {
        localVue,
        router,
        methods: {
          onRegisterError: onRegisterErrorStub,
        }
      });

      wrapper.setData({email: 'email'});
      wrapper.setData({password: 'password'});

      router.push({ name: 'signup' });

      wrapper.find('button.register-button').trigger('click');

      // the register method introduced bu the auth library does not return a promise, it uses callbacks
      // so wrapper.vm.$nextTick does not work, got to rely on the old setTimeout trick unfortunately
      setTimeout(() => {
        expect(onRegisterErrorStub.calledOnce).to.be.true;
        done();
      }, 100);
    })
  });
});

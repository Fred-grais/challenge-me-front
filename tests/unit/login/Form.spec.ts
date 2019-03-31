import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Form from '@/components/login/Form.vue';
import sinon from 'sinon';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';
import nock from 'nock';

const localVue = createLocalVue();

describe('login/Form.vue', () => {
  it('renders the login form', () => {
    const wrapper = shallowMount(Form);
    expect(wrapper.contains('input[type="email"]')).to.be.true;
    expect(wrapper.contains('input[type="password"]')).to.be.true;
    expect(wrapper.contains('button.login-button')).to.be.true;
  });

  it('call the correct method when clicking the login button', () => {
    const wrapper = shallowMount(Form);

    const spy: any = sinon.spy();

    const $auth: any = {};
    $auth.login = spy;
    wrapper.vm.$auth = $auth;

    wrapper.setData({ email: 'email@email.com' });
    wrapper.setData({ password: 'password' });

    wrapper.find('button.login-button').trigger('click');
    expect(spy.called).to.be.true;
    expect(spy.args[0][0].params).to.deep.equal({
      email: 'email@email.com',
      password: 'password',
    });
  });

  describe('Login failure', () => {
    it('handles response object is empty', () => {
      const wrapper = shallowMount(Form);
      const response: any = {};
      wrapper.vm.onLoginError(response);
      expect(wrapper.vm.errors).to.be.deep.equal([
        'The server seems unresponsive, please try again later.',
      ]);
    });

    it('handles response status is 401', () => {
      const wrapper = shallowMount(Form);
      const response: any = {
        response: {
          status: 401,
          data: {
            errors: ['Error from backend 1', 'Error from backend 2'],
          },
        },
      };
      wrapper.vm.onLoginError(response);
      expect(wrapper.vm.errors).to.be.deep.equal([
        'Error from backend 1',
        'Error from backend 2',
      ]);
    });

    it('handles response status is 500', () => {
      const wrapper = shallowMount(Form);
      const response: any = {
        response: {
          status: 500,
        },
      };
      wrapper.vm.onLoginError(response);
      expect(wrapper.vm.errors).to.be.deep.equal([
        'Cannot process your request right now, please try again later.',
      ]);
    });

    it('handles response status is other', () => {
      const wrapper = shallowMount(Form);
      const response: any = {
        response: {
          status: 422,
        },
      };
      wrapper.vm.onLoginError(response);
      expect(wrapper.vm.errors).to.be.deep.equal([
        'An unexpected error happened, please try again later.',
      ]);
    });

    it('should call the correct method when the login request fail', done => {
      const onLoginErrorStub = sinon.stub();
      const $route = { path: '/login', name: 'login' };
      const router = new VueRouter({ routes: [$route] });

      nock('http://localhost')
        .log(console.log)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/login?email=email&password=password')
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
          onLoginError: onLoginErrorStub,
        },
      });

      wrapper.setData({ email: 'email' });
      wrapper.setData({ password: 'password' });

      router.push({ name: 'login' });

      wrapper.find('button.login-button').trigger('click');

      // the register method introduced bu the auth library does not return a promise, it uses callbacks
      // so wrapper.vm.$nextTick does not work, got to rely on the old setTimeout trick unfortunately
      setTimeout(() => {
        expect(onLoginErrorStub.calledOnce).to.be.true;
        done();
      }, 300);
    });
  });
});

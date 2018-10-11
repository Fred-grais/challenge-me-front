import { expect } from 'chai';
import { shallowMount, RouterLinkStub  } from '@vue/test-utils';
import PreviewCard from '@/components/user/PreviewCard.vue';
import { UserPreview } from '@/store/users/types';
import sinon from 'sinon';


describe('user/PreviewCard.vue', () => {

  const userPreview: UserPreview = {
    id: 1,
    firstName: 'Fred',
    lastName: 'Grauis',
    position: 'CEO',
  }

  it('should render the proper content', () => {
    const wrapper = shallowMount(PreviewCard, {
      propsData: {
        userPreview
      },
      stubs: {
        RouterLink: RouterLinkStub //
      }
    });

    const routerStub = wrapper.find(RouterLinkStub);
    expect(routerStub.props().to).to.deep.equal({ name: 'user', params: { id: userPreview.id } });
    expect(routerStub.text()).to.equal(userPreview.firstName);
  });
});

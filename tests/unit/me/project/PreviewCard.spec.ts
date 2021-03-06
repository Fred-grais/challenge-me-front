import { expect } from 'chai';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import PreviewCard from '@/components/me/project/PreviewCard.vue';
import { ProjectPreview } from '@/store/projects/types';
import sinon from 'sinon';

describe('Me/project/PreviewCard.vue', () => {
  const projectPreview: ProjectPreview = {
    id: 1,
    name: 'Name',
    ownerPreview: {
      id: 1,
      firstName: 'Fred',
      lastName: 'Grauis',
      position: 'CEO',
      avatarUrl: 'avatarUrl',
    },
  };

  it('should render the proper content', () => {
    const wrapper = shallowMount(PreviewCard, {
      propsData: {
        projectPreview,
      },
      stubs: {
        RouterLink: RouterLinkStub, //
      },
    });

    expect(wrapper.find('span.from').text()).to.equal('From Fred Grauis (CEO)');
    const routerStub = wrapper.find(RouterLinkStub);
    expect(routerStub.props().to).to.deep.equal({
      name: 'my_project',
      params: { id: projectPreview.id },
    });
    expect(routerStub.text()).to.equal('See more');
  });
});

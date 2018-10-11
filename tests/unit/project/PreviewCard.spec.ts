import { expect } from 'chai';
import { shallowMount, RouterLinkStub  } from '@vue/test-utils';
import PreviewCard from '@/components/project/PreviewCard.vue';
import { ProjectPreview } from '@/store/projects/types';
import sinon from 'sinon';


describe('project/PreviewCard.vue', () => {

  const projectPreview: ProjectPreview = {
    id: 1,
    name: 'Name',
    ownerPreview: {
      id: 1,
      firstName: 'Fred',
      lastName: 'Grauis',
      position: 'CEO',
    },
  }

  it('should render the proper content', () => {
    const wrapper = shallowMount(PreviewCard, {
      propsData: {
        projectPreview
      },
      stubs: {
        RouterLink: RouterLinkStub //
      }
    });

    expect(wrapper.find('span.from').text()).to.equal(`From ${projectPreview.ownerPreview.firstName} ${projectPreview.ownerPreview.lastName} (${projectPreview.ownerPreview.position})`)
    const routerStub = wrapper.find(RouterLinkStub);
    expect(routerStub.props().to).to.deep.equal({ name: 'project', params: { id: projectPreview.id } });
    expect(routerStub.text()).to.equal('See more');
  });
});

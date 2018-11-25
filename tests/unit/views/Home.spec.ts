import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import sinon from 'sinon';

import MainPodcastViewer from '@/components/widgets/news-feed/MainPodcastViewer.vue';
import SitePresentation from '@/components/home/SitePresentation.vue';

describe('views/Home.vue', () => {

  it('should have the correct children', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.findAll(SitePresentation)).to.have.lengthOf(1);
    expect(wrapper.findAll(MainPodcastViewer)).to.have.lengthOf(1);
  });


});

import { expect } from 'chai';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import sinon, { SinonStub } from 'sinon';

import PodcastViewer from '@/components/widgets/news-feed/PodcastViewer.vue';
import { Podcast } from '@/store/news-feed/types';

import moment from 'moment';

describe('widgets/news-feed/PodcastViewer.vue', () => {

  const podcast: Podcast = {
    title: 'Title',
    description: 'Description',
    categories: ['cat1', 'cat2'],
    duration: '01:00:00',
    publishingDate: moment('2018-01-01T12:00:00+01:00'),
    thumbnailUrl: 'thumbnailUrl',
    contentUrl: 'contentUrl',
    originalLink: 'originalLink',
  };

  describe('#formattedPublishingDate', () => {
    it('should format the date correctly', () => {
      const wrapper = shallowMount(PodcastViewer, {
        propsData: {
          podcast,
        }}
      );

      expect(wrapper.vm.formattedPublishingDate).to.equal('Monday, January 1, 2018 12:00 PM');
    });

    it('should contain the podcast informations in the page', () => {
      const wrapper = mount(PodcastViewer, {
        propsData: {
          podcast,
        }}
      );
      expect(wrapper.find('b-card').attributes('title')).to.equal(podcast.title);
      expect(wrapper.find('b-card').attributes('img-src')).to.equal(podcast.thumbnailUrl);
      expect(wrapper.find('.publishing-date-wrapper').text()).to.equal(wrapper.vm.formattedPublishingDate);
      expect(wrapper.find('audio source').attributes('src')).to.equal(podcast.contentUrl);
    });

  });

});

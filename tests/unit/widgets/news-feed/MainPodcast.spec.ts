import { expect } from 'chai';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import sinon, { SinonStub } from 'sinon';

import MainPodcastViewer from '@/components/widgets/news-feed/MainPodcastViewer.vue';
import PodcastViewer from '@/components/widgets/news-feed/PodcastViewer.vue';
import { Podcast } from '@/store/news-feed/types';
import { newsFeedState } from '@/store/news-feed/index';

import Vuex from 'vuex';

import moment from 'moment';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('widgets/news-feed/MainPodcastViewer.vue', () => {

  let actions: any;
  let state: any;
  let store: any;
  let getters: any;

  let fetchMainPodcastStub: SinonStub;
  let getMainPodcastStub: SinonStub;

  const podcast: Podcast = {
    title: 'Title',
    description: 'Description',
    categories: ['cat1', 'cat2'],
    duration: '01:00:00',
    publishingDate: moment(),
    thumbnailUrl: 'thumbnailUrl',
    contentUrl: 'contentUrl',
    originalLink: 'originalLink',
  };

  beforeEach(() => {
    state = {
      mainPodcast: podcast,
    };

    fetchMainPodcastStub = sinon.stub();
    getMainPodcastStub = sinon.stub();

    actions = {
      fetchMainPodcast: fetchMainPodcastStub,
    };

    getters = {
      getMainPodcast: getMainPodcastStub,
    }

    getters = newsFeedState.getters;

    store = new Vuex.Store({
      modules: {
        newsFeedState: {
          namespaced: true,
          state,
          actions,
          getters: getters
        }
      }
    });
  })

  it('should call the fetchMainPodcast action on creation', () => {
    const stub = sinon.stub();
    const wrapper = shallowMount(MainPodcastViewer, {
      localVue,
      store,
    });

    expect(fetchMainPodcastStub.called).to.be.true;
  });

  it('should have a PodcastViewer child and pass it the correct props', () => {
    const $route = { path: '/', params: {id: 1} };

    const wrapper = shallowMount(MainPodcastViewer, {
      localVue,
      store
    });

    expect(wrapper.findAll(PodcastViewer)).to.have.lengthOf(1);
    expect(wrapper.find(PodcastViewer).props().podcast).to.deep.equal(podcast);
  });


});

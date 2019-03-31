import { MutationTree } from 'vuex';
import { MeState, Me } from './types';

import sortBy from 'lodash/sortBy';
import moment from 'moment';
import { ITimelineItem } from '../common/types';

export const mutations: MutationTree<MeState> = {
  setMe(state, me: Me) {
    me.timeline.items = sortBy(me.timeline.items, (item: ITimelineItem) => {
      item.date = moment(item.date);
      return item.date.valueOf();
    });

    state.me = me;
  },
  setMeAvatar(state, avatarUrl: string) {
    const { me } = state;
    me!.avatarUrl = avatarUrl;
  },

  setFetching(state, isFetching: boolean) {
    state.fetching = isFetching;
  },

  addItemToTimeline(state, item: ITimelineItem) {
    const { me } = state;
    me!.timeline.items.push(item);
  },
};

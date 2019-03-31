import { ITimelineItem } from './../common/types';
import { MutationTree } from 'vuex';
import { CurrentUserState, User } from './types';

import sortBy from 'lodash/sortBy';
import moment from 'moment';

export const mutations: MutationTree<CurrentUserState> = {
  setCurrentUser(state, user: User) {
    user.timeline.items = sortBy(user.timeline.items, (item: ITimelineItem) => {
      item.date = moment(item.date);
      return item.date.valueOf();
    });

    state.currentUser = user;
  },
  setFetching(state, fetching: boolean) {
    state.fetching = fetching;
  },
};

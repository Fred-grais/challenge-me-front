import { MutationTree } from 'vuex';
import { MeProjectState } from './types';
import { Project } from '@/store/current-project/types';

import { ITimelineItem } from '@/store/common/types';

import sortBy from 'lodash/sortBy';
import moment from 'moment';

export const mutations: MutationTree<MeProjectState> = {
  setProject(state, project: Project) {
    project.timeline.items = sortBy(project.timeline.items, [(item: ITimelineItem) => {
      item.date = moment(item.date);
      return item.date.valueOf();
    }]);

    state.project = project;
  },
  setFetching(state, isFetching: boolean) {
    state.fetching = isFetching;
  },
};

import { MutationTree } from 'vuex';
import { CurrentProjectState, Project } from './types';

import { ITimelineItem } from '@/store/common/types';

import sortBy from 'lodash/sortBy';
import moment from 'moment';

export const mutations: MutationTree<CurrentProjectState> = {
  setCurrentProject(state, project: Project) {
    project.timeline.items = sortBy(
      project.timeline.items,
      (item: ITimelineItem) => {
        item.date = moment(item.date);
        return item.date.valueOf();
      },
    );

    state.currentProject = project;
  },
  setFetching(state, fetching: boolean) {
    state.fetching = fetching;
  },
};

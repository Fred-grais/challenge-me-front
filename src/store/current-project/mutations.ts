import { MutationTree } from 'vuex';
import { CurrentProjectState, Project } from './types';

import { ITimelineItem } from '@/store/common/types';

import * as _ from 'lodash';
import moment from 'moment';

export const mutations: MutationTree<CurrentProjectState> = {
  setCurrentProject(state, project: Project) {
    project.timeline.items = _.sortBy(project.timeline.items, [(item: ITimelineItem) => {
      item.date = moment(item.date);
      return item.date.valueOf();
    }]);

    state.currentProject = project;
  },
  setFetching(state, fetching: boolean) {
    state.fetching = fetching;
  },
};

import { GetterTree } from 'vuex';
import { MeProjectsState } from './types';
import { ProjectPreview } from '@/store/projects/types';
import { RootState } from '../../types';

import * as _ from 'lodash';

export const getters: GetterTree<MeProjectsState, RootState> = {
  getProjects(state): ProjectPreview[] {
    const { projects } = state;

    return projects;
  },
  getChunkedProjects(state, getters) {
    const projects = getters.getProjects;

    return _.chunk(projects, 3);
  },
  isFetching(state) {
      const { fetching } = state;
      return fetching;
  }
};

import { GetterTree } from 'vuex';
import { MeProjectsState } from './types';
import { ProjectPreview } from '@/store/projects/types';
import { RootState } from '../../types';

import chunk from 'lodash/chunk';

export const getters: GetterTree<MeProjectsState, RootState> = {
  getProjects(state): ProjectPreview[] {
    const { projects } = state;

    return projects;
  },
  isFetching(state) {
    const { fetching } = state;
    return fetching;
  },
};

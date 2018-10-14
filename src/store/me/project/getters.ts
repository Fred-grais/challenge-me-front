import { GetterTree } from 'vuex';
import { MeProjectState } from './types';
import { RootState } from '../../types';

export const getters: GetterTree<MeProjectState, RootState> = {
  getProject(state) {
    const { project } = state;

    return project;
  },
  isFetching(state) {
    const { fetching } = state;

    return fetching;
  }
};

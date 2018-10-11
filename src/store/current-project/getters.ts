import { GetterTree } from 'vuex';
import { CurrentProjectState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<CurrentProjectState, RootState> = {
  getCurrentProject(state) {
    const {currentProject} = state;
    return currentProject;
  },
  getFetchingState(state) {
    const { fetching } = state;
    return fetching;
  },
};

import { GetterTree } from 'vuex';
import { MeState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<MeState, RootState> = {
  getMe(state) {
    const {me} = state;

    return me;
  },
};

import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { MeProjectState } from './types';
import { RootState } from '../../types';

export const state: MeProjectState = {
    project: undefined,
    fetching: false,
};

const namespaced: boolean = true;

export const meProjectState: Module<MeProjectState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};

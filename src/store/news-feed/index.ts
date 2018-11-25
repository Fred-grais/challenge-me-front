import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { NewsFeedState } from './types';
import { RootState } from '../types';

export const state: NewsFeedState = {
    mainPodcast: undefined,
    fetching: false,
};

const namespaced: boolean = true;

export const newsFeedState: Module<NewsFeedState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};

import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { UsersState } from './types';
import { RootState } from '../types';

export const state: UsersState = {
    users: [],
    fetching: false,
};

const namespaced: boolean = true;

export const usersState: Module<UsersState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};

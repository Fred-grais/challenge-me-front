import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { projectsState } from './projects/index';
import { currentProjectState } from './current-project/index';
import { usersState } from './users/index';
import { currentUserState } from './current-user/index';
import { meState } from './me/index';
import { meProjectState } from './me/project/index';
import { meProjectsState } from './me/projects/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0',
    },
    modules: {
        projectsState,
        currentProjectState,
        usersState,
        currentUserState,
        meState,
        meProjectState,
        meProjectsState,
    },
};

export default new Vuex.Store<RootState>(store);

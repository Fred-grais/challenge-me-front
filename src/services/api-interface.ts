import environment from '@/environments/environment';
import Vue from 'vue';
import { Me } from '@/store/me/types';
import { Project } from '@/store/current-project/types';

class ApiInterface {
    static readonly BASEURL: string = <string>process.env.VUE_APP_API_BASE;

    static readonly ENDPOINTS : any = {
      getAllUsers: '/users',
      getUser: '/users',
      updateMe: '/auth',
      createProject: '/api/v1/me/projects',
      updateProject: '/api/v1/me/projects',
      getMyProject: '/api/v1/me/projects',
      listMyProjects: '/api/v1/me/projects',
      getAllProjects: '/projects',
      getProject: '/projects',
      searchTags: '/api/v1/tags',
      getMainPodcast: '/podcasts',
      getConversationPreviews: '/api/v1/me/conversations',
      getConversation: '/api/v1/me/conversations',
      createMessage: '/api/v1/me/messages',
    }

    constructor() {}

    getAllUsers(): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('getAllUsers'));
    }

    getUser(userId: number): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('getUser') + '/' + userId);
    }

    getAllProjects(): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('getAllProjects'));
    }

    getProject(projectId: number): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('getProject') + '/' + projectId);
    }

    updateMe(params: Partial<Me>): Promise<any> {
      return Vue.axios.put(this.generateEndpoint('updateMe'), params);
    }

    createProject(params: Project): Promise<any> {
      return Vue.axios.post(this.generateEndpoint('createProject'), params);
    }

    updateProject(params: Partial<Project>): Promise<any> {
      return Vue.axios.put(this.generateEndpoint('updateProject') + '/' + params.id, params);
    }

    getMyProject(projectId: number): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('getMyProject') + '/' + projectId);
    }

    listMyProjects(): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('listMyProjects'));
    }

    searchTags(search: string): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('searchTags') + '?search=' + search);
    }

    getMainPodcast(): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('getMainPodcast'));
    }

    getConversationPreviews(): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('getConversationPreviews'));
    }

    getConversation(conversationId: number): Promise<any> {
      return Vue.axios.get(this.generateEndpoint('getConversation') + '/' + conversationId);
    }

    createMessage(conversationId: number, message: string): Promise<any> {
      return Vue.axios.post(this.generateEndpoint('createMessage'), {message: {conversationId, message}})
    }

    private generateEndpoint(key: string): string {
      return ApiInterface.BASEURL + ApiInterface.ENDPOINTS[key];
    }
}

export default ApiInterface;

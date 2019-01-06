import Vue from 'vue';
import { Me } from '@/store/me/types';
import { Project } from '@/store/current-project/types';

class ApiInterface {
  public static readonly BASEURL: string = process.env.VUE_APP_API_BASE as string;

  public static readonly ENDPOINTS: any = {
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
    searchUsers: '/api/v1/users',
    getMainPodcast: '/podcasts',
    getConversationPreviews: '/api/v1/me/conversations',
    getConversation: '/api/v1/me/conversations',
    createConversation: '/api/v1/me/conversations',
    createMessage: '/api/v1/me/messages',
    createChatSession: '/api/v1/me/chat_sessions',
  };
  // tslint:disable-next-line:no-empty
  constructor() {}

  public getAllUsers(): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getAllUsers'));
  }

  public getUser(userId: number): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getUser') + '/' + userId);
  }

  public getAllProjects(): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getAllProjects'));
  }

  public getProject(projectId: number): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getProject') + '/' + projectId);
  }

  public updateMe(params: Partial<Me>): Promise<any> {
    return Vue.axios.put(this.generateEndpoint('updateMe'), params);
  }

  public createProject(params: Project): Promise<any> {
    return Vue.axios.post(this.generateEndpoint('createProject'), params);
  }

  public updateProject(params: Partial<Project>): Promise<any> {
    return Vue.axios.put(this.generateEndpoint('updateProject') + '/' + params.id, params);
  }

  public getMyProject(projectId: number): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getMyProject') + '/' + projectId);
  }

  public listMyProjects(): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('listMyProjects'));
  }

  public searchTags(search: string): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('searchTags') + '?search=' + search);
  }

  public searchUsers(search: string): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('searchUsers') + '?search=' + search);
  }

  public getMainPodcast(): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getMainPodcast'));
  }

  public getConversationPreviews(): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getConversationPreviews'));
  }

  public getConversation(conversationId: number): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getConversation') + '/' + conversationId);
  }

  public createConversation(recipients: string[], message: string): Promise<any> {
    return Vue.axios.post(this.generateEndpoint('createConversation'), { conversation: { recipients, message } });
  }
  public createMessage(conversationId: number, message: string): Promise<any> {
    return Vue.axios.post(this.generateEndpoint('createMessage'), { message: { conversationId, message } });
  }

  public createChatSession(): Promise<any> {
    return Vue.axios.post(this.generateEndpoint('createChatSession'));
  }

  private generateEndpoint(key: string): string {
    return ApiInterface.BASEURL + ApiInterface.ENDPOINTS[key];
  }
}

export default ApiInterface;

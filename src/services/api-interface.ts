import Vue from 'vue';
import { Me } from '@/store/me/types';
import { Project } from '@/store/current-project/types';
import each from 'lodash/each';

class ApiInterface {
  public static readonly BASEURL: string = process.env
    .VUE_APP_API_BASE as string;

  public static readonly ENDPOINTS: any = {
    getAllUsers: '/users',
    getUser: '/users',
    updateMe: '/auth',
    uploadMeAvatar: '/api/v1/me/avatars_uploads',
    uploadProjectLogo: '/api/v1/me/projects/%projectId%/logo_upload',
    uploadProjectPictures: '/api/v1/me/projects/%projectId%/pictures_uploads',
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
    createGhostSession: '/api/v1/me/ghost_sessions',
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

  public uploadMeAvatar(
    file: File,
    onUploadProgress: (progressEvent: any) => void,
  ) {
    const formData = new FormData();
    formData.append('avatar', file);
    return Vue.axios.post(this.generateEndpoint('uploadMeAvatar'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }

  public uploadProjectLogo(
    projectId: number,
    file: File,
    onUploadProgress: (progressEvent: any) => void,
  ) {
    const formData = new FormData();
    formData.append('logo', file);
    return Vue.axios.post(
      this.generateEndpoint('uploadProjectLogo').replace(
        '%projectId%',
        String(projectId),
      ),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      },
    );
  }

  public uploadProjectPictures(
    projectId: number,
    files: File[],
    onUploadProgress: (progressEvent: any) => void,
  ) {
    const formData = new FormData();
    each(files, (file) => {
      formData.append('pictures[]', file);
    });
    return Vue.axios.post(
      this.generateEndpoint('uploadProjectPictures').replace(
        '%projectId%',
        String(projectId),
      ),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      },
    );
  }

  public createProject(params: Project): Promise<any> {
    return Vue.axios.post(this.generateEndpoint('createProject'), params);
  }

  public updateProject(params: Partial<Project>): Promise<any> {
    return Vue.axios.put(
      this.generateEndpoint('updateProject') + '/' + params.id,
      params,
    );
  }

  public getMyProject(projectId: number): Promise<any> {
    return Vue.axios.get(
      this.generateEndpoint('getMyProject') + '/' + projectId,
    );
  }

  public listMyProjects(): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('listMyProjects'));
  }

  public searchTags(search: string): Promise<any> {
    return Vue.axios.get(
      this.generateEndpoint('searchTags') + '?search=' + search,
    );
  }

  public searchUsers(search: string): Promise<any> {
    return Vue.axios.get(
      this.generateEndpoint('searchUsers') + '?search=' + search,
    );
  }

  public getMainPodcast(): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getMainPodcast'));
  }

  public getConversationPreviews(): Promise<any> {
    return Vue.axios.get(this.generateEndpoint('getConversationPreviews'));
  }

  public getConversation(conversationId: number): Promise<any> {
    return Vue.axios.get(
      this.generateEndpoint('getConversation') + '/' + conversationId,
    );
  }

  public createConversation(
    recipients: string[],
    message: string,
  ): Promise<any> {
    return Vue.axios.post(this.generateEndpoint('createConversation'), {
      conversation: { recipients, message },
    });
  }
  public createMessage(conversationId: number, message: string): Promise<any> {
    return Vue.axios.post(this.generateEndpoint('createMessage'), {
      message: { conversationId, message },
    });
  }

  public createChatSession(): Promise<any> {
    return Vue.axios.post(this.generateEndpoint('createChatSession'));
  }

  public createGhostSession(): Promise<any> {
    return Vue.axios.post(
      this.generateEndpoint('createGhostSession'),
      {},
      { withCredentials: true },
    );
  }

  private generateEndpoint(key: string): string {
    return ApiInterface.BASEURL + ApiInterface.ENDPOINTS[key];
  }
}

export default ApiInterface;

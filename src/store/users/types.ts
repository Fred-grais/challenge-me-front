export interface UserPreview {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  avatarUrl: string;
}

export interface UsersState {
  users: UserPreview[];
  fetching: boolean;
}

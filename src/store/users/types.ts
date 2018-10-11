export interface UserPreview {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
}

export interface UsersState {
    users: UserPreview[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  mobile: string;
}

export interface CurrentUserState {
    currentUser: User | undefined;
    fetching: boolean;
}

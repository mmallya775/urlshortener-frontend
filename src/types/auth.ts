export type Role =
  | "ROLE_USER" | "ROLE_ADMIN";


export interface CsrfToken {
  headerName: string;
  token: string;
}

export interface CurrentUser {
  username: string;
  name: string;
  roles: Role[];
}
export type User = {
  id: number;
  username: string;
  email: string;
  password: string; // hashed
  createdAt: string;
};

export type CreateUser = Omit<User, "id" | "createdAt">;
export type LoginUser = Pick<User, "email" | "password">;
export type AuthUser = Omit<User, "password">;

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

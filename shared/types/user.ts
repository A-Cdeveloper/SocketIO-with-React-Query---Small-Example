export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string; // hashed
  createdAt: string;
};

export type CreateUserType = Omit<UserType, "id" | "createdAt">;
export type LoginUserType = Pick<UserType, "email" | "password">;
export type AuthUserType = Omit<UserType, "password">;

export type AuthResponse = {
  user: AuthUserType | null;
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

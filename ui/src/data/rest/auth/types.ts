export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  name: string;
  password: string;
};

export type LoginSuccessResponse = {
  token: string;
};

export type RegisterSuccessResponse = {
  message: string;
};

export enum roleEnum{
  USER= "USER",
  ADMIN = "ADMIN"
}

export interface IUserLoginRequest {
  email: string,
  password: string
}

export interface IUser {
  email: string,
  // isActivated: boolean,
  id: string,
  role: roleEnum
  // firstName : string,
  // img : string | null
}

export interface IUserAuthResponse {
  accessToken: string,
  refreshToken: string,
  user: IUser
}

export interface IUserRegisterInput {
  email: string,
  password: string,
  rePassword : string,
  login: string,
  firstName: string,
  img : string
}

export interface IUserRegisterRequest {
  email: string,
  password: string,
  img : string,
  login: string,
  firstName: string,
}
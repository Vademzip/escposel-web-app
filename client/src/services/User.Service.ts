import {IUser, IUserAuthResponse, IUserLoginRequest, IUserRegisterRequest} from "@/interfaces/user.Interface";
import $api, {API_URL, PUBLIC_API_URL} from "@/http";
import axios, {AxiosResponse} from "axios";

class UserService {
  static async login(email: string, password: string): Promise<AxiosResponse<IUserAuthResponse>> {
    return $api.post<IUserAuthResponse>('api/login', {email, password})
  }

  static async registration(requestData: FormData): Promise<AxiosResponse<IUserAuthResponse>> {
    return $api.post<IUserAuthResponse>('api/registration', requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }

  static async logout(): Promise<void> {
    return $api.post(`${PUBLIC_API_URL}/api/logout`)
  }

  static async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users')
  }

  static async checkAuth() {
    try {
      const response = await axios.get<IUserAuthResponse>(`${PUBLIC_API_URL}/api/refresh`, {withCredentials: true})
      return response.data
    } catch (e) {
      throw new Error()
    }
  }
}

export default UserService
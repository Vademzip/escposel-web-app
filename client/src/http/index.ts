import axios from "axios";
export const API_URL = process.env.SERVER_URL || 'http://localhost:7000'
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:7000'


const $api = axios.create({
  withCredentials : true,
  // baseURL : API_URL || 'https://escposel.ru/'
  baseURL : PUBLIC_API_URL + '/' || 'http://localhost:7000/'
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $api
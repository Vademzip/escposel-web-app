import $api, {PUBLIC_API_URL} from "@/http";
import axios from "axios";

export default class MapService {
  static async getAllMaps() {
    return await fetch(`${PUBLIC_API_URL}/api/map/get-all-maps`).then(res => res.json())
  }

  static async createMap(data: FormData) {
    return $api.post(`${PUBLIC_API_URL}/api/map/create`, data)
  }

  static async updateMap(data: FormData) {
    return $api.patch(`${PUBLIC_API_URL}/api/map/update`, data)
  }
}
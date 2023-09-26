import {ICivilizationRequest} from "@/interfaces/civilization.Interface";
import $api, {API_URL, PUBLIC_API_URL} from "@/http";
import axios from "axios";

class CivilizationService {
  async getCivilizations() {
    return await fetch(`${PUBLIC_API_URL}/api/civilization/get-all-civs`).then((res) => res.json())
  }

  async getCivilizationsByWinRate() {
    return await fetch(`${PUBLIC_API_URL}/api/civilization/get-all-civs-by-wins`, {
      next : {
        revalidate : 3
      }
    }).then((res) => res.json())
  }

  async createCivilization(data: FormData) {
    return $api.post(`${PUBLIC_API_URL}/api/civilization/create`, data)

  }

  async updateCivilization(data: FormData) {
    return $api.patch(`${PUBLIC_API_URL}/api/civilization/update`, data)
  }

  async deleteCivilization(id: number) {
    await $api.delete(`${PUBLIC_API_URL}/api/civilization/delete`, {
      data: {id}
    })
  }


}

export default new CivilizationService()
import {IPlayerRequest} from "@/interfaces/players.Interface";
import $api, {PUBLIC_API_URL} from "@/http";
import {
  ICreateTournamentInput,
  IOneTournamentDetailsInputs,
  IOneTournamentRequest
} from "@/interfaces/tournament.interface";

class TournamentService {
  static async getTournaments() {
    return await fetch(`${PUBLIC_API_URL}/api/tournament/get-all-tournaments`, {
      next : {
        revalidate: 3600
      }
    }).then((res) => res.json())
  }

  static async getOneTournament(id: number) {
    return await fetch(`${PUBLIC_API_URL}/api/tournament/get-one-tournament/${id}`, {
      next : {
        revalidate: 360
      }
    }).then((res) => res.json())
  }

  static async createTournament(data: ICreateTournamentInput) {
    return await $api.post(`${PUBLIC_API_URL}/api/tournament/create`, data)
  }
  //TODO: реализовать работу с турнирами

  static async deleteTournament(id: number) {
    await fetch(`${PUBLIC_API_URL}/api/player/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        id
      })
    })
  }

  static async addTeamToTournament(data : IOneTournamentRequest) {
    return await $api.post(`${PUBLIC_API_URL}/api/tournament/add-team-to-tournament`, data)
  }

  static async updateTournament (data: IOneTournamentDetailsInputs) {
    return await $api.patch(`${PUBLIC_API_URL}/api/tournament/update-tournament`, data)
  }

}

export default TournamentService
import {IGameRequest} from "@/interfaces/game.Interface";
import $api, {API_URL, PUBLIC_API_URL} from "@/http";

class GameService {
  async getGames(page?: string, size?: number, isOnlyOfficialGame? : boolean) {
    const link = `${API_URL}/api/game/get-all-games-info` + (page && size ? `?page=${page}&size=${size}&officialGameOnly=${isOnlyOfficialGame}` : '')
    return await fetch(link, {
      next: {
        revalidate: 3600
      }
    }).then((res) => res.json())
  }

  async getOneTournamentGames(tournamentId: number) {
    return await fetch(`${PUBLIC_API_URL}/api/game/get-one-tournament-games/${tournamentId}`, {
      next: {
        revalidate: 3600
      }
    }).then((res) => res.json())
  }

  async getOneTeamGames(teamId: number) {
    return await fetch(`${PUBLIC_API_URL}/api/game/get-one-team-games/${teamId}`, {
      next: {
        revalidate: 3600
      }
    }).then((res) => res.json())
  }

  async createGame(data: IGameRequest) {
    return await $api.post(`${PUBLIC_API_URL}/api/game/create`, data)
  }

  async updateGame(data: IGameRequest) {
    return await $api.patch(`${PUBLIC_API_URL}/api/game/update`, data)
  }

  async deleteGame(id: number) {
    await $api.delete(`${PUBLIC_API_URL}/api/game/delete`, {
      data: {
        id
      }
    })
  }


}

export default new GameService()
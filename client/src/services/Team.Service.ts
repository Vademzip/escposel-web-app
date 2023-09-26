import {ITeamRequest} from "@/interfaces/teams.Interface";
import $api, {API_URL, PUBLIC_API_URL} from "@/http";

class TeamService {
  async getTeams() {
    return await fetch(`${PUBLIC_API_URL}/api/team/get-all-team-info`, {
      next: {
        revalidate: 3600
      }
    }).then((res) => res.json())
  }


  async createTeam(data: ITeamRequest) {
    return await $api.post(`${PUBLIC_API_URL}/api/team/create`, data)
  }

  async updateTeam(data: ITeamRequest) {
    return await $api.patch(`${PUBLIC_API_URL}/api/team/update`, data)
  }

  async deleteTeam(id: number) {
    return await $api.delete(`${PUBLIC_API_URL}/api/team/delete`, {data: {id: id}})
  }

  async addGameToTeam(teamId: number, isWin: boolean, tournamentId: number) {
    return await $api.patch(`${PUBLIC_API_URL}/api/team/add-game`, {
      teamId,
      isWin,
      tournamentId
    })
  }

  async changeGameAmount(teamId: number, isBigWay: boolean, tournamentId: number) {
    return await $api.patch(`${PUBLIC_API_URL}/api/team/change-game-amount`, {
      teamId,
      isBigWay,
      tournamentId
    })
  }

  async changeWinsAmount(teamId: number, isBigWay: boolean, tournamentId: number) {
    return await $api.patch(`${PUBLIC_API_URL}/api/team/change-wins-amount`, {
      teamId,
      isBigWay,
      tournamentId
    })
  }

  async changeLosesAmount(teamId: number, isBigWay: boolean, tournamentId: number) {
    return await $api.patch(`${PUBLIC_API_URL}/api/team/change-loses-amount`, {
      teamId,
      isBigWay,
      tournamentId
    })
  }

}

export default new TeamService()
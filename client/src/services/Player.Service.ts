import {IPlayerRequest} from "@/interfaces/players.Interface";
import {API_URL, PUBLIC_API_URL} from "@/http";

class PlayerService {
  async getPlayers() {
    return await fetch(`${PUBLIC_API_URL}/api/player/get-all-players`,
      {
        next: {
          revalidate: 3600
        }
      }
    ).then((res) => res.json())
  }

  async getPlayerInfo (id: number, isOnlyOfficialGame : boolean)  {
    const response = await fetch(`${API_URL}/api/player/get-player-info/${id}?officialGameOnly=${isOnlyOfficialGame}`, {
      next: {
        revalidate: 3600
      }
    })
    return response.json()
  }


  async createPlayer(data: IPlayerRequest) {
    return await fetch(`${PUBLIC_API_URL}/api/player/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
  }

  async updatePlayer(data: IPlayerRequest) {
    return await fetch(`${PUBLIC_API_URL}/api/player/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
  }

  async deletePlayer(id: number) {
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


}

export default new PlayerService()
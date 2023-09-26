import {ITournamentResponse} from "@/interfaces/tournament.interface";
import {ITeamResponse} from "@/interfaces/teams.Interface";

export interface IGameResponse {
  gameList: IGameAndCount,
  playersList: IPlayer[]
}

export interface IOneGameResponse {
  game: IGame,
  players: IPlayer[]
}

export interface ITournamentGamesResponse {
  id: number,
  date: string,
  isWin: boolean,
  TeamId: number,
  TournamentId: number,
  Team: ITeamInGameResponse,
  MapId : number
}

export interface IGameAndCount extends IGame{
  count : number,
  rows : IGame[]
}

export interface IGame extends ITournamentGamesResponse{

  Tournament: ITournamentResponse,
  Map : IMapInGameResponse

}

export interface IPlayer {
  id: number,
  game_id: number,
  player_id: number,
  civilization_id: number,
  Player: IPlayerInGameResponse,
  Civilization: ICivilizationInGameResponse,
}

export interface ITeamInGameResponse {
  name: string
}

export interface IPlayerInGameResponse {
  nickname: string
}

export interface ICivilizationInGameResponse {
  name: string,
  icon: string
}

export interface IMapInGameResponse{
  name : string
}

export interface IPlayerInfoInOneGame{
  nickname : string,
  id : number
}

export interface ICivilizationInfoInOneGame{
  name : string,
  id : number
}

export interface IPlayerInOneGame {
  player: IPlayerInfoInOneGame,
  civilization: ICivilizationInfoInOneGame
}

export interface IMergedGameData extends IGame {
  players: IPlayerInOneGame[]
}

export interface IGameInput {
  id: number,
  date: string,
  teamId: number,
  tournament_id: number,
  mapId : number,
  isWin: string,
  player1: number,
  player2: number,
  player3: number,
  player4: number,
  civilization1: number,
  civilization2: number,
  civilization3: number,
  civilization4: number,
}

export interface IGameRequest {
  id? : number,
  date: string,
  isWin: boolean,
  teamId: number,
  mapId : number,
  players: IOnePlayerInGame[],
  tournamentId : number
}

export interface IOnePlayerInGame {
  playerId: number,
  civilizationId: number
}

export interface IGetTeamGames {
  team : ITeamResponse,
  games : IGameInTeamGames[]
}

export interface IGameInTeamGames {
  id : number,
  date : string,
  isWin : boolean,
  TeamId : number,
  TournamentId : number,
  MapId : number,
  Tournament : ITournamentInTeamGames
}

interface ITournamentInTeamGames {
  name : string
}


import {ICivilizationInGameResponse, ITeamInGameResponse} from "@/interfaces/game.Interface";

export interface IPlayerResponse {
    id: number,
    nickname: string,
    games: number,
    wins: number,
    loses : number,
    tournamentGames: number,
    tournamentWins: number,
    tournamentLoses : number,
}

export interface IPlayerInputs {
    id? : number,
    nickname : string,
    games : number,
    wins: number,
    tournamentGames : number,
    tournamentWins : number,
}

export interface IPlayerRequest extends IPlayerInputs {

}

export interface IErrorResponse {
    message: string
}
export interface IFullPlayerInfoWithError {
    data : IFullPlayerInfo | IErrorResponse
}

export interface IFullPlayerInfo {
    player : IPlayerResponse,
    gameHistory : IFullGameInfo[]
    civilizationsTop : ICivilizationTopItem[],
    mapsArray : ICivilizationTopItem[]
}

export interface ICivilizationTopItem{
    name : string,
    icon : string,
    games : number,
    wins : number,
    winsPercent : number
}

export interface IFullGameInfo  {
    id : number,
    game_id : number,
    player_id : number,
    civilization_id : number,
    Game : IGameInFullGameInfo,
    Civilization : ICivilizationInGameResponse
}

interface IGameInFullGameInfo{
    isWin : boolean,
    date : string,
    Team : ITeamInGameResponse
}
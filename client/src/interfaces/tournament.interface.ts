import exp from "constants";
import {ITeamResponse} from "@/interfaces/teams.Interface";

export interface ITournamentResponse{
  id : number,
  name : string,
  link? : string
}

export interface ITeamInTournamentResponse{
  Team : ITeamResponse,
  games: number,
  wins: number,
  loses: number,
}

export interface IOneTournamentResponse{
  tournament : ITournamentResponse,
  teams: ITeamInTournamentResponse[]
}

export interface IOneAddTeamToTournamentInputs {
  team_id : number,
  games: number,
  wins: number,
}

export interface IOneTournamentDetailsInputs {
  id: number,
  name : string,
  link? : string
}

export interface ICreateTournamentInput {
  name : string,
  link? : string
}

export interface IOneTournamentRequest extends IOneAddTeamToTournamentInputs {
  tournament_id : number
}

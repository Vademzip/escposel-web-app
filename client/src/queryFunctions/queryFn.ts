import {API_URL, PUBLIC_API_URL} from "@/http";

export const getTeamsQueryFn = async () => fetch(`${PUBLIC_API_URL}/api/team/get-all-team-info`).then((res) => res.json());
export const getCivilizationsQueryFn = async () => fetch(`${PUBLIC_API_URL}/api/civilization/get-all-civs`).then((res) => res.json());
export const getGamesQueryFn = async () => fetch(`${PUBLIC_API_URL}/api/game/get-all-games-info`).then((res) => res.json());
export const getPlayersQueryFn = async () => fetch(`${PUBLIC_API_URL}/api/player/get-all-players`).then((res) => res.json());


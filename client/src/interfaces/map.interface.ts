export interface IGetAllMaps {
  id: number,
  name: string,
  icon?: string,
  wins : number,
  loses: number,
  games : number
}

export interface ICreateMapInput {
  name: string,
  icon?: string
}
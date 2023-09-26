export interface ICivilizationResponse {
    id : number,
    name : string,
    icon : string,
    games : number,
    wins : number,
    loses : number,
}

export interface ICivilizationByWinRateResponse {
    id : number,
    name : string,
    icon : string,
    games : number,
    wins : number,
    loses : number,
    winRate : number
}

export interface ICivilizationInput {
    name : string,
    icon : string,
    games : number,
    wins : number
}

export interface ICivilizationRequest extends ICivilizationInput{

}
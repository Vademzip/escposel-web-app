import React, {FC} from 'react';
import {IOneTournamentResponse, ITournamentResponse} from "@/interfaces/tournament.interface";
import TournamentService from "@/services/Tournament.Service";
import TournamentTable from "@/components/resultsPageComponents/tournamentTable/tournamentTable";
import {IProps} from "@/app/games/[id]/page";
import GameHistory from "@/components/resultsPageComponents/gameHistory/GameHistory";

const Results:FC<IProps> = async ({params}) => {
  const tournament: IOneTournamentResponse = await TournamentService.getOneTournament(params.id)
  if (!tournament.tournament) {
    return <div className={'text-2xl text-center'}>Информация о турнире отсутствует или такого турнира не существует</div>;
  }
  return (
    <div>
      {tournament.tournament.id !== 2 && <TournamentTable tournament = {tournament}/>}
      {tournament.tournament.link && <div className={'text-center mt-2'}>Подробная статистика турнира: <a className={'text-orange-500'} href={tournament.tournament.link} target={'_blank'}>{tournament.tournament.link}</a></div>}
      <GameHistory tournamentId={tournament.tournament.id}/>
    </div>
  );
};

export default Results;
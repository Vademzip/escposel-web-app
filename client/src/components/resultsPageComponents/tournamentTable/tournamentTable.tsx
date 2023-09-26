import React, {FC} from 'react';
import TeamService from "@/services/Team.Service";
import {ITeamResponse} from "@/interfaces/teams.Interface";
import TournamentService from "@/services/Tournament.Service";
import {IOneTournamentResponse} from "@/interfaces/tournament.interface";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

interface IProps {
  tournament: IOneTournamentResponse
}

const TournamentTable: FC<IProps> = async ({tournament}) => {

  return (
    <>
      {!tournament.teams
        ? <div className={'flex justify-center'}><LoadingSpinner/></div>
        : tournament.teams.length > 0
          ? (<div className={'border-white border-2 rounded-2xl mx-auto mt-12 w-full overflow-auto lg:w-900p'}>
              <div className={'w-600p md:w-full whitespace-nowrap mx-auto'}>
                <div className={'flex text-center'}>
                  <div className={'basis-3/6 border-r-2'}>Название</div>
                  <div className={'basis-1/6 border-r-2'}>Всего игр</div>
                  <div className={'basis-1/6 border-r-2'}>Побед</div>
                  <div className={'basis-1/6'}>Поражений</div>
                </div>
                {tournament.teams.map((team) => (
                  <div key={`team_${team.Team.id}`} className={'flex text-center'}>
                    <div
                      className={`basis-3/6 border-r-2 font-bold ${team.Team.id === 8 ? 'text-orange-500' : ''}`}>{team.Team.name}</div>
                    <div
                      className={`basis-1/6 border-r-2 ${team.Team.id === 8 ? 'text-orange-500 font-bold' : ''}`}>{team.games}</div>
                    <div
                      className={`basis-1/6 border-r-2 ${team.Team.id === 8 ? 'text-orange-500 font-bold' : ''}`}>{team.wins}</div>
                    <div
                      className={`basis-1/6 ${team.Team.id === 8 ? 'text-orange-500 font-bold' : ''}`}>{team.loses}</div>
                  </div>
                ))}
              </div>
            </div>
          )
          : (
            <div className={'text-2xl text-center mt-2'}>
              Информации о турнирной таблице нет.
            </div>
          )
      }
    </>
  );
};

export default TournamentTable;
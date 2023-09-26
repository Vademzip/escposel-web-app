'use client'
import React, {FC, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {IOneTournamentResponse, ITournamentResponse} from "@/interfaces/tournament.interface";
import TournamentService from "@/services/Tournament.Service";
import {IProps} from "@/app/games/[id]/page";
import AddTeamToTournamentModal from "@/components/oneTournamentPageComponents/AddTeamToTournamentModal";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from "react-icons/bs";
import TeamService from "@/services/Team.Service";
import ChangeTournamentDataModal from "@/components/oneTournamentPageComponents/ChangeTournamentDataModal";

const TournamentItem: FC<IProps> = ({params}) => {
  const [isAddTeamModalShow, setShowAddTeamModal] = useState<boolean>(false)
  const [isTournamentDetailModalShow, setTournamentDetailModal] = useState<boolean>(false)
  const [currentTournament, setCurrentTournament] = useState<ITournamentResponse | null>(null)

  const client = useQueryClient()
  const {
    data: tournament,
    isFetching
  } = useQuery<IOneTournamentResponse>(['tournaments', params.id], () => TournamentService.getOneTournament(params.id))

  const {mutate: addGameToTeam} = useMutation((params: { teamId: number; isWin: boolean, tournamentId: number }) =>
      TeamService.addGameToTeam(params.teamId, params.isWin, params.tournamentId),
    {
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['tournaments']});
      },
    }
  );

  const {mutate: changeGameAmount} = useMutation((params: {
      teamId: number;
      isBigWay: boolean,
      tournamentId: number
    }) =>
      TeamService.changeGameAmount(params.teamId, params.isBigWay, params.tournamentId),
    {
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['tournaments']});
      },
    }
  );

  const {mutate: changeWinsAmount} = useMutation((params: {
      teamId: number;
      isBigWay: boolean,
      tournamentId: number
    }) =>
      TeamService.changeWinsAmount(params.teamId, params.isBigWay, params.tournamentId),
    {
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['tournaments']});
      },
    }
  );

  const {mutate: changeLosesAmount} = useMutation((params: {
      teamId: number;
      isBigWay: boolean,
      tournamentId: number
    }) =>
      TeamService.changeLosesAmount(params.teamId, params.isBigWay, params.tournamentId),
    {
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['tournaments']});
      },
    }
  );


  return (
    <div>
      <div className={'text-center mt-5 text-2xl'}>Настройка турнира</div>
      {isFetching
        ? (<div>Загрузка...</div>)
        : tournament
          ? (
            <>
              <div>Название турнира : {tournament.tournament.name}</div>
              {tournament.tournament.link && <a href={tournament.tournament.link} target={'_blank'}>Ссылка на турнирную
                  таблицу: {tournament.tournament.link}</a>}
              {<div>
                <button
                  className={'bg-blue-500 p-2 rounded-2xl'}
                  onClick={() => {
                    setTournamentDetailModal(true)
                    setCurrentTournament(tournament.tournament)
                  }}

                >
                  Изменить данные
                </button>
              </div>}
              <div>
                <div className={'text-center text-xl'}>
                  Турнирная таблица
                </div>
                <div className={'border rounded-md overflow-auto lg:w-600p mx-auto p-4 mt-5'}>
                  <div className={'w-600p lg:w-auto'}>
                    {tournament.teams.length > 0
                      ? (
                        <div>
                          <div className={'flex'}>
                            <div className={'basis-2/6 text-center self-center'}>Название</div>
                            <div className={'basis-1/6 text-center self-center'}>Игр</div>
                            <div className={'basis-1/6 text-center self-center'}>Побед</div>
                            <div className={'basis-1/6 text-center self-center'}>Поражений</div>
                            <div className={'basis-1/6 text-center self-center'}>Опции</div>
                          </div>
                          {tournament.teams.map((team) => (
                            <div key={`tournament_team_${team.Team.id}`} className={'flex'}>
                              <div className={'basis-2/6 text-center self-center'}>{team.Team.name}</div>
                              <div
                                className={'basis-1/6 text-center self-center flex justify-center gap-x-1 items-center'}>
                                {team.games}
                                <div className={'cursor-pointer'} onClick={() => {
                                  changeGameAmount({
                                    teamId: team.Team.id,
                                    isBigWay: true,
                                    tournamentId: tournament.tournament.id
                                  })
                                }}><BsFillArrowUpCircleFill/></div>
                                <div className={'cursor-pointer'} onClick={() => {
                                  changeGameAmount({
                                    teamId: team.Team.id,
                                    isBigWay: false,
                                    tournamentId: tournament.tournament.id
                                  })
                                }}><BsFillArrowDownCircleFill/></div>
                              </div>
                              <div
                                className={'basis-1/6 text-center self-center flex justify-center gap-x-1 items-center'}>
                                {team.wins}
                                <div className={'cursor-pointer'} onClick={() => {
                                  changeWinsAmount({
                                    teamId: team.Team.id,
                                    isBigWay: true,
                                    tournamentId: tournament.tournament.id
                                  })
                                }}><BsFillArrowUpCircleFill/></div>
                                <div className={'cursor-pointer'} onClick={() => {
                                  changeWinsAmount({
                                    teamId: team.Team.id,
                                    isBigWay: false,
                                    tournamentId: tournament.tournament.id
                                  })
                                }}><BsFillArrowDownCircleFill/>
                                </div>
                              </div>
                              <div
                                className={'basis-1/6 text-center self-center flex justify-center gap-x-1 items-center'}>
                                {team.loses}
                                <div className={'cursor-pointer'} onClick={() => {
                                  changeLosesAmount({
                                    teamId: team.Team.id,
                                    isBigWay: true,
                                    tournamentId: tournament.tournament.id
                                  })
                                }}><BsFillArrowUpCircleFill/></div>
                                <div className={'cursor-pointer'} onClick={() => {
                                  changeLosesAmount({
                                    teamId: team.Team.id,
                                    isBigWay: false,
                                    tournamentId: tournament.tournament.id
                                  })
                                }}><BsFillArrowDownCircleFill/></div>
                              </div>
                              <div className={'basis-1/6 flex justify-center'}>
                                <div className={'cursor-pointer'} onClick={() => {
                                  addGameToTeam({
                                    teamId: team.Team.id,
                                    isWin: true,
                                    tournamentId: tournament.tournament.id
                                  })
                                }}>
                                  <BsFillArrowUpCircleFill/>
                                </div>
                                <div className={'cursor-pointer'} onClick={() => {
                                  addGameToTeam({
                                    teamId: team.Team.id,
                                    isWin: false,
                                    tournamentId: tournament.tournament.id
                                  })
                                }}>
                                  <BsFillArrowDownCircleFill/>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                      : <div className={'text-center'}>Команд нет
                      </div>
                    }
                  </div>
                </div>
              </div>
              <button onClick={() => setShowAddTeamModal(true)}
                      className={'block mx-auto bg-blue-500 p-3 mt-4 rounded-2xl'}>Добавить команду в турнир
              </button>
            </>
          )
          : (<div>Информация о турнире отсутствует</div>)
      }
      {tournament && isAddTeamModalShow &&
          <AddTeamToTournamentModal setShowModal={setShowAddTeamModal} tournament_id={tournament.tournament.id}/>}
      {tournament && isTournamentDetailModalShow &&
          <ChangeTournamentDataModal setShowModal={setTournamentDetailModal} tournament={currentTournament}/>}
    </div>
  );
};

export default TournamentItem;
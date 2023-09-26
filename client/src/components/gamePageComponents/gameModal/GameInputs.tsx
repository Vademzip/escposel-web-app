import {SubmitHandler, useForm} from "react-hook-form"
import React, {FC} from 'react';
import {ModalGameProps} from "@/components/gamePageComponents/gameModal/GameModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import PlayerService from "@/services/Player.Service";
import CivilizationService from "@/services/Civilization.Service";
import TeamService from "@/services/Team.Service";
import {ITeamResponse} from "@/interfaces/teams.Interface";
import {IPlayerResponse} from "@/interfaces/players.Interface";
import {ICivilizationResponse} from "@/interfaces/civilization.Interface";
import {IGameInput, IGameRequest, IOnePlayerInGame} from "@/interfaces/game.Interface";
import GameService from "@/services/Game.Service";
import TournamentService from "@/services/Tournament.Service";
import {ITournamentResponse} from "@/interfaces/tournament.interface";
import MapService from "@/services/Map.Service";
import {IGetAllMaps} from "@/interfaces/map.interface";

const GameInputs: FC<ModalGameProps> = ({
                                          setShowModal,
                                          game,
                                          setCurrentGame
                                        }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IGameInput>()

  const onSubmit: SubmitHandler<IGameInput> = async (data) => {
    const dataToSend: IGameRequest = {
      date: '01-01-1970',
      teamId: 0,
      isWin: false,
      players: [],
      tournamentId: 0,
      mapId: 0
    }
    dataToSend.date = data.date
    dataToSend.isWin = data.isWin !== '0'
    dataToSend.teamId = data.teamId
    dataToSend.mapId = data.mapId
    dataToSend.tournamentId = data.tournament_id
    const playersArray: IOnePlayerInGame[] = []
    playersArray.push({
      playerId: data.player1,
      civilizationId: data.civilization1
    })

    playersArray.push({
      playerId: data.player2,
      civilizationId: data.civilization2
    })

    playersArray.push({
      playerId: data.player3,
      civilizationId: data.civilization3
    })

    playersArray.push({
      playerId: data.player4,
      civilizationId: data.civilization4
    })
    dataToSend.players = playersArray

    if (game) {
      dataToSend.id = game.id
      updateGame(dataToSend)
      //TODO: Реализовать функцию обновления игры
      // updateGame(dataToSend)
    } else {
      createGame(dataToSend)
    }
  }

  const client = useQueryClient()
  const {data: teams} = useQuery<ITeamResponse[]>(['teams'], TeamService.getTeams)
  const {data: maps} = useQuery<IGetAllMaps[]>(['maps'], MapService.getAllMaps)
  const {data: tournaments} = useQuery<ITournamentResponse[]>(['tournaments'], TournamentService.getTournaments)
  const {
    data: players,
    isFetching: isPlayersFetching,
  } = useQuery<IPlayerResponse[]>(['players'], PlayerService.getPlayers)
  const {
    data: civilizations,
    isFetching: isCivilizationsFetching
  } = useQuery<ICivilizationResponse[]>(['civilizations'], CivilizationService.getCivilizations)

  const {mutate: createGame} = useMutation(['games'], GameService.createGame, {
    onSuccess: () => client.invalidateQueries({queryKey: ['games']}).then(
      () => setShowModal(false)
    )
  })
  const {mutate: updateGame} = useMutation(['games'], GameService.updateGame, {
    onSuccess: () => client.invalidateQueries({queryKey: ['games']}).then(
      () => setShowModal(false)
    )
  })

  const formatDate = (date : Date) => {
    const year : number | string = date.getFullYear();
    let month : number | string = date.getMonth() + 1;
    let day : number | string = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  const date = new Date()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
      <label className={'flex flex-col items-center'}>Дата
        <input className={'border border-black p-2 rounded-2xl'} defaultValue={game?.date ? game.date : formatDate(new Date())}
               type="date" {...register('date', {required: true})}/>
      </label>
      <label className={'flex flex-col items-center'}>Турнир
        <select className={'border border-black p-2 rounded-2xl'}
                defaultValue={game?.TournamentId ? game.TournamentId : ''} {...register('tournament_id', {required: true})}>
          {tournaments && tournaments.map(tournament   => <option key={`tournament_option_${tournament.id}`}
                                                                value={tournament.id}>{tournament.name}</option>)}
        </select>
      </label>
      <label className={'flex flex-col items-center'}>Соперник
        <select className={'border border-black p-2 rounded-2xl'}
                defaultValue={game?.TeamId ? game.TeamId : ''} {...register('teamId', {required: true})}>
          {teams && teams.map(team => <option key={`team_option_${team.id}`} value={team.id}>{team.name}</option>)}
        </select>
      </label>
      <label className={'flex flex-col items-center'}>Карта
        <select className={'border border-black p-2 rounded-2xl'}
                defaultValue={game?.MapId ? game.MapId : ''} {...register('mapId', {required: true})}>
          {maps && maps.map(map => <option key={`map_option_${map.id}`} value={map.id}>{map.name}</option>)}
        </select>
      </label>
      <div className={'flex flex-col items-center'}>Результат</div>
      <div className={'flex gap-x-4'}>
        <label>Победа<input className={'ml-2'}
                            type="radio" {...register('isWin')}
                            value={1}
                            checked={game?.isWin}
        /></label>
        <label>Поражение<input className={'ml-2'}
                               type="radio" {...register('isWin')}
                               value={0}
                               checked={!game?.isWin}
        />
        </label>
      </div>
      {!isPlayersFetching
        && !isCivilizationsFetching
        && players && civilizations
        && (players.length > 0)
        && (civilizations.length > 0) &&
          <div>
              <div className={'flex flex-col lg:flex-row'}>
                  <label className={'flex flex-col items-center'}>Игрок 1
                      <select className={'border border-black p-2 rounded-2xl'}
                              defaultValue={game?.players[0] ? game?.players[0].player.id : ''} {...register('player1')}>
                        {players.map(player => <option key={`player1_option_${player.id}`}
                                                       value={player.id}>{player.nickname}</option>)}
                      </select>
                  </label>
                  <label className={'flex flex-col items-center'}>Цивилизация 1
                      <select className={'border border-black p-2 rounded-2xl'}
                              defaultValue={game?.players[0] ? game?.players[0].civilization.id : ''} {...register('civilization1')}>
                        {civilizations.map(civilization => <option key={`civilization1_option_${civilization.id}`}
                                                                   value={civilization.id}>{civilization.name}</option>)}
                      </select>
                  </label>
              </div>
              <div className={'mt-5 flex flex-col lg:flex-row'}>
                  <label className={'flex flex-col items-center'}>Игрок 2
                      <select className={'border border-black p-2 rounded-2xl'}
                              defaultValue={game?.players[1] ? game?.players[1].player.id : ''} {...register('player2')}>
                        {players.map(player => <option key={`player2_option_${player.id}`}
                                                       value={player.id}>{player.nickname}</option>)}
                      </select>
                  </label>
                  <label className={'flex flex-col items-center'}>Цивилизация 2
                      <select className={'border border-black p-2 rounded-2xl'}
                              defaultValue={game?.players[1] ? game?.players[1].civilization.id : ''} {...register('civilization2')}>
                        {civilizations.map(civilization => <option key={`civilization2_option_${civilization.id}`}
                                                                   value={civilization.id}>{civilization.name}</option>)}
                      </select>
                  </label>
              </div>
              <div className={'mt-5 flex flex-col lg:flex-row'}>
                  <label className={'flex flex-col items-center'}>Игрок 3
                      <select className={'border border-black p-2 rounded-2xl'}
                              defaultValue={game?.players[2] ? game?.players[2].player.id : ''} {...register('player3')}>
                        {players.map(player => <option key={`player3_option_${player.id}`}
                                                       value={player.id}>{player.nickname}</option>)}
                      </select>
                  </label>
                  <label className={'flex flex-col items-center'}>Цивилизация 3
                      <select className={'border border-black p-2 rounded-2xl'}
                              defaultValue={game?.players[2] ? game?.players[2].civilization.id : ''} {...register('civilization3')}>
                        {civilizations.map(civilization => <option key={`civilization3_option_${civilization.id}`}
                                                                   value={civilization.id}>{civilization.name}</option>)}
                      </select>
                  </label>
              </div>
              <div className={'mt-5 flex flex-col lg:flex-row'}>
                  <label className={'flex flex-col items-center'}>Игрок 4
                      <select className={'border border-black p-2 rounded-2xl'}
                              defaultValue={game?.players[3] ? game?.players[3].player.id : ''} {...register('player4')}>
                        {players.map(player => <option key={`player4_option_${player.id}`}
                                                       value={player.id}>{player.nickname}</option>)}
                      </select>
                  </label>
                  <label className={'flex flex-col items-center'}>Цивилизация 4
                      <select className={'border border-black p-2 rounded-2xl'}
                              defaultValue={game?.players[3] ? game?.players[3].civilization.id : ''} {...register('civilization4')}>
                        {civilizations.map(civilization => <option key={`civilization4_option_${civilization.id}`}
                                                                   value={civilization.id}>{civilization.name}</option>)}
                      </select>
                  </label>
              </div>
          </div>
      }

      <input className={'bg-green-300 p-2 mt-5 rounded-xl cursor-pointer'} type="submit"/>

    </form>
  )
};

export default GameInputs;
'use client'
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import PlayerModal from "@/components/playerPageComponents/createPlayerModal/PlayerModal";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import PlayerService from "@/services/Player.Service";
import {IPlayerResponse} from "@/interfaces/players.Interface";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Players = () => {
  const [isModalShow, setShowModal] = useState<boolean>(false)
  const [currentPlayer, setCurrentPlayer] = useState<IPlayerResponse | null>(null)
  const client = useQueryClient()


  const {data: players, isFetching} = useQuery<IPlayerResponse[]>(
    ['players'],
    PlayerService.getPlayers,
  )


  const {mutate: deletePlayer} = useMutation((params: { id: number }) =>
      PlayerService.deletePlayer(params.id),
    {
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['players']});
      },
    }
  );


  return (
    <div className={'mt-5'}>
      <ToastContainer/>
      <div className={'text-center text-2xl'}>Список игроков</div>
      <div
        className={'bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] w-600p mx-auto rounded-md p-6 lg:w-600p overflow-auto'}>
        <div className={'w-600p lg:w-auto mx-auto'}>
          <div className={'flex gap-x-2 font-bold'}>
            <div className={'basis-1/4 text-center'}>Никнейм</div>
            <div className={'basis-1/4 text-center'}>Игр</div>
            <div className={'basis-1/4 text-center'}>Побед</div>
            <div className={'basis-1/4 text-center'}>Игр (турнир)</div>
            <div className={'basis-1/4 text-center'}>Побед (турнир)</div>
          </div>
          {isFetching
            ? <div className={'flex justify-center'}><LoadingSpinner/></div>
            : players && players.length
              ? <div className={'text-center'}>{
                players.map(player => (
                  <div key={`player_${player.id}`} className={'flex gap-x-2'}>
                    <div className={'basis-1/4'}>{player.nickname}</div>
                    <div className={'basis-1/4'}>{player.games}</div>
                    <div className={'basis-1/4'}>{player.wins}</div>
                    <div className={'basis-1/4'}>{player.tournamentGames}</div>
                    <div className={'basis-1/4'}>{player.tournamentWins}</div>
                    <div className={'cursor-pointer'} onClick={() => {
                      deletePlayer({id: player.id})
                    }}><AiOutlineDelete/></div>
                    <div className={'cursor-pointer'} onClick={() => {
                      setCurrentPlayer(player)
                      setShowModal(true)
                    }
                    }><AiOutlineEdit/></div>
                  </div>
                ))
              }</div>
              : <div className={'text-center'}>Список игроков пуст</div>
          }
        </div>
      </div>
      <button
        onClick={() => {
          setShowModal(true)
        }}
        className={'block mx-auto mt-10 bg-gradient-to-br from-blue-500 to-yellow-400 p-4 rounded-md hover:to-red-300'}>
        Добавить игрока
      </button>
      {isModalShow &&
          <PlayerModal setShowModal={setShowModal} player={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>}
    </div>
  );
};

export default Players;
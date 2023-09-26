'use client'
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import GameModal from "@/components/gamePageComponents/gameModal/GameModal";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import GameService from "@/services/Game.Service";
import {IGameResponse, IMergedGameData} from "@/interfaces/game.Interface";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

const Games = () => {

  const client = useQueryClient()
  const {data, isFetching} = useQuery<IGameResponse>(['games'], () => GameService.getGames(),   {
  })
  const {mutate: deleteGame} = useMutation(GameService.deleteGame, {
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['games']})
    }
  })

  const [isModalShow, setShowModal] = useState<boolean>(false)
  const [currentGame, setCurrentGame] = useState<IMergedGameData | null>(null)
  const getMergedArray = () => {
    if (data) {
      return data.gameList.rows.map(firstObj => {
        const mergedData: IMergedGameData = {...firstObj, players: []};
        for (const secondObj of data.playersList) {
          if (secondObj.game_id === mergedData.id) {
            mergedData.players.push({
              player: {
                nickname: secondObj.Player.nickname,
                id: secondObj.player_id
              },
              civilization: {
                name: secondObj.Civilization.name,
                id: secondObj.civilization_id
              }
            });
          }
        }
        return mergedData
      })
    }
  }

  return (
    <div className={'mt-5'}>
      <div className={'text-center text-2xl'}>Список игр</div>
      <div className={'bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] mx-auto rounded-md p-6 w-full lg:w-auto overflow-auto'}>
        <div className={'w-900p lg:w-auto mx-auto'}>
          <div className={'flex gap-x-2 font-bold'}>
            <div className={'basis-2/12 text-center'}>Дата</div>
            <div className={'basis-2/12 text-center'}>Соперник</div>
            <div className={'basis-2/12 text-center'}>Результат</div>
            <div className={'basis-2/12 text-center'}>Карта</div>
            <div className={'basis-4/12 text-center'}>Состав</div>
            <div className={'basis-1/12 text-center'}>Турнир</div>
            <div className={'basis-1/12 text-center'}>Опции</div>
          </div>
          {isFetching
            ? <div className={'flex justify-center'}><LoadingSpinner/></div>
            : data && data.gameList.rows.length
              ? <div className={'text-center'}>{
                getMergedArray()?.map(game => (
                  <div key={`game_${game.id}`} className={'flex gap-x-2 items-center border mt-4 p-4 rounded'}>
                    <div className={'basis-2/12'}>{game.date}</div>
                    <div className={'basis-2/12'}>{game.Team.name}</div>
                    <div className={'basis-2/12'}>{game.isWin ? 'Победа' : 'Поражение'}</div>
                    <div className={'basis-2/12'}>{game.Map ? game.Map.name : 'Нет данных'}</div>
                    <div className={'basis-4/12'}>{game.players.map((player) => (
                      <div key={`player_${player.player.id}_in_game_${game.id}`} className={'flex items-center gap-x-4'}>
                        <div className={'basis-1/2'}>{player.player.nickname}</div>
                        <div className={'basis-1/2'}>{player.civilization.name}</div>
                      </div>
                    ))
                    }</div>
                    <div className={'basis-1/12'}>{game.Tournament.name}</div>
                    <div className={'basis-1/12 text-center items-center flex justify-center'}>
                      <div className={'cursor-pointer'} onClick={() => {
                        if (game.id)
                          deleteGame(game.id)
                      }}><AiOutlineDelete/></div>
                      <div className={'cursor-pointer'} onClick={() => {
                        setCurrentGame(game)
                        setShowModal(true)
                      }
                      }><AiOutlineEdit/></div>
                    </div>
                  </div>
                ))
              }</div>
              : <div className={'text-center'}>Список игр пуст</div>
          }
        </div>
      </div>
      <button
        onClick={() => {
          setShowModal(true)
        }}
        className={'fixed bottom-20 left-1/2 -translate-x-1/2 mx-auto mt-10 bg-gradient-to-br from-blue-500 to-yellow-400 p-4 rounded-md hover:to-red-300 transition-colors duration-700'}>
        Добавить игру
      </button>
      {isModalShow && <GameModal setShowModal={setShowModal} setCurrentGame={setCurrentGame}
                                 game={currentGame}/>}
    </div>
  );
};

export default Games;
'use client'
import SliderItems from "@/components/squadPageComponents/sliderComponent/sliderComponent";
import PlayerService from "@/services/Player.Service";
import {FC, useEffect, useState} from "react";
import {IPlayerResponse} from "@/interfaces/players.Interface";
import Link from "next/link";
import GameOptions from "@/components/gamePageComponents/gamePageOptions/GameOptions";
import {Metadata} from "next";

interface IProps {
  searchParams: { [key: string]: string }
}

const Squad: FC<IProps> = ({searchParams}) => {

  const [players, setPlayers] = useState<IPlayerResponse[]>()
  const isOnlyOfficialGame = searchParams['onlyOfficialGame'] === 'true' || false

  useEffect(() => {
    // Функция для получения данных и обновления состояния
    const fetchPlayers = async () => {
      try {
        const response = await PlayerService.getPlayers();
        setPlayers(response);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    // Вызываем функцию при монтировании компонента
    fetchPlayers();
  }, []); // Пустой массив зависимостей, чтобы выполнить запрос только при монтировании

  return (
    <>
      <div className={'text-center text-3xl'}>Состав</div>
      <div className={'text-white text-center text-2xl my-10'}>Познакомьтесь с нашим актуальным составом! Каждый игровой
        персонаж над ником игрока отражает его любимого лидера.
      </div>
      <div>
        <SliderItems/>
      </div>
      <div>
        <div className={'text-center mt-4 text-2xl'}>Статистика игроков</div>
        <div className={'flex lg:w-600p mx-auto justify-center lg:justify-start text-center mb-2'}><GameOptions/></div>
        <div className={'border rounded-md p-4 overflow-auto lg:w-600p mx-auto'}>
          <div className={'w-600p lg:w-auto whitespace-nowrap mx-auto'}>
            <div className={'flex'}>
              <div className={'w-1/4 text-center'}>Никнейм</div>
              <div className={'w-1/4 text-center'}>Игр</div>
              <div className={'w-1/4 text-center'}>Побед</div>
              <div className={'w-1/4 text-center'}>Поражений</div>
            </div>
            <div>
              {players?.sort((a, b) => {
                if (isOnlyOfficialGame ? b.tournamentWins !== a.tournamentWins : b.wins !== a.wins) {
                  return isOnlyOfficialGame ? b.tournamentWins - a.tournamentWins : b.wins - a.wins;
                } else {
                  return isOnlyOfficialGame ? a.tournamentGames - b.tournamentGames : a.games - b.games;
                }
              }).map((player) => (
                <Link key={`player_${player.id}`} href={`/player/${player.id}`}
                      className={'items-center flex hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] cursor-pointer rounded'}>
                  <div className={'w-1/4 text-center'}>{player.nickname}</div>
                  <div
                    className={'w-1/4 text-center'}>{isOnlyOfficialGame ? player.tournamentGames : player.games}</div>
                  <div className={'w-1/4 text-center'}>{isOnlyOfficialGame ? player.tournamentWins : player.wins}</div>
                  <div
                    className={'w-1/4 text-center'}>{isOnlyOfficialGame ? player.tournamentLoses : player.loses}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Squad;
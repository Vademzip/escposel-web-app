import React, {FC} from 'react';
import GameService from "@/services/Game.Service";
import {IGameResponse, ITournamentGamesResponse} from "@/interfaces/game.Interface";
import Link from "next/link";
import GamePagination from "@/components/gamePageComponents/gamePagintation/GamePagination";
import GameOptions from "@/components/gamePageComponents/gamePageOptions/GameOptions";

interface IProps {
  tournamentId?: number,
  page?: string,
  isOnlyOfficialGame?: boolean,
  withOptions?: boolean
}

const GameHistory: FC<IProps> = async ({tournamentId, page, isOnlyOfficialGame, withOptions = false}) => {
  const per_page = 10
  let tournamentGames: ITournamentGamesResponse[] | null = null
  let games: IGameResponse | null = null

  if (tournamentId) {
    tournamentGames = await GameService.getOneTournamentGames(tournamentId)
  } else {
    if (page || isOnlyOfficialGame) {
      console.log('Загрузка...')
      games = await GameService.getGames(page, per_page, isOnlyOfficialGame)
    } else
      games = await GameService.getGames()
  }

  console.log(games)

  return (
    <div>
      <div className={'font-bold text-center text-3xl mb-6 mt-6'}>История игр</div>
      {withOptions && <div className={'mx-auto lg:w-[500px] flex justify-center lg:justify-start mb-4'}><GameOptions/></div>}
      {tournamentGames
        ? tournamentGames.length > 0
          ? tournamentGames.map((game) => (
            <Link href={`/games/${game.id}`}
                  className={`flex items-center border-2 cursor-pointer border-white rounded-2xl p-6 mb-6 gap-x-6 mx-auto font-bold hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] lg:w-[500px]`}>
              <div className={`basis-1/2`}>{game.Team.name}</div>
              <div className={'basis-1/4'}>{new Date(game.date).toLocaleDateString()}</div>
              {game.isWin ? <div className={`text-[#adff2f] basis-1/4`}>Победа</div> :
                <div className={`text-[#ff4a4a] basis-1/4`}>Поражение</div>}
            </Link>
          ))
          :
          <div className={'flex border-2 border-white rounded-2xl p-6 mb-6 gap-x-6 mx-auto font-bold lg:w-[500px]'}>
            Список игр пуст</div>
        : games && games.gameList.rows.length > 0
          ? games.gameList.rows.map((game) => (
            <Link href={`/games/${game.id}`}
                  className={`flex items-center border-2 cursor-pointer border-white rounded-2xl p-6 mb-6 gap-x-6 mx-auto  lg:w-[500px] font-bold hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]`}>
              <div className={`basis-1/2`}>{game.Team.name}</div>
              <div className={'basis-1/4'}>{new Date(game.date).toLocaleDateString()}</div>
              {game.isWin ? <div className={`text-[#adff2f] basis-1/4`}>Победа</div> :
                <div className={`text-[#ff4a4a] basis-1/4`}>Поражение</div>}
            </Link>
          ))
          :
          <div className={'flex border-2 border-white rounded-2xl p-6 mb-6 gap-x-6 mx-auto font-bold w-[500px]'}>
            Список игр пуст</div>
      }
      {games?.gameList.count && page &&
          <GamePagination gamesCount={Math.ceil(games?.gameList.count / per_page)} currentPage={page}/>}
    </div>
  );
};

export default GameHistory;
import React, {FC} from 'react';
import GameService from "@/services/Game.Service";
import {IProps} from "@/app/games/[id]/page";
import {IGetTeamGames} from "@/interfaces/game.Interface";
import Link from "next/link";

const TeamHistoryGame: FC<IProps> = async ({params}) => {

  const games: IGetTeamGames = await GameService.getOneTeamGames(params.id)

  return (
    <div>
      {games && games.games.length > 0
        ? (
          <div>
            <div className={'text-center text-3xl mb-10'}>История игр с {games.team.name}</div>
            {games.games.map((game) => (
              <Link href={`/games/${game.id}`}
                    className={'flex flex-col lg:flex-row h-32 lg:h-24 mb-6 border rounded-2xl cursor-pointer mx-auto lg:w-600p px-10 py-3 items-center hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
                <div className={'basis-1/3 text-center text-xl'}>{new Date(game.date).toLocaleDateString()}</div>
                <div className={'basis-1/3 text-center text-xl'}>{game.Tournament.name}</div>
                <div
                  className={`basis-1/3 text-center text-xl font-bold ${game.isWin ? 'text-green-300' : 'text-red-300'}`}>{game.isWin ? 'Победа' : 'Поражение'}</div>
              </Link>
            ))}
          </div>
        )
        : <div className={'text-center text-2xl'}>Информации о команде нет</div>
      }
    </div>
  );
};

export default TeamHistoryGame;
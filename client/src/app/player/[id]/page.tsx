import React, {FC} from 'react';
import {IProps} from "@/app/games/[id]/page";
import {IFullPlayerInfo} from "@/interfaces/players.Interface";
import GamesChart from "@/components/playerPageComponents/gamesChart/GamesChart";
import Link from "next/link";
import {PUBLIC_API_URL} from "@/http";
import PlayerService from "@/services/Player.Service";
import GameOptions from "@/components/gamePageComponents/gamePageOptions/GameOptions";
import {Metadata} from "next";

type Props = {
  params: { id: number }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  {params, searchParams}: Props,
): Promise<Metadata> {
  const data: IFullPlayerInfo = await PlayerService.getPlayerInfo(params.id, false)

  return {
    title: 'Профиль ' + data.player.nickname,
    description: 'Подробная статистика игрока'
  }
}

const Page: FC<IProps> = async ({params, searchParams}) => {
  const isOnlyOfficialGame = searchParams['onlyOfficialGame'] === 'true' || false
  const player: IFullPlayerInfo = await PlayerService.getPlayerInfo(params.id, isOnlyOfficialGame)
  if (!player.player)
    return <div className={'text-2xl text-center'}>Ошибка при получении данных об игроке!</div>

  return (
    <div>
      <div className={'text-center text-3xl'}>Профиль игрока</div>
      <div className={'lg:border rounded-md mt-6'}>
        <div className={'p-10'}>
          <div className={'text-center text-3xl'}>{player.player.nickname}</div>
          <div className={'flex flex-col gap-y-3 lg:flex-row justify-between gap-x-10 mt-10 lg:w-900p mx-auto'}>
            <div className={'lg:w-72 border rounded-md p-5 relative'}>
              <div className={'text-2xl text-center'}>Количество игр</div>
              <GamesChart winsCount={isOnlyOfficialGame ? player.player.tournamentWins : player.player.wins}
                          losesCount={isOnlyOfficialGame ? player.player.tournamentLoses : player.player.loses}
                          gamesCount={isOnlyOfficialGame ? player.player.tournamentGames : player.player.games}/>
            </div>
            <div className={'border rounded-md p-5 relative grid'}>
              <div className={'text-2xl text-center'}>Лучшие цивилизации</div>
              <div className={'gap-y-2 flex flex-col'}>
                {player.civilizationsTop.map((civilization) => (
                  <div key={`player_best_civs_${civilization.name}`} className={'flex items-center'}>
                    <div className={'basis-1/6'}><img src={`${PUBLIC_API_URL}/${civilization.icon}`} width={64}
                                                      height={64} alt=""/></div>
                    <div className={'basis-3/6 text-center'}>{civilization.name}</div>
                    <div
                      className={'basis-1/6 whitespace-nowrap text-center'}>{civilization.wins} / {civilization.games}</div>
                    <div className={'basis-1/6 whitespace-nowrap text-center'}>{civilization.winsPercent}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className={'mx-auto text-center mt-10 text-xl'}>История игр</div>
            <div className={'flex lg:w-900p mx-auto justify-center lg:justify-start text-center mb-4'}><GameOptions/>
            </div>
            {player.gameHistory.sort((a, b) => {
              const dateA = new Date(a.Game.date);
              const dateB = new Date(b.Game.date);
              return dateB.getTime() - dateA.getTime();
            }).map((game) => (
              <Link href={`/games/${game.game_id}`}
                    className={'mt-2 lg:w-900p rounded-md border lg:h-10 mx-auto mb-5 flex flex-col lg:flex-row items-center p-5 cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
                <div className={'basis-1/4 text-center'}>{new Date(game.Game.date).toLocaleDateString()}</div>
                <div className={'basis-2/6 text-center'}>{game.Game.Team.name}</div>
                <div className={'basis-2/6 text-center'}>{game.Civilization.name}</div>
                <div
                  className={`basis-1/4 text-center ${game.Game.isWin ? 'text-green-400' : 'text-red-500'}`}>{game.Game.isWin ? 'Победа' : 'Поражение'}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
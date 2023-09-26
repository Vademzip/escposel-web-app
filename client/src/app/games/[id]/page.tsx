import React, {FC} from 'react';
import {BsCalendar3, BsFlag} from "react-icons/bs";
import {IGameResponse, IOneGameResponse} from "@/interfaces/game.Interface";
import {TfiCup} from "react-icons/tfi";
import Link from "next/link";
import {API_URL, PUBLIC_API_URL} from "@/http";
import {IoEarthOutline} from "react-icons/io5";
import {Metadata} from "next";

const getGameInfo = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/api/game/get-one-game/${id}`, {
      next: {
        revalidate: 60
      }
    })
    return response.json()
  } catch (e) {
    console.log(e)
  }

}
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  {params, searchParams}: Props,
): Promise<Metadata> {
  const data: IOneGameResponse = await getGameInfo(parseInt(params.id))

  return {
    title: 'Escape Posel vs ' + data.game.Team.name,
  }
}

interface IParams {
  id: number
}

export interface IProps {
  params: IParams,
  searchParams: { [key: string]: string | undefined }
}


const Page: FC<IProps> = async ({params}) => {
  const game: IOneGameResponse = await getGameInfo(params.id)
  if (!game.game)
    return <div className={'text-center text-3xl'}>Игра не найдена</div>
  return (
    <div>
      <div className={'text-center text-3xl'}>Информация об игре</div>
      <div className={'md:border rounded-2xl p-10  mt-10'}>
        <div className={'flex flex-col md:flex-row justify-between gap-x-6 lg:w-700p mx-auto text-xl gap-y-3'}>
          <div className={'p-3 border rounded-md flex flex-col justify-evenly md:w-fit items-center basis-1/3'}>
            <div className={'text-5xl'}><BsCalendar3/></div>
            <div>{new Date(game.game.date).toLocaleDateString()}</div>
          </div>

          <Link href={`/teams/${game.game.TeamId}`}
                className={'p-3 border rounded-md flex flex-col justify-evenly text-center md:w-fit items-center basis-1/3 cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
            <div className={'text-5xl'}><BsFlag/></div>
            <div>{game.game.Team.name}</div>
          </Link>

          <Link href={`/results/${game.game.TournamentId}`}
                className={'p-3 border rounded-md flex flex-col justify-evenly text-center md:w-fit items-center  basis-1/3 cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
            <div className={'text-5xl'}><TfiCup/></div>
            <div>{game?.game?.Tournament?.name ? game.game.Tournament.name : 'Информация отсутствует'}</div>
          </Link>
          {/*TODO:Возможность смотреть историю игр на конкретной карте*/}
          <div
            className={'p-3 border rounded-md flex flex-col justify-evenly text-center lg:w-fit items-center  basis-1/3'}>
            <div className={'text-5xl'}><IoEarthOutline/></div>
            <div>{game?.game?.Map?.name ? game.game.Map.name : 'Информация отсутствует'}</div>
          </div>

        </div>
        <div className={'text-2xl py-3 border rounded-md flex flex-col md:w-fit items-center mx-auto mt-10'}>
          <div>Состав</div>
          <div className={'flex flex-col md:flex-row md:w-700p gap-6 flex-wrap justify-center mt-5'}>
            {game.players.map((player) => (
              <Link href={`/player/${player.player_id}`}
                    className={'bg-gradient-to-tl from-[#0F969c] to-[#0c7075]  p-4 flex items-center flex-col w-64 lg:w-40 lg:basis-2/6 rounded-md  hover:from-[#0F969c] hover:to-[#6DA5C0] cursor-pointer'}>
                <img src={`${PUBLIC_API_URL}/${player.Civilization.icon}`} alt={'civilization_icon'} width={64}
                     height={64}/>
                <div>{player.Player.nickname}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Page;
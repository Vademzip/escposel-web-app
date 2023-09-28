import React from 'react';
import CivilizationService from "@/services/Civilization.Service";
import {ICivilizationByWinRateResponse} from "@/interfaces/civilization.Interface";
import {Metadata} from "next";
import {API_URL} from "@/http";
import GamesChart from "@/components/playerPageComponents/gamesChart/GamesChart";

export const metadata: Metadata = {
  title: 'Escape Posel | Статистика',
  description: 'Подробная общая статистика',
}
const Statistics = async () => {

  const civilizationList: ICivilizationByWinRateResponse[] = await CivilizationService.getCivilizationsByWinRate()
  const sortedCivilizations = civilizationList
    .filter(civilization => civilization.games !== 0)
    .sort((a, b) => b.winRate - a.winRate)
  const top3Civilization = sortedCivilizations.slice(0,3)
  const otherCivilizations = sortedCivilizations.slice(3)
  return (
    <div>
      <div className={'text-center text-3xl'}>Лучшие цивилизации</div>
      <div className={'flex flex-col lg:flex-row justify-between gap-x-4 lg:h-96 mt-4 lg:w-900p mx-auto'}>
        <div className={'border p-4 lg:w-56 rounded lg:self-end flex flex-col items-center lg:h-340p order-2 lg:order-1'}>
          <img className={'w-24 h-24'} src={API_URL + '/' + top3Civilization[1].icon} alt=""/>
          <div className={'hidden lg:block lg:w-48 rounded-md p-5 relative'}>
            <GamesChart winsCount={top3Civilization[1].wins} losesCount={top3Civilization[1].loses} gamesCount={top3Civilization[1].games}/>
          </div>
          <div className={'text-2xl'}>{top3Civilization[1].name}</div>
          <div className={'flex lg:hidden  gap-x-1'}>
            <div className={'w-12 h-12 border rounded flex flex-col items-center text-green-200'}>
              <div>W</div>
              <div>{top3Civilization[1].wins}</div>
            </div>
            <div className={'w-12 h-12 border rounded flex flex-col items-center text-red-200'}>
              <div>L</div>
              <div>{top3Civilization[1].loses}</div>
            </div>
            <div className={'w-12 h-12 border rounded flex flex-col items-center'}>
              <div>%</div>
              <div>{top3Civilization[1].winRate}</div>
            </div>
          </div>
        </div>
        <div className={'border p-4 lg:w-56 rounded flex flex-col items-center justify-between order-1 lg:order-2'}>
          <img className={'w-24 h-24'} src={API_URL + '/' + top3Civilization[0].icon} alt=""/>
          <div className={'hidden lg:block lg:w-48 rounded-md p-5 relative'}>
            <GamesChart winsCount={top3Civilization[0].wins} losesCount={top3Civilization[0].loses} gamesCount={top3Civilization[0].games}/>
          </div>
          <div className={'text-2xl'}>{top3Civilization[0].name}</div>
          <div className={'flex lg:hidden  gap-x-1'}>
            <div className={'w-12 h-12 border rounded flex flex-col items-center text-green-200'}>
              <div>W</div>
              <div>{top3Civilization[0].wins}</div>
            </div>
            <div className={'w-12 h-12 border rounded flex flex-col items-center text-red-200'}>
              <div>L</div>
              <div>{top3Civilization[0].loses}</div>
            </div>
            <div className={'w-12 h-12 border rounded flex flex-col items-center'}>
              <div>%</div>
              <div>{top3Civilization[0].winRate}</div>
            </div>
          </div>

        </div>
        <div className={'border p-4 lg:w-56 rounded lg:self-end flex flex-col items-center order-3 lg:order-3'}>
          <img className={'w-24 h-24'} src={API_URL + '/' + top3Civilization[2].icon} alt=""/>
          <div className={'hidden lg:block lg:w-48 rounded-md p-5 relative'}>
            <GamesChart winsCount={top3Civilization[2].wins} losesCount={top3Civilization[2].loses} gamesCount={top3Civilization[2].games}/>
          </div>
          <div className={'text-2xl'}>{top3Civilization[2].name}</div>
          <div className={'flex lg:hidden  gap-x-1'}>
            <div className={'w-12 h-12 border rounded flex flex-col items-center text-green-200'}>
              <div>W</div>
              <div>{top3Civilization[2].wins}</div>
            </div>
            <div className={'w-12 h-12 border rounded flex flex-col items-center text-red-200'}>
              <div>L</div>
              <div>{top3Civilization[2].loses}</div>
            </div>
            <div className={'w-12 h-12 border rounded flex flex-col items-center'}>
              <div>%</div>
              <div>{top3Civilization[2].winRate}</div>
            </div>
          </div>

        </div>
      </div>
      <div className={'border rounded-md p-4 overflow-auto lg:w-900p mx-auto mt-4'}>
        <div className={'w-900p lg:w-auto whitespace-nowrap mx-auto'}>
          <div className={'flex'}>
            <div className={'w-2/6 text-center'}>Название</div>
            <div className={'w-1/6 text-center'}>Игр</div>
            <div className={'w-1/6 text-center'}>Побед</div>
            <div className={'w-1/6 text-center'}>Поражений</div>
            <div className={'w-1/6 text-center'}>% побед</div>
          </div>
          {otherCivilizations
            .filter(civilization => civilization.games !== 0)
            .sort((a, b) => b.winRate - a.winRate)
            .map((civilization) => (
              <div className={'flex'}>
                <div className={'w-2/6 text-center'}>{civilization.name}</div>
                <div className={'w-1/6 text-center'}>{civilization.games}</div>
                <div className={'w-1/6 text-center'}>{civilization.wins}</div>
                <div className={'w-1/6 text-center'}>{civilization.loses}</div>
                <div className={'w-1/6 text-center'}>{civilization.winRate}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
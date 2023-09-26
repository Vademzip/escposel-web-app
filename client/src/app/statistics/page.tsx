import React from 'react';
import CivilizationService from "@/services/Civilization.Service";
import {ICivilizationByWinRateResponse} from "@/interfaces/civilization.Interface";
import {Metadata} from "next";
export const metadata: Metadata = {
  title: 'Escape Posel | Статистика',
  description: '...',
}
const Statistics = async () => {

  const civilization: ICivilizationByWinRateResponse[] = await CivilizationService.getCivilizationsByWinRate()

  return (
    <div>
      <div className={'text-center text-3xl'}>Статистика</div>
      <div className={'border rounded-md p-4 overflow-auto lg:w-900p mx-auto'}>
        <div className={'w-900p lg:w-auto whitespace-nowrap mx-auto'}>
          <div className={'flex'}>
            <div className={'w-2/6 text-center'}>Название</div>
            <div className={'w-1/6 text-center'}>Игр</div>
            <div className={'w-1/6 text-center'}>Побед</div>
            <div className={'w-1/6 text-center'}>Поражений</div>
            <div className={'w-1/6 text-center'}>% побед</div>
          </div>
          {civilization
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
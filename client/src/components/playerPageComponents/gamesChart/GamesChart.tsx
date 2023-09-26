'use client'
import React, {FC} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import CountUp from "react-countup";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  winsCount: number,
  losesCount: number,
  gamesCount : number
}


const GamesChart: FC<IProps> = ({winsCount, losesCount, gamesCount}) => {
  const data = {
    labels: ['Побед', 'Поражений'],
    datasets: [
      {
        label: 'Количество',
        data: [winsCount, losesCount],
        backgroundColor: [
          'rgba(56,255,0,0.2)',
          'rgba(255,0,0,0.2)',
        ],
        borderColor: [
          'rgb(5,255,0)',
          'rgb(255,0,0)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <div style={{
        fontSize: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '53%',
        position: 'absolute'
      }}><CountUp end={gamesCount}/></div>
      <Doughnut data={data} options={{
        color: 'white',
        plugins: {legend: {align: "center"}}
      }
      }/>
    </>
  );
};

export default GamesChart;
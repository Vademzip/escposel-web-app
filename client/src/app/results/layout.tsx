'use client'
import React from 'react';
import {Metadata} from "next";
import {ITournamentResponse} from "@/interfaces/tournament.interface";
import TournamentService from "@/services/Tournament.Service";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";


const ResultPageLayout = ({children}: { children: React.ReactNode }) => {
  const {
    data: tournaments,
    isFetching
  } = useQuery<ITournamentResponse[]>(['tournaments'], TournamentService.getTournaments)
  const pathname = usePathname()
  return (
    <div className={'mx-auto lg:border-2 border-white p-4 rounded-md'}>
      <div className={'text-3xl text-center'}>Результаты</div>
      <div className={'flex-col items-center gap-y-3 lg:flex-row flex p-2 lg:w-fit lg:gap-x-2'}>
        {
          isFetching ?
            <div>Загрузка..</div>
            :
            tournaments && tournaments.length > 0
              ? tournaments.map((tournament) => (
                tournament.id != 2 && <Link key={`tournament_${tournament.id}`} href={`/results/${tournament.id}`}
                                            className={`rounded-md w-80 text-center border p-2 cursor-pointer ${pathname === '/results/' + tournament.id.toString() ? 'bg-gradient-to-tl from-[#0F969c] to-[#0c7075]' : ''}`}>{tournament.name}</Link>
              ))
              : <div>Нет информации о турнирах</div>
        }
      </div>
      {children}
    </div>
  );
};

export default ResultPageLayout;
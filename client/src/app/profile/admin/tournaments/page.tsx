'use client'
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import PlayerModal from "@/components/playerPageComponents/createPlayerModal/PlayerModal";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import PlayerService from "@/services/Player.Service";
import {ITournamentResponse} from "@/interfaces/tournament.interface";
import TournamentService from "@/services/Tournament.Service";
import Link from "next/link";
import TournamentsModal from "@/components/tournamentsPageComponents/TournamentsModal";

const Tournaments = () => {
  const client = useQueryClient()
  const {data, isFetching} = useQuery<ITournamentResponse[]>(['tournaments'], TournamentService.getTournaments)
  const {mutate: deletePlayer} = useMutation((params: { id: number }) =>
      TournamentService.deleteTournament(params.id),
    {
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['tournaments']});
      },
    }
  );
  const [isModalShow, setShowModal] = useState<boolean>(false)

  return (
    <div className={'mt-5'}>
      <div className={'text-center text-2xl'}>Список турниров</div>
      <div className={'bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] overflow-auto lg:w-900p mx-auto rounded-md p-6'}>
        <div className={'w-900p lg:w-auto'}>
          <div className={'flex gap-x-2 font-bold'}>
            <div className={'basis-1/4 text-center'}>Название</div>
            <div className={'basis-2/4 text-center'}>Ссылка на турнир</div>
          </div>
          <div>
            {isFetching
              ? <div className={'text-center'}>Загрузка...</div>
              : data && data.length
                ? <div className={'text-center'}>{
                  data.map(tournament => (
                    <div key={`player_${tournament.id}`} className={'flex gap-x-2 items-center'}>
                      <div className={'basis-1/4'}>{tournament.name}</div>
                      <a href={tournament.link} target={'_blank'}
                         className={'basis-2/4'}>{tournament.link ? tournament.link : 'Отсутствует'}</a>
                      <Link href={`/profile/admin/tournaments/${tournament.id}`}
                            className={'border hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] rounded-md p-2'}>Редактировать</Link>
                    </div>
                  ))
                }</div>
                : <div className={'text-center'}>Список игроков пуст</div>
            }
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setShowModal(true)
        }}
        className={'block mx-auto mt-10 bg-gradient-to-br from-blue-500 to-yellow-400 p-4 rounded-md hover:to-red-300 transition-colors duration-700'}>
        Добавить турнир
      </button>
      {isModalShow && <TournamentsModal setShowModal={setShowModal}/>}
    </div>
  );
};

export default Tournaments;
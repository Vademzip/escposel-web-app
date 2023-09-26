'use client'
import React, {useState} from 'react';
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import TeamModal from "@/components/teamPageComponents/createTeamModal/TeamModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import TeamService from "@/services/Team.Service";
import {ITeamResponse} from "@/interfaces/teams.Interface";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
const Teams = () => {
  const client = useQueryClient()
  const {data, isFetching} = useQuery<ITeamResponse[]>(['teams'], TeamService.getTeams)

  const {mutate : deleteTeam} = useMutation((id: number) => TeamService.deleteTeam(id), {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['teams'] });
    },
  });


  const [isModalShow, setShowModal] = useState<boolean>(false)
  const [currentTeam, setCurrentTeam] = useState<ITeamResponse | null>(null)



  return (
    <div className={'mt-5'}>
      <div className={'text-center text-2xl'}>Список команд</div>
      <div className={'bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] w-300p mx-auto rounded-md p-6'}>
        <div className={'flex gap-x-2 font-bold'}>
          <div className={'basis-3/4 text-center'}>Название</div>
          <div className={'text-center basis-1/4'}>Опции</div>
        </div>
        <div>
          {isFetching
            ? <div className={'flex justify-center'}><LoadingSpinner/></div>
            : data && data.length
              ? <div className={'text-center'}>{
                data.map(team => (
                  <div key={`team_${team.id}`} className={'flex gap-x-2'}>
                    <div className={'basis-3/4'}>{team.name}</div>
                    <div className={'flex basis-1/4 justify-center'}>
                      <div className={'cursor-pointer'} onClick={() => {
                        deleteTeam(team.id)
                      }}><AiOutlineDelete/></div>
                      <div className={'cursor-pointer'} onClick={() => {
                        setCurrentTeam(team)
                        setShowModal(true)
                      }
                      }><AiOutlineEdit/></div>
                    </div>
                  </div>
                ))
              }</div>
              : <div className={'text-center'}>Список команд пуст</div>
          }
        </div>
      </div>
      <button
        onClick={() => {
          setShowModal(true)
        }}
        className={'block mx-auto mt-10 bg-gradient-to-br from-blue-500 to-yellow-400 p-4 rounded-md hover:to-red-300 transition-colors duration-700'}>
        Добавить команду
      </button>
      {isModalShow && <TeamModal setShowModal={setShowModal} team={currentTeam} setCurrentTeam={setCurrentTeam}/>}
    </div>
  );
};

export default Teams;
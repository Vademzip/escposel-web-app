'use client'
import React, {useState} from 'react';
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import TeamModal from "@/components/teamPageComponents/createTeamModal/TeamModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import TeamService from "@/services/Team.Service";
import {ITeamResponse} from "@/interfaces/teams.Interface";
import MapService from "@/services/Map.Service";
import {IGetAllMaps} from "@/interfaces/map.interface";
import MapModal from "@/components/mapPageComponents/mapPageModal/MapModal";
import {PUBLIC_API_URL} from "@/http";
const Maps = () => {
  const {data, isFetching} = useQuery<IGetAllMaps[]>(['maps'], MapService.getAllMaps)
  const [isModalShow, setShowModal] = useState<boolean>(false)
  const [currentMap, setCurrentMap] = useState<IGetAllMaps | null>(null)

  return (
    <div className={'mt-5'}>
      <div className={'text-center text-2xl'}>Список карт</div>
      <div className={'bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] w-300p mx-auto rounded-md p-6'}>
        <div className={'flex gap-x-2 font-bold'}>
          <div className={'basis-3/4 text-center'}>Название</div>
          <div className={'text-center basis-1/4'}>Опции</div>
        </div>
        <div>
          {isFetching
            ? <div className={'text-center'}>Загрузка...</div>
            : data && data.length
              ? <div className={'text-center'}>{
                data.map(map => (
                  <div key={`map_${map.id}`} className={'flex gap-x-2'}>
                    <div className={'basis-3/4 flex items-center gap-x-2'}>
                      <div className={'basis-1/2'}>{map.name}</div>
                      <img className={'rounded-full'} width={64} height={64} src={`${PUBLIC_API_URL}/${map.icon}`} alt="mapIcon"/>
                      <div className={'whitespace-nowrap'}>{map.wins} / {map.loses}</div>
                    </div>
                    <div className={'flex basis-1/4 justify-center items-center'}>
                      <div className={'cursor-pointer'} onClick={() => {
                      }}><AiOutlineDelete/></div>
                      <div className={'cursor-pointer'} onClick={() => {
                        setCurrentMap(map)
                        setShowModal(true)
                      }
                      }><AiOutlineEdit/></div>
                    </div>
                  </div>
                ))
              }</div>
              : <div className={'text-center'}>Список карт пуст</div>
          }
        </div>
      </div>
      <button
        onClick={() => {
          setShowModal(true)
        }}
        className={'block mx-auto mt-10 bg-gradient-to-br from-blue-500 to-yellow-400 p-4 rounded-md hover:to-red-300 transition-colors duration-700'}>
        Добавить карту
      </button>
      {isModalShow && <MapModal setShowModal={setShowModal} map={currentMap} setCurrentMap={setCurrentMap}/>}
    </div>
  );
};

export default Maps;
'use client'
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import CivilizationModal from "@/components/civilizationPageComponents/createCivilizationModal/CivilizationModal";
import Image from "next/image";
import {getCivilizationsQueryFn} from "@/queryFunctions/queryFn";
import {ICivilizationResponse} from "@/interfaces/civilization.Interface";
import {API_URL, PUBLIC_API_URL} from "@/http";
import CivilizationService from "@/services/Civilization.Service";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import {Context} from "@/context/context";
import {AxiosError} from "axios";

const Civilizations = () => {
  const {setSuccessMessage, setError} = useContext(Context)
  const client = useQueryClient()
  const {data, isLoading, refetch} = useQuery<ICivilizationResponse[]>({
    queryKey: ['civilizations'],
    queryFn: getCivilizationsQueryFn
  })

  const {mutate: deleteCivilization} = useMutation(['civilizations'], CivilizationService.deleteCivilization,
    {
      onSuccess: () => {
        client.invalidateQueries(['civilizations'])
        setSuccessMessage('Цивилизация успешно удалена!')
      },
      onError: (error: any) => {
        if (error.response) {
          setError(error.response.data.message);
        }
      }
    })

  const [isModalShow, setShowModal] = useState<boolean>(false)
  const [currentCivilization, setCurrentCivilization] = useState<ICivilizationResponse | null>(null)

  return (
    <div className={'mt-5'}>
      <div className={'text-center text-2xl'}>Список цивилизаций</div>
      <div className={'bg-gradient-to-br from-[#0F969c] to-[#6DA5C0] w-fit mx-auto rounded-md p-6'}>
        <div>
          {isLoading
            ? <div className={'flex justify-center'}><LoadingSpinner/></div>
            : data && data.length
              ? <div className={'text-center'}>{
                data.map(civilization => (
                  <div key={`civilization_${civilization.id}`} className={'flex gap-x-2 items-center'}>
                    <div className={''}><Image loader={({src}) => src} width={64} height={64}
                                               src={`${PUBLIC_API_URL}/${civilization.icon}`}
                                               alt={`${civilization.name} logo`}/></div>
                    <div className={''}>{civilization.name}</div>
                    <div>({civilization.games} / {civilization.wins} - {civilization.loses})</div>
                    <div className={'cursor-pointer'} onClick={() => {
                      deleteCivilization(civilization.id)
                    }}><AiOutlineDelete/></div>
                    <div className={'cursor-pointer'} onClick={() => {
                      setCurrentCivilization(civilization)
                      setShowModal(true)
                    }
                    }><AiOutlineEdit/></div>
                  </div>
                ))
              }</div>
              : <div className={'text-center'}>Список цивилизаций пуст</div>
          }
        </div>
      </div>
      <button
        onClick={() => {
          setShowModal(true)
        }}
        className={'fixed bottom-2 left-1/2 -translate-x-1/2 mx-auto mt-10 bg-gradient-to-br from-blue-500 to-yellow-400 p-4 rounded-md hover:to-red-300 transition-colors duration-700'}>
        Добавить цивилизацию
      </button>
      {isModalShow && <CivilizationModal setShowModal={setShowModal} setCurrentCivilization={setCurrentCivilization}
                                         civilization={currentCivilization}/>}
    </div>
  );
};

export default Civilizations;
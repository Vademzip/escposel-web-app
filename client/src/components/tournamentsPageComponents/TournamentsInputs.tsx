import {useForm, SubmitHandler} from "react-hook-form"
import React, {ChangeEvent, FC, useRef, useState} from 'react';
import Image from "next/image";
import RandomLeaderIcon from "/public/random_leader_icon.webp"
import {ICivilizationInput} from "@/interfaces/civilization.Interface";
import {API_URL, PUBLIC_API_URL} from "@/http";
import {ModalAddTeamToTournamentProps} from "@/components/oneTournamentPageComponents/AddTeamToTournamentModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ITeamResponse} from "@/interfaces/teams.Interface";
import TeamService from "@/services/Team.Service";
import {ICreateTournamentInput} from "@/interfaces/tournament.interface";
import TournamentService from "@/services/Tournament.Service";
import {ModalTournamentProps} from "@/components/tournamentsPageComponents/TournamentsModal";

const TournamentsInputs: FC<ModalTournamentProps> = ({
                                                       setShowModal,
                                                     }) => {


  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ICreateTournamentInput>()

  const client = useQueryClient()
  const {mutate: createTournament} = useMutation(['tournaments'], TournamentService.createTournament,
    {
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['tournaments']});
        setShowModal(false)
      },
    })

  const onSubmit: SubmitHandler<ICreateTournamentInput> = async (data) => {
    createTournament(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
      <label className={'flex flex-col items-center'}>Название
        <input
          className={'border border-black w-32 p-2 rounded-sm'}
          type="text"
          {...register('name')}/>
      </label>
      <label className={'flex flex-col text-center'}>Ссылка на турнир<input
        className={'border border-black w-32 p-2 rounded-sm'}
        {...register("link")} />
      </label>
      <input className={'bg-green-300 p-2 mt-5 rounded-xl cursor-pointer'} type="submit"/>
    </form>
  )
};

export default TournamentsInputs;
import {useForm, SubmitHandler} from "react-hook-form"
import React, {ChangeEvent, FC, useRef, useState} from 'react';
import {ModalAddTeamToTournamentProps} from "@/components/oneTournamentPageComponents/AddTeamToTournamentModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ITeamInputs, ITeamResponse} from "@/interfaces/teams.Interface";
import TeamService from "@/services/Team.Service";
import {IOneAddTeamToTournamentInputs, IOneTournamentDetailsInputs} from "@/interfaces/tournament.interface";
import PlayerService from "@/services/Player.Service";
import TournamentService from "@/services/Tournament.Service";
import {ModalOneTournamentDetailProps} from "@/components/oneTournamentPageComponents/ChangeTournamentDataModal";

const AddTeamToTournamentInputs: FC<ModalOneTournamentDetailProps> = ({
                                                                        setShowModal,
                                                                        tournament
                                                                      }) => {


  const {
    watch,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IOneTournamentDetailsInputs>()

  const client = useQueryClient()
  const {mutate: updateTournament} = useMutation(['tournaments', tournament?.id], TournamentService.updateTournament,
    {
      onSuccess: () => {
        client.invalidateQueries(['tournaments']).then(
          () => {
            setShowModal(false)
          }
        )
      }
    })
  const onSubmit: SubmitHandler<IOneTournamentDetailsInputs> = async (data) => {
    if (tournament) //TODO: исправить это, выдавать ошибку если id нет
      data.id = tournament.id
    updateTournament(data)
  }
  if (tournament)
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
        <label className={'flex flex-col text-center'}>Название турнира<input
          className={'border border-black w-full p-2 rounded-sm'}
          defaultValue={tournament ? tournament.name : ''} {...register("name")} />
        </label>
        <label className={'flex flex-col text-center'}>Ссылка на турнир<input
          className={'border border-black w-full p-2 rounded-sm'}
          defaultValue={tournament.link ? tournament.link : ''} {...register("link")} />
        </label>
        <input className={'bg-green-300 p-2 mt-5 rounded-xl cursor-pointer'} type="submit"/>
      </form>
    )

  return <div>Ошибка при загрузке меню редактирования</div>

};

export default AddTeamToTournamentInputs;
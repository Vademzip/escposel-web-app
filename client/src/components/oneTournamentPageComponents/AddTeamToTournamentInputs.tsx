import {useForm, SubmitHandler} from "react-hook-form"
import React, {ChangeEvent, FC, useRef, useState} from 'react';
import {ModalAddTeamToTournamentProps} from "@/components/oneTournamentPageComponents/AddTeamToTournamentModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ITeamResponse} from "@/interfaces/teams.Interface";
import TeamService from "@/services/Team.Service";
import {IOneAddTeamToTournamentInputs} from "@/interfaces/tournament.interface";
import PlayerService from "@/services/Player.Service";
import TournamentService from "@/services/Tournament.Service";

const AddTeamToTournamentInputs: FC<ModalAddTeamToTournamentProps> = ({
                                                            setShowModal,
                                                            tournament_id
                                                          }) => {


  const {
    watch,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IOneAddTeamToTournamentInputs>()

  const client = useQueryClient()

  const {data: teams} = useQuery<ITeamResponse[]>(['teams'], TeamService.getTeams)
  const {mutate: addTeamToTournament} = useMutation(['tournaments', tournament_id], TournamentService.addTeamToTournament, {
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['tournaments']}).then(
        () => setShowModal(false)
      )
    }
  })


  const onSubmit: SubmitHandler<IOneAddTeamToTournamentInputs> = async (data) => {
    addTeamToTournament({...data, tournament_id})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
      <label className={'flex flex-col items-center'}>Команда
        <select className={'border border-black p-2 rounded-2xl'} {...register('team_id')}>
          {teams && teams.map(team => <option value={team.id}>{team.name}</option>)}
        </select>
      </label>
      <label className={'flex flex-col text-center'}>Игр<input
        className={'border border-black w-32 p-2 rounded-sm'}
        defaultValue='0' {...register("games")} />
      </label>
      <label className={'flex flex-col text-center'}>Побед<input
        className={'border border-black w-32 p-2 rounded-sm'}
        defaultValue='0' {...register("wins")} />
      </label>
      <input className={'bg-green-300 p-2 mt-5 rounded-xl cursor-pointer'} type="submit"/>
    </form>
  )
};

export default AddTeamToTournamentInputs;
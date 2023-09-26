import {useForm, SubmitHandler} from "react-hook-form"
import React, {FC} from 'react';
import {ModalTeamProps} from "@/components/teamPageComponents/createTeamModal/TeamModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import TeamService from "@/services/Team.Service";
import {ITeamInputs} from "@/interfaces/teams.Interface";

const TeamInputs: FC<ModalTeamProps> = ({
                                          setShowModal,
                                          setCurrentTeam,
                                          team
                                        }) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ITeamInputs>()

  const client = useQueryClient()

  const {mutate: createTeam} = useMutation(TeamService.createTeam, {
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['teams']}).then(
        () => setShowModal(false)
      )
    }
  })

  const {mutate: updateTeam} = useMutation(TeamService.updateTeam, {
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['teams']}).then(
        () => {
          setShowModal(false)
          setCurrentTeam(null)
        }
      )
    }
  })

  const onSubmit: SubmitHandler<ITeamInputs> = async (data) => {
    if (team) {
      data.id = team.id
      updateTeam(data)
    } else {
      createTeam(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
      <label className={'flex flex-col text-center'}>Название<input
        className={'border border-black w-32 p-2 rounded-sm'}
        defaultValue={team?.name ? team.name : ''} {...register("name")} /></label>
      <div className={'flex gap-x-10'}>
      </div>
      <input className={'bg-green-300 p-2 mt-5 rounded-xl cursor-pointer'} type="submit"/>
    </form>
  )
};

export default TeamInputs;
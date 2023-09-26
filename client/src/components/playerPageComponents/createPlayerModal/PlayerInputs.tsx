import {useForm, SubmitHandler} from "react-hook-form"
import React, {FC} from 'react';
import {ModalPlayerProps} from "@/components/playerPageComponents/createPlayerModal/PlayerModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import PlayerService from "@/services/Player.Service";
import {IPlayerInputs} from "@/interfaces/players.Interface";

const PlayerInputs: FC<ModalPlayerProps> = ({
                                              setShowModal,
                                              player,
                                              setCurrentPlayer
                                            }) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IPlayerInputs>()


  const client = useQueryClient()

  const {mutate: createPlayer} = useMutation(PlayerService.createPlayer, {
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['players']}).then(
        () => setShowModal(false)
      )
    }
  })

  const {mutate: updatePlayer} = useMutation(PlayerService.updatePlayer, {
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['players']}).then(
        () => {
          setShowModal(false)
          setCurrentPlayer(null)
        }
      )
    }
  })

  const onSubmit: SubmitHandler<IPlayerInputs> = async (data) => {
    if (player) {
      data.id = player.id
      updatePlayer(data)
    } else {
      createPlayer(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
      <label className={'flex flex-col text-center'}>Никнейм<input
        className={'border border-black w-32 p-2 rounded-sm'}
        defaultValue={player?.nickname ? player.nickname : ''} {...register("nickname", {required: true})}/>
      </label>

      <div className={'flex flex-col gap-x-10'}>
        <label className={'flex flex-col items-center'}>Кол-во игр<input
          className={'border border-black  w-16 p-2 rounded-sm'}
          {...register("games", {required: true})}
          defaultValue={player?.games ? player.games : 0}
        /></label>
        <label className={'flex flex-col items-center'}>Кол-во побед<input
          className={'border border-black  w-16 p-2 rounded-sm'}
          {...register("wins", {required: true, min: 0})}
          defaultValue={player?.wins ? player.wins : 0}
        /></label>
        <label className={'flex flex-col items-center'}>Кол-во игр (турнир)<input
          className={'border border-black  w-16 p-2 rounded-sm'}
          {...register("tournamentGames", {required: true})}
          defaultValue={player?.tournamentGames ? player.tournamentGames : 0}
        /></label>
        <label className={'flex flex-col items-center'}>Кол-во побед (турнир)<input
          className={'border border-black  w-16 p-2 rounded-sm'}
          {...register("tournamentWins", {required: true, min: 0})}
          defaultValue={player?.tournamentWins ? player.tournamentWins : 0}
        /></label>
      </div>

      {(errors.games?.type === 'required'
          || errors.wins?.type === 'required'
          || errors.nickname?.type === 'required')
        && <span className={'text-red-600'}>Вы не заполнили все поля</span>}

      {(errors.wins?.type === 'min' || errors.games?.type === 'min')
        && <span className={'text-red-600'}>Числа не могут быть отрицательными</span>}

      <input className={'bg-green-300 p-2 mt-5 rounded-xl cursor-pointer'} type="submit"/>
    </form>
  )
};

export default PlayerInputs;
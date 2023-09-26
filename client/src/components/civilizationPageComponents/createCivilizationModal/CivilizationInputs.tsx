import {useForm, SubmitHandler} from "react-hook-form"
import React, {ChangeEvent, FC, useContext, useEffect, useRef, useState} from 'react';
import {
  ModalCivilizationProps
} from "@/components/civilizationPageComponents/createCivilizationModal/CivilizationModal";
import Image from "next/image";
import RandomLeaderIcon from "/public/random_leader_icon.webp"
import {ICivilizationInput} from "@/interfaces/civilization.Interface";
import {API_URL, PUBLIC_API_URL} from "@/http";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import CivilizationService from "@/services/Civilization.Service";
import {Context} from "@/context/context";

const CivilizationInputs: FC<ModalCivilizationProps> = ({
                                                          setShowModal,
                                                          civilization
                                                        }) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ICivilizationInput>()

  const {setError, setSuccessMessage} = useContext(Context)
  const {ref: iconRef, onChange} = {...register("icon", {required: false})}
  const leaderIconRef = useRef<HTMLInputElement | null>(null)
  const [currentIcon, setIcon] = useState('')
  const chooseIconFunc = () => {
    if (leaderIconRef.current) {
      leaderIconRef.current.click()
    }
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setIcon(URL.createObjectURL(event.target.files[0]));
    }
  }

  const client = useQueryClient()
  const {mutate: createCivilization} = useMutation(
    ['civilizations'],
    CivilizationService.createCivilization,
    {
      onSuccess: () => {
        client.invalidateQueries(['civilizations']).then(() => {
          setShowModal(false)
          setSuccessMessage('Цивилизация успешно добавлена!')
        })
      },
      onError: (error : any) => {
        if (error.response) {
          setError(error.response.data.message);
        }
      }
    })

  const {mutate: updateCivilization} = useMutation(
    ['civilizations'],
    CivilizationService.updateCivilization,
    {
      onSuccess: () => {
        client.invalidateQueries(['civilizations']).then(() => {
          setShowModal(false)
          setSuccessMessage('Данные успешно обновлены!')
        })
      },
      onError: (error : any) => {
        if (error.response) {
          setError(error.response.data.message);
        }
      }
    })

  useEffect(() => {
    if (civilization?.icon) {
      setIcon(`${PUBLIC_API_URL}/${civilization.icon}`)
    }
  }, [])


  const onSubmit: SubmitHandler<ICivilizationInput> = async (data) => {
    const initialData = new FormData()
    initialData.append('name', data.name)
    initialData.append('games', data.games.toString())
    initialData.append('wins', data.wins.toString())
    initialData.append('icon', data.icon[0])
    if (civilization) {
      initialData.append('id', civilization.id.toString())
      updateCivilization(initialData)
    } else {
      createCivilization(initialData)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
      <label className={'flex flex-col text-center'}>Название<input
        className={'border border-black w-32 p-2 rounded-sm'}
        defaultValue={civilization?.name ? civilization.name : ''} {...register("name")} />
      </label>
      <label className={'flex flex-col items-center'}>Иконка
        <input
          name={'icon'}
          id={'icon'}
          type={'file'}
          accept=".jpg,.jpeg,.png, .webp"

          className={'invisible w-0 h-0'}
          onChange={(e) => {
            onChange(e)
            onImageChange(e)
          }
          }
          ref={(e) => {
            iconRef(e)
            leaderIconRef.current = e
          }
          }
        /></label>
      {
        currentIcon
          ? (
            <div className={'relative w-56 h-56 mx-auto '}>
              <Image
                loader={({src}) => src}
                src={currentIcon}
                alt={'avatar'}
                className={'rounded-3xl hover:cursor-pointer'}
                onClick={chooseIconFunc}
                fill
                style={{objectFit: "cover"}}
              />
            </div>
          )
          : (
            <div className={'gap-x-10'}>
              <Image onClick={chooseIconFunc} className={'cursor-pointer'} src={RandomLeaderIcon} alt={'choose icon'}
                     width={128} height={128}/>
            </div>
          )
      }
      <label className={'flex flex-col text-center'}>Игр<input
        className={'border border-black w-32 p-2 rounded-sm'}
        defaultValue={civilization?.games ? civilization.games : 0} {...register("games", {required: true})} />
      </label>
      <label className={'flex flex-col text-center'}>Побед<input
        className={'border border-black w-32 p-2 rounded-sm'}
        defaultValue={civilization?.wins ? civilization.wins : 0} {...register("wins", {required: true})} />
      </label>
      {errors.name && <span>This field is required</span>}
      <input className={'bg-green-300 p-2 mt-5 rounded-xl cursor-pointer'} type="submit"/>
    </form>
  )
};

export default CivilizationInputs;
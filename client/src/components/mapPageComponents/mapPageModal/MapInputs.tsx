import {useForm, SubmitHandler} from "react-hook-form"
import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {
  ModalCivilizationProps
} from "@/components/civilizationPageComponents/createCivilizationModal/CivilizationModal";
import Image from "next/image";
import RandomLeaderIcon from "/public/random_leader_icon.webp"
import {API_URL, PUBLIC_API_URL} from "@/http";
import {ModalMapProps} from "@/components/mapPageComponents/mapPageModal/MapModal";
import {ICreateMapInput} from "@/interfaces/map.interface";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import MapService from "@/services/Map.Service";

const MapInputs: FC<ModalMapProps> = ({
                                        setShowModal,
                                        map
                                      }) => {


  const {
    watch,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ICreateMapInput>()

  const {ref: iconRef, onChange} = {...register("icon", {required: false})}
  const mapIconRef = useRef<HTMLInputElement | null>(null)
  const [currentIcon, setIcon] = useState('')

  useEffect(() => {
    if (map?.icon) {
      setIcon(`${PUBLIC_API_URL}/${map.icon}`)
    }
  }, [])

  const chooseIconFunc = () => {
    if (mapIconRef.current) {
      mapIconRef.current.click()
    }
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setIcon(URL.createObjectURL(event.target.files[0]));
    }
  }
  const client = useQueryClient()
  const {mutate: createMap} = useMutation(['maps'], MapService.createMap, {
    onSuccess: () => {
      client.invalidateQueries(['maps']).then(() => {
        setShowModal(false)
      })
    }
  })

  const {mutate: updateMap} = useMutation(['maps'], MapService.updateMap, {
    onSuccess: () => {
      client.invalidateQueries(['maps']).then(() => {
        setShowModal(false)
      })
    }
  })

  console.log(watch('icon'))


  const onSubmit: SubmitHandler<ICreateMapInput> = async (data) => {
    const initialData = new FormData()
    initialData.append('name', data.name)
    if (data.icon)
      initialData.append('icon', data.icon[0])
    if (map) {
      initialData.append('id', map.id.toString())
      updateMap(initialData)
    } else {
      createMap(initialData)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
      <label className={'flex flex-col text-center'}>Название<input
        className={'border border-black w-32 p-2 rounded-sm'}
        defaultValue={map?.name ? map.name : ''} {...register("name")} />
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
            mapIconRef.current = e
          }}
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
      <input className={'bg-green-300 p-2 mt-5 rounded-xl cursor-pointer'} type="submit"/>
    </form>
  )
};

export default MapInputs;
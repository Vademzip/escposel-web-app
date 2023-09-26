'use client'
import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IUserRegisterInput} from "@/interfaces/user.Interface";
import UserService from "@/services/User.Service";
import {Context} from "@/context/context";
import Image from "next/image";
import cameraIcon from "/public/camera.png"
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";


const Registration = () => {
  const {setUserAuth} = useContext(Context)
  const [image, setImage] = useState<string>('')
  const router = useRouter()
  const chooseAvatarFunc = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const {isUserAuth} = useContext(Context)

  useEffect(() => {
    if (isUserAuth)
      router.push('/')
  })

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setError,
  } = useForm<IUserRegisterInput>()

  const {ref: avatarRef, onChange} = {...register("img")}
  const fileInputRef = useRef<HTMLInputElement | null>(null)


  const onSubmit: SubmitHandler<IUserRegisterInput> = async (data) => {
    const requestData: FormData = new FormData()
    requestData.append('email', data.email)
    requestData.append('login', data.login)
    requestData.append('password', data.password)
    requestData.append('firstName', data.firstName)
    requestData.append('img', data.img[0])
    try {
      const response = await UserService.registration(requestData)
      localStorage.setItem('token', response.data.accessToken)
      setUserAuth(true)
      router.push('/')
    } catch (e: any) { //TODO: Правильно типизировать
      if (e.response.data?.type) {
        if (e.response.data.type === 'duplicate_email') {
          setError('email', {message: e.response.data.message})
        } else if (e.response.data.type === 'duplicate_login') {
          setError('login', {message: e.response.data.message})
        }
      }

    }
  }

  return (
    <div>
      <div className={'text-center text-4xl'}>Станьте частью нашей семьи!</div>
      <div className={'md:w-96 mx-auto md:border-2 p-8 rounded-2xl mt-12'}>
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-4'}>
          {image
            ? (
              <div className={'relative w-56 h-56 mx-auto '}>
                <Image
                  src={image}
                  alt={'avatar'}
                  className={'rounded-3xl hover:cursor-pointer'}
                  onClick={chooseAvatarFunc}
                  fill
                  style={{objectFit: "cover"}}
                />
              </div>
            )
            : (
              <div
                className={'relative'}
                onClick={chooseAvatarFunc}
              >
                <div
                  className={'w-48 h-48 rounded-full bg-black mx-auto'}
                ></div>
                <Image
                  className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition hover:opacity-100 hover:scale-110 hover:cursor-pointer'}
                  src={cameraIcon}
                  alt={'avatar icon'}
                />
              </div>
            )
          }
          <input
            ref={(e) => {
              avatarRef(e)
              fileInputRef.current = e
            }}
            defaultValue={''}
            className={'invisible w-0 h-0'}
            type="file"
            accept=".jpg,.jpeg,.png, .webp"
            onChange={(e) => {
              onChange(e)
              onImageChange(e)
            }}
            name={'img'}
          />
          <label className={'flex flex-col'}>Почта *<input
            className={'text-black p-2 rounded-md'} {...register('email', {
            required: {
              message: 'Введите вашу эл. почту',
              value: true
            }
          })}
            type="email"/></label>
          {errors.email && <span>{errors.email.message}</span>}
          <label className={'flex flex-col'}>Логин *<input
            className={'text-black p-2 rounded-md'} {...register('login', {
            required: {
              message: 'Введите ваш логин',
              value: true
            }
          })}
            type="text"/></label>
          {errors.login && <span>{errors.login.message}</span>}
          <label className={'flex flex-col'}>Имя<input
            className={'text-black p-2 rounded-md'}  {...register('firstName', {required: false})}
            type="text"/></label>
          <label className={'flex flex-col'}>Пароль *<input
            className={'text-black p-2 rounded-md'} {...register('password', {
            required: {
              message: 'Введите пароль',
              value: true
            },
            minLength: {
              message: 'Пароль не может быть короче восьми символов!',
              value: 8
            }
          })} type="password"/></label>
          {errors.password && <span>{errors.password.message}</span>}
          <label className={'flex flex-col'}>Повторите пароль *<input
            className={'text-black p-2 rounded-md'}  {...register('rePassword', {
            required: {
              message: 'Введите пароль повторно!',
              value: true
            },
            validate: (val: string) => {
              if (watch('password') != val) {
                return "Ваши пароли не совпадают";
              }
            }
          })}
            type="password"/></label>
          {<span>{errors.rePassword?.message}</span>}
          <button disabled={!!Object.keys(errors).length}
                  className={`bg-blue-700 p-4 rounded-md ${!!Object.keys(errors).length ? 'bg-gray-500' : ''}`}
                  type={'submit'}>Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
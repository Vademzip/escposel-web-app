'use client'
import React, {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IUserLoginRequest} from "@/interfaces/user.Interface";
import UserService from "@/services/User.Service";
import {Context} from "@/context/context";
import {useRouter} from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter()
  const {isUserAuth, setError} = useContext(Context)

  useEffect(() => {
    if (isUserAuth){
      setError('Вы уже авторизованы!')
      router.push('/')
    }
  })

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IUserLoginRequest>()

  const {setUserAuth, setUser, setSuccessMessage} = useContext(Context)

  const onSubmit: SubmitHandler<IUserLoginRequest> = async (data) => {
    try {
      const response = await UserService.login(data.email, data.password)
        .catch(function (error) {
          if (error.response) {
            setError(error.response.data.message);
            throw new Error()
          } else if (error.request) {
            console.log(error.request);
            throw new Error()
          } else {
            console.log('Error', error.message);
            throw new Error()
          }
        })
      setSuccessMessage('Успешная авторизация!')
      localStorage.setItem('token', response.data.accessToken)
      setUserAuth(true)
      setUser(response.data.user)
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <div className={'mt-4'}>
      <div className={'text-center text-4xl'}>Войдите в аккаунт</div>
      <div className={'md:w-96 mx-auto md:border-2 p-8 rounded-2xl mt-12'}>
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
          <label className={'flex flex-col items-center'}>Ваша почта<input {...register('email', {required: true})}
                                  className={'w-64 p-2 mx-auto rounded-md text-black'}
                                  type="email"/></label>
          <label className={'flex flex-col items-center'}>Пароль<input  {...register('password', {required: true})}
                               className={'w-64 p-2 mx-auto rounded-md text-black'}
                               type="password"/></label>
          <button className={'rounded-md bg-amber-600 w-64 p-2 mt-4'}>Войти</button>
        </form>
        <div className={'text-center flex flex-col'}>Нет аккаунта?
          <Link
            className={'text-orange-500'}
            href={'/registration'}
          >
            Зарегистрируйтесь!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
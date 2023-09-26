'use client'
import React, {FC, SetStateAction, useContext, useRef} from 'react';
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUserLoginRequest} from "@/interfaces/user.Interface";
import UserService from "@/services/User.Service";
import {Context} from "@/context/context";
import {useOnClickOutside} from "usehooks-ts";

interface IProps {
  setAuthorizationPanelOpened: React.Dispatch<SetStateAction<boolean>>
}

const AuthorizationPanel: FC<IProps> = ({setAuthorizationPanelOpened}) => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IUserLoginRequest>()

  const {setUserAuth, setUser, setError, setSuccessMessage} = useContext(Context)

  const onSubmit: SubmitHandler<IUserLoginRequest> = async (data) => {
    try {
      const response = await UserService.login(data.email, data.password)
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(error.response.data.message);
            throw new Error()
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
            throw new Error()
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            throw new Error()
          }
        })
      localStorage.setItem('token', response.data.accessToken)
      setUserAuth(true)
      setSuccessMessage('Успешная авторизация!')
      setUser(response.data.user)
    } catch (e) {
      console.log(e)
    } finally {
      setAuthorizationPanelOpened(false)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
        <label htmlFor="">Ваша почта<input {...register('email', {required: true})}
                                           className={'w-full px-2 rounded-md text-black'}
                                           type="email"/></label>
        <label htmlFor="">Пароль<input  {...register('password', {required: true})}
                                        className={'w-full px-2 rounded-md text-black'}
                                        type="password"/></label>
        <button className={'rounded-md bg-amber-600 w-36 border-2 mt-2'}>Войти</button>
      </form>
      <div className={'text-center'}>Нет аккаунта?
        <Link
          className={'text-orange-500'}
          href={'/registration'}
          onClick={() => {
            setAuthorizationPanelOpened(false)
          }}
        >
          Зарегистрируйтесь!
        </Link>
      </div>
    </>
  );
};

export default AuthorizationPanel;
'use client'
import React, {FC, useContext, useEffect} from 'react';
import {Context} from "@/context/context";
import {useRouter} from "next/navigation";
import {roleEnum} from "@/interfaces/user.Interface";

interface IProps {
  isLoading : boolean
}

const CheckAdminRights:FC<IProps> = ({isLoading}) => {
  const {user, setError} = useContext(Context)
  const router = useRouter()
  useEffect(() => {
      if (!user) {
        router.push('/')
        setError('Вы не авторизованы!')
      }else if (user.role !== roleEnum.ADMIN){
        router.push('/profile')
        setError('У Вас нет прав для посещения данной страницы!')
      }
  }, [user]);
  return (
    <></>
  );
};

export default CheckAdminRights;
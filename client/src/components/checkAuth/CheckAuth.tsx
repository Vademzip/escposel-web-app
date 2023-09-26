'use client'
import React, {useContext, useEffect} from 'react';
import UserService from '@/services/User.Service';
import {Context} from '@/context/context';
import {usePathname} from "next/navigation";

const CheckAuth = () => {
  const {setUserAuth, setUser, setIsLoading, isInitialized, setInitialized} = useContext(Context);
  const pathname = usePathname()
  useEffect(() => {
    if (!isInitialized) {
      setIsLoading(true)
      setInitialized(true)
    }
    if (localStorage.getItem('token')) {
      UserService.checkAuth()
        .then((res) => {
          setUserAuth(true);
          setUser(res.user);
        })
        .catch((error) => {
          console.log('Ошибка входа:', error); // TODO: как-то изменить это, Этот блок выполнится при ошибке запроса
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  return <></>;
};

export default CheckAuth;

'use client'
import React, {useContext, useRef, useState} from 'react';
import AuthorizationPanel from "@/components/authorizationPanel/AuthorizationPanel";
import {Context} from "@/context/context";
import Link from "next/link";
import {useOnClickOutside} from "usehooks-ts";
import {usePathname} from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

const PersonalCabinetButton = () => {
  const [isAuthorizationPanelOpened, setAuthorizationPanelOpened] = useState<boolean>(false)
  const {isUserAuth, isLoading} = useContext(Context)
  const authorizationPanelRef = useRef(null)
  const pathName = usePathname().split('/')

  const handleClickOutside = () => {
    setAuthorizationPanelOpened(false)
  }

  useOnClickOutside(authorizationPanelRef, handleClickOutside)
  const toggleAuthorizationPanel = () => {
    setAuthorizationPanelOpened(!isAuthorizationPanelOpened)
  }

  if (isLoading) return (
    <div className={'flex justify-center h-fit relative'}>Загрузка...</div>
  );

  if (isUserAuth) return (
    <div className={'relative'}>
      <Link href={'/profile'} className={`navigation-item hover:cursor-pointer ${pathName[1] === 'profile' ? 'text-[#6DA5C0]' : ''}`}>
        Личный кабинет
      </Link>
    </div>
  )

  return (
    <div className={'relative'}>
      <div onClick={toggleAuthorizationPanel} className={'navigation-item hover:cursor-pointer'}>
        Вход
      </div>
      {isAuthorizationPanelOpened && <div
          className={'absolute  border-2 bg-black/50 border-white p-3 rounded-md right-[calc(100%+0.75rem)] translate-x-1/4 top-10'}
          ref={authorizationPanelRef}
      >
          <AuthorizationPanel setAuthorizationPanelOpened={setAuthorizationPanelOpened}/>
      </div>}
    </div>
  );

};

export default PersonalCabinetButton;
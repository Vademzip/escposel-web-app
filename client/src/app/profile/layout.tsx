'use client'
import React, {useContext} from 'react';
import NavigationMenuButtons
  from "@/components/personalCabinetPageComponents/navigationMenuButtons/NavigationMenuButtons";
import {Context} from "@/context/context";
const ProfilePageLayout = ({children}: { children: React.ReactNode }) => {
  const {isLoading, user} = useContext(Context)

  return (
    <div className={'mx-auto lg:border-2 border-white p-4 rounded-md min-h-[464px]'}>
      <NavigationMenuButtons userRole = {user?.role}/>
      {isLoading && <div className={'text-center'}>Проверка авторизации..</div>}
      {!isLoading && children}
    </div>
  );
};

export default ProfilePageLayout;
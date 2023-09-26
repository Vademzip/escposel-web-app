'use client'
import React, {FC} from 'react';
import {usePathname} from "next/navigation";
import Link from "next/link";
import {roleEnum} from "@/interfaces/user.Interface";

interface IProps {
  userRole: roleEnum | undefined
}

const NavigationMenuButtons: FC<IProps> = ({userRole}) => {
  const pathname = usePathname()
  return (
    <div>
      <div className={'text-center text-3xl'}>{pathname === '/profile' ? 'Мой профиль' : 'Панель администратора'}</div>
      <div className={'flex justify-center lg:justify-start gap-x-2 mt-2'}>
        <Link href={'/profile'}>
          <button
            className={`border border-white px-2 rounded-3xl ${pathname === '/profile' ? 'bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]' : ''}`}>
            Мои данные
          </button>
        </Link>
        {userRole && userRole === roleEnum.ADMIN &&
            <Link href={'/profile/admin'}>
                <button
                    className={`border border-white px-2 rounded-3xl ${pathname.split('/')[2] === 'admin' ? 'bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]' : ''}`}>
                    Админ панель
                </button>
            </Link>
        }
      </div>
    </div>
  );
};

export default NavigationMenuButtons;
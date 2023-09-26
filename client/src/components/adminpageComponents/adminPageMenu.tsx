import React from 'react';
import Link from "next/link";

const AdminPageMenu = () => {
  return (
    <div className={'mt-10'}>
      <div className={'grid lg:grid-cols-2 justify-items-center justify-center gap-y-10'}>
        <Link href={'/profile/admin/players'}>
          <div
            className={'w-312p h-36 border border-white flex justify-center items-center text-2xl rounded-2xl hover:cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
            Редактор игроков
          </div>
        </Link>
        <Link href={'/profile/admin/teams'}>
          <div
            className={'w-312p h-36 border border-white flex justify-center items-center text-2xl rounded-2xl hover:cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
            Редактор команд
          </div>
        </Link>
        <Link href={'/profile/admin/games'}>
          <div
            className={'w-312p h-36 border border-white flex justify-center items-center text-2xl rounded-2xl hover:cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
            Редактор игр
          </div>
        </Link>
        <Link href={'/profile/admin/civilizations'}>
          <div
            className={'w-312p h-36 border border-white flex justify-center items-center text-2xl rounded-2xl hover:cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
            Редактор цивилизаций
          </div>
        </Link>
        <Link href={'/profile/admin/tournaments'}>
          <div
            className={'w-312p h-36 border border-white flex justify-center items-center text-2xl rounded-2xl hover:cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
            Редактор турниров
          </div>
        </Link>
        <Link href={'/profile/admin/maps'}>
          <div
            className={'w-312p h-36 border border-white flex justify-center items-center text-2xl rounded-2xl hover:cursor-pointer hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}>
            Редактор карт
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminPageMenu;
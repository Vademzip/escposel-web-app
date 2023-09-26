'use client'
import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import "./style.css"

const NavigationsButton = () => {

  const pathName = usePathname().split('/')
  return (
    <>
      <Link className={`navigation-item ${pathName[1] === '' ? 'text-[#6DA5C0]' : ''}`} href={'/'}>Главная</Link>
      <Link className={`navigation-item ${pathName[1] === 'squad' ? 'text-[#6DA5C0]' : ''}`} href={'/squad'}>Состав</Link>
      <Link className={`navigation-item ${pathName[1] === 'results' ? 'text-[#6DA5C0]' : ''}`} href={'/results'}>Результаты</Link>
      <Link className={`navigation-item ${pathName[1] === 'games' ? 'text-[#6DA5C0]' : ''}`} href={'/games'}>История игр</Link>
      <Link className={`navigation-item ${pathName[1] === 'statistics' ? 'text-[#6DA5C0]' : ''}`} href={'/statistics'}>Статистика</Link>
    </>
  );
};

export default NavigationsButton;
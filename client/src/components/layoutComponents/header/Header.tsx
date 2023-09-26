import React from 'react';
import Link from "next/link";
import PersonalCabinetButton from "@/components/layoutComponents/header/PersonalCabinetButton";
import NavigationsButton from "@/components/layoutComponents/header/NavigationsButton";
import HamburgerButton from "@/components/hamburgerMenu/HamburgerButton";
import {SideMenu} from "@/components/hamburgerMenu/SideBar";
const Header = () => {


  return (
    <header className={'mb-4 backdrop-blur-sm fixed top-0 w-full px-2 phone:px-0 z-20'}>
      <div className={'container  mx-auto text-white  flex items-center justify-between lg:justify-between'}>
        <Link href={'/'} className={'flex items-center text-3xl tracking-widest'}>
          <div className={'hidden smallPhone:block'}>Escape Posel</div>
          <img className={"h-14"} src="/logo.webp" alt=""/>
        </Link>
          <HamburgerButton/>
        <div className={'hidden xl:flex lg:gap-x-4 lg:text-xl'}>
          <NavigationsButton/>
          <PersonalCabinetButton/>
         {/*TODO: Сделать функцию logout*/}
        </div>
      </div>
      <SideMenu/>
    </header>
  );
};

export default Header;
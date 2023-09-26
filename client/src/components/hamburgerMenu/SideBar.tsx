'use client'
import React, {FC, useContext, useEffect} from 'react';
import styled from '@emotion/styled';
import {css} from "@emotion/css";
import Link from "next/link";
import styles from "@/components/dropdownMenu/DropDownMenu.module.scss";
import {NextRouter} from "next/router";
import {Context} from "@/context/context";
import {usePathname} from "next/navigation";

export interface INavBarProps {
  open?: boolean;
}

/*interface ISideBarProps{
  isRequestMenuOpen: boolean;
  setRequestMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  router: NextRouter
}*/

const links = [
  {href: '/', label: 'Главная'},
  {href: '/squad', label: 'Состав'},
  {href: '/results', label: 'Результаты'},
  {href: '/games', label: 'История игр'},
  {href: '/statistics', label: 'Статистика'},
];

const Menu = styled.nav<INavBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 15;
  display: block;
  height: 100vh;
  width: 400px;
  max-height: 100vh;
  max-width: 100%;
  margin-top: 56px;
  padding-right: 0;
  -webkit-box-align: stretch;
  align-items: stretch;
  transform: translateX(100vw);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;

  @media (min-width: 1280px) {
    display: none !important;
  }
`;

export const MenuLink = styled.div`
  text-align: center;
  max-width: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  //padding-left: 16%;
  background-position: 88% 50%;
  background-size: 36px;
  background-repeat: no-repeat;
  background-color: ${props => props.color};
  transition: background-position 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
  text-decoration: none;
  color: #fff;
  font-size: 28px;
  line-height: 120%;
  font-weight: 500;


  :hover {
    background-position: 90% 50%;
  }
`;

export const SideMenu: FC = () => {
  const pathname = usePathname()
  const {isNavbarMenuOpen, toggleMenuMode, isLoading, isUserAuth} = useContext(Context);
  const handleCloseMenu = () => {
    toggleMenuMode()
  }

  useEffect(() => {
    if (isNavbarMenuOpen) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isNavbarMenuOpen]);
  return <Menu className={isNavbarMenuOpen ? css`
    transform: translateX(0) !important;
    display: block;
    width: 100vw;
    @media (min-width: 1280px) {
      display: none !important;
    }` : ''}>
    <div className={'bg-gradient-to-br from-[#0C7075] via-[#294D61] to-[#05161A] min-h-full'}>
      {links.map(item => <Link key={item.label} onClick={handleCloseMenu}
                               className={'/' + pathname.split('/')[1] === item.href
                                 ? css`
                                         text-shadow: 0 0 4px #fff;
                                         text-decoration: underline !important;
                                 `
                                 : ''}
                               href={item.href}><MenuLink>{item.label}</MenuLink></Link>)}
      {isUserAuth
        ? <>
          <Link onClick={handleCloseMenu}
                className={'/' + pathname.split('/')[1] === '/profile'
                  ? css`
                                         text-shadow: 0 0 4px #fff;
                                         text-decoration: underline !important;
                                 `
                  : ''}
                href={'/profile'}><MenuLink>Личный кабинет</MenuLink></Link>
        </>
        : <>
          <Link onClick={handleCloseMenu}
                className={'/' + pathname.split('/')[1] === '/login'
                  ? css`
                                         text-shadow: 0 0 4px #fff;
                                         text-decoration: underline !important;
                                 `
                  : ''}
                href={'/login'}><MenuLink>Вход</MenuLink></Link>
          <Link onClick={handleCloseMenu}
                className={'/' + pathname.split('/')[1] === '/registration'
                  ? css`
                                         text-shadow: 0 0 4px #fff;
                                         text-decoration: underline !important;
                                 `
                  : ''}
                href={'/registration'}><MenuLink>Регистрация</MenuLink></Link>
        </>
      }
    </div>
  </Menu>;
};
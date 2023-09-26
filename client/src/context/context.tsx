'use client'
import React, {createContext, FC, PropsWithChildren, useState} from "react";
import {IUser} from "@/interfaces/user.Interface";

interface IContextProps {
  isInitialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  isUserAuth: boolean;
  setUserAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  successMessage: string;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  user: IUser | null,
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  isNavbarMenuOpen: boolean,
  toggleMenuMode: () => void; //Боковая менюшка
}

const initialState: IContextProps = {
  isInitialized: false,
  setInitialized(value: ((prevState: boolean) => boolean) | boolean): void {
  },
  setSuccessMessage(value: ((prevState: string) => string) | string): void {
  },
  successMessage: "",
  error: "",
  setError(value: ((prevState: string) => string) | string): void {
  },
  isLoading: false,
  isUserAuth: false,
  setIsLoading(value: ((prevState: boolean) => boolean) | boolean): void {
  },
  setUser(value: ((prevState: (IUser | null)) => (IUser | null)) | IUser | null): void {
  },
  setUserAuth(value: ((prevState: boolean) => boolean) | boolean): void {
  },
  user: null,
  isNavbarMenuOpen: false,
  toggleMenuMode: () => {
  }
}

export const Context = createContext<IContextProps>(initialState)

const AppContext: FC<PropsWithChildren> = ({children}) => {

  const [isUserAuth, setUserAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)
  const [isNavbarMenuOpen, setToggleNavbarMenu] = useState(false);
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isInitialized, setInitialized] = useState(false)
  function toggleMenuMode() {
    setToggleNavbarMenu(!isNavbarMenuOpen);
  }

  return (
    <Context.Provider value={{
      isUserAuth,
      setUserAuth,
      user,
      setUser,
      setIsLoading,
      isLoading,
      toggleMenuMode,
      isNavbarMenuOpen,
      error,
      setError,
      successMessage,
      setSuccessMessage,
      isInitialized,
      setInitialized
    }}>
      {children}
    </Context.Provider>
  )
}

export default AppContext
'use client'
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "@/context/context";
import $api, {PUBLIC_API_URL} from "@/http";
import Image from "next/image";
import UserService from "@/services/User.Service";
import {useRouter} from "next/navigation";

const Profile = () => {
  const {user, setUser, setUserAuth, isLoading, setSuccessMessage} = useContext(Context)
  const [userImageLoading, setUserImageLoading] = useState(false)
  const [userImage, setUserImage] = useState('')
  const [isLogoutLoading, setLogoutLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/')
      } else {
        try {
          setUserImageLoading(true)
          $api.get(`/api/user/get-user-image/${user.id}`)
            .then((response) => {
              setUserImage(response.data)
            }).finally(() => {
              setUserImageLoading(false)
            }
          )
        } catch (e) {
          console.warn(e)
        }
      }
    }
  }, [isLoading]);

  if (isLogoutLoading)
    return <div className={'text-center text-xl'}>Выполняется выход из аккаунта...</div>

  return (
    <div>
      {user && !userImageLoading &&
          <div className={'flex flex-col mt-4 items-center'}>
              <div>
                {userImage
                  ? <Image loader={({src}) => src} width={256} height={256} src={`${PUBLIC_API_URL}/${userImage}`}
                           alt={`user photo`}
                           objectFit={'cover'}
                  />
                  : <Image loader={({src}) => src}
                           src={'https://fanibani.ru/wp-content/uploads/2022/12/1647106050_2-kartinkin-net-p-kartinki-s-yenotami-2.jpg'}
                           alt={'no-photo-icon'}
                           height={256}
                           width={256}
                           objectFit={'cover'}
                  />
                }
              </div>
              <div className={'mt-2 p-4 rounded-md flex flex-col items-center justify-center'}>
                  <div>{user.email}</div>
              </div>
              <button onClick={() => {
                setLogoutLoading(true)
                UserService.logout()
                  .then(() => {
                    setUserAuth(false)
                    setUser(null)
                    setLogoutLoading(false)
                    setSuccessMessage('Успешный выход из аккаунта!')
                    localStorage.removeItem('token')
                    router.push('/')
                  })
              }
              } className={'mx-auto block mt-4 bg-blue-500 p-2 rounded-md'}>Выйти из аккаунта
              </button>
          </div>
      }
    </div>
  );
};

export default Profile;
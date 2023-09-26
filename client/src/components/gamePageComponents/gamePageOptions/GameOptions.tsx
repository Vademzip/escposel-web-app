'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const GameOptions = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()!

  const isOnlyOfficialGame = useSearchParams().get('onlyOfficialGame') === 'true'
  const [isButtonActive, setButtonActive] = useState(isOnlyOfficialGame)

  useEffect(() => {
    setButtonActive(isOnlyOfficialGame)
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isButtonActive)
      router.push(pathname + '?' + createQueryString('onlyOfficialGame', 'true'), { scroll: false })
    else
      router.push(pathname + '?' + createQueryString('onlyOfficialGame', 'false'), { scroll: false })
  }, [isButtonActive]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleClick = () => {
    setButtonActive(!isButtonActive)
  }

  return (
    <div className={'flex'}>
      <div
        className={`border p-2 rounded-2xl cursor-pointer ${isButtonActive ? 'bg-gradient-to-br from-[#6DA5C0] to-[#294D61]' : 'hover:bg-gradient-to-br from-[#0F969c] to-[#6DA5C0]'}`}
        onClick={handleClick}
      >
        Показывать только турнирные игры
      </div>
    </div>
  );
};

export default GameOptions;
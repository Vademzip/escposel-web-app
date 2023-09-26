'use client'
import React, {FC, useCallback} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface IProps {
  gamesCount: number;
  currentPage: string
}

const GamePagination: FC<IProps> = ({gamesCount, currentPage}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const createQueryString = useCallback(
    (name: string, value: string) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )
  const router = useRouter()
  const pages = []
  for (let i = 0; i < gamesCount; i++) {
    pages.push(
      <div key={`game_pagination_${i+1}`}
        className={`border flex justify-center items-center rounded text-center w-8 h-8 cursor-pointer hover:cursor-pointer ${i + 1 !== parseInt(currentPage) ? 'hover:bg-gradient-to-br' : ''} from-[#0F969c] to-[#6DA5C0] ${i + 1 === parseInt(currentPage) ? 'bg-[#0c7075]' : ''} `}
        onClick={() => router.push(pathname + '?' + createQueryString('page', (i+1).toString()))}
      >
        {i + 1}
      </div>
    )
  }

  return (
    <div className={'flex justify-center gap-x-1'}>
      {pages}
    </div>
  );
};

export default GamePagination;
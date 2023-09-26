import React from 'react';
import {Metadata} from "next";
import GameHistory from "@/components/resultsPageComponents/gameHistory/GameHistory";

export const metadata: Metadata = {
  title: 'Escape Posel | История игр',
  description: 'Список игр команды',
}

const Page = async ({
                      searchParams,
                    }: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const page = searchParams['page'] ?? '1'
  const isOnlyOfficialGame = searchParams['onlyOfficialGame'] === 'true' || false
  return (
    <div>
      <GameHistory page={page} isOnlyOfficialGame={isOnlyOfficialGame} withOptions/>
    </div>
  );
};

export default Page;
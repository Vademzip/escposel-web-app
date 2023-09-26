import React from 'react';
import {Metadata} from "next";
export const metadata: Metadata = {
  title: 'Escape Posel | Результаты',
  description: 'Турнирные таблицы',
}
const Results = async () => {

  return (
    <div className={'text-center text-xl'}>
      Выберите турнир в меню выше
    </div>
  );
};

export default Results;
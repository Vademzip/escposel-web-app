'use client'
import React, {FC, ReactNode, useState} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppContext from "@/context/context";

interface Props {
  children: ReactNode;
}

const Providers:FC<Props> = ({children}) => {

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions:{
      queries: {
        refetchOnWindowFocus : false
      }
    }
  }));

  return (
    <AppContext>
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools/>
    </QueryClientProvider>
    </AppContext>
  );
};

export default Providers;
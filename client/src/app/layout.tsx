import './globals.css'
import type {Metadata} from 'next'
import Header from "@/components/layoutComponents/header/Header";
import Footer from "@/components/layoutComponents/footer/Footer";
import Providers from "@/providers/Providers";
import React from "react";
import CheckAuth from "@/components/checkAuth/CheckAuth";
import ToastNotification from "@/components/toastNotificationComponent/ToastNotification";

export const metadata: Metadata = {
  title: 'Escape Posel',
  description: 'Главная страница',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html className={`bg-gradient-to-br from-[#0C7075] via-[#294D61] to-[#05161A] min-h-screen`} lang="en">
    <body>
    <Providers>
      <Header/>
      <CheckAuth/>
      <ToastNotification/>
      <main className={'px-2 phone:px-0 container mx-auto mb-20 mt-[56px]'}>
        {children}
      </main>
      <Footer/>
    </Providers>
    </body>
    </html>
  )
}

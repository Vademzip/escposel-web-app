'use client'
import React, {useContext, useEffect} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {Context} from "@/context/context";
import 'react-toastify/dist/ReactToastify.css';

const ErrorPanel = () => {
  const {error, setError} = useContext(Context)
  useEffect(() => {
    if (error.length > 0){
      toast.error(error)
      console.log('Ошибка')
      setError('')
    }
  }, [error])
  return (
    <>

    </>
  );
};

export default ErrorPanel;
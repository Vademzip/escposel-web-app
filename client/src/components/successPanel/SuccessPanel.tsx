'use client'
import React, {useContext, useEffect} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {Context} from "@/context/context";
import 'react-toastify/dist/ReactToastify.css';

const SuccessPanel = () => {
  const {successMessage, setSuccessMessage} = useContext(Context)
  useEffect(() => {
    if (successMessage.length > 0) {
      toast.success(successMessage)
      console.log('Ошибка')
      setSuccessMessage('')
    }
  }, [successMessage])

  return (
    <>
    </>
  );
};

export default SuccessPanel;
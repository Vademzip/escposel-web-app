import React from 'react';
import ErrorPanel from "@/components/errorPanel/ErrorPanel";
import SuccessPanel from "@/components/successPanel/SuccessPanel";
import {ToastContainer} from "react-toastify";

const ToastNotification = () => {
  return (
    <>
      <ErrorPanel/>
      <SuccessPanel/>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
      />
    </>
  );
};

export default ToastNotification;
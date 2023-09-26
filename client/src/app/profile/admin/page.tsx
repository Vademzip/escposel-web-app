'use client'
import React, {useContext} from 'react';
import CheckAdminRights from "@/components/adminpageComponents/CheckAdminRights";
import {Context} from "@/context/context";
import AdminPageMenu from "@/components/adminpageComponents/adminPageMenu";

const Admin = () => {
  const {isLoading} = useContext(Context)
  return (
    <>
      <CheckAdminRights isLoading = {isLoading}/>
      <AdminPageMenu/>
    </>
  );
};

export default Admin;
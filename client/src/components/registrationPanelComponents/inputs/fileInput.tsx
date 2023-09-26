'use client'
import React, {ChangeEvent, FC, FormEvent, useRef, useState} from 'react';
import Image from "next/image";

import {ChangeHandler, RefCallBack} from "react-hook-form";

interface IImageInputProps {
  image: string,
  setImage: React.Dispatch<React.SetStateAction<string>>,
  avatarRef: RefCallBack,
  onChange: ChangeHandler,
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>
}

const FileInput: FC<IImageInputProps> = ({image, setImage, fileInputRef, avatarRef, onChange}) => {
    const chooseAvatarFunc = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
      }
    }

    return (
      <>

      </>
    );
  }
;

export default FileInput;
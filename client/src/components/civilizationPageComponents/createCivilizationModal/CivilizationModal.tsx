import React, {FC, useRef} from 'react';
import {useOnClickOutside} from "usehooks-ts";
import CivilizationInputs from "@/components/civilizationPageComponents/createCivilizationModal/CivilizationInputs";
import {ICivilizationResponse} from "@/interfaces/civilization.Interface";

export interface ModalCivilizationProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCivilization: React.Dispatch<React.SetStateAction<ICivilizationResponse | null>>
  civilization?: ICivilizationResponse | null
}

const CivilizationModal: FC<ModalCivilizationProps> = ({
                                                         setShowModal,
                                                         setCurrentCivilization,
                                                         civilization,
                                                       }) => {

  const civilizationModalRef = useRef(null)
  const handleClickOutside = () => {
    setShowModal(false)
    setCurrentCivilization(null)
  }
  useOnClickOutside(civilizationModalRef, handleClickOutside)

  return (
    <div className={'fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center'}>
      <div ref={civilizationModalRef} className={'bg-white w-600p py-5 rounded-xl relative text-black'}>
        <div className={'absolute right-5 top-2 text-2xl cursor-pointer'} onClick={handleClickOutside}>x</div>
        <div className={'text-center text-2xl'}>{civilization ? 'Редактировать цивилизацию' : 'Создать цивилизацию'}</div>
        <CivilizationInputs civilization={civilization} setCurrentCivilization={setCurrentCivilization} setShowModal={setShowModal}/>
      </div>
    </div>
  );
};

export default CivilizationModal;
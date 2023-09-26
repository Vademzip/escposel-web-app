import React, {FC, useRef} from 'react';
import {useOnClickOutside} from "usehooks-ts";
import CivilizationInputs from "@/components/civilizationPageComponents/createCivilizationModal/CivilizationInputs";
import {ICivilizationResponse} from "@/interfaces/civilization.Interface";
import MapInputs from "@/components/mapPageComponents/mapPageModal/MapInputs";
import {IGetAllMaps} from "@/interfaces/map.interface";

export interface ModalMapProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentMap: React.Dispatch<React.SetStateAction<IGetAllMaps | null>>
  map?: IGetAllMaps | null
}

const MapModal: FC<ModalMapProps> = ({
                                       setShowModal,
                                       setCurrentMap,
                                       map,
                                     }) => {

  const civilizationModalRef = useRef(null)
  const handleClickOutside = () => {
    setShowModal(false)
    setCurrentMap(null)
  }
  useOnClickOutside(civilizationModalRef, handleClickOutside)

  return (
    <div className={'fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center'}>
      <div ref={civilizationModalRef} className={'bg-white w-600p py-5 rounded-xl relative text-black'}>
        <div className={'absolute right-5 top-2 text-2xl cursor-pointer'} onClick={handleClickOutside}>x</div>
        <div className={'text-center text-2xl'}>{map ? 'Редактировать карту' : 'Создать карту'}</div>
        <MapInputs setShowModal={setShowModal} setCurrentMap={setCurrentMap} map={map}/>
      </div>
    </div>
  );
};

export default MapModal;
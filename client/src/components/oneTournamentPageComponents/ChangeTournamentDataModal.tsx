import React, {FC, useRef} from 'react';
import {useOnClickOutside} from "usehooks-ts";
import CivilizationInputs from "@/components/civilizationPageComponents/createCivilizationModal/CivilizationInputs";
import {ICivilizationResponse} from "@/interfaces/civilization.Interface";
import TournamentsInputs from "@/components/tournamentsPageComponents/TournamentsInputs";
import AddTeamToTournamentInputs from "@/components/oneTournamentPageComponents/AddTeamToTournamentInputs";
import ChangeTournamentDataModal from "@/components/oneTournamentPageComponents/ChangeTournamentDataModal";
import ChangeTournamentDataInputs from "@/components/oneTournamentPageComponents/ChangeTournamentDataInputs";
import {IOneTournamentResponse, ITournamentResponse} from "@/interfaces/tournament.interface";

export interface ModalOneTournamentDetailProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  tournament: ITournamentResponse | null
}

const CivilizationModal: FC<ModalOneTournamentDetailProps> = ({
                                                          setShowModal,
                                                          tournament
                                                        }) => {

  const civilizationModalRef = useRef(null)
  const handleClickOutside = () => {
    setShowModal(false)
  }
  useOnClickOutside(civilizationModalRef, handleClickOutside)

  return (
    <div className={'fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center'}>
      <div ref={civilizationModalRef} className={'bg-white w-600p py-5 rounded-xl relative text-black'}>
        <div className={'absolute right-5 top-2 text-2xl cursor-pointer'} onClick={handleClickOutside}>x</div>
        <div className={'text-center text-2xl'}>Изменить данные турнира</div>
        <ChangeTournamentDataInputs setShowModal={setShowModal} tournament={tournament}/>
      </div>
    </div>
  );
};

export default CivilizationModal;
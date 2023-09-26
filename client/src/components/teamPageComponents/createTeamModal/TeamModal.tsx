import React, {FC, useRef} from 'react';
import {useOnClickOutside} from "usehooks-ts";
import TeamInputs from "@/components/teamPageComponents/createTeamModal/TeamInputs";
import {ITeamResponse} from "@/interfaces/teams.Interface";

export interface ModalTeamProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentTeam : React.Dispatch<React.SetStateAction<ITeamResponse | null>>
  team? : ITeamResponse | null
}

const TeamModal:FC<ModalTeamProps> = ({setShowModal, team, setCurrentTeam}) => {

  const playerModalRef = useRef(null)
  const handleClickOutside = () => {
    setShowModal(false)
    setCurrentTeam(null)
  }
  useOnClickOutside(playerModalRef, handleClickOutside)

  return (
    <div className={'absolute w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center'}>
      <div ref={playerModalRef} className={'bg-white w-600p py-5 rounded-xl relative text-black'}>
        <div className={'absolute right-5 top-2 text-2xl cursor-pointer'} onClick={handleClickOutside}>x</div>
        <div className={'text-center text-2xl'}>{team ? 'Редактировать команду' : 'Создать команду'}</div>
        <TeamInputs setShowModal={setShowModal} team={team} setCurrentTeam={setCurrentTeam}/>
      </div>
    </div>
  );
};

export default TeamModal;
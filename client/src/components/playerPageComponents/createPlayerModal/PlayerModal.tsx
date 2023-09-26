import React, {FC, useRef} from 'react';
import PlayerInputs from "@/components/playerPageComponents/createPlayerModal/PlayerInputs";
import {useOnClickOutside} from "usehooks-ts";
import {IPlayerResponse} from "@/interfaces/players.Interface";

export interface ModalPlayerProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentPlayer : React.Dispatch<React.SetStateAction<IPlayerResponse | null>>
  player? : IPlayerResponse | null
}

const PlayerModal:FC<ModalPlayerProps> = ({setShowModal, player, setCurrentPlayer}) => {

  const playerModalRef = useRef(null)
  const handleClickOutside = () => {
    setShowModal(false)
    setCurrentPlayer(null)
  }
  useOnClickOutside(playerModalRef, handleClickOutside)

  return (
    <div className={'absolute w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center'}>
      <div ref={playerModalRef} className={'bg-white w-600p py-5 rounded-xl relative text-black'}>
        <div className={'absolute right-5 top-2 text-2xl cursor-pointer'} onClick={handleClickOutside}>x</div>
        <div className={'text-center text-2xl'}>{player ? 'Редактировать игрока' : 'Создать игрока'}</div>
        <PlayerInputs setShowModal={setShowModal} player={player} setCurrentPlayer={setCurrentPlayer}/>
      </div>
    </div>
  );
};

export default PlayerModal;
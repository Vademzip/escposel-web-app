import React, {FC, useRef} from 'react';
import PlayerInputs from "@/components/playerPageComponents/createPlayerModal/PlayerInputs";
import {useOnClickOutside} from "usehooks-ts";
import GameInputs from "@/components/gamePageComponents/gameModal/GameInputs";
import {IMergedGameData} from "@/interfaces/game.Interface";

export interface ModalGameProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentGame : React.Dispatch<React.SetStateAction<IMergedGameData | null>>
  game? : IMergedGameData | null
}

const GameModal:FC<ModalGameProps> = ({setShowModal, setCurrentGame, game}) => {

  const gameModalRef = useRef(null)
  const handleClickOutside = () => {
    setShowModal(false)
    setCurrentGame(null)
  }

  useOnClickOutside(gameModalRef, handleClickOutside)

  return (
    <div className={'fixed w-full min-h-screen lg:h-screen bg-black/50 top-14 lg:top-0 left-0 flex justify-center items-center overflow-y-auto'}>
      <div ref={gameModalRef} className={'bg-white lg:w-600p py-5 rounded-xl relative text-black'}>
        <div className={'absolute right-5 top-2 text-2xl cursor-pointer'} onClick={handleClickOutside}>x</div>
        <div className={'text-center text-2xl'}>{game ? 'Редактировать игру' : 'Создать игру'}</div>
        <GameInputs setShowModal={setShowModal} setCurrentGame={setCurrentGame} game={game}/>
      </div>
    </div>
  );
};

export default GameModal;
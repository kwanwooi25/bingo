import React from 'react'
import Board from '../components/Board'
import { useSelector, useDispatch } from 'react-redux'
import { startGame, passTurn } from '../store/game'
import './Boards.scss'

function Boards() {
  const {
    isPlaying,
    players,
    currentTurn,
    resultMessage,
  } = useSelector(({ game }) => ({
    isPlaying: game.isPlaying,
    players: game.players,
    currentTurn: game.currentTurn,
    resultMessage: game.resultMessage,
  }))
  const dispatch = useDispatch()

  const onConfirmResult = () => dispatch(startGame())
  const onClickNumber = (number) => dispatch(passTurn(number))

  return (
    <div>
      {!!resultMessage && (
        <div className="result-modal-container">
          <div className="result-modal">
            <p>{resultMessage}</p>
            <button onClick={onConfirmResult}>
              확인
            </button>
          </div>
        </div>
      )}
      <div className="boards">
        {players.map((player, index) => (
          <Board
            key={index}
            isPlaying={isPlaying}
            player={player}
            isActive={index + 1 === currentTurn && isPlaying}
            onClickNumber={onClickNumber}
          />
        ))}
      </div>
    </div>
  )
}

export default Boards
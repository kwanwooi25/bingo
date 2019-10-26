import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGame } from '../store/game'
import './Header.scss'

function Header() {
  const {
    isPlaying,
    resultMessage,
  } = useSelector(({ game }) => ({
    isPlaying: game.isPlaying,
    resultMessage: game.resultMessage,
  }))
  const dispatch = useDispatch()

  const onClickStartGame = () => dispatch(startGame())

  return (
    <header className="header">
      <h1>빙고!</h1>
      {(isPlaying || !resultMessage) && (
        <button onClick={onClickStartGame}>
          {isPlaying ? '게임 재시작' : '게임 시작'}
        </button>
      )}
    </header>
  )
}

export default Header
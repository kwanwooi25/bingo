import React from 'react'
import Tile from './Tile'
import './Board.scss'

function Board({
  isPlaying,
  player,
  isActive,
  onClickNumber,
}) {
  const { name, totalComplete, completeLines = [], board } = player

  let boardTitleClass = 'board-title'
  let completeLinesTitleClass = 'complete-lines-title'
  let completeLinesClass = 'complete-lines'
  if (isActive) {
    boardTitleClass += ' active'
    completeLinesTitleClass += ' active'
    completeLinesClass += ' active'
  }

  return (
    <div className="board-container">
      <h2 className={boardTitleClass}>{name}</h2>

      <div className="board">
        {board.map((row, index) => (
          <div key={index} className="board__row">
            {row.map(({ value, checked, complete }) => (
              <Tile
                key={value}
                number={value}
                isActive={isActive}
                isChecked={checked}
                isComplete={complete}
                isPlaying={isPlaying}
                onClickNumber={onClickNumber}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={completeLinesTitleClass}>
        <h4>완성 줄 목록</h4>
        <span>{totalComplete}줄 완성</span>
      </div>

      <div className={completeLinesClass}>
        {completeLines.map((line, index) => (
          <div key={index} className="complete-lines__row">
            {line.map(value => (
              <span key={value} className="complete-lines__col">
                {value}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
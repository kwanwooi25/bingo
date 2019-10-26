import React from 'react'
import './Tile.scss'

function Tile({
  number,
  isActive,
  isChecked,
  isComplete,
  isPlaying,
  onClickNumber,
}) {
  const disabled = !isActive || isChecked

  let className = 'tile'
  if (isActive || !isPlaying) className += ' active'
  if (isChecked) className += ' checked'
  if (isComplete) className += ' complete'

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={() => onClickNumber(number)}
    >
      {number}
    </button>
  )
}

export default Tile
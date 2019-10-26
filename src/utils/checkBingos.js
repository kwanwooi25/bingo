import _ from 'lodash'

/**
 * [0, 0] [1, 0] [2, 0] [3, 0] [4, 0]
 * [0, 1] [1, 1] [2, 1] [3, 1] [4, 1]
 * [0, 2] [1, 2] [2, 2] [3, 2] [4, 2]
 * [0, 3] [1, 3] [2, 3] [3, 3] [4, 3]
 * [0, 4] [1, 4] [2, 4] [3, 4] [4, 4]
 *
 * 빙고가 되는 경우
 * 1. 같은 행의 모든 숫자가 선택되었을 경우 (가로)
 * 2. 같은 열의 모든 숫자가 선택되었을 경우 (세로)
 * 3-1. 좌측 대각선: '행 === 열' 인 경우
 * 3-2. 우측 대각선: '행 + 열 === 4' 인 경우
 */

export default (player, checkedNumbers) => {
  const { completeLines = [], board } = player

  let rows = []
  let cols = []
  let leftdiagonal = true
  let rightdiagonal = true
  let total = 0

  const INDEX = _.range(0, 5)
  INDEX.forEach(a => {
    const rowComplete = INDEX.every(b => {
      return checkedNumbers.includes(board[a][b].value)
    })
    const colComplete = INDEX.every(b => {
      return checkedNumbers.includes(board[b][a].value)
    })
    leftdiagonal = leftdiagonal && checkedNumbers.includes(board[a][a].value)
    rightdiagonal = rightdiagonal && checkedNumbers.includes(board[a][4-a].value)

    if (rowComplete) {
      rows.push(a)
      total++
      const line = INDEX.map(b => board[a][b].value)
      if (!isLineExists(line, completeLines)) completeLines.push(line)
    }
    if (colComplete) {
      cols.push(a)
      total++
      const line = INDEX.map(b => board[b][a].value)
      if (!isLineExists(line, completeLines)) completeLines.push(line)
    }
  })

  if (leftdiagonal) {
    total++
    const line = INDEX.map(a => board[a][a].value)
    if (!isLineExists(line, completeLines)) completeLines.push(line)
  }
  if (rightdiagonal) {
    total++
    const line = INDEX.map(a => board[a][4-a].value)
    if (!isLineExists(line, completeLines)) completeLines.push(line)
  }

  // 각 타일의 상태값 업데이트 후 반환
  const newBoard = board.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      const checked = checkedNumbers.includes(col.value)
      const isRowComplete = rows.includes(rowIndex)
      const isColComplete = cols.includes(colIndex)
      const isLeftDiagonalComplete = leftdiagonal && rowIndex === colIndex
      const isRightDiagonalComplete = rightdiagonal && rowIndex + colIndex === 4

      return {
        value: col.value,
        checked,
        complete: (
          isRowComplete ||
          isColComplete ||
          isLeftDiagonalComplete ||
          isRightDiagonalComplete
        )
      }
    })
  })

  return {
    ...player,
    totalComplete: total,
    completeLines,
    board: newBoard,
  }
}

/** Private Helper */
const isLineExists = (current, existing) => {
  return existing.some(line => line.every(value => current.includes(value)))
}
import _ from 'lodash'

export default (playersCount) => {
  let players = []

  for (let i = 0; i < playersCount; i++) {
    const numbers = _.range(1, 26).sort(() => 0.5 - Math.random())
    const board = _.chunk(numbers, 5).map(row => (
      row.map(value => ({
        value,
        checked: false,
        complete: false,
      }))
    ))
    players.push({
      name: `${i + 1}P`,
      totalComplete: 0,
      completeLines: [],
      board,
    })
  }

  return players
}
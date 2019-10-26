import generatePlayers from '../utils/generatePlayers'
import checkBingos from '../utils/checkBingos'

/** Action Types */
const START_GAME = 'game/START_GAME'
const PASS_TURN = 'game/PASS_TURN'

/** Actions */
export const startGame = () => ({ type: START_GAME })
export const passTurn = (checkedNumber) => ({
  type: PASS_TURN,
  checkedNumber,
})

/** State */
const initialState = {
  playersCount: 2,
  isPlaying: false,
  currentTurn: 1, // 최대값 = playersCount
  checkedNumbers: [],
  players: generatePlayers(2),
  resultMessage: '',
}

/** Reducer */
export default function game(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        isPlaying: true,
        currentTurn: 1,
        checkedNumbers: [],
        players: generatePlayers(state.playersCount),
        resultMessage: '',
      }

    case PASS_TURN:
      const checkedNumbers = [
        ...state.checkedNumbers,
        action.checkedNumber
      ]

      const players = state.players
        .map(player => checkBingos(player, checkedNumbers))

      const winners = players.filter(({ totalComplete }) => totalComplete >= 5)
      const resultMessage = winners.length >= 2
        ? '무승부 입니다.' : winners.length === 1
        ? `${winners[0].name}가 빙고를 완성했습니다.` : ''

      return {
        ...state,
        currentTurn: state.currentTurn === state.playersCount
          ? 1
          : state.currentTurn + 1,
        checkedNumbers,
        players,
        isPlaying: !resultMessage,
        resultMessage,
      }

    default:
      return state
  }
}
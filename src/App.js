import React, {
  Component,
  Fragment,
  useContext,
  useReducer,
  useEffect
} from 'react'
import KingTable from './components/table'
import Players from './components/players'
import './App.css'
import KH from './King_of_hearts.svg'
import AppContext from './context'
import appReducer from './reducer'

const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    console.log(e)
  }
}
const loadFromLocalStorage = async ({ dispatch }) => {
  try {
    const serializedState = await localStorage.getItem('state')
    if (serializedState === null) return undefined
    const persistedState = await JSON.parse(serializedState)
    await dispatch({ type: 'LOAD_FROM_LOCALSTORAGE', persistedState })
  } catch (e) {
    console.log(e)
    return undefined
  }
}
// const loadFromLocalStorage = async ({dispatch}) => {
//   try {
//     const serializedState = localStorage.getItem('state')
//     if (serializedState === null) return undefined
//     return JSON.parse(serializedState)
//     dispatch({ type: 'LOAD_FROM_LOCALSTORAGE', persistedState })

//   } catch (e) {
//     console.log(e)
//     return undefined
//   }
// }

function App() {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    // console.log('LOAD_FROM_LOCALSTORAGE')
    loadFromLocalStorage({ dispatch })
  }, [])

  useEffect(
    () => {
      // console.log('SAVE_TO_LOCALSTORAGE')
      saveToLocalStorage(state)
    },
    [state]
  )
  // console.log(state)
  return (
    <Fragment>
      <div className='flex justify-center mv5'>
        <Players />
        <div className='pl7'>
          <img src={KH} className='App-logo' alt='logo' />
        </div>
      </div>
      <div>{state.currentGame && <KingTable />}</div>
    </Fragment>
  )
}

const Root = () => {
  const initialState = useContext(AppContext)
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <App />
    </AppContext.Provider>
  )
}

export default Root

// const withUseEffect = () => {
//   useEffect(() => {
//     const state = loadFromLocalStorage()
//   })
// }

// state = {
//   activeGame: null,
//   turn: 1,
//   finished: true,
//   players: [],
//   totalPlayers: 0
// }

// saveToLocalStorage = state => {
//   try {
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem('state', serializedState)
//   } catch (e) {
//     console.log(e)
//   }
// }

// loadFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem('state')
//     if (serializedState === null) return undefined
//     return JSON.parse(serializedState)
//   } catch (e) {
//     console.log(e)
//     return undefined
//   }
// }

// componentDidMount() {
//   const persistedState = this.loadFromLocalStorage()
//   if (persistedState) {
//     this.setState(persistedState)
//   }
// }
// componentDidUpdate(prevProps, prevState) {
//   if (prevState !== this.state) {
//     this.saveToLocalStorage(this.state)
//   }
// }

// addNewPlayers = names => {
//   const playerNames = Object.values(names)
//   let no = 0
//   const players = playerNames
//     .map(name => {
//       no++
//       return {
//         no,
//         name,
//         games: [
//           { no: 1, game: 'Tricks+', played: false, result: [] },
//           { no: 2, game: 'Tricks++', played: false, result: [] },
//           { no: 3, game: 'Tricks-', played: false, result: [] },
//           { no: 4, game: 'Hearts', played: false, result: [] },
//           { no: 5, game: 'Queens', played: false, result: [] },
//           { no: 6, game: 'Jacks', played: false, result: [] },
//           { no: 7, game: 'King', played: false, result: [] },
//           { no: 8, game: 'Last 2', played: false, result: [] }
//         ],
//         score: 0
//       }
//     })
//     .filter(i => i.name !== '')
//   const totalPlayers = players.length
//   // console.log('players', players)
//   this.setState({ players, totalPlayers })
//   // window.location.reload()
// }

// selectNewGame = (activeGame, playerName) => {
//   const r = window.confirm(`Do you really want to play ${activeGame}?`)
//   if (r == true) {
//     const playerData = this.state.players.filter(
//       p => p.name === playerName
//     )[0]
//     // console.log(playerData)

//     const game = playerData.games.filter(g => g.game == activeGame)[0]
//     // console.log(game)

//     const updatedGame = { ...game, played: true }
//     // console.log(updatedGame)

//     const withoutGame = playerData.games.filter(g => g.game !== activeGame)
//     // console.log(withoutGame)

//     const updatedGames = [...withoutGame, updatedGame]
//     // console.log(updatedGames)
//     const sorted = updatedGames.sort((a, b) => a.no - b.no)

//     const newPlayerData = {
//       ...playerData,
//       games: sorted
//     }

//     const withoutPlayer = this.state.players.filter(
//       p => p.name !== playerName
//     )
//     // console.log(newPlayerData)

//     const players = [...withoutPlayer, newPlayerData].sort(
//       (a, b) => a.no - b.no
//     )
//     // console.log(players)
//     this.setState({ players, activeGame, finished: !this.state.finished })
//   }
// }

// changeTotalScore = data => {
// console.log(data)
// const game = data.game
// const filteredGame = (playerData, games) => {
//   const updatedPlayer = { ...playerData, games }
//   return updatedPlayer
// }
// const players = this.state.players.map(player => {
// if (player.name === data[0].name) {
//   const score = player.score + data[0].score
//   const idx = player.games.findIndex(
//     i => i.game === this.state.activeGame
//   )
//   const game = player.games[idx]
//   const pushScore = data[0].score
//   const result = [...game.result, pushScore]
//   const withoutGame = player.games.filter(
//     g => g.game !== this.state.activeGame
//   )
//   const updatedGames = [...withoutGame, { ...game, result }].sort(
//     (a, b) => a.no - b.no
//   )
//   return {
//     ...player,
//     games: updatedGames,
//     score
//   }
// }

// if (player.name === data[1].name) {
//   const score = player.score + data[1].score
//   const idx = player.games.findIndex(
//     i => i.game === this.state.activeGame
//   )
//   const game = player.games[idx]
//   const pushScore = data[1].score
//   const result = [...game.result, pushScore]
//   const withoutGame = player.games.filter(
//     g => g.game !== this.state.activeGame
//   )
//   const updatedGames = [...withoutGame, { ...game, result }].sort(
//     (a, b) => a.no - b.no
//   )
//   return {
//     ...player,
//     games: updatedGames,
//     score
//   }
// }

// if (player.name === data[2].name) {
//   const score = player.score + data[2].score
//   const idx = player.games.findIndex(
//     i => i.game === this.state.activeGame
//   )
//   const game = player.games[idx]
//   const pushScore = data[2].score
//   const result = [...game.result, pushScore]
//   const withoutGame = player.games.filter(
//     g => g.game !== this.state.activeGame
//   )
//   const updatedGames = [...withoutGame, { ...game, result }].sort(
//     (a, b) => a.no - b.no
//   )
//   return {
//     ...player,
//     games: updatedGames,
//     score
//   }
// }

// if (player.name === data[3].name) {
//   const score = player.score + data[3].score
//   const idx = player.games.findIndex(
//     i => i.game === this.state.activeGame
//   )
//   const game = player.games[idx]
//   const pushScore = data[3].score
//   const result = [...game.result, pushScore]
//   const withoutGame = player.games.filter(
//     g => g.game !== this.state.activeGame
//   )
//   const updatedGames = [...withoutGame, { ...game, result }].sort(
//     (a, b) => a.no - b.no
//   )
//   return {
//     ...player,
//     games: updatedGames,
//     score
//   }
// }

// if (player.name === data[3].name) {
//   const score = player.score + data[3].score
//   return { ...player, score }
// }
// })
// console.log(players)
//   const totalPlayers = this.state.players.length
//   let currentTurn = this.state.turn
//   const turn =
//     currentTurn >= 1 && currentTurn < totalPlayers ? ++currentTurn : 1
//   // console.log(turn)
//   this.setState({
//     players,
//     activeGame: null,
//     finished: !this.state.finished,
//     turn
//   })
// }

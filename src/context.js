import React from 'react'

const AppContext = React.createContext({
  currentGame: null,
  turn: 1,
  finished: true,
  players: [],
  totalPlayers: 0,
  currentGameResults: [],
  games: [
    {
      no: 1,
      title: 'Tricks+',
      each: 12,
      totalPoints: 120,
      count: 10,
      currentPoints: 0
    },
    {
      no: 2,
      title: 'Tricks++',
      each: 12,
      totalPoints: 120,
      count: 10,
      currentPoints: 0
    },
    {
      no: 3,
      title: 'Tricks-',
      each: -4,
      totalPoints: -40,
      count: 10,
      currentPoints: 0
    },
    {
      no: 4,
      title: 'Hearts',
      each: -5,
      totalPoints: -40,
      count: 8,
      currentPoints: 0
    },
    {
      no: 5,
      title: 'Queens',
      each: -10,
      totalPoints: -40,
      count: 4,
      currentPoints: 0
    },
    {
      no: 6,
      title: 'Jacks',
      each: -10,
      totalPoints: -40,
      count: 4,
      currentPoints: 0
    },
    {
      no: 7,
      title: 'King',
      each: -40,
      totalPoints: -40,
      count: 1,
      currentPoints: 0
    },
    {
      no: 8,
      title: 'Last 2',
      each: -20,
      totalPoints: -40,
      count: 2,
      currentPoints: 0
    }
  ]
})

export default AppContext

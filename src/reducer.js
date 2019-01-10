export default function appReducer(state, action) {
  switch (action.type) {
    case "ADD_PLAYERS":
      // const playerNames = Object.values(action.players)
      let no = 0;
      const players = action.playerNames.map(name => {
        no++;
        return {
          no,
          name,
          totalScore: 0,
          games: [
            {
              no: 1,
              title: "Tricks+",
              played: false,
              result: [],
              points: 0
            },
            {
              no: 2,
              title: "Tricks++",
              played: false,
              result: [],
              points: 0
            },
            {
              no: 3,
              title: "Tricks-",
              played: false,
              result: [],
              points: 0
            },
            {
              no: 4,
              title: "Hearts",
              played: false,
              result: [],
              points: 0
            },
            {
              no: 5,
              title: "Queens",
              played: false,
              result: [],
              points: 0
            },
            {
              no: 6,
              title: "Jacks",
              played: false,
              result: [],
              points: 0
            },
            {
              no: 7,
              title: "King",
              played: false,
              result: [],
              points: 0
            },
            {
              no: 8,
              title: "Last 2",
              played: false,
              result: [],
              points: 0
            }
          ]
        };
      });

      const totalPlayers = players.length;

      // window.location.reload()
      return {
        ...state,
        players,
        totalPlayers
      };
    case "SELECT_GAME":
      const r = window.confirm(
        `Do you really want to play ${action.selectedGame.title}?`
      );
      if (r == true) {
        const updatedGame = { ...action.selectedGame, played: true };
        const restGames = action.player.games.filter(
          g => g.title !== action.selectedGame.title
        );
        const updatedGames = [...restGames, updatedGame].sort(
          (a, b) => a.no - b.no
        );
        const updatedPlayer = {
          ...action.player,
          games: updatedGames
        };
        const restPlayers = state.players.filter(
          p => p.no !== action.player.no
        );
        const players = [...restPlayers, updatedPlayer].sort(
          (a, b) => a.no - b.no
        );

        const currentGame = state.games.find(
          game => game.title == action.selectedGame.title
        );
        return {
          ...state,
          players,
          currentGame,
          finished: false
        };
      }
      return state;

    case "GAME_SUBMIT":
      const newTurn = state.turn < state.totalPlayers ? state.turn + 1 : 1;
      console.log(action.gamePoints);
      const updatedPlayers = action.gamePoints.map((point, i) => {
        let player = state.players[i];
        let games = player.games;
        let game = {
          ...games[state.currentGame.no - 1],
          result: [...games[state.currentGame.no - 1].result, point]
        };
        player.games = player.games.filter(g => g.no !== game.no);
        player.games = [...player.games, game].sort((a, b) => a.no - b.no);

        return {
          ...player,
          totalScore: player.totalScore + point,
          games: [...player.games]
        };
      });

      // console.log(updatedPlayers)

      return {
        ...state,
        players: updatedPlayers,
        currentGame: null,
        turn: newTurn,
        finished: true
      };

    case "LOAD_FROM_LOCALSTORAGE":
      // console.log('LOAD_FROM_LOCALSTORAGE', action.persistedState)
      return action.persistedState;
    default:
      return state;
  }
}

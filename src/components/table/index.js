import React, { Component, Fragment, useContext, useState } from "react";
import {
  Icon,
  Header,
  Segment,
  Table,
  Dropdown,
  Button
} from "semantic-ui-react";
import AppContext from "../../context";

export default function KingTable() {
  const { state, dispatch } = useContext(AppContext);
  const initialState = Array(state.totalPlayers).fill(0);
  // console.log(initialState)
  const [gamePoints, setPoints] = useState(initialState);
  const [namePoints, setNamePoints] = useState(initialState);

  const handleResult = (player, result) => {
    // const playerName = player.name.split("")[0];
    // console.log(playerName);

    let res = [...gamePoints];
    res[player.no - 1] = result;
    setPoints(res);
  };

  const gameCurrentPoint = gamePoints.reduce((a, b) => a + b, 0);

  const options = Array(state.currentGame.count + 1)
    .fill()
    .map((n, i) => {
      return {
        value: i,
        text: i
      };
    });
  return (
    <>
      <Header as="h1" textAlign="center" content={state.currentGame.title} />
      <Segment raised="very">
        <Table textAlign="center" basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Each</Table.HeaderCell>
              {state.players.map(player => (
                <Table.HeaderCell key={player.no}>
                  {player.name}
                </Table.HeaderCell>
              ))}
              <Table.HeaderCell>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{state.currentGame.each}</Table.Cell>
              {state.players.map(player => (
                <Table.Cell key={player.no} textAlign="center">
                  <p>{gamePoints[player.no - 1]}</p>
                  <Dropdown
                    compact
                    selection
                    defaultValue={0}
                    options={options}
                    onChange={(event, data) => {
                      handleResult(player, data.value * state.currentGame.each);
                    }}
                  />
                </Table.Cell>
              ))}
              <Table.Cell>
                {gameCurrentPoint}/{state.currentGame.totalPoints}
                <div>
                  <Button
                    onClick={() => {
                      dispatch({
                        type: "GAME_SUBMIT",
                        gamePoints
                      });
                      setPoints(initialState);
                    }}
                    color="red"
                    disabled={
                      gameCurrentPoint !== state.currentGame.totalPoints
                    }
                  >
                    Finish
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
}

// const TableRow = ({ game }) => {
//   const { state, dispatch } = useContext(AppContext)
//   const [gameScore, setGameScore] = useState(0)

//   const isValid = state.activeGame
//     ? state.activeGame.title === game.title
//     : false
//   return (
//     <Table.Row warning={isValid} disabled={!isValid}>
//       <Table.HeaderCell>{game.title}</Table.HeaderCell>
//       <Table.Cell>{game.each}</Table.Cell>
//       {state.players.map(player => (
//         <TableCell player={player} game={game} />
//       ))}
//       <Table.Cell>
//         <h4>/{game.totalPoints}</h4>
//         <div>
// <Button
//   // onClick={() => onGameComplete(activeGame)}
//   color='teal'
//   // disabled={!(activeGame == no && currentTotal === total)}
// >
//   Finish
// </Button>
//         </div>
//       </Table.Cell>
//     </Table.Row>
//   )
// }

// function TableCell({ player }) {
//   const { state, dispatch } = useContext(AppContext)
// const options = Array(state.activeGame.count + 1)
//   .fill()
//   .map((n, i) => {
//     return {
//       value: i,
//       text: i
//     }
//   })
//   return (
// <Table.Cell textAlign='center'>
//   <p>{gameScore}</p>
//   <Dropdown
//     compact
//     selection
//     defaultValue={0}
//     options={options}
//     onChange={(event, data) => {
//       const calcGameScore = data.value * game.each
//       setGameScore(calcGameScore)
//       dispatch({
//         type: 'CHANGE_GAME_PLAYER_VALUE',
//         player,
//         gameScore
//       })
//     }}
//   />
// </Table.Cell>
//   )
// }

// // state = {
// //   player1: { name: 'player1', value: 0 },
// //   player2: { name: 'player2', value: 0 },
// //   player3: { name: 'player3', value: 0 },
// //   player4: { name: 'player4', value: 0 },
// //   currentTotal: 0
// // }

// // changePlayerValue = (player, each, value) => {
// //   // console.log(player, each, value)
// //   const newValue = each * value
// //   const update = { [player]: { name: player, value: newValue } }
// //   // const newState = {...this.state, ...update}
// //   this.setState({ ...this.state, ...update }, () => this.changeTotal())
// // }

// // changeTotal = () => {
// //   const currentTotal =
// //     this.state.player1.value +
// //     this.state.player2.value +
// //     this.state.player3.value +
// //     this.state.player4.value
// //   this.setState({ currentTotal })
// // }

// // gameComplete = activeGame => {
// //   const data = [
// //     {
// //       activeGame,
// //       name: this.props.state.players[0].name,
// //       score: this.state.player1.value
// //     },
// //     {
// //       activeGame,
// //       name: this.props.state.players[1].name,
// //       score: this.state.player2.value
// //     },
// //     {
// //       activeGame,
// //       name: this.props.state.players[2].name,
// //       score: this.state.player3.value
// //     },
// //     this.props.state.players[3] && {
// //       activeGame,
// //       name: this.props.state.players[3].name,
// //       score: this.state.player4.value
// //     }
// //   ]

// // const filterData = data.filter(i => i !== null)

// // this.props.onChangeTotalScore(data)
// // const state = {
// //   player1: { name: 'player1', value: 0 },
// //   player2: { name: 'player2', value: 0 },
// //   player3: { name: 'player3', value: 0 },
// //   player4: { name: 'player4', value: 0 },
// //   currentTotal: 0
// // }
// // this.setState(state)
// // }

// // {
// /* <TableRow
//           totalPlayers={state.totalPlayers}
//           onGameComplete={this.gameComplete}
//           currentTotal={this.state.currentTotal}
//           onChangeTotal={this.changeTotal}
//           players={this.state}
//           onChangePlayerValue={this.changePlayerValue}
//           options={optionsTricks}
//           activeGame={state.activeGame}
//           no={'Tricks++'}
//           each={12}
//           total={120}
//         />
//         <TableRow
//           totalPlayers={state.totalPlayers}
//           onGameComplete={this.gameComplete}
//           currentTotal={this.state.currentTotal}
//           onChangeTotal={this.changeTotal}
//           players={this.state}
//           onChangePlayerValue={this.changePlayerValue}
//           options={optionsTricks}
//           activeGame={state.activeGame}
//           no={'Tricks-'}
//           each={-4}
//           total={-40}
//         />
//         <TableRow
//           totalPlayers={state.totalPlayers}
//           onGameComplete={this.gameComplete}
//           currentTotal={this.state.currentTotal}
//           onChangeTotal={this.changeTotal}
//           players={this.state}
//           onChangePlayerValue={this.changePlayerValue}
//           options={optionsKJ}
//           activeGame={state.activeGame}
//           no={'Hearts'}
//           each={-5}
//           total={-40}
//         />
//         <TableRow
//           totalPlayers={state.totalPlayers}
//           onGameComplete={this.gameComplete}
//           currentTotal={this.state.currentTotal}
//           onChangeTotal={this.changeTotal}
//           players={this.state}
//           onChangePlayerValue={this.changePlayerValue}
//           options={optionsQueens}
//           activeGame={state.activeGame}
//           no={'Queens'}
//           each={-10}
//           total={-40}
//         />
//         <TableRow
//           totalPlayers={state.totalPlayers}
//           onGameComplete={this.gameComplete}
//           currentTotal={this.state.currentTotal}
//           onChangeTotal={this.changeTotal}
//           players={this.state}
//           onChangePlayerValue={this.changePlayerValue}
//           options={optionsQueens}
//           activeGame={state.activeGame}
//           no={'Jacks'}
//           each={-10}
//           total={-40}
//         />
//         <TableRow
//           totalPlayers={state.totalPlayers}
//           onGameComplete={this.gameComplete}
//           currentTotal={this.state.currentTotal}
//           onChangeTotal={this.changeTotal}
//           players={this.state}
//           onChangePlayerValue={this.changePlayerValue}
//           options={optionsKing}
//           activeGame={state.activeGame}
//           no={'King'}
//           each={-40}
//           total={-40}
//         />
//         <TableRow
//           totalPlayers={state.totalPlayers}
//           onGameComplete={this.gameComplete}
//           currentTotal={this.state.currentTotal}
//           onChangeTotal={this.changeTotal}
//           players={this.state}
//           onChangePlayerValue={this.changePlayerValue}
//           options={optionsTwo}
//           activeGame={state.activeGame}
//           no={'Last 2'}
//           each={-20}
//           total={-40}
//         /> */
// // }

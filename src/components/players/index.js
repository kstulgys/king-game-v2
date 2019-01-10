import React, { Fragment, useContext } from "react";
import {
  Header,
  Table,
  Segment,
  Divider,
  Button,
  Image,
  List,
  Search,
  Icon,
  Grid,
  Label
} from "semantic-ui-react";
import AppContext from "../../context";

// const GameLabel = ({ game, player }) => {
//   const { state, dispatch } = useContext(AppContext);
//   // const disabled = player.no !== state.turn
//   // const divider = game.result[0] ? 5 : 0
//   return (
//     <Button
//       size="large"
//       circular
//       color={`${game.played ? "gray" : "red"}`}
// onClick={
//   state.finished && state.turn === player.no
//     ? () => dispatch({ type: "SELECT_GAME", selectedGame: game, player })
//     : null
// }
//     >
//       <div>
// {game.result &&
//   game.result.map((r, i) => (
//     <strong>
//       {r}
//       {(i === 0 || i === 1 || i === 2) && "|"}
//     </strong>
//   ))}
//       </div>

//       {game.title}
//     </Button>
//   );
// };

// const PlayerRow = ({ player }) => {
//   const { state } = useContext(AppContext);

//   return (
//     <Table.Row warning={state.turn === player.no}>
//       <Table.Cell textAlign="center">
//         <Header as="h4" image>
//           <div>
//             <Header.Content>{player && player.name}</Header.Content>
//           </div>
//           <Image
//             src={`https://api.adorable.io/avatars/285/${player &&
//               player.name}.io.png`}
//             rounded
//             size="massive"
//           />
//         </Header>
//       </Table.Cell>
//       <Table.Cell>
//         {player &&
//           player.games &&
//           player.games.map(game => (
//             <GameLabel key={game.no} game={game} player={player} />
//           ))}
//       </Table.Cell>

//       <Table.Cell textAlign="center">
//         <Header content={player && player.totalScore} />
//       </Table.Cell>
//     </Table.Row>
//   );
// };

// const PlayersTable = () => {
//   const { state } = useContext(AppContext);

//   return (
//     <>
// <Button
//   fluid
//   content="Reset Game"
//   onClick={() => {
//     const r = window.confirm(
//       `Do you really want to reset this game? All data will be lost`
//     );
//     if (r == true) {
//       localStorage.clear();
//       window.location.reload();
//     }
//   }}
// />
//       <Segment loading={false} style={{ padding: 0 }} raised="very" color="red">
//         <Header as="h3" block attached className="flex justify-between">
//           <span> Players </span>
//           <span> Games</span>
//           <span> Score</span>
//         </Header>

//         <Table padded="very" basic>
//           <Table.Body>
// {state.players &&
//   state.players.map(player => {
//                 return <PlayerRow key={player && player.no} player={player} />;
//               })}
//           </Table.Body>
//         </Table>
//       </Segment>
//     </>
//   );
// };

// export default PlayersTable;

function GameButton({ game, player }) {
  const { state, dispatch } = useContext(AppContext);

  const disabled = player.no !== state.turn;
  return (
    <Button
      disabled={disabled}
      circular
      inverted={game.played ? false : true}
      color="red"
      style={{ marginTop: 5 }}
      onClick={
        state.finished && state.turn === player.no
          ? () => dispatch({ type: "SELECT_GAME", selectedGame: game, player })
          : null
      }
    >
      {game && game.result && (game.result[0] === 0 || game.result[0]) && (
        <div className="pb1">
          {game.result.map((r, i) => (
            <span key={i}>
              {r}
              {(i === 0 || i === 1 || i === 2) && "|"}
            </span>
          ))}
        </div>
      )}
      {game.title}
    </Button>
  );
}

function PlayerRow({ player }) {
  // const { state, dispatch } = useContext(AppContext);
  return (
    <>
      <Grid.Row>
        <Grid.Column
          width={3}
          className="items-center justify-center"
          style={{ display: "flex" }}
          textAlign="center"
        >
          <div className="flex items-center justify-center">
            <Image
              size="tiny"
              avatar
              src={`https://api.adorable.io/avatars/100/${player.name}.io.png`}
            />
            <p className="pl2">
              <strong>{player.name} </strong>
            </p>
          </div>
        </Grid.Column>
        <Grid.Column width={11} textAlign="center">
          {player.games.map(game => (
            <GameButton key={game.no} game={game} player={player} />
          ))}
        </Grid.Column>
        <Grid.Column
          width={2}
          style={{ display: "flex" }}
          textAlign="center"
          className="items-center justify-center"
        >
          <span>
            <strong> {player.totalScore} </strong>
          </span>
        </Grid.Column>
      </Grid.Row>
      <br />
      <br />
    </>
  );
}

function ListExampleFloated() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <>
      <Button
        fluid
        content="Reset Game"
        onClick={() => {
          const r = window.confirm(
            `Do you really want to reset this game? All data will be lost`
          );
          if (r == true) {
            localStorage.clear();
            window.location.reload();
          }
        }}
      />
      <Segment raised="very" padded>
        <Grid columns={3}>
          {state.players &&
            state.players.map(player => (
              <PlayerRow key={player.no} player={player} />
            ))}
        </Grid>
      </Segment>
    </>
  );
}
export default ListExampleFloated;

// {Array(4)
//   .fill(null)
//   .map((item, i) => (
//     <PlayerRow name={`name-${i}`} />
//   ))}

// const ListExampleVeryRelaxedHorizontal = () => (
//   <>
//     <Segment>
//       <List
//         size="huge"
//         divided
//         horizontal
//         relaxed="very"
//         style={{ display: "flex", justifyContent: "center" }}
//       >
//         <List.Item>
//           <Image
//             avatar
//             src={`https://api.adorable.io/avatars/100/hello.io.png`}
//           />
//           <List.Content>
//             <List.Header style={{ color: "red" }}>Daniel</List.Header>
//           </List.Content>
// 					<Grid columns={3} textAlign='center'>
//             <Grid.Row>
//               <Grid.Column>
//                 <Button content="hello" />
//               </Grid.Column>
//               <Grid.Column>
//                 <Button content="hello" />
//               </Grid.Column>
//               <Grid.Column>
//                 <Button content="hello" />
//               </Grid.Column>
//               <Grid.Column>
//                 <Button content="hello" />
//               </Grid.Column>
//               <Grid.Column>
//                 <Button content="hello" />
//               </Grid.Column>
//               <Grid.Column>
//                 <Button content="hello" />
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </List.Item>
//         <List.Item>
//           <Image
//             avatar
//             src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
//           />
//           <List.Content>
//             <List.Header>Feliciano</List.Header>
//           </List.Content>
//         </List.Item>
//         <List.Item>
//           <Image
//             avatar
//             src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
//           />
//           <List.Content>
//             <List.Header>Elliot</List.Header>
//           </List.Content>
//         </List.Item>
//         <List.Item>
//           <Image
//             avatar
//             src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
//           />
//           <List.Content>
//             <List.Header>Feliciano</List.Header>
//           </List.Content>
//         </List.Item>
//       </List>
//     </Segment>
//     <Segment placeholder>
//       <Grid columns={4}>
//         <Grid.Row>
//           <Grid.Column>
//             <Button content="hello" />
//           </Grid.Column>

//           <Grid.Column>
//             <Button content="hello" />
//           </Grid.Column>
//           <Grid.Column>
//             <Button content="hello" />
//           </Grid.Column>
//           <Grid.Column>
//             <Button content="hello" />
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Segment>
//     <Segment>
//       {Array(8)
//         .fill(null)
//         .map(item => (
//           <Button content="hello" />
//         ))}
//     </Segment>
//   </>
// );

// export default ListExampleVeryRelaxedHorizontal;

// const ListExampleFloated = () => (
//   <Segment raised="very">
//     <List verticalAlign="middle">
//       <List.Item>
//         <List.Content floated="right" style={{ paddingRight: 30 }}>
//           66
//         </List.Content>
//         <Image
//           verticalAlign="middle"
//           floated="left"
//           avatar
//           src="https://react.semantic-ui.com/images/avatar/small/lena.png"
//         />
//         <List.Content floated="left">Lena2</List.Content>
//         <List.Content floated="left">Lena</List.Content>
//       </List.Item>
//       <List.Item>
//         <List.Content floated="right">
//           <Button>Add</Button>
//         </List.Content>
// <Image
//   avatar
//   src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
// />
//         <List.Content>Lindsay</List.Content>
//       </List.Item>
//       <List.Item>
//         <List.Content floated="right">
//           <Button>Add</Button>
//         </List.Content>
//         <Image
//           avatar
//           src="https://react.semantic-ui.com/images/avatar/small/mark.png"
//         />
//         <List.Content>Mark</List.Content>
//       </List.Item>
//       <List.Item>
//         <List.Content floated="right">
//           <Button>Add</Button>
//         </List.Content>
//         <Image
//           avatar
//           src="https://react.semantic-ui.com/images/avatar/small/molly.png"
//         />
//         <List.Content>Molly</List.Content>
//       </List.Item>
//     </List>
//   </Segment>
// );

// export default ListExampleFloated;

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
  Grid
} from "semantic-ui-react";
import AppContext from "../../context";

const GameLabel = ({ game, player }) => {
  const { state, dispatch } = useContext(AppContext);
  // const disabled = player.no !== state.turn
  // const divider = game.result[0] ? 5 : 0
  return (
    <Button
      size="large"
      circular
      color={`${game.played ? "gray" : "red"}`}
      onClick={
        state.finished && state.turn === player.no
          ? () => dispatch({ type: "SELECT_GAME", selectedGame: game, player })
          : null
      }
    >
      <div>
        {game.result &&
          game.result.map((r, i) => (
            <strong>
              {r}
              {(i === 0 || i === 1 || i === 2) && "|"}
            </strong>
          ))}
      </div>

      {game.title}
    </Button>
  );
};

const PlayerRow = ({ player }) => {
  const { state } = useContext(AppContext);

  return (
    <Table.Row warning={state.turn === player.no}>
      <Table.Cell textAlign="center">
        <Header as="h4" image>
          <div>
            <Header.Content>{player && player.name}</Header.Content>
          </div>
          <Image
            src={`https://api.adorable.io/avatars/285/${player &&
              player.name}.io.png`}
            rounded
            size="massive"
          />
        </Header>
      </Table.Cell>
      <Table.Cell>
        {player &&
          player.games &&
          player.games.map(game => (
            <GameLabel key={game.no} game={game} player={player} />
          ))}
      </Table.Cell>

      <Table.Cell textAlign="center">
        <Header content={player && player.totalScore} />
      </Table.Cell>
    </Table.Row>
  );
};

const PlayersTable = () => {
  const { state } = useContext(AppContext);

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
      <Segment loading={false} style={{ padding: 0 }} raised="very" color="red">
        <Header as="h3" block attached className="flex justify-between">
          <span> Players </span>
          <span> Games</span>
          <span> Score</span>
        </Header>

        <Table padded="very" basic>
          <Table.Body>
            {state.players &&
              state.players.map(player => {
                return <PlayerRow key={player && player.no} player={player} />;
              })}
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
};

export default PlayersTable;

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

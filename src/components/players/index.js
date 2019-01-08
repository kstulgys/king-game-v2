import React, { Fragment, useContext } from 'react'
import { Header, Image, Table, Label, Divider, Button } from 'semantic-ui-react'
import PlayersModal from '../players-modal'
import AppContext from '../../context'

const GameLabel = ({ game, player }) => {
  const { state, dispatch } = useContext(AppContext)

  // const activeGame = state.games.find(g => g.title == game.title)

  return (
    <Label
      onClick={
        state.finished && state.turn === player.no
          ? () => dispatch({ type: 'SELECT_GAME', selectedGame: game, player })
          : null
      }
      circular
      color={`${game.played ? 'grey' : 'red'}`}
      as='a'
      size='big'
    >
      <div>
        {game.result &&
          game.result.map((r, i) => (
            <span>
              {r}
              {(i === 0 || i === 1) && '|'}
            </span>
          ))}
      </div>
      <span>{game.title}</span>
    </Label>
  )
}

const PlayerRow = ({ player }) => {
  const { state } = useContext(AppContext)

  return (
    <Table.Row>
      <Table.Cell>
        {state.turn == player.no && <Label color='teal' ribbon />}
        <Header as='h4' image>
          <Image
            src={`https://api.adorable.io/avatars/285/${player.name}.io.png`}
            rounded
            size='massive'
          />
          <Header.Content>{player.name}</Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>
        {player.games.map(game => (
          <GameLabel key={game.no} game={game} player={player} />
        ))}
      </Table.Cell>

      <Table.Cell textAlign='center'>
        <span>{player.score}</span>
      </Table.Cell>
    </Table.Row>
  )
}

const PlayersTable = () => {
  const { state } = useContext(AppContext)

  return (
    <div className='flex flex-column'>
      <Button
        content='Reset Game'
        onClick={() => {
          const r = window.confirm(
            `Do you really want to reset this game? All data will be lost`
          )
          if (r == true) {
            localStorage.clear()
            window.location.reload()
          }
        }}
      />
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Players</Table.HeaderCell>
            <Table.HeaderCell>Games</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <PlayersModal />
          {state.players.map(player => {
            return <PlayerRow key={player.no} player={player} />
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default PlayersTable

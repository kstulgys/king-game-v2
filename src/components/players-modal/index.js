import React, { Component, useState, useContext } from 'react'
import AppContext from '../../context'
import { Button, Modal, Form } from 'semantic-ui-react'

function FormContent() {
  const { dispatch } = useContext(AppContext)

  const [players, setName] = useState({
    player1: '',
    player2: '',
    player3: '',
    player4: ''
  })

  const handleName = data => {
    setName({
      ...players,
      [data.name]: data.value
    })
  }

  const playerNames = Object.values(players).filter(p => p !== '')
  // console.log(playerNames)
  const isNotValid =
    Object.values(playerNames).filter(n => n !== '').length < 3 ? true : false
  return (
    <Form className='pa5' size='large'>
      <Form.Group unstackable widths={2}>
        <Form.Input
          label='Player-1'
          name='player1'
          placeholder='name'
          onChange={(event, data) => handleName(data)}
        />
        <Form.Input
          label='Player-2'
          name='player2'
          placeholder='name'
          onChange={(event, data) => handleName(data)}
        />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input
          label='Player-3'
          name='player3'
          placeholder='name'
          onChange={(event, data) => handleName(data)}
        />
        <Form.Input
          label='Player-4'
          name='player4'
          placeholder='name'
          onChange={(event, data) => handleName(data)}
        />
      </Form.Group>
      <Button
        disabled={isNotValid}
        type='submit'
        color='teal'
        // onClick={() => onAddNewPlayers(playerNames)}
        onClick={() => dispatch({ type: 'ADD_PLAYERS', playerNames })}
      >
        Submit
      </Button>
    </Form>
  )
}

export default function PlayersModal() {
  const { state } = useContext(AppContext)
  // console.log(state)
  return (
    <Modal
      trigger={
        !state.players[0] && <Button color='teal' content='Add Players' />
      }
      content={<FormContent />}
      // actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
    />
  )
}

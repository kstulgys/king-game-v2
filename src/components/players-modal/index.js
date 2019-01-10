import React, { Component, useState, useContext } from 'react'
import AppContext from '../../context'
import { Button, Grid, Form, Transition, Segment } from 'semantic-ui-react'

function FormContent({ toggle }) {
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
	const isNotValid = Object.values(playerNames).filter(n => n !== '').length < 3 ? true : false
	return (
		<Form>
			<Form.Input
				size="big"
				label="Player-1"
				name="player1"
				placeholder="name"
				onChange={(event, data) => handleName(data)}
			/>
			<Form.Input
				size="big"
				label="Player-2"
				name="player2"
				placeholder="name"
				onChange={(event, data) => handleName(data)}
			/>
			<Form.Input
				size="big"
				label="Player-3"
				name="player3"
				placeholder="name"
				onChange={(event, data) => handleName(data)}
			/>
			<Form.Input
				size="big"
				label="Player-4"
				name="player4"
				placeholder="name"
				onChange={(event, data) => handleName(data)}
			/>
			<div className="flex justify-center pt4">
				<Button
					fluid
					disabled={isNotValid}
					type="submit"
					color="red"
					size="big"
					onClick={() => {
						dispatch({ type: 'ADD_PLAYERS', playerNames })
						toggle()
					}}
				>
					Submit
				</Button>
			</div>
		</Form>
	)
}

export default function PlayersModal() {
	const { state } = useContext(AppContext)
	const [visible, toggleVisibility] = useState(false)
	// const [open, setOpen] = useState(false);

	const toggle = () => {
		toggleVisibility(prev => !prev)
		// setOpen(prev => !prev);
	}

	return (
		<div className="flex justify-center items-center h-100">
			{!visible && (
				<Button size="massive" color="red" onClick={toggle}>
					Add Players
				</Button>
			)}
			<Transition unmountOnHide visible={visible} animation="scale" duration={500}>
				<Segment raised="very" padded="very">
					<FormContent toggle={toggle} />
				</Segment>
			</Transition>
		</div>
	)
}

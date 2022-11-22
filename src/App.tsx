import React, { useState } from 'react';
import { IResult } from './interfaces';
import { Card } from './components/Card';
import { Table } from './components/Table';
import { randomPoint } from './utils';

import { usePokemon } from './hooks';
import './App.scss';

const App: React.FC = () => {
	const player = usePokemon();
	const opponent = usePokemon();

	const [isOpenModal, setIsOpenModal] = useState(false);
	const [result, setResult] = useState<IResult[] | []>([]);

	const handleAttack = () => {
		if (player.helth <= 0 || opponent.helth <= 0) {
			return setIsOpenModal(true);
		}

		if (opponent.attackPoint === 6 && player.attackPoint !== 6) {
			const opponentAttack = randomPoint();
			player.demage(opponentAttack);
			opponent.setAttackPoint(opponentAttack);
			return;
		}

		if (player.attackPoint === 6 && opponent.attackPoint !== 6) {
			const playerAttack = randomPoint();
			opponent.demage(playerAttack);
			player.setAttackPoint(playerAttack);

			return;
		}
		const playerAttack = randomPoint();
		const opponentAttack = randomPoint();
		opponent.demage(playerAttack);
		player.setAttackPoint(playerAttack);
		player.demage(opponentAttack);
		opponent.setAttackPoint(opponentAttack);
	};

	const handleChooseAnother = async () => {
		setResult([]);
		setIsOpenModal(false);
		opponent.newPokemon();
		player.newPokemon();
	};

	const handleContinue = async () => {
		setResult((prev) => [
			...prev,
			{
				player: player.info.name,
				result: opponent.helth < player.helth ? 'You Win' : 'You lose',
				opponent: opponent.info.name,
			},
		]);
		setIsOpenModal(false);
		opponent.newPokemon();
		player.setAttackPoint(0);
		player.setHelth(100);
	};

	return (
		<div className='App'>
			<header>
				<h1>Pokemon Battle Simulator</h1>
			</header>
			<main>
				<Card img={player.info.img || ''} name={player.info.name || ''} user={'Player'} hits={player.helth || 100} />
				<div className='info-container'>
					<div className='container__hits'>
						<div className='hits-point'>{player.attackPoint}</div>
						<div className='hits-point'>{opponent.attackPoint}</div>
					</div>
					<p className='hits-text'>{`You hit for: ${player.attackPoint}`} </p>
					<p className='hits-text'>{`You opponent for:  ${opponent.attackPoint}`}</p>
					<button onClick={handleAttack}>Attack!</button>
				</div>
				<Card img={opponent.info.img || ''} name={opponent.info.name || ''} user={'Opponent'} hits={opponent.helth || 100} />
			</main>
			<Table data={result} />
			<div className={isOpenModal ? 'modal-container' : 'd-none'}>
				<h3 className='modal-title'> {opponent.helth < player.helth ? 'You Win' : 'Game Over'}</h3>
				<div className='modal-body'>
					<button onClick={handleChooseAnother}>Choose another Pokemon</button>
					<button onClick={handleContinue}>Continue with same Pokemon</button>
				</div>
			</div>
		</div>
	);
};

export default App;

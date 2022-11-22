import React, { useState, useEffect } from 'react';
import { IPokemon, IResult } from './interfaces';
import { Card } from './components/Card';
import { Table } from './components/Table';
import { getPokemon } from './api';
import './App.scss';

const randomPoint = () => {
	let number = Math.floor(Math.random() * 10);
	return number > 6 ? 6 : number;
};
const randomPokemonId = () => Math.floor(Math.random() * 100);

const App: React.FC = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [result, setResult] = useState<IResult[] | []>([]);
	const [hits, setHits] = useState<{ player: number; opponent: number }>({ player: 100, opponent: 100 });
	const [attacPoint, setAttacPoint] = useState<{ player: number; opponent: number }>({ player: 0, opponent: 0 });
	const [pokemons, setPokemons] = useState<{ player: IPokemon | null; opponent: IPokemon | {} | null }>({ player: null, opponent: {} });

	useEffect(() => {
		Promise.all([getPokemon(randomPokemonId()), getPokemon(randomPokemonId())]).then((data) => setPokemons({ player: data[0], opponent: data[1] }));
	}, []);

	const handleAttack = () => {
		if (hits.opponent <= 0 || hits.player <= 0) return setIsOpenModal(true);

		if (attacPoint.opponent === 6 && attacPoint.player !== 6) {
			const opponent = randomPoint();
			setHits((prev) => ({ ...prev, player: prev.player - opponent }));
			setAttacPoint({ player: 0, opponent });
			return;
		}
		if (attacPoint.player === 6 && attacPoint.opponent !== 6) {
			const player = randomPoint();
			setHits((prev) => ({ ...prev, opponent: prev.opponent - player }));
			setAttacPoint({ player, opponent: 0 });
			return;
		}
		const player = randomPoint();
		const opponent = randomPoint();

		setHits((prev) => ({ player: prev.player - opponent, opponent: prev.opponent - player }));
		setAttacPoint({ player, opponent });
	};

	const handleChooseAnother = async () => {
		setResult([]);
		setIsOpenModal(false);
		setHits({ player: 100, opponent: 100 });
		await Promise.all([getPokemon(randomPokemonId()), getPokemon(randomPokemonId())]).then((data) => setPokemons({ player: data[0], opponent: data[1] }));
	};

	const handleContinue = async () => {
		setResult((prev) => [
			...prev,
			{
				player: (pokemons.player as IPokemon)?.species?.name,
				result: hits.opponent < hits.player ? 'You Win' : 'You lose',
				opponent: (pokemons.opponent as IPokemon)?.species?.name,
			},
		]);
		setIsOpenModal(false);
		setPokemons((prev) => ({ ...prev, opponent: null }));
		setHits({ player: 100, opponent: 100 });
		await Promise.resolve(getPokemon(randomPokemonId())).then((res) => setPokemons((prev) => ({ ...prev, opponent: res })));
	};

	return (
		<div className='App'>
			<header>
				<h1>Pokemon Battle Simulator</h1>
			</header>
			<main>
				<Card
					img={(pokemons.player as IPokemon)?.sprites?.front_default || ''}
					name={(pokemons.player as IPokemon)?.species?.name || ''}
					user={'Player'}
					hits={hits.player || 100}
				/>
				<div className='info-container'>
					<div className='container__hits'>
						<div className='hits-point'>{attacPoint.player}</div>
						<div className='hits-point'>{attacPoint.opponent}</div>
					</div>
					<p className='hits-text'>{`You hit for: ${attacPoint.player}`} </p>
					<p className='hits-text'>{`You opponent for:  ${attacPoint.opponent}`}</p>
					<button onClick={handleAttack}>Attack!</button>
				</div>
				<Card
					img={(pokemons.opponent as IPokemon)?.sprites?.front_default || ''}
					name={(pokemons.opponent as IPokemon)?.species?.name || ''}
					user={'Opponent'}
					hits={hits.opponent || 100}
				/>
			</main>
			<Table data={result} />
			<div className={isOpenModal ? 'modal-container' : 'd-none'}>
				<h3 className='modal-title'> {hits.opponent < hits.player ? 'You Win' : 'Game Over'}</h3>
				<div className='modal-body'>
					<button onClick={handleChooseAnother}>Choose another Pokemon</button>
					<button onClick={handleContinue}>Continue with same Pokemon</button>
				</div>
			</div>
		</div>
	);
};

export default App;

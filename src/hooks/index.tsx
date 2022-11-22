import React, { useState, useEffect } from 'react';
import { getPokemon } from '../api';

export const usePokemon = () => {
	const [helth, setHelth] = useState(100);
	const [attackPoint, setAttackPoint] = useState(0);
	const [info, setInfo] = useState({ name: '', img: '' });

	useEffect(() => {
		getPokemon().then((res) => {
			setHelth(100);
			setInfo({ name: res.species.name, img: res.sprites.front_default });
		});
	}, []);

	const demage = (demage: number) => {
		setHelth((prev) => prev - demage);
	};

	const newPokemon = async () => {
		await getPokemon().then((res) => {
			setHelth(100);
			setInfo({ name: res.species.name, img: res.sprites.front_default });
		});
	};

	return { setAttackPoint, demage, helth, attackPoint, info, newPokemon, setHelth };
};

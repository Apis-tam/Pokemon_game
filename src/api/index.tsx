import { randomPokemonId } from '../utils';

export const getPokemon = async () => {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId()}`).then((res) => res.json());
	return res;
};

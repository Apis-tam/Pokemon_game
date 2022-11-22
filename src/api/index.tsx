const headers = new Headers({
	'Content-Type': 'application/json',
});

export const getPokemon = async (id: number) => {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { method: 'GET', headers }).then((res) => res.json());
	return res;
};

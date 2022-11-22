export const randomPoint = () => {
	let number = Math.floor(Math.random() * 10);
	return number > 6 ? 6 : number;
};
export const randomPokemonId = () => Math.floor(Math.random() * 100);

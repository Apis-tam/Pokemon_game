export interface IPokemon {
	sprites: {
		front_default: string;
	};
	species: {
		name: string;
		url: string;
	};
}
export interface IResult {
	player: string;
	result: string;
	opponent: string;
}

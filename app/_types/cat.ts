export type CatRarity = "common" | "rare" | "epic" | "legendary" | "special";

export type Cat = {
	id: string;
	name: string;
	breed: string;
	personality: string;
	discoveredAt: string;
	discoveredDate: string;
	rarity: CatRarity;
	description: string;
	favoriteFood: string;
	hobby: string;
	isDiscovered: boolean;
};

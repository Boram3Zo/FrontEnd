// export type cat = {
// 	id: string,
//     name: string,
//     breed: string,
//     personality: string,
//     discoveredAt: string,
//     discoveredDate: string,
//     rarity: string,
//     description: string,
//     favoriteFood: string,
//     hobby: string,
//     isDiscovered: boolean
// }

export type Cat = {
	id: string;
	name: string;
	breed: string;
	personality: string;
	discoveredAt: string;
	discoveredDate: string;
	rarity: "common" | "rare" | "epic" | "legendary" | "special"; // Added special grade
	description: string;
	favoriteFood: string;
	hobby: string;
	isDiscovered: boolean;
};

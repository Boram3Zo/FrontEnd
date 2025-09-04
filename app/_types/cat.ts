export type CatRarity = "common" | "rare" | "epic" | "legendary" | "special";

export interface Cat {
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
}

export type SortType = "discovery" | "grade";
export type SortOrder = "asc" | "desc";

export interface CatCharacterProps {
	isOpen?: boolean;
	onClose?: () => void;
	className?: string;
	animation?: "bounce" | "wiggle" | "none";
	size?: "sm" | "md" | "lg";
}

import type { Cat, CatRarity } from "@/app/_types/cat";
import { MOCK_CATS } from "@/app/_mocks/cats";

export { MOCK_CATS };

/**
 * Get a cat by its ID
 */
export function getCatById(id: string): Cat | undefined {
	return MOCK_CATS.find(cat => cat.id === id);
}

/**
 * Get cats by rarity level
 */
export function getCatsByRarity(rarity: CatRarity): Cat[] {
	return MOCK_CATS.filter(cat => cat.rarity === rarity);
}

/**
 * Get only discovered cats
 */
export function getDiscoveredCats(): Cat[] {
	return MOCK_CATS.filter(cat => cat.isDiscovered);
}

/**
 * Get undiscovered cats
 */
export function getUndiscoveredCats(): Cat[] {
	return MOCK_CATS.filter(cat => !cat.isDiscovered);
}

/**
 * Get cats by location (discovered at)
 */
export function getCatsByLocation(location: string): Cat[] {
	return MOCK_CATS.filter(cat => cat.discoveredAt.toLowerCase().includes(location.toLowerCase()));
}

/**
 * Get random undiscovered cat for discovery event
 */
export function getRandomUndiscoveredCat(): Cat | null {
	const undiscovered = getUndiscoveredCats();
	if (undiscovered.length === 0) return null;

	const randomIndex = Math.floor(Math.random() * undiscovered.length);
	return undiscovered[randomIndex];
}

/**
 * Rarity weights for discovery probability
 */
const RARITY_WEIGHTS = {
	common: 50,
	rare: 30,
	epic: 15,
	legendary: 4,
	special: 1,
} as const;

/**
 * Get a weighted random cat based on rarity
 */
export function getWeightedRandomCat(): Cat | null {
	const undiscovered = getUndiscoveredCats();
	if (undiscovered.length === 0) return null;

	// Calculate total weight
	const totalWeight = undiscovered.reduce((sum, cat) => {
		return sum + RARITY_WEIGHTS[cat.rarity];
	}, 0);

	// Get random number
	let random = Math.random() * totalWeight;

	// Find cat based on weight
	for (const cat of undiscovered) {
		random -= RARITY_WEIGHTS[cat.rarity];
		if (random <= 0) {
			return cat;
		}
	}

	return undiscovered[0]; // fallback
}

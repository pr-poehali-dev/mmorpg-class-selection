export type CharacterClass = 'warrior' | 'mage' | 'archer';

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  stats: {
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    strength: number;
    intelligence: number;
    agility: number;
    defense: number;
  };
  skills: Skill[];
  inventory: InventoryItem[];
  equipment: Equipment;
  gold: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  icon: string;
  unlocked: boolean;
  requiredLevel: number;
  cost: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'material';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stats?: Partial<Character['stats']>;
  icon: string;
  quantity: number;
  price: number;
}

export interface Equipment {
  weapon?: InventoryItem;
  helmet?: InventoryItem;
  chest?: InventoryItem;
  legs?: InventoryItem;
  boots?: InventoryItem;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: {
    experience: number;
    gold: number;
    items?: InventoryItem[];
  };
  completed: boolean;
  progress: number;
  maxProgress: number;
}

import { useState } from 'react';
import ClassSelection from '@/components/ClassSelection';
import GameInterface from '@/components/GameInterface';
import { Character, CharacterClass } from '@/types/game';
import { classData, initialSkills } from '@/data/gameData';

const Index = () => {
  const [character, setCharacter] = useState<Character | null>(null);

  const createCharacter = (selectedClass: CharacterClass) => {
    const classInfo = classData[selectedClass];
    
    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: `${classInfo.name} #${Math.floor(Math.random() * 1000)}`,
      class: selectedClass,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      stats: {
        health: classInfo.baseStats.health,
        maxHealth: classInfo.baseStats.health,
        mana: classInfo.baseStats.mana,
        maxMana: classInfo.baseStats.mana,
        strength: classInfo.baseStats.strength,
        intelligence: classInfo.baseStats.intelligence,
        agility: classInfo.baseStats.agility,
        defense: classInfo.baseStats.defense,
      },
      skills: initialSkills[selectedClass],
      inventory: [],
      equipment: {},
      gold: 500,
    };

    setCharacter(newCharacter);
  };

  return (
    <div className="min-h-screen bg-background">
      {!character ? (
        <ClassSelection onSelectClass={createCharacter} />
      ) : (
        <GameInterface character={character} onUpdateCharacter={setCharacter} />
      )}
    </div>
  );
};

export default Index;
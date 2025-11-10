import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import CharacterPanel from './CharacterPanel';
import SkillsPanel from './SkillsPanel';
import InventoryPanel from './InventoryPanel';
import WorldMapPanel from './WorldMapPanel';
import ShopPanel from './ShopPanel';
import { Character } from '@/types/game';

interface GameInterfaceProps {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
}

export default function GameInterface({ character, onUpdateCharacter }: GameInterfaceProps) {
  const [activeTab, setActiveTab] = useState('character');

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {character.name}
            </h1>
            <p className="text-muted-foreground">
              Уровень {character.level} • {character.class === 'warrior' ? 'Воин' : character.class === 'mage' ? 'Маг' : 'Лучник'}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={24} className="text-gold" />
              <span className="text-xl font-semibold text-gold">{character.gold}</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Icon name="Heart" size={16} className="text-red-500" />
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${(character.stats.health / character.stats.maxHealth) * 100}%` }}
                  />
                </div>
                <span className="text-sm">{character.stats.health}/{character.stats.maxHealth}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={16} className="text-blue-400" />
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-400 transition-all"
                    style={{ width: `${(character.stats.mana / character.stats.maxMana) * 100}%` }}
                  />
                </div>
                <span className="text-sm">{character.stats.mana}/{character.stats.maxMana}</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="character" className="gap-2">
              <Icon name="User" size={18} />
              <span className="hidden sm:inline">Персонаж</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Icon name="Sparkles" size={18} />
              <span className="hidden sm:inline">Навыки</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Icon name="Backpack" size={18} />
              <span className="hidden sm:inline">Инвентарь</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <Icon name="Map" size={18} />
              <span className="hidden sm:inline">Карта</span>
            </TabsTrigger>
            <TabsTrigger value="shop" className="gap-2">
              <Icon name="ShoppingBag" size={18} />
              <span className="hidden sm:inline">Магазин</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="character" className="animate-fade-in">
            <CharacterPanel character={character} />
          </TabsContent>

          <TabsContent value="skills" className="animate-fade-in">
            <SkillsPanel character={character} onUpdateCharacter={onUpdateCharacter} />
          </TabsContent>

          <TabsContent value="inventory" className="animate-fade-in">
            <InventoryPanel character={character} onUpdateCharacter={onUpdateCharacter} />
          </TabsContent>

          <TabsContent value="map" className="animate-fade-in">
            <WorldMapPanel character={character} />
          </TabsContent>

          <TabsContent value="shop" className="animate-fade-in">
            <ShopPanel character={character} onUpdateCharacter={onUpdateCharacter} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

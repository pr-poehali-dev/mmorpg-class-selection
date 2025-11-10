import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character, InventoryItem } from '@/types/game';
import { useToast } from '@/hooks/use-toast';

interface InventoryPanelProps {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
}

export default function InventoryPanel({ character, onUpdateCharacter }: InventoryPanelProps) {
  const { toast } = useToast();

  const equipItem = (item: InventoryItem) => {
    if (item.type === 'weapon') {
      const updatedEquipment = { ...character.equipment, weapon: item };
      const updatedInventory = character.inventory.filter(i => i.id !== item.id);
      
      if (character.equipment.weapon) {
        updatedInventory.push(character.equipment.weapon);
      }

      onUpdateCharacter({
        ...character,
        equipment: updatedEquipment,
        inventory: updatedInventory,
      });

      toast({
        title: 'Предмет экипирован',
        description: `${item.name} теперь используется`,
      });
    }
  };

  const unequipItem = (slot: keyof typeof character.equipment) => {
    const item = character.equipment[slot];
    if (!item) return;

    const updatedEquipment = { ...character.equipment };
    delete updatedEquipment[slot];

    onUpdateCharacter({
      ...character,
      equipment: updatedEquipment,
      inventory: [...character.inventory, item],
    });

    toast({
      title: 'Предмет снят',
      description: `${item.name} помещён в инвентарь`,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-legendary border-legendary';
      case 'epic': return 'text-epic border-epic';
      case 'rare': return 'text-rare border-rare';
      default: return 'text-foreground border-border';
    }
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'weapon': return 'Sword';
      case 'armor': return 'ShieldCheck';
      case 'potion': return 'HeartPulse';
      default: return 'Package';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Backpack" size={24} />
            Инвентарь
            <span className="text-sm font-normal text-muted-foreground ml-auto">
              {character.inventory.length} предметов
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {character.inventory.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="PackageOpen" size={48} className="mx-auto mb-4 opacity-30" />
              <p>Инвентарь пуст</p>
              <p className="text-sm">Покупайте предметы в магазине или получайте за квесты</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {character.inventory.map((item) => (
                <div
                  key={item.id}
                  className={`relative p-3 rounded-lg border-2 ${getRarityColor(item.rarity)} bg-card hover:scale-105 transition-transform cursor-pointer group`}
                  onClick={() => item.type === 'weapon' && equipItem(item)}
                >
                  <div className="aspect-square flex items-center justify-center mb-2">
                    <Icon name={item.icon} size={40} />
                  </div>
                  
                  {item.quantity > 1 && (
                    <div className="absolute top-1 right-1 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {item.quantity}
                    </div>
                  )}
                  
                  <div className="text-xs font-semibold text-center mb-1">{item.name}</div>
                  
                  {item.stats && (
                    <div className="text-xs text-muted-foreground text-center space-y-0.5">
                      {Object.entries(item.stats).map(([stat, value]) => (
                        <div key={stat}>+{value} {stat}</div>
                      ))}
                    </div>
                  )}

                  {item.type === 'weapon' && (
                    <Button 
                      size="sm" 
                      className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        equipItem(item);
                      }}
                    >
                      Экипировать
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Swords" size={24} />
            Экипированные предметы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(['weapon', 'helmet', 'chest', 'legs', 'boots'] as const).map((slot) => {
              const item = character.equipment[slot];
              return (
                <div key={slot} className="space-y-2">
                  <div className="text-sm text-muted-foreground text-center capitalize">
                    {slot === 'weapon' ? 'Оружие' : 
                     slot === 'helmet' ? 'Шлем' : 
                     slot === 'chest' ? 'Доспех' : 
                     slot === 'legs' ? 'Поножи' : 'Сапоги'}
                  </div>
                  <div className={`aspect-square rounded-lg border-2 p-3 flex flex-col items-center justify-center ${
                    item ? `${getRarityColor(item.rarity)} bg-card` : 'border-dashed border-muted'
                  }`}>
                    {item ? (
                      <>
                        <Icon name={item.icon} size={32} className="mb-2" />
                        <div className="text-xs font-semibold text-center">{item.name}</div>
                        {item.stats && (
                          <div className="text-xs text-muted-foreground text-center mt-1">
                            {Object.entries(item.stats).map(([stat, value]) => (
                              <div key={stat}>+{value}</div>
                            ))}
                          </div>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="mt-2 text-xs"
                          onClick={() => unequipItem(slot)}
                        >
                          Снять
                        </Button>
                      </>
                    ) : (
                      <Icon name="Lock" size={32} className="text-muted-foreground/30" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

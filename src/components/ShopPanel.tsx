import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/game';
import { shopItems } from '@/data/gameData';
import { useToast } from '@/hooks/use-toast';

interface ShopPanelProps {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
}

export default function ShopPanel({ character, onUpdateCharacter }: ShopPanelProps) {
  const { toast } = useToast();

  const buyItem = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item) return;

    if (character.gold < item.price) {
      toast({
        title: 'Недостаточно золота',
        description: `Требуется ${item.price} золота`,
        variant: 'destructive',
      });
      return;
    }

    const existingItem = character.inventory.find(i => i.id === itemId);
    let updatedInventory;

    if (existingItem) {
      updatedInventory = character.inventory.map(i => 
        i.id === itemId ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updatedInventory = [...character.inventory, { ...item }];
    }

    onUpdateCharacter({
      ...character,
      gold: character.gold - item.price,
      inventory: updatedInventory,
    });

    toast({
      title: 'Предмет куплен!',
      description: `${item.name} добавлен в инвентарь`,
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

  const filterItems = (type?: string) => {
    return type ? shopItems.filter(i => i.type === type) : shopItems;
  };

  const renderItems = (items: typeof shopItems) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const canAfford = character.gold >= item.price;
        return (
          <Card key={item.id} className={`border-2 ${getRarityColor(item.rarity)} hover:scale-105 transition-transform`}>
            <CardContent className="p-4 space-y-3">
              <div className="aspect-square rounded-lg bg-muted/30 flex items-center justify-center">
                <Icon name={item.icon} size={48} />
              </div>
              
              <div>
                <h4 className={`font-semibold ${getRarityColor(item.rarity)}`}>{item.name}</h4>
                <p className="text-xs text-muted-foreground capitalize">{
                  item.type === 'weapon' ? 'Оружие' :
                  item.type === 'armor' ? 'Броня' :
                  item.type === 'potion' ? 'Зелье' : 'Материал'
                }</p>
              </div>

              {item.stats && (
                <div className="space-y-1 text-sm">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{stat}:</span>
                      <span className="text-green-500">+{value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-gold font-semibold">
                    <Icon name="Coins" size={16} />
                    <span>{item.price}</span>
                  </div>
                  {item.quantity > 1 && (
                    <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                  )}
                </div>
                
                <Button 
                  className="w-full"
                  size="sm"
                  disabled={!canAfford}
                  onClick={() => buyItem(item.id)}
                >
                  <Icon name="ShoppingCart" size={14} className="mr-2" />
                  Купить
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Icon name="ShoppingBag" size={24} />
            Магазин
          </span>
          <div className="flex items-center gap-2 text-base font-normal">
            <Icon name="Coins" size={20} className="text-gold" />
            <span className="text-gold font-semibold">{character.gold}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">Всё</TabsTrigger>
            <TabsTrigger value="weapon">Оружие</TabsTrigger>
            <TabsTrigger value="armor">Броня</TabsTrigger>
            <TabsTrigger value="potion">Зелья</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {renderItems(shopItems)}
          </TabsContent>

          <TabsContent value="weapon">
            {renderItems(filterItems('weapon'))}
          </TabsContent>

          <TabsContent value="armor">
            {renderItems(filterItems('armor'))}
          </TabsContent>

          <TabsContent value="potion">
            {renderItems(filterItems('potion'))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

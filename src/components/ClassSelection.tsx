import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CharacterClass } from '@/types/game';
import { classData } from '@/data/gameData';

interface ClassSelectionProps {
  onSelectClass: (characterClass: CharacterClass) => void;
}

export default function ClassSelection({ onSelectClass }: ClassSelectionProps) {
  const classes: CharacterClass[] = ['warrior', 'mage', 'archer'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Выбор класса
          </h1>
          <p className="text-muted-foreground text-lg">
            Выберите путь воина и начните своё приключение в мире магии и сражений
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {classes.map((cls, index) => {
            const data = classData[cls];
            return (
              <Card
                key={cls}
                className="hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full fantasy-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={data.icon} size={48} className="text-white" />
                  </div>
                  <CardTitle className="text-3xl">{data.name}</CardTitle>
                  <CardDescription className="text-base">
                    Основная характеристика: <span className="text-primary font-semibold">{data.primaryStat}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-center min-h-[60px]">
                    {data.description}
                  </p>
                  
                  <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm text-center mb-3">Базовые характеристики</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Heart" size={16} className="text-red-500" />
                        <span>Здоровье: {data.baseStats.health}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Sparkles" size={16} className="text-blue-400" />
                        <span>Мана: {data.baseStats.mana}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Sword" size={16} className="text-orange-500" />
                        <span>Сила: {data.baseStats.strength}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Brain" size={16} className="text-purple-500" />
                        <span>Интеллект: {data.baseStats.intelligence}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Zap" size={16} className="text-yellow-500" />
                        <span>Ловкость: {data.baseStats.agility}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Shield" size={16} className="text-green-500" />
                        <span>Защита: {data.baseStats.defense}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full fantasy-gradient hover:opacity-90 text-white font-semibold"
                    onClick={() => onSelectClass(cls)}
                  >
                    Выбрать {data.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/game';
import { classData } from '@/data/gameData';

interface CharacterPanelProps {
  character: Character;
}

export default function CharacterPanel({ character }: CharacterPanelProps) {
  const classInfo = classData[character.class];
  const expProgress = (character.experience / character.experienceToNextLevel) * 100;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full fantasy-gradient flex items-center justify-center">
              <Icon name={classInfo.icon} size={24} className="text-white" />
            </div>
            Информация о персонаже
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Класс</span>
              <span className="font-semibold">{classInfo.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Уровень</span>
              <span className="font-semibold text-primary text-xl">{character.level}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Опыт</span>
              <span className="font-semibold">{character.experience} / {character.experienceToNextLevel}</span>
            </div>
            <Progress value={expProgress} className="h-3" />
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">{classInfo.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Star" size={16} className="text-gold" />
              <span className="text-muted-foreground">Основная характеристика:</span>
              <span className="font-semibold text-primary">{classInfo.primaryStat}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Характеристики</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-red-500">
                <Icon name="Heart" size={20} />
                <span className="font-semibold">Здоровье</span>
              </div>
              <div className="text-2xl font-bold">{character.stats.health} / {character.stats.maxHealth}</div>
              <div className="stat-bar">
                <div 
                  className="stat-bar-fill bg-red-500"
                  style={{ width: `${(character.stats.health / character.stats.maxHealth) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-blue-400">
                <Icon name="Sparkles" size={20} />
                <span className="font-semibold">Мана</span>
              </div>
              <div className="text-2xl font-bold">{character.stats.mana} / {character.stats.maxMana}</div>
              <div className="stat-bar">
                <div 
                  className="stat-bar-fill bg-blue-400"
                  style={{ width: `${(character.stats.mana / character.stats.maxMana) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-orange-500">
                <Icon name="Sword" size={20} />
                <span className="font-semibold">Сила</span>
              </div>
              <div className="text-2xl font-bold">{character.stats.strength}</div>
            </div>

            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-purple-500">
                <Icon name="Brain" size={20} />
                <span className="font-semibold">Интеллект</span>
              </div>
              <div className="text-2xl font-bold">{character.stats.intelligence}</div>
            </div>

            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-500">
                <Icon name="Zap" size={20} />
                <span className="font-semibold">Ловкость</span>
              </div>
              <div className="text-2xl font-bold">{character.stats.agility}</div>
            </div>

            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-green-500">
                <Icon name="Shield" size={20} />
                <span className="font-semibold">Защита</span>
              </div>
              <div className="text-2xl font-bold">{character.stats.defense}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Swords" size={24} />
            Экипировка
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['weapon', 'helmet', 'chest', 'legs', 'boots'].map((slot) => {
              const item = character.equipment[slot as keyof typeof character.equipment];
              return (
                <div key={slot} className="space-y-2">
                  <div className="text-sm text-muted-foreground capitalize text-center">
                    {slot === 'weapon' ? 'Оружие' : 
                     slot === 'helmet' ? 'Шлем' : 
                     slot === 'chest' ? 'Доспех' : 
                     slot === 'legs' ? 'Поножи' : 'Сапоги'}
                  </div>
                  <div className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                    item ? 'border-primary bg-primary/10' : 'border-dashed border-muted'
                  }`}>
                    {item ? (
                      <div className="text-center">
                        <Icon name={item.icon} size={32} className="mx-auto mb-1" />
                        <div className={`text-xs font-semibold ${
                          item.rarity === 'legendary' ? 'text-legendary' :
                          item.rarity === 'epic' ? 'text-epic' :
                          item.rarity === 'rare' ? 'text-rare' : ''
                        }`}>
                          {item.name}
                        </div>
                      </div>
                    ) : (
                      <Icon name="Lock" size={24} className="text-muted-foreground/30" />
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

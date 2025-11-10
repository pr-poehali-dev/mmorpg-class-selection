import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/game';

interface Location {
  id: string;
  name: string;
  description: string;
  level: number;
  icon: string;
  x: number;
  y: number;
  unlocked: boolean;
}

interface WorldMapPanelProps {
  character: Character;
}

export default function WorldMapPanel({ character }: WorldMapPanelProps) {
  const locations: Location[] = [
    {
      id: 'village',
      name: 'Деревня новичков',
      description: 'Мирное место для начала приключений',
      level: 1,
      icon: 'Home',
      x: 20,
      y: 70,
      unlocked: true,
    },
    {
      id: 'forest',
      name: 'Тёмный лес',
      description: 'Опасный лес, населённый монстрами',
      level: 3,
      icon: 'Trees',
      x: 40,
      y: 50,
      unlocked: character.level >= 3,
    },
    {
      id: 'caves',
      name: 'Кристальные пещеры',
      description: 'Глубокие пещеры с редкими ресурсами',
      level: 5,
      icon: 'Mountain',
      x: 60,
      y: 40,
      unlocked: character.level >= 5,
    },
    {
      id: 'ruins',
      name: 'Древние руины',
      description: 'Загадочные руины древней цивилизации',
      level: 8,
      icon: 'Castle',
      x: 75,
      y: 60,
      unlocked: character.level >= 8,
    },
    {
      id: 'volcano',
      name: 'Огненный вулкан',
      description: 'Опасный вулкан с мощными противниками',
      level: 12,
      icon: 'Flame',
      x: 85,
      y: 30,
      unlocked: character.level >= 12,
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(locations[0]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Map" size={24} />
            Карта мира
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-gradient-to-br from-muted via-muted/50 to-background rounded-xl border-2 border-border overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
            
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                disabled={!location.unlocked}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                  location.unlocked 
                    ? 'hover:scale-125 cursor-pointer' 
                    : 'opacity-30 cursor-not-allowed'
                } ${selectedLocation?.id === location.id ? 'scale-125' : ''}`}
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
              >
                <div className={`relative ${location.unlocked ? 'animate-pulse' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    location.unlocked 
                      ? 'fantasy-gradient shadow-lg shadow-primary/50' 
                      : 'bg-muted'
                  }`}>
                    <Icon name={location.icon} size={24} className="text-white" />
                  </div>
                  
                  {location.unlocked && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="text-xs font-semibold bg-background/90 px-2 py-1 rounded">
                        {location.name}
                      </div>
                    </div>
                  )}
                  
                  {!location.unlocked && (
                    <div className="absolute top-0 right-0">
                      <Icon name="Lock" size={12} className="text-destructive" />
                    </div>
                  )}
                </div>
              </button>
            ))}

            {locations.map((location, index) => {
              const nextLocation = locations[index + 1];
              if (!nextLocation) return null;
              
              return (
                <svg
                  key={`path-${location.id}`}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 0 }}
                >
                  <line
                    x1={`${location.x}%`}
                    y1={`${location.y}%`}
                    x2={`${nextLocation.x}%`}
                    y2={`${nextLocation.y}%`}
                    stroke={nextLocation.unlocked ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                    strokeWidth="2"
                    strokeDasharray={nextLocation.unlocked ? '0' : '5,5'}
                    opacity="0.5"
                  />
                </svg>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" size={24} />
            Информация о локации
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedLocation ? (
            <>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedLocation.unlocked ? 'fantasy-gradient' : 'bg-muted'
                }`}>
                  <Icon name={selectedLocation.icon} size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedLocation.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="User" size={14} />
                    <span>Рекомендуемый уровень: {selectedLocation.level}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">{selectedLocation.description}</p>

              <div className="space-y-2 pt-4 border-t border-border">
                <h4 className="font-semibold">Награды за исследование:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={14} className="text-gold" />
                    <span>+{selectedLocation.level * 50} опыта</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Coins" size={14} className="text-gold" />
                    <span>+{selectedLocation.level * 20} золота</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Package" size={14} className="text-rare" />
                    <span>Редкие предметы</span>
                  </div>
                </div>
              </div>

              {selectedLocation.unlocked ? (
                <>
                  <Button className="w-full fantasy-gradient text-white">
                    <Icon name="Swords" size={18} className="mr-2" />
                    Исследовать локацию
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Боевая система будет добавлена в следующей версии
                  </p>
                </>
              ) : (
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <Icon name="Lock" size={32} className="mx-auto mb-2 text-destructive" />
                  <p className="text-sm text-destructive font-semibold">
                    Требуется {selectedLocation.level} уровень
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ваш уровень: {character.level}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <Icon name="MapPin" size={48} className="mx-auto mb-4 opacity-30" />
              <p>Выберите локацию на карте</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

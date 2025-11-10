import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/game';
import { useToast } from '@/hooks/use-toast';

interface SkillsPanelProps {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
}

export default function SkillsPanel({ character, onUpdateCharacter }: SkillsPanelProps) {
  const { toast } = useToast();

  const unlockSkill = (skillId: string) => {
    const skill = character.skills.find(s => s.id === skillId);
    if (!skill) return;

    if (character.level < skill.requiredLevel) {
      toast({
        title: 'Недостаточный уровень',
        description: `Требуется ${skill.requiredLevel} уровень`,
        variant: 'destructive',
      });
      return;
    }

    if (character.gold < skill.cost) {
      toast({
        title: 'Недостаточно золота',
        description: `Требуется ${skill.cost} золота`,
        variant: 'destructive',
      });
      return;
    }

    const updatedSkills = character.skills.map(s => 
      s.id === skillId ? { ...s, unlocked: true, level: 1 } : s
    );

    onUpdateCharacter({
      ...character,
      gold: character.gold - skill.cost,
      skills: updatedSkills,
    });

    toast({
      title: 'Навык изучен!',
      description: `${skill.name} теперь доступен`,
    });
  };

  const upgradeSkill = (skillId: string) => {
    const skill = character.skills.find(s => s.id === skillId);
    if (!skill || skill.level >= skill.maxLevel) return;

    const upgradeCost = skill.cost * (skill.level + 1);

    if (character.gold < upgradeCost) {
      toast({
        title: 'Недостаточно золота',
        description: `Требуется ${upgradeCost} золота`,
        variant: 'destructive',
      });
      return;
    }

    const updatedSkills = character.skills.map(s => 
      s.id === skillId ? { ...s, level: s.level + 1 } : s
    );

    onUpdateCharacter({
      ...character,
      gold: character.gold - upgradeCost,
      skills: updatedSkills,
    });

    toast({
      title: 'Навык улучшен!',
      description: `${skill.name} теперь ${skill.level + 1} уровня`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Icon name="Sparkles" size={24} />
              Дерево навыков
            </span>
            <div className="flex items-center gap-2 text-sm font-normal">
              <Icon name="Coins" size={18} className="text-gold" />
              <span className="text-gold">{character.gold}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {character.skills.map((skill) => {
              const isMaxLevel = skill.level >= skill.maxLevel;
              const upgradeCost = skill.unlocked ? skill.cost * (skill.level + 1) : skill.cost;
              const canAfford = character.gold >= upgradeCost;
              const meetsLevelReq = character.level >= skill.requiredLevel;

              return (
                <Card 
                  key={skill.id} 
                  className={`${skill.unlocked ? 'border-primary' : 'opacity-60'} transition-all hover:scale-102`}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        skill.unlocked ? 'fantasy-gradient' : 'bg-muted'
                      }`}>
                        <Icon name={skill.icon} size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Уровень навыка</span>
                        <span className="font-semibold">
                          {skill.level} / {skill.maxLevel}
                        </span>
                      </div>
                      <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Lock" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Требуется {skill.requiredLevel} ур.
                        </span>
                      </div>
                      {!skill.unlocked && (
                        <div className="flex items-center gap-1 text-gold">
                          <Icon name="Coins" size={14} />
                          <span>{skill.cost}</span>
                        </div>
                      )}
                    </div>

                    {!skill.unlocked ? (
                      <Button 
                        className="w-full"
                        disabled={!meetsLevelReq || !canAfford}
                        onClick={() => unlockSkill(skill.id)}
                      >
                        <Icon name="Unlock" size={16} className="mr-2" />
                        Изучить за {skill.cost}
                      </Button>
                    ) : isMaxLevel ? (
                      <Button className="w-full" disabled>
                        <Icon name="Check" size={16} className="mr-2" />
                        Максимальный уровень
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        variant="outline"
                        disabled={!canAfford}
                        onClick={() => upgradeSkill(skill.id)}
                      >
                        <Icon name="TrendingUp" size={16} className="mr-2" />
                        Улучшить за {upgradeCost}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

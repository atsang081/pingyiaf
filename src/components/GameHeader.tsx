import { Heart, ArrowLeft } from "lucide-react";
import { LevelConfig } from "@/types/game";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface GameHeaderProps {
  score: number;
  level: LevelConfig;
  lives: number;
  onBack: () => void;
}

export const GameHeader = ({ score, level, lives, onBack }: GameHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-card/80 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 shadow-lg border border-primary/20 flex-shrink-0">
      <div className="flex items-center justify-between gap-2">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="rounded-lg h-7 w-7 md:h-9 md:w-9 p-0"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-4 h-4 md:w-6 md:h-6 ${
                i < lives
                  ? "fill-destructive text-destructive"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        
        <div className="text-center flex-1">
          <div className="text-lg md:text-2xl font-bold text-primary">
            {score}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm md:text-lg font-bold text-secondary">
            {t('game.level')} {level.level}
          </div>
          <div className="text-xs text-muted-foreground hidden md:block">
            {level.name}
          </div>
        </div>
      </div>
    </header>
  );
};

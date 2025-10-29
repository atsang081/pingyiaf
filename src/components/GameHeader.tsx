import { Heart } from "lucide-react";
import { LevelConfig } from "@/types/game";

interface GameHeaderProps {
  score: number;
  level: LevelConfig;
  lives: number;
}

export const GameHeader = ({ score, level, lives }: GameHeaderProps) => {
  return (
    <header className="bg-card/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border-2 border-primary/20">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 md:gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 md:w-8 md:h-8 ${
                i < lives
                  ? "fill-destructive text-destructive"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xl md:text-3xl font-bold text-primary">
            {score}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-base md:text-xl font-bold text-secondary">
            Lv {level.level}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground hidden md:block">
            {level.nameChinese}
          </div>
        </div>
      </div>
    </header>
  );
};

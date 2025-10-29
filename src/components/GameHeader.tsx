import { Heart } from "lucide-react";
import { LevelConfig } from "@/types/game";

interface GameHeaderProps {
  score: number;
  level: LevelConfig;
  lives: number;
}

export const GameHeader = ({ score, level, lives }: GameHeaderProps) => {
  return (
    <header className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-8 h-8 ${
                i < lives
                  ? "fill-destructive text-destructive"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        
        <div className="text-center flex-1">
          <div className="text-3xl font-bold text-primary">
            Score: {score}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold text-secondary">
            Level {level.level}
          </div>
          <div className="text-sm text-muted-foreground">
            {level.nameChinese}
          </div>
        </div>
      </div>
    </header>
  );
};

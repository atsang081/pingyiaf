import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { LEVEL_CONFIGS, LevelConfig } from "@/types/game";
import { Lock, Star, ArrowLeft } from "lucide-react";

interface LevelSelectProps {
  onSelectLevel: (level: number) => void;
  onBack: () => void;
  unlockedLevels: number;
  levelStars: { [key: number]: number };
}

export const LevelSelect = ({ onSelectLevel, onBack, unlockedLevels, levelStars }: LevelSelectProps) => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-xl text-sm md:text-base h-9 md:h-10"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Back
          </Button>
          <h1 className="text-2xl md:text-5xl font-bold text-primary">Choose Level</h1>
          <div className="w-16 md:w-24" /> {/* Spacer */}
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {LEVEL_CONFIGS.map((level) => {
            const isLocked = level.level > unlockedLevels;
            const stars = levelStars[level.level] || 0;

            return (
              <Card
                key={level.level}
                className={`p-4 md:p-8 cursor-pointer transition-all hover:scale-105 ${
                  isLocked
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-2xl border-2 border-primary/20"
                }`}
                onClick={() => !isLocked && onSelectLevel(level.level)}
              >
                <div className="flex items-start gap-3 md:gap-6">
                  {/* Level Icon */}
                  <div className="text-4xl md:text-7xl shrink-0">
                    {isLocked ? <Lock className="w-10 h-10 md:w-16 md:h-16 text-muted" /> : level.sticker}
                  </div>

                  {/* Level Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">
                      Level {level.level}
                    </div>
                    <div className="text-base md:text-2xl font-semibold text-secondary mb-1 md:mb-2">
                      {level.name}
                    </div>
                    <div className="text-sm md:text-lg text-muted-foreground mb-2 md:mb-4">
                      {level.description}
                    </div>
                    
                    {/* Level Details */}
                    <div className="space-y-0.5 md:space-y-1 text-xs md:text-sm text-muted-foreground">
                      <div>📝 {level.characterCount} chars</div>
                      <div>⚡ {level.speed}s speed</div>
                      <div>🎯 {level.simultaneousCharacters} at once</div>
                    </div>

                    {/* Stars */}
                    {!isLocked && stars > 0 && (
                      <div className="flex gap-1 mt-2 md:mt-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 md:w-6 md:h-6 ${
                              i < stars
                                ? "fill-accent text-accent"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

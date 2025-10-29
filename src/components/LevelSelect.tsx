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
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-5xl font-bold text-primary">Choose Your Level</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEVEL_CONFIGS.map((level) => {
            const isLocked = level.level > unlockedLevels;
            const stars = levelStars[level.level] || 0;

            return (
              <Card
                key={level.level}
                className={`p-8 cursor-pointer transition-all hover:scale-105 ${
                  isLocked
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-2xl border-2 border-primary/20"
                }`}
                onClick={() => !isLocked && onSelectLevel(level.level)}
              >
                <div className="flex items-start gap-6">
                  {/* Level Icon */}
                  <div className="text-7xl">
                    {isLocked ? <Lock className="w-16 h-16 text-muted" /> : level.sticker}
                  </div>

                  {/* Level Info */}
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-primary mb-2">
                      Level {level.level}
                    </div>
                    <div className="text-2xl font-semibold text-secondary mb-2">
                      {level.nameChinese}
                    </div>
                    <div className="text-lg text-muted-foreground mb-4">
                      {level.description}
                    </div>
                    
                    {/* Level Details */}
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>📝 Characters: {level.characterCount}</div>
                      <div>⚡ Speed: {level.speed}s per character</div>
                      <div>🎯 Simultaneous: {level.simultaneousCharacters}</div>
                    </div>

                    {/* Stars */}
                    {!isLocked && stars > 0 && (
                      <div className="flex gap-1 mt-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
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

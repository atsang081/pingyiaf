import { Button } from "./ui/button";
import { Star, Home, RotateCcw } from "lucide-react";
import { LevelConfig } from "@/types/game";
import { calculateStars } from "@/utils/gameUtils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultScreenProps {
  level: LevelConfig;
  score: number;
  accuracy: number;
  onContinue: () => void;
  onReplay: () => void;
  onMainMenu: () => void;
}

export const ResultScreen = ({
  level,
  score,
  accuracy,
  onContinue,
  onReplay,
  onMainMenu,
}: ResultScreenProps) => {
  const stars = calculateStars(accuracy);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full animate-bounce-in">
        {/* Celebration */}
        <div className="text-center mb-6 md:mb-8">
          <div className="text-6xl md:text-9xl mb-4 md:mb-6 animate-float">{level.sticker}</div>
          <h1 className="text-3xl md:text-6xl font-bold text-primary mb-2 md:mb-4">
            {t('result.levelComplete')}
          </h1>
          <h2 className="text-xl md:text-3xl font-bold text-secondary">
            {level.name}
          </h2>
        </div>

        {/* Results Card */}
        <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl border-2 md:border-4 border-primary/30 mb-6 md:mb-8">
...
          {/* Stats */}
          <div className="space-y-4 md:space-y-6 text-center">
            <div>
              <div className="text-lg md:text-2xl text-muted-foreground mb-1 md:mb-2">{t('result.score')}</div>
              <div className="text-4xl md:text-6xl font-bold text-primary">{score}</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl text-muted-foreground mb-1 md:mb-2">{t('result.accuracy')}</div>
              <div className="text-3xl md:text-5xl font-bold text-secondary">
                {accuracy.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-accent/20 rounded-xl md:rounded-2xl">
            <p className="text-base md:text-2xl font-bold text-center">
              {stars === 5 && t('result.perfect')}
              {stars === 4 && t('result.excellent')}
              {stars === 3 && t('result.great')}
              {stars === 2 && t('result.good')}
              {stars === 1 && t('result.didIt')}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 md:space-y-4">
          {level.level < 4 && (
            <Button
              onClick={onContinue}
              className="w-full h-12 md:h-16 text-lg md:text-2xl rounded-xl md:rounded-2xl bg-primary hover:bg-primary/90"
            >
              {t('result.nextLevel')}
            </Button>
          )}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Button
              onClick={onReplay}
              variant="outline"
              className="h-10 md:h-14 text-base md:text-xl rounded-xl md:rounded-2xl"
            >
              <RotateCcw className="w-4 h-4 md:w-6 md:h-6 md:mr-2" />
              <span className="hidden md:inline">{t('result.replay')}</span>
            </Button>
            <Button
              onClick={onMainMenu}
              variant="outline"
              className="h-10 md:h-14 text-base md:text-xl rounded-xl md:rounded-2xl"
            >
              <Home className="w-4 h-4 md:w-6 md:h-6 md:mr-2" />
              <span className="hidden md:inline">{t('result.menu')}</span>
            </Button>
          </div>
        </div>

        {/* Confetti */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl md:text-4xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {["🎉", "⭐", "✨", "🌟", "🎊", "🏆"][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { Button } from "./ui/button";
import { Star, Home, RotateCcw } from "lucide-react";
import { LevelConfig } from "@/types/game";
import { calculateStars } from "@/utils/gameUtils";

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

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full animate-bounce-in">
        {/* Celebration */}
        <div className="text-center mb-8">
          <div className="text-9xl mb-6 animate-float">{level.sticker}</div>
          <h1 className="text-6xl font-bold text-primary mb-4">
            LEVEL COMPLETE!
          </h1>
          <h2 className="text-3xl font-bold text-secondary">
            {level.nameChinese}
          </h2>
        </div>

        {/* Results Card */}
        <div className="bg-card rounded-3xl p-10 shadow-2xl border-4 border-primary/30 mb-8">
          {/* Stars */}
          <div className="flex justify-center gap-4 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-16 h-16 ${
                  i < stars
                    ? "fill-accent text-accent animate-bounce-in"
                    : "fill-muted text-muted"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="space-y-6 text-center">
            <div>
              <div className="text-2xl text-muted-foreground mb-2">Score</div>
              <div className="text-6xl font-bold text-primary">{score}</div>
            </div>
            <div>
              <div className="text-2xl text-muted-foreground mb-2">Accuracy</div>
              <div className="text-5xl font-bold text-secondary">
                {accuracy.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="mt-8 p-6 bg-accent/20 rounded-2xl">
            <p className="text-2xl font-bold text-center">
              {stars === 5 && "🌟 PERFECT! You're a Pinyin Master!"}
              {stars === 4 && "🎉 EXCELLENT! Almost perfect!"}
              {stars === 3 && "👍 GREAT JOB! Keep practicing!"}
              {stars === 2 && "😊 GOOD EFFORT! You're improving!"}
              {stars === 1 && "💪 YOU DID IT! Keep going!"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {level.level < 4 && (
            <Button
              onClick={onContinue}
              className="w-full h-16 text-2xl rounded-2xl bg-primary hover:bg-primary/90"
            >
              Next Level ➡️
            </Button>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={onReplay}
              variant="outline"
              className="h-14 text-xl rounded-2xl"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Replay
            </Button>
            <Button
              onClick={onMainMenu}
              variant="outline"
              className="h-14 text-xl rounded-2xl"
            >
              <Home className="w-6 h-6 mr-2" />
              Main Menu
            </Button>
          </div>
        </div>

        {/* Confetti */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-confetti"
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

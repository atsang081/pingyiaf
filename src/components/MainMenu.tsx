import { Button } from "./ui/button";
import { Play, BookOpen, Award, Settings } from "lucide-react";

interface MainMenuProps {
  onStartGame: () => void;
  onPracticeMode: () => void;
  onViewStickers: () => void;
}

export const MainMenu = ({ onStartGame, onPracticeMode, onViewStickers }: MainMenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Title */}
        <div className="text-center mb-12 animate-bounce-in">
          <div className="text-7xl mb-4">✈️</div>
          <h1 className="text-6xl font-bold text-primary mb-4">
            PINYIN AIR FORCE
          </h1>
          <h2 className="text-4xl font-bold text-secondary">
            汉字大战
          </h2>
          <p className="text-xl text-muted-foreground mt-4">
            Defend your castle by typing pinyin! 🏰
          </p>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-4 animate-slide-in">
          <Button
            onClick={onStartGame}
            className="w-full h-20 text-3xl rounded-2xl bg-primary hover:bg-primary/90 shadow-xl hover:scale-105 transition-transform"
          >
            <Play className="w-10 h-10 mr-4" />
            START PLAYING!
          </Button>

          <Button
            onClick={onPracticeMode}
            variant="outline"
            className="w-full h-16 text-2xl rounded-2xl border-2 hover:bg-secondary/10"
          >
            <BookOpen className="w-8 h-8 mr-3" />
            PRACTICE MODE
          </Button>

          <Button
            onClick={onViewStickers}
            variant="outline"
            className="w-full h-16 text-2xl rounded-2xl border-2 hover:bg-accent/10"
          >
            <Award className="w-8 h-8 mr-3" />
            MY STICKERS
          </Button>
        </div>

        {/* Fun decorations */}
        <div className="flex justify-center gap-8 mt-12 text-5xl animate-float">
          <span>🎮</span>
          <span>🚀</span>
          <span>⭐</span>
        </div>
      </div>
    </div>
  );
};

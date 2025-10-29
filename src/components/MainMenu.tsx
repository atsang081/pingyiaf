import { Button } from "./ui/button";
import { Play, BookOpen, Award, Settings } from "lucide-react";

interface MainMenuProps {
  onStartGame: () => void;
  onPracticeMode: () => void;
  onViewStickers: () => void;
}

export const MainMenu = ({ onStartGame, onPracticeMode, onViewStickers }: MainMenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 animate-bounce-in">
          <div className="text-5xl md:text-7xl mb-3 md:mb-4">✈️</div>
          <h1 className="text-3xl md:text-6xl font-bold text-primary mb-2 md:mb-4">
            PINYIN AIR FORCE
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-secondary">
            汉字大战
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground mt-2 md:mt-4">
            Defend your castle by typing pinyin! 🏰
          </p>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-3 md:space-y-4 animate-slide-in">
          <Button
            onClick={onStartGame}
            className="w-full h-16 md:h-20 text-xl md:text-3xl rounded-xl md:rounded-2xl bg-primary hover:bg-primary/90 shadow-xl hover:scale-105 transition-transform"
          >
            <Play className="w-6 h-6 md:w-10 md:h-10 mr-2 md:mr-4" />
            START PLAYING!
          </Button>

          <Button
            onClick={onPracticeMode}
            variant="outline"
            className="w-full h-12 md:h-16 text-lg md:text-2xl rounded-xl md:rounded-2xl border-2 hover:bg-secondary/10"
          >
            <BookOpen className="w-5 h-5 md:w-8 md:h-8 mr-2 md:mr-3" />
            PRACTICE MODE
          </Button>

          <Button
            onClick={onViewStickers}
            variant="outline"
            className="w-full h-12 md:h-16 text-lg md:text-2xl rounded-xl md:rounded-2xl border-2 hover:bg-accent/10"
          >
            <Award className="w-5 h-5 md:w-8 md:h-8 mr-2 md:mr-3" />
            MY STICKERS
          </Button>
        </div>

        {/* Fun decorations */}
        <div className="flex justify-center gap-4 md:gap-8 mt-8 md:mt-12 text-3xl md:text-5xl animate-float">
          <span>🎮</span>
          <span>🚀</span>
          <span>⭐</span>
        </div>
      </div>
    </div>
  );
};

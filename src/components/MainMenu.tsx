import { Button } from "./ui/button";
import { Play, BookOpen, Award } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface MainMenuProps {
  onStartGame: () => void;
  onPracticeMode: () => void;
  onViewStickers: () => void;
}

export const MainMenu = ({ onStartGame, onPracticeMode, onViewStickers }: MainMenuProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 animate-bounce-in">
          <div className="text-5xl md:text-7xl mb-3 md:mb-4">✈️</div>
          <h1 className="text-3xl md:text-6xl font-bold text-primary mb-2 md:mb-4">
            {t('menu.title')}
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-secondary">
            {t('menu.subtitle')}
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground mt-2 md:mt-4">
            {t('menu.description')}
          </p>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-3 md:space-y-4 animate-slide-in">
          <Button
            onClick={onStartGame}
            className="w-full h-16 md:h-20 text-xl md:text-3xl rounded-xl md:rounded-2xl bg-primary hover:bg-primary/90 shadow-xl hover:scale-105 transition-transform"
          >
            <Play className="w-6 h-6 md:w-10 md:h-10 mr-2 md:mr-4" />
            {t('menu.startPlaying')}
          </Button>

          <Button
            onClick={onPracticeMode}
            variant="outline"
            className="w-full h-12 md:h-16 text-lg md:text-2xl rounded-xl md:rounded-2xl border-2 bg-yellow-50 hover:bg-yellow-100"
          >
            <BookOpen className="w-5 h-5 md:w-8 md:h-8 mr-2 md:mr-3" />
            {t('menu.practiceMode')}
          </Button>

          <Button
            onClick={onViewStickers}
            variant="outline"
            className="w-full h-12 md:h-16 text-lg md:text-2xl rounded-xl md:rounded-2xl border-2 hover:bg-accent/10"
          >
            <Award className="w-5 h-5 md:w-8 md:h-8 mr-2 md:mr-3" />
            {t('menu.performance')}
          </Button>
        </div>

        {/* Fun decorations */}
        <div className="flex justify-center gap-4 md:gap-8 mt-8 md:mt-12 text-3xl md:text-5xl animate-float">
          <span>🎮</span>
          <span>🚀</span>
          <span>⭐</span>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mt-6 md:mt-8">
          <LanguageSelector />
        </div>

        {/* Footer */}
        <div className="mt-8 md:mt-12 pt-6 border-t border-border/50 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            For inquiries & Feedback:{" "}
            <a 
              href="mailto:cs@lazydads.net" 
              className="text-primary hover:underline"
            >
              cs@lazydads.net
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Read our{" "}
            <a 
              href="https://lazydads.net/disclaimers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              disclaimers
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 Lazy Dads. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

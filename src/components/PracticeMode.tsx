import { useState, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { InputArea } from "./InputArea";
import { ArrowLeft } from "lucide-react";
import { Character } from "@/types/game";
import { validatePinyin, shuffleArray } from "@/utils/gameUtils";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import charactersData from "@/data/characters.json";

interface PracticeModeProps {
  onBack: () => void;
}

export const PracticeMode = ({ onBack }: PracticeModeProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    // Initialize with shuffled characters
    const shuffled = shuffleArray([...(charactersData as Character[])]);
    setCharacters(shuffled);
  }, []);

  const currentCharacter = characters[currentIndex];

  const handleSubmit = useCallback((input: string) => {
    if (!currentCharacter) return;

    if (validatePinyin(input, currentCharacter.pinyin)) {
      // Correct answer
      toast({
        title: t('practice.perfect'),
        description: `${currentCharacter.character} = ${currentCharacter.pinyin}`,
      });
      
      setShowAnswer(false);
      setProgress(prev => prev + 1);
      
      // Move to next character
      setTimeout(() => {
        if (currentIndex < characters.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Reshuffle and restart
          const shuffled = shuffleArray([...(charactersData as Character[])]);
          setCharacters(shuffled);
          setCurrentIndex(0);
          toast({
            title: t('practice.greatJob'),
            description: t('practice.allPracticed'),
          });
        }
      }, 1000);
    } else {
      // Wrong answer - just give feedback, character stays
      toast({
        title: t('practice.notQuite'),
        description: t('practice.tryAgain'),
      });
    }
  }, [currentCharacter, currentIndex, characters.length, toast]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  if (!currentCharacter) return null;

  return (
    <div className="h-screen flex flex-col p-2 md:p-4">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full gap-2 md:gap-3">
        {/* Header */}
        <div className="bg-card rounded-lg md:rounded-xl p-2 md:p-3 shadow-lg border border-primary/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="h-8 md:h-10 px-2 md:px-3 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            <div className="text-center flex-1">
              <h2 className="text-base md:text-xl font-bold text-primary">
                {t('practice.title')}
              </h2>
            </div>

            <div className="bg-primary/10 px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
              <span className="text-sm md:text-base font-bold text-primary">
                {progress} {t('practice.words')}
              </span>
            </div>
          </div>
        </div>

        {/* Character Display Area */}
        <div className="relative bg-gradient-to-b from-sky-300 to-sky-100 rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border border-primary/30 flex-1 flex items-center justify-center overflow-hidden">
          {/* Clouds decoration */}
          <div className="absolute top-2 left-4 text-2xl md:text-4xl opacity-30">☁️</div>
          <div className="absolute top-8 right-8 text-xl md:text-3xl opacity-30">☁️</div>
          <div className="absolute top-12 left-1/3 text-lg md:text-2xl opacity-30">☁️</div>
          
          {/* Main Character - stays in center */}
          <div className="text-center">
            <div className="bg-yellow-400 rounded-full w-24 h-24 md:w-36 md:h-36 flex items-center justify-center shadow-2xl border-4 md:border-6 border-yellow-500 animate-float">
              <span className="text-5xl md:text-7xl font-bold text-white">
                {currentCharacter.character}
              </span>
            </div>
            
            {showAnswer && (
              <div className="mt-3 md:mt-4 p-2 md:p-3 bg-white/90 rounded-lg shadow-lg animate-bounce-in">
                <span className="text-xl md:text-3xl font-bold text-primary">
                  {currentCharacter.pinyin}
                </span>
              </div>
            )}
          </div>

          {/* Castle Base */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2">
            <div className="text-3xl md:text-5xl animate-float">✈️</div>
          </div>
        </div>

        {/* Input Area */}
        <InputArea
          onSubmit={handleSubmit}
          currentCharacter={{
            character: currentCharacter.character,
            pinyin: currentCharacter.pinyin,
          }}
          attemptCount={0}
          disabled={false}
          practiceMode={true}
          onShowAnswer={handleShowAnswer}
        />
      </div>
    </div>
  );
};

import { useState, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { InputArea } from "./InputArea";
import { ArrowLeft } from "lucide-react";
import { Character } from "@/types/game";
import { 
  validatePinyin, 
  calculateLevelAccuracy
} from "@/utils/gameUtils";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface IncorrectWordsPracticeProps {
  onBack: () => void;
}

export const IncorrectWordsPractice = ({ onBack }: IncorrectWordsPracticeProps) => {
  const [incorrectWords, setIncorrectWords] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem("incorrectWords");
    const words = stored ? JSON.parse(stored) : [];
    
    if (words.length === 0) {
      toast({
        title: t('incorrectWords.noWords'),
        description: t('incorrectWords.noWordsDesc'),
      });
      setTimeout(() => onBack(), 2000);
      return;
    }
    
    setIncorrectWords(words);
  }, [toast, onBack, t]);

  const currentCharacter = incorrectWords[currentIndex];

  const handleSubmit = useCallback((input: string) => {
    if (!currentCharacter) return;

    if (validatePinyin(input, currentCharacter.pinyin)) {
      toast({
        title: t('practice.perfect'),
        description: `${currentCharacter.character} = ${currentCharacter.pinyin}`,
      });
      
      setShowAnswer(false);
      setProgress(prev => prev + 1);
      const newTotalAttempted = totalAttempted + 1;
      setTotalAttempted(newTotalAttempted);

      setTimeout(() => {
        if (currentIndex < incorrectWords.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          toast({
            title: t('incorrectWords.complete'),
            description: t('incorrectWords.completeDesc'),
          });
          setTimeout(() => {
            localStorage.removeItem("incorrectWords");
            onBack();
          }, 1500);
        }
      }, 1000);
    } else {
      const newTotalAttempted = totalAttempted + 1;
      setTotalAttempted(newTotalAttempted);
      
      toast({
        title: t('practice.notQuite'),
        description: t('practice.tryAgain'),
      });
    }
  }, [currentCharacter, totalAttempted, currentIndex, incorrectWords.length, toast, t, onBack]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const accuracy = calculateLevelAccuracy(progress, totalAttempted);

  if (incorrectWords.length === 0) return null;
  if (!currentCharacter) return null;

  return (
    <div className="h-screen flex flex-col p-2 md:p-4">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full gap-2 md:gap-3">
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
                {t('incorrectWords.title')}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {t('ui.accuracy')}: {accuracy.toFixed(1)}%
              </p>
            </div>

            <div className="flex gap-2">
              <div className="bg-primary/10 px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
                <span className="text-sm md:text-base font-bold text-primary">
                  ✓ {progress}
                </span>
              </div>
              <div className="bg-orange-100 px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
                <span className="text-sm md:text-base font-bold text-orange-600">
                  ? {totalAttempted}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-b from-sky-300 to-sky-100 rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border border-primary/30 flex-1 flex items-center justify-center overflow-hidden">
          <div className="absolute top-2 left-4 text-2xl md:text-4xl opacity-30">☁️</div>
          <div className="absolute top-8 right-8 text-xl md:text-3xl opacity-30">☁️</div>
          <div className="absolute top-12 left-1/3 text-lg md:text-2xl opacity-30">☁️</div>
          
          <div className="text-center">
            <div className="bg-red-400 rounded-full w-24 h-24 md:w-36 md:h-36 flex items-center justify-center shadow-2xl border-4 md:border-6 border-red-500 animate-float">
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

          <div className="absolute top-4 right-4 bg-white/80 px-3 py-2 rounded-lg">
            <span className="text-sm font-bold text-primary">
              {currentIndex + 1} / {incorrectWords.length}
            </span>
          </div>
        </div>

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

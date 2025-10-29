import { useState, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { InputArea } from "./InputArea";
import { ArrowLeft } from "lucide-react";
import { Character } from "@/types/game";
import { validatePinyin, shuffleArray } from "@/utils/gameUtils";
import { useToast } from "@/hooks/use-toast";
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
        title: "Perfect! ✨",
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
            title: "Great job! 🎉",
            description: "You've practiced all characters! Starting over with a new shuffle.",
          });
        }
      }, 1000);
    } else {
      // Wrong answer - just give feedback, character stays
      toast({
        title: "Not quite! 🤔",
        description: "Try again - the character will stay here until you get it!",
      });
    }
  }, [currentCharacter, currentIndex, characters.length, toast]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
    toast({
      title: "Answer revealed! 📖",
      description: `${currentCharacter.character} = ${currentCharacter.pinyin}`,
    });
  };

  if (!currentCharacter) return null;

  return (
    <div className="min-h-screen p-3 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="h-10 md:h-12 px-3 md:px-4 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>

            <div className="text-center flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-primary">
                Practice Mode 📚
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Take your time - no pressure!
              </p>
            </div>

            <div className="bg-primary/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
              <span className="text-base md:text-lg font-bold text-primary">
                {progress} words
              </span>
            </div>
          </div>
        </div>

        {/* Character Display Area */}
        <div className="relative bg-gradient-to-b from-sky-300 to-sky-100 rounded-xl md:rounded-2xl p-8 md:p-12 shadow-lg border-2 md:border-4 border-primary/30 min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Clouds decoration */}
          <div className="absolute top-4 left-10 text-4xl md:text-6xl opacity-30">☁️</div>
          <div className="absolute top-20 right-20 text-3xl md:text-5xl opacity-30">☁️</div>
          <div className="absolute top-32 left-1/3 text-2xl md:text-4xl opacity-30">☁️</div>
          
          {/* Main Character - stays in center */}
          <div className="text-center">
            <div className="bg-yellow-400 rounded-full w-32 h-32 md:w-48 md:h-48 flex items-center justify-center shadow-2xl border-4 md:border-8 border-yellow-500 animate-float">
              <span className="text-6xl md:text-9xl font-bold text-white">
                {currentCharacter.character}
              </span>
            </div>
            
            {showAnswer && (
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-white/90 rounded-xl shadow-lg animate-bounce-in">
                <span className="text-2xl md:text-4xl font-bold text-primary">
                  {currentCharacter.pinyin}
                </span>
              </div>
            )}
          </div>

          {/* Castle Base */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="text-5xl md:text-7xl animate-float">🏰</div>
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

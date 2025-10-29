import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Lightbulb, Volume2 } from "lucide-react";
import { getHint } from "@/utils/gameUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { PinyinKeyboard } from "./PinyinKeyboard";

interface InputAreaProps {
  onSubmit: (input: string) => void;
  currentCharacter: { character: string; pinyin: string } | null;
  attemptCount: number;
  disabled: boolean;
  practiceMode?: boolean;
  onShowAnswer?: () => void;
}

export const InputArea = ({ onSubmit, currentCharacter, attemptCount, disabled, practiceMode = false, onShowAnswer }: InputAreaProps) => {
  const [input, setInput] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
      setInput("");
      setHint(null);
    }
  };

  const handleHint = () => {
    if (currentCharacter) {
      setHint(getHint(currentCharacter.pinyin, attemptCount));
    }
  };

  const handleAudio = () => {
    if (currentCharacter && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentCharacter.character);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.5;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (key: string) => {
    if (!disabled) {
      setInput(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    if (!disabled) {
      setInput(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="bg-card rounded-lg p-1.5 md:p-2 shadow-lg border border-primary/20">
      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="text-base md:text-lg text-center h-8 md:h-10 rounded-lg border border-primary/30 bg-background flex items-center justify-center font-semibold px-2">
          {input || <span className="text-muted-foreground text-sm md:text-base">{t('input.placeholder')}</span>}
        </div>

        {hint && (
          <div className="text-center p-2 bg-accent/20 rounded-lg text-sm md:text-base font-semibold animate-bounce-in">
            {hint}
          </div>
        )}

        <div className="flex gap-1">
          <Button
            type="button"
            variant="outline"
            onClick={handleHint}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-7 md:h-9 text-xs rounded-md px-2"
          >
            <Lightbulb className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline ml-1">{t('input.hint')}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleAudio}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-7 md:h-9 text-xs rounded-md px-2"
          >
            <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline ml-1">{t('input.hearIt')}</span>
          </Button>
          {practiceMode && onShowAnswer && (
            <Button
              type="button"
              variant="outline"
              onClick={onShowAnswer}
              disabled={disabled || !currentCharacter}
              className="flex-1 h-7 md:h-9 text-xs rounded-md px-2"
            >
              <span className="text-xs">📖</span>
              <span className="hidden sm:inline ml-1">{t('input.answer')}</span>
            </Button>
          )}
        </div>

        <PinyinKeyboard
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          disabled={disabled}
        />

        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          className="w-full h-8 md:h-10 text-sm md:text-base rounded-lg bg-primary hover:bg-primary/90"
        >
          {t('input.submit')}
        </Button>
      </form>
    </div>
  );
};

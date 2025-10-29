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
    <div className="bg-card rounded-lg md:rounded-xl p-2 md:p-3 shadow-lg border border-primary/20 flex-shrink-0">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="text-lg md:text-xl text-center h-10 md:h-12 rounded-lg border border-primary/30 bg-background flex items-center justify-center font-semibold min-h-[2.5rem] md:min-h-[3rem]">
          {input || <span className="text-muted-foreground">{t('input.placeholder')}</span>}
        </div>

        {hint && (
          <div className="text-center p-2 bg-accent/20 rounded-lg text-sm md:text-base font-semibold animate-bounce-in">
            {hint}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleHint}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-8 md:h-10 text-xs md:text-sm rounded-lg"
          >
            <Lightbulb className="w-3 h-3 md:w-4 md:h-4 md:mr-1" />
            <span className="hidden md:inline">{t('input.hint')}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleAudio}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-8 md:h-10 text-xs md:text-sm rounded-lg"
          >
            <Volume2 className="w-3 h-3 md:w-4 md:h-4 md:mr-1" />
            <span className="hidden md:inline">{t('input.hearIt')}</span>
          </Button>
          {practiceMode && onShowAnswer && (
            <Button
              type="button"
              variant="outline"
              onClick={onShowAnswer}
              disabled={disabled || !currentCharacter}
              className="flex-1 h-8 md:h-10 text-xs md:text-sm rounded-lg"
            >
              <span className="text-xs md:text-sm">📖</span>
              <span className="hidden md:inline md:ml-1">{t('input.answer')}</span>
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
          className="w-full h-9 md:h-11 text-base md:text-lg rounded-lg bg-primary hover:bg-primary/90"
        >
          {t('input.submit')}
        </Button>
      </form>
    </div>
  );
};

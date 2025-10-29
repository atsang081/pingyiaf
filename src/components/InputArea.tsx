import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Lightbulb, Volume2 } from "lucide-react";
import { getHint } from "@/utils/gameUtils";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, currentCharacter]);

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
      const utterance = new SpeechSynthesisUtterance(currentCharacter.pinyin);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-card rounded-lg md:rounded-xl p-2 md:p-3 shadow-lg border border-primary/20 flex-shrink-0">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
            }
          }}
          disabled={disabled}
          placeholder="Type here..."
          className="text-lg md:text-xl text-center h-10 md:h-12 rounded-lg border border-primary/30 focus:border-primary"
        />

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
            <span className="hidden md:inline">Hint</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleAudio}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-8 md:h-10 text-xs md:text-sm rounded-lg"
          >
            <Volume2 className="w-3 h-3 md:w-4 md:h-4 md:mr-1" />
            <span className="hidden md:inline">Hear It</span>
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
              <span className="hidden md:inline md:ml-1">Answer</span>
            </Button>
          )}
        </div>

        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          className="w-full h-9 md:h-11 text-base md:text-lg rounded-lg bg-primary hover:bg-primary/90"
        >
          Submit ✨
        </Button>
      </form>
    </div>
  );
};

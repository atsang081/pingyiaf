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
}

export const InputArea = ({ onSubmit, currentCharacter, attemptCount, disabled }: InputAreaProps) => {
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
    <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-primary/20">
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
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
          className="text-xl md:text-2xl text-center h-12 md:h-14 rounded-xl border-2 border-primary/30 focus:border-primary"
        />

        {hint && (
          <div className="text-center p-2 md:p-3 bg-accent/20 rounded-xl text-base md:text-lg font-semibold animate-bounce-in">
            {hint}
          </div>
        )}

        <div className="flex gap-2 md:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleHint}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-10 md:h-12 text-sm md:text-lg rounded-xl"
          >
            <Lightbulb className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
            <span className="hidden md:inline">Hint</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleAudio}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-10 md:h-12 text-sm md:text-lg rounded-xl"
          >
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
            <span className="hidden md:inline">Hear It</span>
          </Button>
        </div>

        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          className="w-full h-12 md:h-14 text-lg md:text-xl rounded-xl bg-primary hover:bg-primary/90"
        >
          Submit ✨
        </Button>
      </form>
    </div>
  );
};

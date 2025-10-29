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
    <div className="bg-card rounded-2xl p-6 shadow-lg border-2 border-primary/20">
      <div className="text-xl font-semibold mb-4 text-center">
        💬 Type the pinyin:
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Type here..."
          className="text-2xl text-center h-14 rounded-xl border-2 border-primary/30 focus:border-primary"
        />

        {hint && (
          <div className="text-center p-3 bg-accent/20 rounded-xl text-lg font-semibold animate-bounce-in">
            {hint}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleHint}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-12 text-lg rounded-xl"
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Hint
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleAudio}
            disabled={disabled || !currentCharacter}
            className="flex-1 h-12 text-lg rounded-xl"
          >
            <Volume2 className="w-5 h-5 mr-2" />
            Hear It
          </Button>
        </div>

        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          className="w-full h-14 text-xl rounded-xl bg-primary hover:bg-primary/90"
        >
          Submit ✨
        </Button>
      </form>
    </div>
  );
};

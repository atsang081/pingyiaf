import { Button } from "./ui/button";
import { Delete } from "lucide-react";

interface PinyinKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  disabled?: boolean;
}

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export const PinyinKeyboard = ({ onKeyPress, onBackspace, disabled = false }: PinyinKeyboardProps) => {
  return (
    <div className="w-full bg-card/50 backdrop-blur-sm rounded-md p-1 space-y-0.5">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5">
          {row.map((key) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              onClick={() => onKeyPress(key)}
              disabled={disabled}
              className="h-7 md:h-8 min-w-[28px] md:min-w-[36px] px-1.5 md:px-2 text-sm md:text-base font-semibold rounded bg-background/80 hover:bg-primary/10 active:bg-primary/20 transition-colors"
            >
              {key}
            </Button>
          ))}
          {rowIndex === 2 && (
            <Button
              type="button"
              variant="outline"
              onClick={onBackspace}
              disabled={disabled}
              className="h-7 md:h-8 min-w-[28px] md:min-w-[36px] px-1.5 md:px-2 rounded bg-background/80 hover:bg-destructive/10 active:bg-destructive/20 transition-colors"
            >
              <Delete className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

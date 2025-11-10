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
    <div className="w-full bg-card/50 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 md:p-2.5 space-y-1.5 sm:space-y-2 max-h-[40vh] md:max-h-[45vh] overflow-y-auto">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1 md:gap-1.5">
          {row.map((key) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              onClick={() => onKeyPress(key)}
              disabled={disabled}
              className="h-7 sm:h-8 md:h-9 lg:h-10 min-w-[28px] sm:min-w-[32px] md:min-w-[36px] px-1 sm:px-2 md:px-2.5 text-xs sm:text-sm md:text-base font-semibold rounded-md bg-background/80 hover:bg-primary/10 active:bg-primary/20 transition-colors flex-shrink-0"
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
              className="h-7 sm:h-8 md:h-9 lg:h-10 min-w-[28px] sm:min-w-[32px] md:min-w-[36px] px-1 sm:px-2 md:px-2.5 rounded-md bg-background/80 hover:bg-destructive/10 active:bg-destructive/20 transition-colors flex-shrink-0"
            >
              <Delete className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

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
    <div className="w-full bg-card/50 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 md:p-3 space-y-2 sm:space-y-2.5 max-h-[35vh] md:max-h-[40vh] overflow-y-auto">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 md:gap-2">
          {row.map((key) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              onClick={() => onKeyPress(key)}
              disabled={disabled}
              className="h-8 sm:h-9 md:h-10 lg:h-11 min-w-[32px] sm:min-w-[36px] md:min-w-[40px] px-1.5 sm:px-2.5 md:px-3 text-sm sm:text-base md:text-lg font-semibold rounded-md bg-background/80 hover:bg-primary/10 active:bg-primary/20 transition-colors flex-shrink-0"
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
              className="h-8 sm:h-9 md:h-10 lg:h-11 min-w-[32px] sm:min-w-[36px] md:min-w-[40px] px-1.5 sm:px-2.5 md:px-3 rounded-md bg-background/80 hover:bg-destructive/10 active:bg-destructive/20 transition-colors flex-shrink-0"
            >
              <Delete className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

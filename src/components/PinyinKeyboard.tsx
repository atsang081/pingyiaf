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
    <div className="w-full bg-gradient-to-b from-card/60 to-card/40 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 max-h-[38vh] sm:max-h-[35vh] md:max-h-[32vh] overflow-y-auto shadow-md border border-primary/20">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
          {row.map((key) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              onClick={() => onKeyPress(key)}
              disabled={disabled}
              className="h-8 sm:h-9 md:h-11 lg:h-12 flex-1 min-w-[30px] sm:min-w-[32px] md:min-w-[36px] lg:min-w-[40px] max-w-[40px] sm:max-w-[44px] md:max-w-[48px] lg:max-w-[52px] px-1 sm:px-1.5 md:px-2 text-xs sm:text-sm md:text-base font-bold rounded-lg bg-gradient-to-b from-primary/5 to-primary/10 hover:from-primary/15 hover:to-primary/20 active:from-primary/25 active:to-primary/35 transition-all duration-150 shadow-sm hover:shadow-md border-2 border-primary/30 hover:border-primary/50"
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
              className="h-8 sm:h-9 md:h-11 lg:h-12 flex-1 min-w-[30px] sm:min-w-[32px] md:min-w-[36px] lg:min-w-[40px] max-w-[40px] sm:max-w-[44px] md:max-w-[48px] lg:max-w-[52px] px-1 sm:px-1.5 md:px-2 rounded-lg bg-gradient-to-b from-destructive/5 to-destructive/10 hover:from-destructive/15 hover:to-destructive/20 active:from-destructive/25 active:to-destructive/35 transition-all duration-150 shadow-sm hover:shadow-md border-2 border-destructive/30 hover:border-destructive/50"
            >
              <Delete className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

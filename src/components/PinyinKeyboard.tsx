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
    <div className="w-full bg-gradient-to-b from-card/60 to-card/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 max-h-[32vh] md:max-h-[36vh] overflow-y-auto shadow-md border border-primary/20">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2.5 md:gap-3">
          {row.map((key) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              onClick={() => onKeyPress(key)}
              disabled={disabled}
              className="h-10 sm:h-12 md:h-14 lg:h-16 min-w-[40px] sm:min-w-[44px] md:min-w-[50px] px-2 sm:px-3 md:px-4 text-base sm:text-lg md:text-xl font-bold rounded-lg bg-gradient-to-b from-primary/5 to-primary/10 hover:from-primary/15 hover:to-primary/20 active:from-primary/25 active:to-primary/35 transition-all duration-150 flex-shrink-0 shadow-sm hover:shadow-md border-2 border-primary/30 hover:border-primary/50"
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
              className="h-10 sm:h-12 md:h-14 lg:h-16 min-w-[40px] sm:min-w-[44px] md:min-w-[50px] px-2 sm:px-3 md:px-4 rounded-lg bg-gradient-to-b from-destructive/5 to-destructive/10 hover:from-destructive/15 hover:to-destructive/20 active:from-destructive/25 active:to-destructive/35 transition-all duration-150 flex-shrink-0 shadow-sm hover:shadow-md border-2 border-destructive/30 hover:border-destructive/50"
            >
              <Delete className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

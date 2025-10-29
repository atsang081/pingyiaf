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
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ['1', '2', '3', '4']
];

export const PinyinKeyboard = ({ onKeyPress, onBackspace, disabled = false }: PinyinKeyboardProps) => {
  return (
    <div className="w-full bg-card/50 backdrop-blur-sm rounded-lg p-2 space-y-1.5">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              onClick={() => onKeyPress(key)}
              disabled={disabled}
              className="h-9 min-w-[32px] px-2 text-base font-semibold rounded-md bg-background/80 hover:bg-primary/10 active:bg-primary/20 transition-colors"
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
              className="h-9 min-w-[32px] px-2 rounded-md bg-background/80 hover:bg-destructive/10 active:bg-destructive/20 transition-colors"
            >
              <Delete className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

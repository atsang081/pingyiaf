import { Star } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  return (
    <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-primary/20">
      <div className="text-center mb-3 md:mb-4">
        <span className="text-sm md:text-lg font-semibold">
          {current}/{total} done! 🎯
        </span>
      </div>
      
      <div className="flex gap-1 md:gap-2 justify-center flex-wrap">
        {Array.from({ length: total }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 md:w-8 md:h-8 ${
              i < current
                ? "fill-accent text-accent"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      
      <div className="mt-3 md:mt-4 bg-muted rounded-full h-3 md:h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500 rounded-full"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

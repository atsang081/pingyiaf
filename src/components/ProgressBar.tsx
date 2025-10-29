import { Star } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg border-2 border-primary/20">
      <div className="text-center mb-4">
        <span className="text-lg font-semibold">
          Progress: {current}/{total} done! 🎯
        </span>
      </div>
      
      <div className="flex gap-2 justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <Star
            key={i}
            className={`w-8 h-8 ${
              i < current
                ? "fill-accent text-accent"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      
      <div className="mt-4 bg-muted rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500 rounded-full"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

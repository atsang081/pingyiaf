import { Star } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  return (
    <div className="flex gap-0.5 md:gap-1 justify-center flex-shrink-0">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 md:w-5 md:h-5 ${
            i < current
              ? "fill-accent text-accent"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

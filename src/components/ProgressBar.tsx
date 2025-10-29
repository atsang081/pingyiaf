import { Star } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  return (
    <div className="flex gap-1 md:gap-2 justify-center">
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
  );
};

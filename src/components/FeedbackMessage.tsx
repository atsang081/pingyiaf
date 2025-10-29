import { useEffect } from "react";

interface FeedbackMessageProps {
  message: string;
  emoji: string;
  type: "success" | "error";
  onComplete?: () => void;
}

export const FeedbackMessage = ({ message, emoji, type, onComplete }: FeedbackMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 right-4 md:right-6 z-50 animate-slide-in ${
        type === "success" ? "bg-success" : "bg-destructive"
      } text-white px-3 py-2 md:px-4 md:py-3 rounded-xl shadow-2xl text-center`}
    >
      <div className="flex items-center gap-2">
        <div className="text-2xl md:text-3xl">{emoji}</div>
        <div className="text-base md:text-xl font-bold">{message}</div>
      </div>
      
      {type === "success" && (
        <div className="absolute inset-0 -z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-sm md:text-lg animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 0.2}s`,
              }}
            >
              {["🎉", "⭐", "✨"][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

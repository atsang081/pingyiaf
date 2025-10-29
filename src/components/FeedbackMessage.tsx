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
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-in ${
        type === "success" ? "bg-success" : "bg-destructive"
      } text-white px-6 py-4 md:px-12 md:py-8 rounded-2xl md:rounded-3xl shadow-2xl text-center max-w-[90vw]`}
    >
      <div className="text-5xl md:text-8xl mb-2 md:mb-4">{emoji}</div>
      <div className="text-2xl md:text-4xl font-bold">{message}</div>
      
      {type === "success" && (
        <div className="absolute inset-0 -z-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl md:text-4xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {["🎉", "⭐", "✨", "🌟"][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

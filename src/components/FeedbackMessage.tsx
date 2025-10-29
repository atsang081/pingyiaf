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
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-in ${
        type === "success" ? "bg-success" : "bg-destructive"
      } text-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-2xl text-center max-w-[80vw]`}
    >
      <div className="text-3xl md:text-5xl mb-1 md:mb-2">{emoji}</div>
      <div className="text-xl md:text-2xl font-bold">{message}</div>
      
      {type === "success" && (
        <div className="absolute inset-0 -z-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-lg md:text-2xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 0.3}s`,
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

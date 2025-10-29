import { useEffect, useState } from "react";
import { CharacterInGame } from "@/types/game";

interface CharacterSpriteProps {
  character: CharacterInGame;
  onReachBase: (id: string) => void;
}

export const CharacterSprite = ({ character, onReachBase }: CharacterSpriteProps) => {
  const [position, setPosition] = useState(character.xPosition);

  useEffect(() => {
    if (!character.isActive) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPos = prev - 1;
        if (newPos <= -10) {
          onReachBase(character.uniqueId);
          return prev;
        }
        return newPos;
      });
    }, character.speed * 10);

    return () => clearInterval(interval);
  }, [character.isActive, character.speed, character.uniqueId, onReachBase]);

  if (!character.isActive) return null;

  const balloonColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
  ];
  const balloonColor = balloonColors[character.id % balloonColors.length];

  return (
    <div
      className="absolute transition-all duration-100 animate-float"
      style={{
        left: `${position}%`,
        top: `${character.yPosition}%`,
      }}
    >
      {/* Balloon */}
      <div className="relative flex flex-col items-center">
        <div className={`${balloonColor} rounded-full w-20 h-24 shadow-lg flex items-center justify-center border-4 border-white`}>
          <span className="text-4xl font-bold text-white drop-shadow-lg">
            {character.character}
          </span>
        </div>
        {/* String */}
        <div className="w-0.5 h-8 bg-gray-400"></div>
      </div>
    </div>
  );
};

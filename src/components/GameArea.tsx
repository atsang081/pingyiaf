import { CharacterSprite } from "./CharacterSprite";
import { CharacterInGame } from "@/types/game";

interface GameAreaProps {
  characters: CharacterInGame[];
  onReachBase: (id: string) => void;
}

export const GameArea = ({ characters, onReachBase }: GameAreaProps) => {
  return (
    <div className="relative bg-gradient-to-b from-sky-300 to-sky-100 rounded-2xl p-8 shadow-lg border-4 border-primary/30 min-h-[400px] overflow-hidden">
      {/* Clouds decoration */}
      <div className="absolute top-4 left-10 text-6xl opacity-30">☁️</div>
      <div className="absolute top-20 right-20 text-5xl opacity-30">☁️</div>
      <div className="absolute top-32 left-1/3 text-4xl opacity-30">☁️</div>
      
      {/* Characters */}
      {characters.map((char) => (
        <CharacterSprite
          key={char.uniqueId}
          character={char}
          onReachBase={onReachBase}
        />
      ))}
      
      {/* Castle Base */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="text-center">
          <div className="text-7xl mb-2 animate-float">🏰</div>
          <div className="text-2xl font-bold text-white drop-shadow-lg bg-primary/80 px-6 py-2 rounded-full">
            YOUR BASE
          </div>
        </div>
      </div>
    </div>
  );
};

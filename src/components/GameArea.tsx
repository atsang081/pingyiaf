import { CharacterSprite } from "./CharacterSprite";
import { CharacterInGame } from "@/types/game";

interface GameAreaProps {
  characters: CharacterInGame[];
  onReachBase: (id: string) => void;
}

export const GameArea = ({ characters, onReachBase }: GameAreaProps) => {
  return (
    <div className="relative bg-gradient-to-b from-sky-300 to-sky-100 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg border-2 md:border-4 border-primary/30 min-h-[300px] md:min-h-[400px] overflow-hidden">
      {/* Clouds decoration */}
      <div className="absolute top-2 left-4 md:top-4 md:left-10 text-3xl md:text-6xl opacity-30">☁️</div>
      <div className="absolute top-10 right-8 md:top-20 md:right-20 text-2xl md:text-5xl opacity-30">☁️</div>
      <div className="absolute top-16 left-1/3 md:top-32 text-xl md:text-4xl opacity-30">☁️</div>
      
      {/* Characters */}
      {characters.map((char) => (
        <CharacterSprite
          key={char.uniqueId}
          character={char}
          onReachBase={onReachBase}
        />
      ))}
      
      {/* Castle Base */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
        <div className="text-center">
          <div className="text-4xl md:text-7xl mb-1 md:mb-2 animate-float">🏰</div>
          <div className="text-xs md:text-2xl font-bold text-white drop-shadow-lg bg-primary/80 px-3 py-1 md:px-6 md:py-2 rounded-full">
            YOUR BASE
          </div>
        </div>
      </div>
    </div>
  );
};

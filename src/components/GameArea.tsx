import { CharacterSprite } from "./CharacterSprite";
import { CharacterInGame } from "@/types/game";

interface GameAreaProps {
  characters: CharacterInGame[];
  onReachBase: (id: string) => void;
}

export const GameArea = ({ characters, onReachBase }: GameAreaProps) => {
  return (
    <div className="relative bg-gradient-to-b from-sky-300 to-sky-100 rounded-lg md:rounded-xl p-3 md:p-4 shadow-lg border border-primary/30 flex-1 overflow-hidden">
      {/* Clouds decoration */}
      <div className="absolute top-2 left-4 text-2xl md:text-4xl opacity-30">☁️</div>
      <div className="absolute top-8 right-8 text-xl md:text-3xl opacity-30">☁️</div>
      <div className="absolute top-12 left-1/3 text-lg md:text-2xl opacity-30">☁️</div>
      
      {/* Characters */}
      {characters.map((char) => (
        <CharacterSprite
          key={char.uniqueId}
          character={char}
          onReachBase={onReachBase}
        />
      ))}
      
      {/* Castle Base */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2">
        <div className="text-center">
          <div className="text-3xl md:text-5xl animate-float">✈️</div>
        </div>
      </div>
    </div>
  );
};

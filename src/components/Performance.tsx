import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, Trophy, Star, Target } from "lucide-react";
import { LEVEL_CONFIGS } from "@/types/game";
import { useLanguage } from "@/contexts/LanguageContext";

interface GameRecord {
  level: number;
  score: number;
  accuracy: number;
  stars: number;
  date: string;
}

interface PerformanceProps {
  onBack: () => void;
}

export const Performance = ({ onBack }: PerformanceProps) => {
  const { t } = useLanguage();
  
  // Get records from localStorage
  const getTopRecords = (): GameRecord[] => {
    const stored = localStorage.getItem("gameRecords");
    if (!stored) return [];
    
    const records: GameRecord[] = JSON.parse(stored);
    // Sort by score descending and take top 10
    return records.sort((a, b) => b.score - a.score).slice(0, 10);
  };

  const topRecords = getTopRecords();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-xl text-sm md:text-base h-9 md:h-10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            {t('levelSelect.back')}
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
              <Trophy className="w-8 h-8 md:w-12 md:h-12 text-accent" />
              <h1 className="text-3xl md:text-5xl font-bold text-primary">
                {t('performance.title')}
              </h1>
            </div>
            <p className="text-sm md:text-lg text-muted-foreground">
              {t('performance.subtitle')}
            </p>
          </div>
        </div>

        {/* Records List */}
        {topRecords.length === 0 ? (
          <Card className="p-8 md:p-12 text-center">
            <div className="text-6xl md:text-8xl mb-4">🎮</div>
            <h2 className="text-xl md:text-3xl font-bold text-muted-foreground mb-2">
              {t('performance.noRecords')}
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              {t('performance.startPlaying')}
            </p>
          </Card>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {topRecords.map((record, index) => {
              const levelConfig = LEVEL_CONFIGS[record.level - 1];
              const date = new Date(record.date);
              
              return (
                <Card
                  key={index}
                  className={`p-4 md:p-6 transition-all hover:scale-[1.02] ${
                    index === 0 ? "border-4 border-accent shadow-xl" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-6">
                    {/* Rank */}
                    <div className={`text-center shrink-0 ${
                      index === 0 ? "text-accent" : 
                      index === 1 ? "text-secondary" : 
                      index === 2 ? "text-primary" : 
                      "text-muted-foreground"
                    }`}>
                      {index === 0 && <div className="text-3xl md:text-5xl mb-1">🥇</div>}
                      {index === 1 && <div className="text-3xl md:text-5xl mb-1">🥈</div>}
                      {index === 2 && <div className="text-3xl md:text-5xl mb-1">🥉</div>}
                      <div className="text-xl md:text-3xl font-bold">
                        #{index + 1}
                      </div>
                    </div>

                    {/* Level Icon */}
                    <div className="text-3xl md:text-5xl shrink-0">
                      {levelConfig.sticker}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="text-base md:text-2xl font-bold text-primary mb-1">
                        {t('performance.level')} {record.level}: {levelConfig.name}
                      </div>
                      <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="font-semibold">{record.score} {t('performance.pts')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{record.accuracy.toFixed(0)}% {t('performance.accuracy')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: record.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Clear Records Button */}
        {topRecords.length > 0 && (
          <div className="mt-6 md:mt-8 text-center">
            <Button
              variant="outline"
              className="text-destructive border-destructive hover:bg-destructive/10"
              onClick={() => {
                if (confirm(t('performance.confirmClear'))) {
                  localStorage.removeItem("gameRecords");
                  window.location.reload();
                }
              }}
            >
              {t('performance.clearRecords')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

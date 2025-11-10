import { useState, useEffect, useCallback } from "react";
import { MainMenu } from "@/components/MainMenu";
import { LevelSelect } from "@/components/LevelSelect";
import { GameHeader } from "@/components/GameHeader";
import { GameArea } from "@/components/GameArea";
import { InputArea } from "@/components/InputArea";
import { ProgressBar } from "@/components/ProgressBar";
import { FeedbackMessage } from "@/components/FeedbackMessage";
import { ResultScreen } from "@/components/ResultScreen";
import { Performance } from "@/components/Performance";
import { PracticeMode } from "@/components/PracticeMode";
import { Character, CharacterInGame, GameState, LEVEL_CONFIGS } from "@/types/game";
import { calculateScore, validatePinyin, shuffleArray, calculateStars } from "@/utils/gameUtils";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import charactersData from "@/data/characters.json";

type GameScreen = "menu" | "level-select" | "game" | "results" | "practice" | "performance";

const Index = () => {
  const [screen, setScreen] = useState<GameScreen>("menu");
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    currentCharacterIndex: 0,
    score: 0,
    correctCount: 0,
    attemptCount: 0,
    totalCharacters: 0,
    isGameActive: false,
    isPaused: false,
    charactersInGame: [],
  });
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<{ message: string; emoji: string; type: "success" | "error" } | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    const stored = localStorage.getItem("unlockedLevels");
    return stored ? parseInt(stored) : 1;
  });
  const [levelStars, setLevelStars] = useState<{ [key: number]: number }>(() => {
    const stored = localStorage.getItem("levelStars");
    return stored ? JSON.parse(stored) : {};
  });
  const [levelCharacters, setLevelCharacters] = useState<Character[]>([]);
  const [currentAttemptCount, setCurrentAttemptCount] = useState(0);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Persist unlocked levels and stars to localStorage
  useEffect(() => {
    localStorage.setItem("unlockedLevels", unlockedLevels.toString());
  }, [unlockedLevels]);

  useEffect(() => {
    localStorage.setItem("levelStars", JSON.stringify(levelStars));
  }, [levelStars]);

  // Initialize level characters
  const initializeLevelCharacters = useCallback((level: number) => {
    const config = LEVEL_CONFIGS[level - 1];
    const shuffled = shuffleArray(charactersData as Character[]);
    const selected = shuffled.slice(0, config.characterCount);
    setLevelCharacters(selected);
    setGameState((prev) => ({
      ...prev,
      totalCharacters: config.characterCount,
      currentCharacterIndex: 0,
      score: 0,
      correctCount: 0,
      attemptCount: 0,
      charactersInGame: [],
    }));
    setLives(3);
    setCurrentAttemptCount(0);
  }, []);

  // Spawn character
  const spawnCharacter = useCallback(() => {
    if (gameState.currentCharacterIndex >= levelCharacters.length) return;

    const config = LEVEL_CONFIGS[gameState.currentLevel - 1];
    const character = levelCharacters[gameState.currentCharacterIndex];

    const newCharacter: CharacterInGame = {
      ...character,
      xPosition: 110,
      yPosition: Math.random() * 50 + 10,
      speed: config.speed,
      attemptCount: 0,
      isActive: true,
      uniqueId: `${character.id}-${Date.now()}`,
    };

    setGameState((prev) => ({
      ...prev,
      charactersInGame: [...prev.charactersInGame, newCharacter],
      currentCharacterIndex: prev.currentCharacterIndex + 1,
    }));
  }, [gameState.currentCharacterIndex, gameState.currentLevel, levelCharacters]);

  // Handle character reaching base
  const handleReachBase = useCallback((uniqueId: string) => {
    setGameState((prev) => ({
      ...prev,
      charactersInGame: prev.charactersInGame.filter((char) => char.uniqueId !== uniqueId),
    }));
    
    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        // Game over
        toast({
          title: t('game.gameOver'),
          description: t('game.gameOverDesc'),
        });
        setTimeout(() => {
          setScreen("level-select");
        }, 2000);
      }
      return Math.max(0, newLives);
    });
  }, [toast]);

  // Handle input submission
  const handleSubmit = useCallback((input: string) => {
    const activeChars = gameState.charactersInGame.filter((c) => c.isActive);
    if (activeChars.length === 0) return;

    // Find matching character
    const matchingChar = activeChars.find((char) => 
      validatePinyin(input, char.pinyin)
    );

    if (matchingChar) {
      // Correct answer
      const scoreData = calculateScore(currentAttemptCount + 1);
      setGameState((prev) => ({
        ...prev,
        score: prev.score + scoreData.points,
        correctCount: prev.correctCount + 1,
        attemptCount: prev.attemptCount + currentAttemptCount + 1,
        charactersInGame: prev.charactersInGame.filter(
          (char) => char.uniqueId !== matchingChar.uniqueId
        ),
      }));

      setFeedback({
        message: scoreData.message,
        emoji: scoreData.emoji,
        type: "success",
      });

      setCurrentAttemptCount(0);

      // Check if level is complete
      if (
        gameState.currentCharacterIndex >= levelCharacters.length &&
        gameState.charactersInGame.length <= 1
      ) {
        setTimeout(() => {
          setScreen("results");
        }, 1500);
      }
    } else {
      // Wrong answer
      setCurrentAttemptCount((prev) => prev + 1);
      setFeedback({
        message: currentAttemptCount >= 2 ? "Try again!" : "Oops!",
        emoji: "🤔",
        type: "error",
      });
    }
  }, [gameState, levelCharacters.length, currentAttemptCount]);

  // Game loop - spawn characters
  useEffect(() => {
    if (!gameState.isGameActive || screen !== "game") return;

    const config = LEVEL_CONFIGS[gameState.currentLevel - 1];
    const shouldSpawn =
      gameState.charactersInGame.length < config.simultaneousCharacters &&
      gameState.currentCharacterIndex < levelCharacters.length;

    if (shouldSpawn) {
      const timer = setTimeout(() => {
        spawnCharacter();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [gameState, screen, levelCharacters.length, spawnCharacter]);

  // Start game
  const startGame = (level: number) => {
    setGameState((prev) => ({ ...prev, currentLevel: level, isGameActive: true }));
    initializeLevelCharacters(level);
    setScreen("game");
  };

  // Calculate results
  const calculateResults = () => {
    const accuracy =
      gameState.totalCharacters > 0
        ? (gameState.correctCount / gameState.totalCharacters) * 100
        : 0;
    return { accuracy };
  };

  // Save game record to localStorage
  const saveGameRecord = (level: number, score: number, accuracy: number) => {
    const stars = calculateStars(accuracy);
    const record = {
      level,
      score,
      accuracy,
      stars,
      date: new Date().toISOString()
    };

    // Save game record
    const stored = localStorage.getItem("gameRecords");
    const records = stored ? JSON.parse(stored) : [];
    records.push(record);
    localStorage.setItem("gameRecords", JSON.stringify(records));

    // Update level stars (keep best stars)
    setLevelStars(prev => ({
      ...prev,
      [level]: Math.max(prev[level] || 0, stars)
    }));
  };

  const { accuracy } = calculateResults();

  return (
    <>
      {screen === "menu" && (
        <MainMenu
          onStartGame={() => setScreen("level-select")}
          onPracticeMode={() => setScreen("practice")}
          onViewStickers={() => setScreen("performance")}
        />
      )}

      {screen === "level-select" && (
        <LevelSelect
          onSelectLevel={(level) => startGame(level)}
          onBack={() => setScreen("menu")}
          unlockedLevels={unlockedLevels}
          levelStars={levelStars}
        />
      )}

      {screen === "game" && (
        <div className="h-screen flex flex-col p-2 sm:p-3 md:p-4 bg-background">
          <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full gap-2 sm:gap-2.5 md:gap-3">
            <GameHeader
              score={gameState.score}
              level={LEVEL_CONFIGS[gameState.currentLevel - 1]}
              lives={lives}
              onBack={() => setScreen("level-select")}
            />

            <ProgressBar
              current={gameState.correctCount}
              total={gameState.totalCharacters}
            />

            <div className="flex-1 flex flex-col">
              <GameArea
                characters={gameState.charactersInGame}
                onReachBase={handleReachBase}
              />
            </div>

            <div className="flex-shrink-0">
              <InputArea
                onSubmit={handleSubmit}
                currentCharacter={
                  gameState.charactersInGame[0]
                    ? {
                        character: gameState.charactersInGame[0].character,
                        pinyin: gameState.charactersInGame[0].pinyin,
                      }
                    : null
                }
                attemptCount={currentAttemptCount}
                disabled={!gameState.isGameActive || lives <= 0}
              />
            </div>
          </div>
        </div>
      )}

      {screen === "results" && (
        <ResultScreen
          level={LEVEL_CONFIGS[gameState.currentLevel - 1]}
          score={gameState.score}
          accuracy={accuracy}
          onContinue={() => {
            saveGameRecord(gameState.currentLevel, gameState.score, accuracy);
            if (gameState.currentLevel < 4) {
              setUnlockedLevels((prev) => Math.max(prev, gameState.currentLevel + 1));
              startGame(gameState.currentLevel + 1);
            }
          }}
          onReplay={() => {
            saveGameRecord(gameState.currentLevel, gameState.score, accuracy);
            startGame(gameState.currentLevel);
          }}
          onMainMenu={() => {
            saveGameRecord(gameState.currentLevel, gameState.score, accuracy);
            setScreen("menu");
          }}
        />
      )}

      {screen === "practice" && (
        <PracticeMode onBack={() => setScreen("menu")} />
      )}

      {screen === "performance" && (
        <Performance onBack={() => setScreen("menu")} />
      )}

      {feedback && (
        <FeedbackMessage
          message={feedback.message}
          emoji={feedback.emoji}
          type={feedback.type}
          onComplete={() => setFeedback(null)}
        />
      )}
    </>
  );
};

export default Index;

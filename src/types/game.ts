export interface Character {
  id: number;
  character: string;
  pinyin: string;
}

export interface WordAttemptHistory {
  characterId: number;
  correctCount: number;
  lastAttemptTime: Date;
}

export interface LevelProgress {
  level: number;
  totalAttempted: number;
  totalCorrect: number;
  wordAttempts: Map<number, WordAttemptHistory>;
}

export interface CharacterInGame extends Character {
  xPosition: number;
  yPosition: number;
  speed: number;
  attemptCount: number;
  isActive: boolean;
  uniqueId: string;
}

export interface GameState {
  currentLevel: number;
  currentCharacterIndex: number;
  score: number;
  correctCount: number;
  attemptCount: number;
  totalCharacters: number;
  isGameActive: boolean;
  isPaused: boolean;
  charactersInGame: CharacterInGame[];
}

export interface LevelConfig {
  level: number;
  name: string;
  nameChinese: string;
  characterCount: number;
  speed: number;
  simultaneousCharacters: number;
  description: string;
  sticker: string;
}

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    level: 1,
    name: "New Joiner",
    nameChinese: "新手训练",
    characterCount: 10,
    speed: 10,
    simultaneousCharacters: 1,
    description: "Tutorial level - Learn the basics!",
    sticker: "🐉"
  },
  {
    level: 2,
    name: "Little Hero",
    nameChinese: "小勇士",
    characterCount: 25,
    speed: 7,
    simultaneousCharacters: 1,
    description: "You're getting stronger!",
    sticker: "🚀"
  },
  {
    level: 3,
    name: "Big Hero",
    nameChinese: "大英雄",
    characterCount: 50,
    speed: 5,
    simultaneousCharacters: 2,
    description: "Amazing progress!",
    sticker: "🏆"
  },
  {
    level: 4,
    name: "Super Champion",
    nameChinese: "超级冠军",
    characterCount: 100,
    speed: 3,
    simultaneousCharacters: 3,
    description: "Ultimate challenge!",
    sticker: "👑"
  }
];

export interface GameResult {
  level: number;
  score: number;
  accuracy: number;
  stars: number;
  completedAt: Date;
}

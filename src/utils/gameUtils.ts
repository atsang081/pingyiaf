export const calculateScore = (attemptCount: number): { points: number; message: string; emoji: string } => {
  if (attemptCount === 1) {
    return { points: 10, message: "GREAT JOB!", emoji: "🎉" };
  } else if (attemptCount === 2) {
    return { points: 7, message: "NICE!", emoji: "😊" };
  } else if (attemptCount === 3) {
    return { points: 5, message: "GOOD TRY!", emoji: "👍" };
  } else {
    return { points: 1, message: "Keep going!", emoji: "💪" };
  }
};

export const calculateStars = (accuracy: number): number => {
  if (accuracy >= 90) return 5;
  if (accuracy >= 75) return 4;
  if (accuracy >= 60) return 3;
  if (accuracy >= 40) return 2;
  return 1;
};

export const normalizePinyin = (pinyin: string): string => {
  // Remove tone marks and convert to lowercase for comparison
  const toneMap: { [key: string]: string } = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v', 'ü': 'v',
    'ɑ̀': 'a', 'ɑ́': 'a', 'ɑ̌': 'a', 'ɑ': 'a'
  };
  
  return pinyin
    .toLowerCase()
    .split('')
    .map(char => toneMap[char] || char)
    .join('')
    .trim();
};

export const validatePinyin = (input: string, correct: string): boolean => {
  const normalizedInput = normalizePinyin(input);
  const normalizedCorrect = normalizePinyin(correct);
  return normalizedInput === normalizedCorrect;
};

export const getHint = (pinyin: string, attemptCount: number): string => {
  if (attemptCount === 0) {
    return `Hint: Starts with "${pinyin[0]}"`;
  } else if (attemptCount === 1) {
    const halfLength = Math.ceil(pinyin.length / 2);
    return `Hint: ${pinyin.substring(0, halfLength)}...`;
  } else {
    return `Answer: ${pinyin}`;
  }
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const selectRandomWord = (
  availableWords: any[],
  wordAttempts: Map<number, any>
): any => {
  // Filter out words that have been answered correctly 2+ times
  const eligibleWords = availableWords.filter(word => {
    const attempts = wordAttempts.get(word.id);
    return !attempts || attempts.correctCount < 2;
  });

  // If all words have been answered correctly 2+ times, reset the cycle
  if (eligibleWords.length === 0) {
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }

  // Return random word from eligible words
  return eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
};

export const updateWordAttempt = (
  wordAttempts: Map<number, any>,
  characterId: number,
  isCorrect: boolean
): Map<number, any> => {
  const newMap = new Map(wordAttempts);
  const current = newMap.get(characterId) || {
    characterId,
    correctCount: 0,
    lastAttemptTime: new Date(),
  };

  if (isCorrect) {
    current.correctCount += 1;
  }
  current.lastAttemptTime = new Date();
  newMap.set(characterId, current);

  return newMap;
};

export const calculateLevelAccuracy = (
  totalCorrect: number,
  totalAttempted: number
): number => {
  if (totalAttempted === 0) return 0;
  return (totalCorrect / totalAttempted) * 100;
};

export const shouldResetLevelCycle = (accuracy: number): boolean => {
  return accuracy >= 80;
};

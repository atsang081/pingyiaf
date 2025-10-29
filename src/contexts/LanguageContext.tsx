import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh-TW';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Main Menu
    'menu.title': 'PINYIN AIR FORCE',
    'menu.subtitle': 'Character Battle',
    'menu.description': 'Defend your castle by typing pinyin! 🏰',
    'menu.startPlaying': 'START PLAYING!',
    'menu.practiceMode': 'PRACTICE MODE',
    'menu.performance': 'PERFORMANCE',
    
    // Level Select
    'levelSelect.title': 'Choose Level',
    'levelSelect.back': 'Back',
    'levelSelect.level': 'Level',
    'levelSelect.chars': 'chars',
    'levelSelect.speed': 's speed',
    'levelSelect.atOnce': 'at once',
    
    // Game
    'game.score': 'Score',
    'game.level': 'Lv',
    'game.gameOver': 'Game Over!',
    'game.gameOverDesc': "Don't worry, try again! 💪",
    
    // Input Area
    'input.placeholder': 'Type here...',
    'input.hint': 'Hint',
    'input.hearIt': 'Hear It',
    'input.answer': 'Answer',
    'input.submit': 'Submit ✨',
    
    // Result Screen
    'result.levelComplete': 'LEVEL COMPLETE!',
    'result.score': 'Score',
    'result.accuracy': 'Accuracy',
    'result.nextLevel': 'Next Level ➡️',
    'result.replay': 'Replay',
    'result.menu': 'Menu',
    'result.perfect': "🌟 PERFECT! You're a Pinyin Master!",
    'result.excellent': '🎉 EXCELLENT! Almost perfect!',
    'result.great': '👍 GREAT JOB! Keep practicing!',
    'result.good': "😊 GOOD EFFORT! You're improving!",
    'result.didIt': '💪 YOU DID IT! Keep going!',
    
    // Practice Mode
    'practice.title': 'Practice Mode 📚',
    'practice.words': 'words',
    'practice.perfect': 'Perfect! ✨',
    'practice.notQuite': 'Not quite! 🤔',
    'practice.tryAgain': 'Try again - the character will stay here until you get it!',
    'practice.greatJob': 'Great job! 🎉',
    'practice.allPracticed': "You've practiced all characters! Starting over with a new shuffle.",
    
    // Performance
    'performance.title': 'Top Performance',
    'performance.subtitle': 'Your best game results',
    'performance.noRecords': 'No records yet!',
    'performance.startPlaying': 'Start playing to see your top scores here',
    'performance.level': 'Level',
    'performance.pts': 'pts',
    'performance.accuracy': 'accuracy',
    'performance.clearRecords': 'Clear All Records',
    'performance.confirmClear': 'Are you sure you want to clear all records?',
    
    // Language
    'language.select': 'Language',
  },
  'zh-TW': {
    // Main Menu
    'menu.title': '拼音空軍',
    'menu.subtitle': '漢字大作戰',
    'menu.description': '輸入拼音來保衛你的城堡！🏰',
    'menu.startPlaying': '開始遊戲！',
    'menu.practiceMode': '練習模式',
    'menu.performance': '成績紀錄',
    
    // Level Select
    'levelSelect.title': '選擇關卡',
    'levelSelect.back': '返回',
    'levelSelect.level': '關卡',
    'levelSelect.chars': '個字',
    'levelSelect.speed': '秒速度',
    'levelSelect.atOnce': '個同時',
    
    // Game
    'game.score': '分數',
    'game.level': '關卡',
    'game.gameOver': '遊戲結束！',
    'game.gameOverDesc': '別擔心，再試一次！💪',
    
    // Input Area
    'input.placeholder': '在這裡輸入...',
    'input.hint': '提示',
    'input.hearIt': '發音',
    'input.answer': '答案',
    'input.submit': '送出 ✨',
    
    // Result Screen
    'result.levelComplete': '關卡完成！',
    'result.score': '分數',
    'result.accuracy': '準確度',
    'result.nextLevel': '下一關 ➡️',
    'result.replay': '重玩',
    'result.menu': '主選單',
    'result.perfect': '🌟 完美！你是拼音大師！',
    'result.excellent': '🎉 太棒了！幾乎完美！',
    'result.great': '👍 做得很好！繼續練習！',
    'result.good': '😊 不錯的表現！你在進步！',
    'result.didIt': '💪 你做到了！繼續加油！',
    
    // Practice Mode
    'practice.title': '練習模式 📚',
    'practice.words': '個字',
    'practice.perfect': '完美！✨',
    'practice.notQuite': '還不對！🤔',
    'practice.tryAgain': '再試一次 - 這個字會留在這裡直到你答對為止！',
    'practice.greatJob': '做得好！🎉',
    'practice.allPracticed': '你已經練習完所有漢字！重新開始新一輪。',
    
    // Performance
    'performance.title': '最佳成績',
    'performance.subtitle': '你的最佳遊戲成績',
    'performance.noRecords': '還沒有紀錄！',
    'performance.startPlaying': '開始遊戲來記錄你的最高分數',
    'performance.level': '關卡',
    'performance.pts': '分',
    'performance.accuracy': '準確度',
    'performance.clearRecords': '清除所有紀錄',
    'performance.confirmClear': '你確定要清除所有紀錄嗎？',
    
    // Language
    'language.select': '語言',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh-TW' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="flex items-center gap-2 h-10 md:h-12 px-4 md:px-6 rounded-xl border-2"
    >
      <Languages className="w-4 h-4 md:w-5 md:h-5" />
      <span className="text-sm md:text-base font-semibold">
        {language === 'en' ? '繁體中文' : 'English'}
      </span>
    </Button>
  );
};

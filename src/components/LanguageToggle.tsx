import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 border-white/20 hover:bg-white/10 text-white"
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}</span>
    </Button>
  );
}

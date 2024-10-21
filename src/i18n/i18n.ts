import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import us from "./languages/us.json";
import br from "./languages/br.json";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "br",
    resources: {
      us: {
        translation: us,
      },
      br: {
        translation: br,
      },
    },
  });

export default i18next;

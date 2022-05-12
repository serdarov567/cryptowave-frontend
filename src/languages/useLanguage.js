import React, { useEffect, useState } from "react";
import { eng, rus, esp, deu } from "src/languages/languages";

const useLanguage = () => {
  let savedLanguage = localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "ENG";

  let initialLanguageKey;

  switch (initialLanguageKey) {
    case "ENG": {
      initialLanguageKey = eng;
      break;
    }
    case "RUS": {
      initialLanguageKey = rus;
      break;
    }
    case "DEU": {
      initialLanguageKey = deu;
      break;
    }
    case "ESP": {
      initialLanguageKey = esp;
      break;
    }
    default: {
      initialLanguageKey = eng;
      break;
    }
  }

  const [currentLanguage, setCurrentLanguage] = useState(savedLanguage);

  const [langKeys, setLangKeys] = useState(initialLanguageKey);

  const [newLanguage, setLanguage] = useState(savedLanguage);

  useEffect(() => {
    savedLanguage = localStorage.setItem("lang", newLanguage);
    setCurrentLanguage(newLanguage);
    switch (newLanguage) {
      case "ENG": {
        setLangKeys(eng);
        break;
      }
      case "RUS": {
        setLangKeys(rus);
        break;
      }
      case "ESP": {
        setLangKeys(esp);
        break;
      }
      case "DEU": {
        setLangKeys(deu);
        break;
      }
      default: {
        setLangKeys(eng);
        break;
      }
    }
  }, [newLanguage]);

  return { currentLanguage, setLanguage, langKeys };
};

export default useLanguage;

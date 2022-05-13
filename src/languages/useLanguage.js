import React, { useEffect, useState } from "react";
import DeuFlag from "src/assets/vectors/DeuFlag";
import EngFlag from "src/assets/vectors/EngFlag";
import EspFlag from "src/assets/vectors/EspFlag";
import RusFlag from "src/assets/vectors/RusFlag";
import { eng, rus, esp, deu } from "src/languages/languages";

const useLanguage = () => {
  let savedLanguage = localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "ENG";

  let initialLanguageKey, initialFlag;

  switch (initialLanguageKey) {
    case "ENG": {
      initialLanguageKey = eng;
      initialFlag = <EngFlag size={'20px'}/>;
      break;
    }
    case "RUS": {
      initialLanguageKey = rus;
      initialFlag = <RusFlag size={'20px'}/>;
      break;
    }
    case "DEU": {
      initialLanguageKey = deu;
      initialFlag = <DeuFlag size={'20px'}/>;
      break;
    }
    case "ESP": {
      initialLanguageKey = esp;
      initialFlag = <EspFlag size={'20px'}/>;
      break;
    }
    default: {
      initialLanguageKey = eng;
      initialFlag = <DeuFlag size={'20px'}/>;
      break;
    }
  }

  const [currentLanguage, setCurrentLanguage] = useState(savedLanguage);

  const [CurrentFlag, setCurrentFlag] = useState(initialFlag);

  const [langKeys, setLangKeys] = useState(initialLanguageKey);

  const [newLanguage, setLanguage] = useState(savedLanguage);

  useEffect(() => {
    savedLanguage = localStorage.setItem("lang", newLanguage);
    setCurrentLanguage(newLanguage);
    switch (newLanguage) {
      case "ENG": {
        setLangKeys(eng);
        setCurrentFlag(<EngFlag size={'20px'}/>);
        break;
      }
      case "RUS": {
        setLangKeys(rus);
        setCurrentFlag(<RusFlag size={'20px'}/>);
        break;
      }
      case "ESP": {
        setLangKeys(esp);
        setCurrentFlag(<EspFlag size={'20px'}/>);
        break;
      }
      case "DEU": {
        setLangKeys(deu);
        setCurrentFlag(<DeuFlag size={'20px'}/>);
        break;
      }
      default: {
        setLangKeys(eng);
        setCurrentFlag(<EngFlag size={'20px'}/>);
        break;
      }
    }
  }, [newLanguage]);

  return { CurrentFlag, currentLanguage, setLanguage, langKeys };
};

export default useLanguage;

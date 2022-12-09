import { createContext, useState } from "react";

export const VisualModeContext = createContext();

export const VisualModeProvider = (props) => {
  const [mode, setMode] = useState("light");

  return (
    <VisualModeContext.Provider value={{ mode, setMode }}>
      {props.children}
    </VisualModeContext.Provider>
  );
};

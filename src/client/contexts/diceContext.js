import React, { createContext, useReducer, useMemo } from "react";
import { diceReducer } from "../reducers/diceReducer";

export const diceContext = createContext();

const initialState = {
  dice: [],
  count: Array(13)
    .fill({ count: 0, value: 0 })
    .map((e, index) => (e = { value: index, count: 0 })),
};

const DiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(diceReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <diceContext.Provider value={contextValue}>{children}</diceContext.Provider>
  );
};

export default DiceContextProvider;

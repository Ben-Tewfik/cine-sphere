import { createContext, useContext } from "react";

const AppProvider = createContext();

export default function AppContext({ children }) {
  return (
    <AppProvider.Provider value={{ test: "hello" }}>
      {children}
    </AppProvider.Provider>
  );
}

const useGlobalContext = () => useContext(AppProvider);

export { useGlobalContext };
